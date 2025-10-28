<template>
  <view class="uve-ai-chat">
    <view class="chat-container">
      <scroll-view
        class="chat-messages"
        scroll-y
        :scroll-top="scrollTop"
        @scrolltoupper="loadMoreMessages"
        upper-threshold="50"
        ref="messagesRef"
      >
        <view class="messages-wrapper">
          <view
            v-for="(message, index) in messages"
            :key="'message' + index"
            class="message-item"
            :class="{
              'user-message': message.role === 'user',
              'ai-message': message.role === 'ai',
            }"
          >
            <view class="avatar">
              <image :src="message.role === 'ai' ? aiAvatar : userAvatar" mode="aspectFill" />
            </view>
            <view class="message-content">
              <!-- Display attachments for user messages -->
              <view
                v-if="
                  message.role === 'user' && message.attachments && message.attachments.length > 0
                "
                class="attachments-list"
              >
                <view
                  v-for="(file, fIndex) in message.attachments"
                  :key="'file-' + fIndex"
                  class="attachment-item"
                >
                  <text class="attachment-icon ri-attachment-2"></text>
                  <text class="attachment-name">{{ file.name }}</text>
                  <text class="attachment-size">{{ formatFileSize(file.size) }}</text>
                </view>
              </view>

              <view class="message-body">
                <view class="message-content-wrapper" :data-message-index="index">
                  <rich-text
                    v-if="message.role === 'user' || (message.role === 'ai' && !message.typing)"
                    :nodes="formatMessage(message.content, index)"
                  ></rich-text>
                  <!-- Typing effect with code block styling -->
                  <view v-if="message.role === 'ai' && message.typing" class="typing-container">
                    <rich-text :nodes="formatMessage(typingText, index)"></rich-text>
                  </view>
                </view>
              </view>

              <!-- Feedback buttons for AI messages -->
              <view v-if="message.role === 'ai' && !message.typing" class="feedback-actions">
                <view
                  class="feedback-btn"
                  :class="{ 'feedback-active': message.feedback === 'like' }"
                  @click="handleFeedback(index, 'like')"
                >
                  <text class="feedback-icon i-ri-thumb-up-line"></text>
                </view>
                <view
                  class="feedback-btn"
                  :class="{ 'feedback-active': message.feedback === 'dislike' }"
                  @click="handleFeedback(index, 'dislike')"
                >
                  <text class="feedback-icon i-ri-thumb-down-line"></text>
                </view>
                <view class="feedback-btn" @click="handleCopy(message.content)">
                  <text class="feedback-icon i-ri-file-copy-line"></text>
                </view>
                <view class="feedback-btn" @click="handleRegenerate(index)">
                  <text class="feedback-icon i-ri-refresh-line"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="loading" class="loading-indicator">
          <view class="loading-dots">
            <view class="dot"></view>
            <view class="dot"></view>
            <view class="dot"></view>
          </view>
        </view>
      </scroll-view>

      <view class="chat-input-wrapper">
        <!-- Selected files preview -->
        <view v-if="selectedFiles.length > 0" class="selected-files-preview">
          <view
            v-for="(file, fIndex) in selectedFiles"
            :key="'selected-' + fIndex"
            class="selected-file-item"
          >
            <view class="file-info">
              <text class="file-icon i-ri-attachment-2"></text>
              <text class="file-name">{{ file.name }}</text>
              <text class="file-size">{{ formatFileSize(file.size) }}</text>
            </view>
            <view class="file-remove" @click="removeFile(fIndex)">
              <text class="remove-icon i-ri-close-line"></text>
            </view>
          </view>
        </view>

        <view class="chat-input-area">
          <!-- File upload button -->
          <view class="input-icon-left" @click="handleFileUpload">
            <text class="icon-attach i-ri-attachment-2"></text>
          </view>

          <textarea
            class="chat-input"
            v-model="inputMessage"
            placeholder="询问任何问题"
            :disabled="loading"
            :adjust-position="true"
            :cursor-spacing="20"
            :show-confirm-bar="false"
            :auto-height="true"
            :maxlength="-1"
            @confirm="sendMessage"
            @input="adjustTextareaHeight"
            ref="textareaRef"
          ></textarea>
          <view class="input-actions">
            <view
              class="input-icon-right"
              v-if="!inputMessage.trim() && selectedFiles.length === 0"
            >
              <text class="icon-voice i-ri-arrow-up-line"></text>
            </view>
            <view
              class="send-button"
              :class="{ disabled: loading || (!inputMessage.trim() && selectedFiles.length === 0) }"
              @click="sendMessage"
              v-else
            >
              <text class="icon-send i-ri-send-plane-fill"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-light.css" // 导入highlight.js的样式

interface ChatMessage {
  role: "user" | "ai"
  content: string
  time: Date
  typing?: boolean
  feedback?: "like" | "dislike" | null
  attachments?: FileAttachment[]
  hasCode?: boolean
}

interface FileAttachment {
  name: string
  size: number
  type: string
  url: string
}

interface Props {
  /** 用户头像 */
  userAvatar?: string
  /** AI头像 */
  aiAvatar?: string
  /** 打字速度(毫秒) */
  typingSpeed?: number
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  userAvatar: "/static/tabbar/user.png",
  aiAvatar: "/static/tabbar/home.png",
  typingSpeed: 30,
  customClass: "",
  customStyle: "",
})

const emit = defineEmits<{
  (e: "send", message: string, attachments?: FileAttachment[]): void
  (e: "receive", message: string): void
  (e: "feedback", messageIndex: number, feedbackType: "like" | "dislike"): void
  (e: "regenerate", messageIndex: number): void
}>()

// 状态变量
const inputMessage = ref("")
const messages = ref<ChatMessage[]>([])
const loading = ref(false)
const scrollTop = ref(0)
const typingText = ref("")
const typingIndex = ref(0)
const currentAiResponse = ref("")
const messagesRef = ref<any>(null)
const textareaRef = ref<any>(null)
const selectedFiles = ref<FileAttachment[]>([])

// 存储代码块内容的映射，用于复制功能 - 按消息索引组织
const codeBlocksContent = ref<Record<number, Record<string, string>>>({})

// 模拟数据
const mockResponses = [
  "您好！我是AI助手，很高兴为您服务。有什么我可以帮助您的吗？",
  '这是一个很好的问题。让我为您详细解答：\n\n首先，我们需要理解基本概念。Vue3的组合式API是一种新的编写组件逻辑的方式，它允许我们按照功能而不是选项来组织代码。\n\n```js\nimport { ref, onMounted } from "vue";\n\nexport default {\n  setup() {\n    const count = ref(0);\n    \n    function increment() {\n      count.value++;\n    }\n    \n    onMounted(() => {\n      console.log("组件已挂载");\n    });\n    \n    return { count, increment };\n  }\n};\n```\n\n希望这个解释对您有所帮助！',
]

// 初始化配置
onMounted(() => {
  // 添加一条AI欢迎消息
  messages.value.push({
    role: "ai",
    content: mockResponses[0],
    time: new Date(),
  })

  // 滚动到底部
  scrollToBottom()

  // 添加全局点击监听器来处理代码复制按钮
  // #ifdef H5
  document.addEventListener("click", handleGlobalClick)
  // #endif
})

// 复制指定消息的代码块内容
const copyMessageCode = (messageIndex: number) => {
  const messageCodes = codeBlocksContent.value[messageIndex]
  if (messageCodes) {
    // 获取该消息的所有代码块
    const codeIds = Object.keys(messageCodes)
    if (codeIds.length > 0) {
      // 如果有多个代码块，复制第一个（或者可以合并所有代码块）
      const firstCodeId = codeIds[0]
      const code = messageCodes[firstCodeId]

      if (code) {
        copyCodeToClipboard(code)
      }
    }
  }
}

// 处理全局点击事件（用于代码复制按钮）
const handleGlobalClick = (e: any) => {
  const target = e.target
  // 检查是否点击了代码复制按钮
  if (target && target.classList && target.classList.contains("code-copy-btn-inline")) {
    const messageIndex = parseInt(target.getAttribute("data-message-index") || "-1")
    const codeId = target.getAttribute("data-code-id")

    if (messageIndex >= 0 && codeId && codeBlocksContent.value[messageIndex]) {
      const code = codeBlocksContent.value[messageIndex][codeId]
      if (code) {
        copyCodeToClipboard(code)
      }
    }
  }
}

// 复制代码到剪贴板
const copyCodeToClipboard = (code) => {
  // 小程序环境下的兼容处理
  // #ifdef MP-WEIXIN
  wx.setClipboardData({
    data: code,
    success: () => {
      wx.showToast({ title: "代码已复制", icon: "none" })
    },
    fail: () => {
      // 如果wx API失败，尝试使用uni API
      uni.setClipboardData({
        data: code,
        success: () => {
          uni.showToast({ title: "代码已复制", icon: "none" })
        },
      })
    },
  })
  // #endif

  // #ifndef MP-WEIXIN
  uni.setClipboardData({
    data: code,
    success: () => {
      uni.showToast({ title: "代码已复制", icon: "none" })
    },
  })
  // #endif
}

// 发送消息
const sendMessage = async () => {
  if (loading.value || (!inputMessage.value.trim() && selectedFiles.value.length === 0)) return

  // 添加用户消息
  const userMessage = inputMessage.value.trim()
  const attachments = selectedFiles.value.length > 0 ? [...selectedFiles.value] : undefined

  messages.value.push({
    role: "user",
    content: userMessage,
    time: new Date(),
    attachments,
  })

  // 清空输入框和选中的文件
  inputMessage.value = ""
  selectedFiles.value = []

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 触发发送事件
  emit("send", userMessage, attachments)

  // 模拟AI响应
  await simulateAiResponse()
}

// 模拟AI响应
const simulateAiResponse = async () => {
  loading.value = true

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 随机选择一个响应
  const randomIndex = Math.floor(Math.random() * mockResponses.length)
  const responseContent = mockResponses[randomIndex]
  currentAiResponse.value = responseContent

  // 添加AI消息（初始为空，将开始打字效果）
  messages.value.push({
    role: "ai",
    content: responseContent,
    time: new Date(),
    typing: true,
  })

  // 触发接收事件
  emit("receive", responseContent)

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 开始打字效果
  startTypingEffect()
}

// 打字效果
const startTypingEffect = () => {
  typingIndex.value = 0
  typingText.value = ""

  const typeNextChar = () => {
    if (typingIndex.value < currentAiResponse.value.length) {
      typingText.value += currentAiResponse.value[typingIndex.value]
      typingIndex.value++

      // 滚动到底部
      scrollToBottom()

      // 继续打字
      setTimeout(typeNextChar, props.typingSpeed)
    } else {
      // 打字完成
      finishTyping()
    }
  }

  // 开始打字
  typeNextChar()
}

// 完成打字效果
const finishTyping = () => {
  // 更新最后一条消息，移除typing标记
  const lastIndex = messages.value.length - 1
  if (lastIndex >= 0 && messages.value[lastIndex].role === "ai") {
    messages.value[lastIndex].typing = false
  }

  // 重置状态
  loading.value = false
  typingText.value = ""
  typingIndex.value = 0
  currentAiResponse.value = ""
}

// 格式化消息内容（支持Markdown）
const formatMessage = (content: string, messageIndex?: number) => {
  let hasCodeBlock = false
  // 处理代码块，使用highlight.js进行高亮
  let processedContent = content

  // 处理代码块，移除原始的```标记
  processedContent = processedContent.replace(/```([\w]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    try {
      const language = lang || "plaintext"
      const validLang = hljs.getLanguage(language) ? language : "plaintext"

      // 使用highlight.js高亮代码
      let highlightedCode
      try {
        // 确保code是字符串
        if (typeof code === "string") {
          highlightedCode = hljs.highlight(code.trim(), { language: validLang }).value
        } else {
          // 如果code不是字符串，进行转换
          highlightedCode = hljs.highlight(String(code).trim(), { language: validLang }).value
        }
      } catch (e) {
        console.error("代码高亮错误:", e)
        // 如果高亮失败，进行HTML转义
        highlightedCode = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
      }

      // 添加语言标记和复制按钮，但不显示原始的```js标记
      let languageLabel = ""
      if (lang) {
        languageLabel = `<div class="code-language">${lang}</div>`
      }

      // 创建通用的代码块结构
      // 为每个代码块生成唯一ID
      const codeId = `code-${Date.now()}-${Math.floor(Math.random() * 10000)}`

      // 将代码内容存储在全局变量中（按消息索引组织）
      if (messageIndex !== undefined) {
        if (!codeBlocksContent.value[messageIndex]) {
          codeBlocksContent.value[messageIndex] = {}
        }
        codeBlocksContent.value[messageIndex][codeId] = code
        hasCodeBlock = true
      }

      // 创建代码块HTML，并在右上角添加复制按钮
      const copyButtonHtml =
        messageIndex !== undefined
          ? `<div class="code-copy-btn-inline i-ri-file-copy-line" data-message-index="${messageIndex}" data-code-id="${codeId}"></div>`
          : ""

      const codeBlockHtml = `<div class="code-wrapper" id="${codeId}">${languageLabel}${copyButtonHtml}<pre class="code-block"><code class="hljs language-${validLang}">${highlightedCode}</code></pre></div>`

      return codeBlockHtml
    } catch (error) {
      console.error("代码块处理错误:", error)
      // 出错时返回原始代码块，但进行HTML转义
      const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
      return `<pre><code>${escapedCode}</code></pre>`
    }
  })

  // 处理内联代码
  processedContent = processedContent.replace(/`([^`]+)`/g, (match, code) => {
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

    return `<code class="inline-code">${escapedCode}</code>`
  })

  // 处理其他Markdown语法
  try {
    // 处理基本的Markdown语法
    const html = processedContent
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="javascript:void(0);" data-url="$2">$1</a>')

    // 更新消息的 hasCode 属性
    if (messageIndex !== undefined && hasCodeBlock) {
      messages.value[messageIndex].hasCode = true
    }

    return html
  } catch (error) {
    console.error("Markdown解析错误:", error)
    // 如果解析失败，返回原始内容的基本处理
    return content
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
  }
}

// 格式化时间
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    let query
    // 小程序环境下使用不同的方式
    // #ifdef MP-WEIXIN
    query = uni.createSelectorQuery()
    // #endif

    // #ifndef MP-WEIXIN
    query = uni.createSelectorQuery().in(getCurrentInstance())
    // #endif

    query.select(".chat-messages").boundingClientRect()
    query.select(".messages-wrapper").boundingClientRect()
    query.exec((res) => {
      if (res && res[0] && res[1]) {
        const scrollViewHeight = res[0].height
        const contentHeight = res[1].height
        scrollTop.value = contentHeight - scrollViewHeight
      }
    })
  })
}

// 加载更多消息（向上滚动时）
const loadMoreMessages = () => {
  // 这里可以实现加载历史消息的逻辑
  console.log("加载更多历史消息")
}

// 调整textarea高度
const adjustTextareaHeight = () => {
  // uni-app的textarea有auto-height属性，会自动调整高度
}

// 处理反馈
const handleFeedback = (messageIndex: number, feedbackType: "like" | "dislike") => {
  if (messages.value[messageIndex]) {
    // Toggle feedback: if same type clicked, remove it; otherwise set new type
    if (messages.value[messageIndex].feedback === feedbackType) {
      messages.value[messageIndex].feedback = null
    } else {
      messages.value[messageIndex].feedback = feedbackType
    }

    // 触发反馈事件
    emit("feedback", messageIndex, feedbackType)

    // 显示反馈提示
    uni.showToast({
      title: feedbackType === "like" ? "感谢您的反馈！" : "我们会改进的",
      icon: "none",
      duration: 1500,
    })
  }
}

// 处理复制消息
const handleCopy = (content: string) => {
  // Remove HTML tags for plain text copy
  const plainText = content.replace(/<[^>]*>/g, "")

  uni.setClipboardData({
    data: plainText,
    success: () => {
      uni.showToast({ title: "已复制到剪贴板", icon: "none" })
    },
  })
}

// 处理重新生成
const handleRegenerate = (messageIndex: number) => {
  // 触发重新生成事件
  emit("regenerate", messageIndex)

  // 显示提示
  uni.showToast({
    title: "正在重新生成...",
    icon: "loading",
    duration: 1000,
  })

  // 模拟重新生成AI响应
  setTimeout(() => {
    simulateAiResponse()
  }, 1000)
}

// 处理文件上传
const handleFileUpload = () => {
  // #ifdef H5
  uni.chooseFile({
    count: 5,
    extension: [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"],
    success: (res) => {
      const tempFiles = res.tempFiles || []

      tempFiles.forEach((file: any) => {
        selectedFiles.value.push({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          url: file.path,
        })
      })

      uni.showToast({
        title: `已选择 ${tempFiles.length} 个文件`,
        icon: "none",
      })
    },
    fail: (err) => {
      console.error("文件选择失败:", err)
      uni.showToast({
        title: "文件选择失败",
        icon: "none",
      })
    },
  })
  // #endif

  // #ifdef MP-WEIXIN
  uni.chooseMessageFile({
    count: 5,
    type: "all",
    success: (res) => {
      const tempFiles = res.tempFiles || []

      tempFiles.forEach((file: any) => {
        selectedFiles.value.push({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          url: file.path,
        })
      })

      uni.showToast({
        title: `已选择 ${tempFiles.length} 个文件`,
        icon: "none",
      })
    },
    fail: (err) => {
      console.error("文件选择失败:", err)
      // Fallback to image picker
      uni.chooseImage({
        count: 5,
        success: (res) => {
          res.tempFilePaths.forEach((path, index) => {
            selectedFiles.value.push({
              name: `image_${Date.now()}_${index}.jpg`,
              size: 0,
              type: "image/jpeg",
              url: path,
            })
          })

          uni.showToast({
            title: `已选择 ${res.tempFilePaths.length} 个图片`,
            icon: "none",
          })
        },
      })
    },
  })
  // #endif

  // #ifndef H5 || MP-WEIXIN
  // Fallback for other platforms
  uni.chooseImage({
    count: 5,
    success: (res) => {
      res.tempFilePaths.forEach((path, index) => {
        selectedFiles.value.push({
          name: `image_${Date.now()}_${index}.jpg`,
          size: 0,
          type: "image/jpeg",
          url: path,
        })
      })

      uni.showToast({
        title: `已选择 ${res.tempFilePaths.length} 个图片`,
        icon: "none",
      })
    },
    fail: (err) => {
      console.error("图片选择失败:", err)
      uni.showToast({
        title: "文件选择失败",
        icon: "none",
      })
    },
  })
  // #endif
}

// 移除文件
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

// 添加消息方法（供外部调用）
const addMessage = (role: "user" | "ai", content: string) => {
  messages.value.push({
    role,
    content,
    time: new Date(),
  })

  nextTick(() => {
    scrollToBottom()
  })
}

// 清空消息
const clearMessages = () => {
  messages.value = []
}

// 暴露方法给父组件
defineExpose({
  addMessage,
  clearMessages,
})
</script>

<style lang="scss" scoped>
.uve-ai-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      padding-bottom: 80px;

      .messages-wrapper {
        display: flex;
        flex-direction: column;

        .message-item {
          display: flex;
          margin-bottom: 20px;
          align-items: flex-start;

          .avatar {
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            margin-right: 10px;

            image {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .message-content {
            max-width: 80%;

            // Attachments list styling (Tailwind-inspired)
            .attachments-list {
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin-bottom: 8px;

              .attachment-item {
                display: flex;
                align-items: center;
                padding: 8px 12px;
                background-color: rgb(0 0 0 / 5%);
                border-radius: 12px;
                border: 1px solid rgb(0 0 0 / 10%);
                gap: 8px;

                .attachment-icon {
                  font-size: 18px;
                  color: #666;
                }

                .attachment-name {
                  flex: 1;
                  font-size: 13px;
                  color: #333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .attachment-size {
                  font-size: 11px;
                  color: #999;
                }
              }
            }

            .message-body {
              padding: 12px 16px;
              font-size: 15px;
              line-height: 1.5;
              margin-right: 0;
              overflow-wrap: break-all;

              .message-content-wrapper {
                position: relative;
              }

              .typing-container {
                display: flex;
                align-items: center;

                :deep(.code-wrapper) {
                  animation: pulse 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                  0%,
                  100% {
                    opacity: 1;
                  }

                  50% {
                    opacity: 0.7;
                  }
                }
              }
            }

            // Feedback actions (Tailwind-inspired)
            .feedback-actions {
              display: flex;
              align-items: center;
              gap: 4px;
              margin-top: 6px;
              padding-left: 4px;

              .feedback-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                background-color: transparent;
                transition: all 0.2s ease;
                cursor: pointer;

                &:hover {
                  background-color: rgb(0 0 0 / 5%);
                }

                &:active {
                  background-color: rgb(0 0 0 / 10%);
                  transform: scale(0.95);
                }

                // 先定义通用图标样式，低特异性
                .feedback-icon {
                  font-size: 18px;
                  color: #666;
                  transition: all 0.2s ease;
                }

                &.feedback-active {
                  background-color: rgb(59 130 246 / 10%);

                  .feedback-icon {
                    transform: scale(1.1);
                    color: rgb(59 130 246);
                  }
                }
              }
            }
          }

          &.user-message {
            flex-direction: row-reverse;
            margin-right: 20px;

            .avatar {
              margin-right: 0;
              margin-left: 10px;
            }

            .message-content {
              margin-left: 0;
              margin-right: 0;

              .attachments-list {
                .attachment-item {
                  background-color: rgb(255 255 255 / 20%);
                  border-color: rgb(255 255 255 / 30%);

                  .attachment-icon {
                    color: #fff;
                  }

                  .attachment-name,
                  .attachment-size {
                    color: #fff;
                  }
                }
              }

              .message-body {
                background-color: #007aff;
                color: #fff;
                border-radius: 18px;
                margin-left: auto;
                max-width: 100%;

                :deep(a) {
                  color: #e0f0ff;
                }

                :deep(code) {
                  background-color: rgb(255 255 255 / 20%);
                  color: #fff;
                }
              }
            }
          }

          &.ai-message {
            .message-content {
              .message-body {
                background-color: #f1f1f1;
                color: #000;
                border-radius: 18px;

                :deep(pre) {
                  margin: 10px 0;
                  border-radius: 8px;
                  overflow-x: auto;
                }

                :deep(code) {
                  font-family: monospace;
                }

                :deep(ul),
                :deep(ol) {
                  padding-left: 20px;
                  margin: 8px 0;
                }

                :deep(blockquote) {
                  border-left: 4px solid #e0e0e0;
                  padding-left: 10px;
                  margin: 10px 0;
                  color: #666;
                }

                :deep(a) {
                  color: #007aff;
                  text-decoration: none;
                }

                :deep(p) {
                  margin: 8px 0;
                }

                :deep(img) {
                  max-width: 100%;
                  border-radius: 8px;
                }
              }
            }
          }
        }
      }

      .loading-indicator {
        display: flex;
        justify-content: center;
        padding: 16px;

        .loading-dots {
          display: flex;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 4px;
            animation: bounce 1.4s infinite ease-in-out both;

            &:nth-child(1) {
              animation-delay: -0.32s;
            }

            &:nth-child(2) {
              animation-delay: -0.16s;
            }
          }
        }
      }
    }

    .chat-input-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      background-color: #fff;
      border-top: 1px solid #f0f0f0;
      z-index: 100;

      // Selected files preview (Tailwind-inspired)
      .selected-files-preview {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 10px;
        padding: 8px;
        background-color: rgb(249 250 251);
        border-radius: 12px;

        .selected-file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
          transition: all 0.2s ease;

          &:hover {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%);
          }

          .file-info {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            overflow: hidden;

            .file-icon {
              font-size: 20px;
              color: #666;
            }

            .file-name {
              flex: 1;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .file-size {
              font-size: 12px;
              color: #999;
              flex-shrink: 0;
            }
          }

          .file-remove {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: rgb(239 68 68 / 10%);
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background-color: rgb(239 68 68 / 20%);
            }

            &:active {
              transform: scale(0.9);
            }

            .remove-icon {
              font-size: 16px;
              color: rgb(239 68 68);
              font-weight: bold;
            }
          }
        }
      }

      .chat-input-area {
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        border-radius: 24px;
        padding: 8px 12px;
        position: relative;
        gap: 8px;

        // File upload button (Tailwind-inspired)
        .input-icon-left {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;

          &:hover {
            background-color: rgb(0 0 0 / 5%);
          }

          &:active {
            background-color: rgb(0 0 0 / 10%);
            transform: scale(0.95);
          }

          .icon-attach {
            font-size: 20px;
            color: #666;
          }
        }

        .chat-input {
          flex: 1;
          min-height: 24px;
          max-height: 100px;
          padding: 0;
          font-size: 16px;
          background-color: transparent;
          border: none;
          line-height: 24px;
          margin-right: 6px;
        }

        .input-actions {
          display: flex;
          align-items: center;
          align-self: flex-end;
          padding-bottom: 2px;

          .input-icon-right {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #666;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            transition: all 0.2s ease;

            &:active {
              transform: scale(0.95);
            }

            .icon-voice {
              color: #fff;
              font-size: 18px;
            }
          }

          .send-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #000;
            color: #fff;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background-color: #333;
              transform: scale(1.05);
            }

            &:active {
              transform: scale(0.95);
            }

            &.disabled {
              opacity: 0.5;
              cursor: not-allowed;

              &:hover {
                background-color: #000;
                transform: scale(1);
              }
            }

            .icon-send {
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

/* 添加highlight.js的自定义样式 */
:deep(.code-wrapper) {
  position: relative;
  margin: 0.5em 0;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: visible;
  border: 1px solid #3c3c3c;

  .code-copy-btn-inline {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #858585;

    &:hover {
      background-color: rgb(60 60 60 / 95%);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

/* 统一的代码块样式，不再区分环境 */
:deep(.code-language) {
  position: absolute;
  top: 8px;
  left: 12px;
  background-color: #2d2d2d;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #858585;
  font-family: Consolas, Monaco, "Courier New", monospace;
  z-index: 1;
}

:deep(.code-block) {
  background: #1e1e1e; /* VSCode 暗色背景 */
  border-radius: 6px;
  padding: 0;
  margin: 0;
  overflow-x: auto;
}

:deep(.hljs) {
  padding: 1em;
  background: transparent;
  font-family: Consolas, Monaco, "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  tab-size: 2;
  color: #d4d4d4; /* VSCode 默认文本颜色 */
}

/* 关键字 */
:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-title),
:deep(.hljs-section),
:deep(.hljs-doctag),
:deep(.hljs-name),
:deep(.hljs-strong) {
  color: #569cd6; /* VSCode 蓝色 */
  font-weight: bold;
}

/* 注释 */
:deep(.hljs-comment) {
  color: #6a9955; /* VSCode 绿色注释 */
  font-style: italic;
}

/* 字符串 */
:deep(.hljs-string),
:deep(.hljs-quote) {
  color: #ce9178; /* VSCode 橙色字符串 */
}

/* 类型和关键字 */
:deep(.hljs-title),
:deep(.hljs-section),
:deep(.hljs-built-in),
:deep(.hljs-literal),
:deep(.hljs-type) {
  color: #4ec9b0; /* VSCode 浅绿色 */
}

/* 标签和属性 */
:deep(.hljs-tag),
:deep(.hljs-name),
:deep(.hljs-selector-id),
:deep(.hljs-selector-class),
:deep(.hljs-addition) {
  color: #9cdcfe; /* VSCode 浅蓝色 */
}

/* 其他语法元素 */
:deep(.hljs-meta),
:deep(.hljs-subst),
:deep(.hljs-symbol),
:deep(.hljs-regexp),
:deep(.hljs-attribute),
:deep(.hljs-deletion),
:deep(.hljs-variable),
:deep(.hljs-template-variable),
:deep(.hljs-link),
:deep(.hljs-bullet) {
  color: #c586c0; /* VSCode 紫色 */
}

/* 数字 */
:deep(.hljs-number) {
  color: #b5cea8; /* VSCode 浅绿色数字 */
}

/* 函数名称 */
:deep(.hljs-function) {
  color: #dcdcaa; /* VSCode 黄色函数 */
}

/* 内联代码 */
:deep(.inline-code) {
  font-family: Consolas, Monaco, "Courier New", monospace;
  padding: 2px 4px;
  background-color: #2d2d2d;
  border-radius: 4px;
  font-size: 14px;
  color: #ce9178; /* VSCode 橙色字符串 */
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
