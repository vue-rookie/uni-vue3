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
            <view class="avatar" v-if="message.role === 'ai'">
              <image :src="aiAvatar" mode="aspectFill" />
            </view>
            <view class="message-content">
              <view class="message-body">
                <view>
                  <rich-text
                    v-if="message.role === 'user' || (message.role === 'ai' && !message.typing)"
                    :nodes="formatMessage(message.content)"
                  ></rich-text>
                  <!-- 外部复制按钮，仅在AI消息中显示 -->
                  <view
                    v-if="message.role === 'ai' && messageHasCode"
                    class="external-copy-btn"
                    @click="copyLastCode"
                  >
                    <text class="copy-text">复制代码</text>
                  </view>
                </view>
                <view v-if="message.role === 'ai' && message.typing" class="typing-container">
                  <text>{{ typingText }}</text>
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
        <view class="chat-input-area">
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
            <view class="input-icon-right" v-if="!inputMessage.trim()">
              <text class="icon-voice">↑</text>
            </view>
            <view
              class="send-button"
              :class="{ disabled: loading || !inputMessage.trim() }"
              @click="sendMessage"
              v-else
            >
              <text class="icon-send">↑</text>
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
  (e: "send", message: string): void
  (e: "receive", message: string): void
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

// 存储代码块内容的映射，用于复制功能
const codeBlocksContent = ref({})

// 标记当前消息是否包含代码块
const messageHasCode = ref(false)

// 当前选中的代码ID
const selectedCodeId = ref("")

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
})

// 监听消息变化，为新的代码块添加复制功能
watch(
  messages,
  () => {
    // 延迟执行，确保DOM已更新
    setTimeout(() => {
      // 这里可以添加其他需要在消息更新后执行的逻辑
    }, 300)
  },
  { deep: true },
)

// 复制最后一个代码块的内容
const copyLastCode = () => {
  // 获取所有代码块ID
  const codeIds = Object.keys(codeBlocksContent.value)
  if (codeIds.length > 0) {
    // 获取最后一个代码块的内容
    const lastCodeId = codeIds[codeIds.length - 1]
    const code = codeBlocksContent.value[lastCodeId]

    if (code) {
      // 复制代码到剪贴板
      copyCodeToClipboard(code)
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
  if (loading.value || !inputMessage.value.trim()) return

  // 添加用户消息
  const userMessage = inputMessage.value.trim()
  messages.value.push({
    role: "user",
    content: userMessage,
    time: new Date(),
  })

  // 清空输入框
  inputMessage.value = ""

  // 重置代码块标记
  messageHasCode.value = false

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 触发发送事件
  emit("send", userMessage)

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
const formatMessage = (content: string) => {
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

      // 创建通用的代码块结构 - 不再依赖rich-text内部的点击事件
      // 为每个代码块生成唯一ID
      const codeId = `code-${Date.now()}-${Math.floor(Math.random() * 10000)}`

      // 将代码内容存储在全局变量中
      codeBlocksContent.value[codeId] = code

      // 创建代码块HTML，不包含复制按钮
      const codeBlockHtml = `<div class="code-wrapper" id="${codeId}">${languageLabel}<pre class="code-block"><code class="hljs language-${validLang}">${highlightedCode}</code></pre></div>`

      // 添加标记，以便在渲染后添加外部复制按钮
      messageHasCode.value = true

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
            width: 30px;
            height: 30px;
            flex-shrink: 0;
            margin-right: 10px;

            image {
              width: 30px;
              height: 30px;
              border-radius: 15px;
            }
          }

          .message-content {
            max-width: 80%;

            .message-body {
              padding: 12px 16px;
              font-size: 15px;
              line-height: 1.5;
              margin-right: 20px;
              overflow-wrap: break-word;

              .typing-container {
                display: flex;
                align-items: center;
              }
            }
          }

          &.user-message {
            flex-direction: row-reverse;

            .message-content {
              margin-left: 0;
              margin-right: 12px;

              .message-body {
                background-color: #007aff;
                color: #fff;
                border-radius: 18px;
                margin-left: auto;
                max-width: 90%;

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

      .chat-input-area {
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        border-radius: 24px;
        padding: 8px 12px;
        position: relative;

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

            .icon-voice {
              color: #fff;
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

            &.disabled {
              opacity: 0.5;
            }

            .icon-send {
              font-size: 16px;
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
  overflow: hidden;
  border: 1px solid #3c3c3c;
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

:deep(.code-copy-btn) {
  position: absolute;
  top: 8px;
  right: 12px;
  z-index: 1;
  font-size: 12px;
  color: #858585;
  background-color: rgb(45 45 45 / 80%);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-family: Consolas, Monaco, "Courier New", monospace;
  transition: all 0.2s ease;
}

:deep(.code-copy-btn:hover) {
  background-color: rgb(60 60 60 / 90%);
  color: #fff;
}

/* 外部复制按钮样式 */
.external-copy-btn {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #2d2d2d;
  border: 1px solid #3c3c3c;
  border-radius: 6px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.2s ease;
}

.external-copy-btn:active {
  background-color: #3c3c3c;
}

.copy-text {
  font-size: 12px;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
