<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 自定义导航栏 -->
    <uve-navbar
      :title="chatInfo.name"
      :fixed="true"
      :border="false"
      :show-back="true"
      title-color="text-gray-800"
      transparent
    >
      <template #right>
        <view class="flex items-center pr-4">
          <text class="i-ri-phone-line text-gray-800 text-xl mr-4" @click="makeCall"></text>
          <text class="i-ri-more-line text-gray-800 text-xl" @click="showMoreOptions"></text>
        </view>
      </template>
    </uve-navbar>

    <!-- 聊天消息列表 -->
    <scroll-view
      scroll-y
      class="h-[calc(100vh-120px)] px-4 py-2"
      :scroll-into-view="scrollToMessage"
      :scroll-with-animation="true"
    >
      <!-- 消息项 -->
      <view
        v-for="message in messages"
        :key="message.id"
        :id="`message-${message.id}`"
        class="mb-4"
        :class="{ 'flex justify-end': message.isMe, 'flex justify-start': !message.isMe }"
      >
        <view class="flex max-w-[80%]" :class="{ 'flex-row-reverse': message.isMe }">
          <!-- 头像 -->
          <image
            :src="message.isMe ? currentUser.avatar : chatInfo.avatar"
            class="w-10 h-10 rounded-full mx-2"
            mode="aspectFill"
          ></image>

          <!-- 消息内容 -->
          <view class="flex flex-col">
            <!-- 消息气泡 -->
            <view
              class="px-4 py-2 rounded-2xl"
              :class="{
                'bg-blue-500 text-white': message.isMe,
                'bg-white text-gray-800': !message.isMe,
              }"
            >
              <!-- 文本消息 -->
              <text v-if="message.type === 'text'" class="text-sm leading-relaxed">
                {{ message.content }}
              </text>

              <!-- 图片消息 -->
              <image
                v-else-if="message.type === 'image'"
                :src="message.content"
                class="max-w-48 max-h-48 rounded-lg"
                mode="aspectFit"
                @click="previewImage(message.content)"
              ></image>

              <!-- 视频消息 -->
              <view v-else-if="message.type === 'video'" class="relative">
                <video
                  :src="message.content"
                  class="w-48 h-32 rounded-lg"
                  :controls="false"
                  :show-center-play-btn="true"
                  object-fit="cover"
                ></video>
                <view class="absolute inset-0 flex items-center justify-center">
                  <text class="i-ri-play-fill text-white text-2xl"></text>
                </view>
              </view>

              <!-- 语音消息 -->
              <view v-else-if="message.type === 'voice'" class="flex items-center">
                <text class="i-ri-mic-line mr-2"></text>
                <text class="text-sm">{{ message.duration }}''</text>
                <view class="ml-2 flex space-x-1">
                  <view
                    v-for="i in 5"
                    :key="i"
                    class="w-1 bg-current rounded-full"
                    :style="{ height: Math.random() * 20 + 4 + 'px' }"
                  ></view>
                </view>
              </view>
            </view>

            <!-- 消息时间 -->
            <text class="text-xs text-gray-400 mt-1" :class="{ 'text-right': message.isMe }">
              {{ formatTime(message.timestamp) }}
            </text>
          </view>
        </view>
      </view>

      <!-- 正在输入指示器 -->
      <view v-if="isTyping" class="flex justify-start mb-4">
        <view class="flex">
          <image
            :src="chatInfo.avatar"
            class="w-10 h-10 rounded-full mx-2"
            mode="aspectFill"
          ></image>
          <view class="flex flex-col">
            <view class="bg-white px-4 py-2 rounded-2xl">
              <view class="flex space-x-1">
                <view class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></view>
                <view
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.1s"
                ></view>
                <view
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                ></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入框区域 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <!-- 快捷回复 -->
      <view v-if="showQuickReplies" class="mb-3">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="inline-flex space-x-2">
            <view
              v-for="(reply, index) in quickReplies"
              :key="index"
              class="bg-gray-100 rounded-full px-3 py-1"
              @click="sendQuickReply(reply)"
            >
              <text class="text-gray-700 text-sm">{{ reply }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 输入框和发送按钮 -->
      <view class="flex items-end">
        <!-- 更多功能按钮 -->
        <view class="mr-3 flex items-center">
          <text class="i-ri-add-circle-line text-gray-600 text-2xl" @click="showMoreActions"></text>
        </view>

        <!-- 文本输入框 -->
        <view class="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
          <input
            v-model="inputText"
            class="flex-1 text-sm"
            placeholder="输入消息..."
            :focus="inputFocus"
            confirm-type="send"
            @confirm="sendMessage"
            @input="onInput"
            @focus="onInputFocus"
            @blur="onInputBlur"
          />
        </view>

        <!-- 发送按钮 -->
        <view
          class="ml-3 w-10 h-10 rounded-full flex items-center justify-center"
          :class="{ 'bg-blue-500': inputText.trim(), 'bg-gray-300': !inputText.trim() }"
          @click="sendMessage"
        >
          <text
            :class="{
              'i-ri-send-plane-fill text-white': inputText.trim(),
              'i-ri-mic-line text-gray-500': !inputText.trim(),
            }"
            class="text-lg"
          ></text>
        </view>
      </view>
    </view>

    <!-- 更多操作面板 -->
    <view
      v-if="showActionsPanel"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
    >
      <view class="grid grid-cols-4 gap-4">
        <view class="flex flex-col items-center" @click="selectImage">
          <view class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-image-line text-blue-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">相册</text>
        </view>

        <view class="flex flex-col items-center" @click="takePhoto">
          <view class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-camera-line text-green-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">拍照</text>
        </view>

        <view class="flex flex-col items-center" @click="recordVoice">
          <view class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-mic-line text-purple-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">语音</text>
        </view>

        <view class="flex flex-col items-center" @click="selectVideo">
          <view class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-video-line text-orange-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">视频</text>
        </view>

        <view class="flex flex-col items-center" @click="sendLocation">
          <view class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-map-pin-line text-red-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">位置</text>
        </view>

        <view class="flex flex-col items-center" @click="sendContact">
          <view class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-user-line text-indigo-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">名片</text>
        </view>

        <view class="flex flex-col items-center" @click="sendEmoji">
          <view class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-emotion-line text-yellow-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">表情</text>
        </view>

        <view class="flex flex-col items-center" @click="sendFile">
          <view class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <text class="i-ri-file-line text-gray-500 text-xl"></text>
          </view>
          <text class="text-xs text-gray-600">文件</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue"

// 聊天信息
const chatInfo = ref({
  id: "",
  name: "",
  avatar: "",
  isOnline: false,
})

// 当前用户信息
const currentUser = ref({
  id: "current-user",
  username: "我",
  avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg",
})

// 输入文本
const inputText = ref("")
// 输入框焦点状态
const inputFocus = ref(false)
// 是否正在输入
const isTyping = ref(false)
// 是否显示快捷回复
const showQuickReplies = ref(false)
// 是否显示更多操作面板
const showActionsPanel = ref(false)
// 滚动到消息ID
const scrollToMessage = ref("")

// 快捷回复选项
const quickReplies = ref(["好的", "收到", "谢谢", "哈哈", "👍", "😊", "好的，没问题", "稍等"])

// 聊天消息列表
const messages = ref([
  {
    id: "m1",
    type: "text",
    content: "你好！",
    timestamp: Date.now() - 3600000,
    isMe: false,
  },
  {
    id: "m2",
    type: "text",
    content: "你好！很高兴认识你",
    timestamp: Date.now() - 3500000,
    isMe: true,
  },
  {
    id: "m3",
    type: "text",
    content: "你发的那个视频很好看，是在哪里拍的？",
    timestamp: Date.now() - 3000000,
    isMe: false,
  },
  {
    id: "m4",
    type: "text",
    content: "谢谢！是在太原的迎泽公园拍的，那里的夜景很美",
    timestamp: Date.now() - 2900000,
    isMe: true,
  },
  {
    id: "m5",
    type: "image",
    content: "https://cdn.pixabay.com/photo/2019/05/04/15/24/woman-4178302_1280.jpg",
    timestamp: Date.now() - 1800000,
    isMe: false,
  },
  {
    id: "m6",
    type: "text",
    content: "哇，这张照片拍得真好！",
    timestamp: Date.now() - 1700000,
    isMe: true,
  },
  {
    id: "m7",
    type: "voice",
    content: "",
    duration: 8,
    timestamp: Date.now() - 600000,
    isMe: false,
  },
  {
    id: "m8",
    type: "text",
    content: "好的，我明白了",
    timestamp: Date.now() - 300000,
    isMe: true,
  },
])

// 输入定时器
let typingTimer: number | null = null
// 自动回复定时器
let autoReplyTimer: number | null = null

// 获取页面参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const options = currentPage.$page?.options

  if (options) {
    chatInfo.value = {
      id: options.id || "",
      name: decodeURIComponent(options.name || ""),
      avatar: decodeURIComponent(options.avatar || ""),
      isOnline: true,
    }
  }

  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })

  // 模拟对方正在输入
  simulateTyping()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
  if (autoReplyTimer) {
    clearTimeout(autoReplyTimer)
  }
})

// 滚动到底部
const scrollToBottom = () => {
  if (messages.value.length > 0) {
    const lastMessage = messages.value[messages.value.length - 1]
    scrollToMessage.value = `message-${lastMessage.id}`
  }
}

// 模拟对方正在输入
const simulateTyping = () => {
  // 随机时间后显示正在输入
  const delay = Math.random() * 10000 + 5000 // 5-15秒
  autoReplyTimer = setTimeout(() => {
    if (!isTyping.value && messages.value.length > 0) {
      isTyping.value = true

      // 2-5秒后发送自动回复
      const replyDelay = Math.random() * 3000 + 2000
      setTimeout(() => {
        isTyping.value = false
        sendAutoReply()
      }, replyDelay)
    }
  }, delay) as unknown as number
}

// 发送自动回复
const sendAutoReply = () => {
  const autoReplies = ["哈哈，是的", "我也这么觉得", "好的", "👍", "😊", "确实不错", "谢谢分享"]

  const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)]

  const newMessage = {
    id: `m${Date.now()}`,
    type: "text",
    content: randomReply,
    timestamp: Date.now(),
    isMe: false,
  }

  messages.value.push(newMessage)

  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })

  // 继续模拟输入
  simulateTyping()
}

// 发送消息
const sendMessage = () => {
  if (!inputText.value.trim()) return

  const newMessage = {
    id: `m${Date.now()}`,
    type: "text",
    content: inputText.value,
    timestamp: Date.now(),
    isMe: true,
  }

  messages.value.push(newMessage)
  inputText.value = ""

  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })

  // 隐藏操作面板
  showActionsPanel.value = false
}

// 发送快捷回复
const sendQuickReply = (reply: string) => {
  inputText.value = reply
  sendMessage()
}

// 输入事件处理
const onInput = () => {
  // 显示正在输入状态
  if (!isTyping.value) {
    // 实际应用中，这里应该发送"正在输入"状态给服务器
  }

  // 清除之前的定时器
  if (typingTimer) {
    clearTimeout(typingTimer)
  }

  // 3秒后停止显示正在输入
  typingTimer = setTimeout(() => {
    // 实际应用中，这里应该发送"停止输入"状态给服务器
  }, 3000) as unknown as number
}

// 输入框获得焦点
const onInputFocus = () => {
  inputFocus.value = true
  showQuickReplies.value = true
}

// 输入框失去焦点
const onInputBlur = () => {
  inputFocus.value = false
  showQuickReplies.value = false
}

// 显示更多操作
const showMoreActions = () => {
  showActionsPanel.value = !showActionsPanel.value
}

// 选择图片
const selectImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album"],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      sendImageMessage(tempFilePath)
    },
  })
  showActionsPanel.value = false
}

// 拍照
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["camera"],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      sendImageMessage(tempFilePath)
    },
  })
  showActionsPanel.value = false
}

// 录制语音
const recordVoice = () => {
  uni.showToast({
    title: "语音功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 选择视频
const selectVideo = () => {
  uni.chooseVideo({
    sourceType: ["album"],
    maxDuration: 60,
    success: (res) => {
      sendVideoMessage(res.tempFilePath)
    },
  })
  showActionsPanel.value = false
}

// 发送位置
const sendLocation = () => {
  uni.showToast({
    title: "位置功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送联系人
const sendContact = () => {
  uni.showToast({
    title: "名片功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送表情
const sendEmoji = () => {
  uni.showToast({
    title: "表情功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送文件
const sendFile = () => {
  uni.showToast({
    title: "文件功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送图片消息
const sendImageMessage = (imagePath: string) => {
  const newMessage = {
    id: `m${Date.now()}`,
    type: "image",
    content: imagePath,
    timestamp: Date.now(),
    isMe: true,
  }

  messages.value.push(newMessage)

  nextTick(() => {
    scrollToBottom()
  })
}

// 发送视频消息
const sendVideoMessage = (videoPath: string) => {
  const newMessage = {
    id: `m${Date.now()}`,
    type: "video",
    content: videoPath,
    timestamp: Date.now(),
    isMe: true,
  }

  messages.value.push(newMessage)

  nextTick(() => {
    scrollToBottom()
  })
}

// 预览图片
const previewImage = (imagePath: string) => {
  uni.previewImage({
    urls: [imagePath],
    current: imagePath,
  })
}

// 拨打电话
const makeCall = () => {
  uni.showToast({
    title: "通话功能开发中",
    icon: "none",
  })
}

// 显示更多选项
const showMoreOptions = () => {
  uni.showActionSheet({
    itemList: ["设置", "清空聊天记录", "举报"],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          uni.showToast({ title: "设置功能开发中", icon: "none" })
          break
        case 1:
          uni.showModal({
            title: "确认清空",
            content: "确定要清空聊天记录吗？",
            success: (modalRes) => {
              if (modalRes.confirm) {
                messages.value = []
                uni.showToast({ title: "已清空", icon: "success" })
              }
            },
          })
          break
        case 2:
          uni.showToast({ title: "举报功能开发中", icon: "none" })
          break
      }
    },
  })
}

// 格式化时间
const formatTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 60000) {
    // 1分钟内
    return "刚刚"
  } else if (diff < 3600000) {
    // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    // 24小时内
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}
</script>
