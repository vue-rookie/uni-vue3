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
      class="h-[calc(100vh-120px)] px-4 py-4"
      :scroll-into-view="scrollToMessage"
      :scroll-with-animation="true"
      :style="{ paddingBottom: 'env(safe-area-inset-bottom)' }"
    >
      <!-- 系统消息 -->
      <view v-if="systemMessage" class="flex justify-center my-4">
        <view class="bg-black bg-opacity-20 rounded-full px-4 py-1">
          <text class="text-white text-xs">{{ systemMessage }}</text>
        </view>
      </view>

      <!-- 消息项 -->
      <view
        v-for="message in messages"
        :key="message.id"
        :id="`message-${message.id}`"
        class="mb-5"
        :class="{ 'flex justify-end': message.isMe, 'flex justify-start': !message.isMe }"
      >
        <view class="flex max-w-[70%]" :class="{ 'flex-row-reverse': message.isMe }">
          <!-- 头像 -->
          <image
            :src="message.isMe ? currentUser.avatar : chatInfo.avatar"
            class="w-10 h-10 rounded-full mx-2 flex-shrink-0"
            mode="aspectFill"
          ></image>

          <!-- 消息内容 -->
          <view class="flex flex-col">
            <!-- 消息气泡 -->
            <view
              class="px-4 py-2 rounded-lg"
              :class="{
                'bg-blue-500 text-white': message.isMe,
                'bg-white text-gray-800 border border-gray-100': !message.isMe,
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
                <text class="text-sm">{{ (message as any).duration }}''</text>
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
    </scroll-view>

    <!-- 输入框区域 -->
    <view
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3"
      :class="{ 'z-10': showActionsPanel }"
    >
      <!-- 快捷回复 -->
      <view v-if="showQuickReplies" class="mb-3 px-2">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="inline-flex space-x-2">
            <view
              v-for="(reply, index) in quickRepliesOptions"
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
      <view class="flex items-center px-2">
        <!-- 语音/文字切换按钮 -->
        <view class="mr-2 flex items-center">
          <text class="i-ri-mic-line text-gray-600 text-xl"></text>
        </view>

        <!-- 文本输入框 -->
        <view class="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center">
          <input
            v-model="inputText"
            class="flex-1 text-sm"
            placeholder="发送消息..."
            :focus="inputFocus"
            confirm-type="send"
            @confirm="sendMessage"
            @input="onInput"
            @focus="onInputFocus"
            @blur="onInputBlur"
          />
        </view>

        <!-- 表情按钮 -->
        <view class="ml-2 flex items-center">
          <text class="i-ri-emotion-line text-gray-600 text-xl" @click="sendEmoji"></text>
        </view>

        <!-- 更多功能按钮 -->
        <view class="ml-2 flex items-center">
          <text class="i-ri-add-circle-line text-gray-600 text-xl" @click="showMoreActions"></text>
        </view>

        <!-- 发送按钮 -->
        <view
          v-if="inputText.trim()"
          class="ml-2 px-3 py-1 bg-blue-500 rounded-full flex items-center justify-center"
          @click="sendMessage"
        >
          <text class="text-white text-sm">发送</text>
        </view>
      </view>
    </view>

    <!-- 更多操作面板 -->
    <view
      v-if="showActionsPanel"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20"
      style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
      @click.stop
    >
      <!-- 第一行功能按钮 -->
      <view class="grid grid-cols-4 gap-6 mb-6">
        <view class="flex flex-col items-center" @click="selectImage">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-image-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">相册</text>
        </view>

        <view class="flex flex-col items-center" @click="takePhoto">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-camera-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">拍摄</text>
        </view>

        <view class="flex flex-col items-center" @click="startVideoCall">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-vidicon-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">视频通话</text>
        </view>

        <view class="flex flex-col items-center" @click="watchTogether">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-tv-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">一起看</text>
        </view>
      </view>

      <!-- 第二行功能按钮 -->
      <view class="grid grid-cols-4 gap-6">
        <view class="flex flex-col items-center" @click="sendRedPacket">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-red-packet-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">红包</text>
        </view>

        <view class="flex flex-col items-center" @click="sendLocation">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-map-pin-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">位置</text>
        </view>

        <view class="flex flex-col items-center" @click="sendTransfer">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-exchange-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">转账</text>
        </view>

        <view class="flex flex-col items-center" @click="sendContact">
          <view class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
            <text class="i-ri-user-line text-gray-600 text-2xl"></text>
          </view>
          <text class="text-xs text-gray-600">个人名片</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue"

// 聊天信息
const chatInfo = ref({
  id: "spring_autumn",
  name: "春秋",
  avatar: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
  isOnline: true,
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
// 是否显示快捷回复
const showQuickReplies = ref(false)
// 是否显示更多操作面板
const showActionsPanel = ref(false)
// 滚动到消息ID
const scrollToMessage = ref("")
// 系统消息
const systemMessage = ref("回复或关注对方之前，对方只能发送一条消息")
// 快捷回复选项
const quickRepliesOptions = ref([
  "好的",
  "收到",
  "谢谢",
  "哈哈",
  "👍",
  "😊",
  "好的，没问题",
  "稍等",
])

// 聊天消息列表
const messages = ref([
  {
    id: "m1",
    type: "text",
    content:
      "??厉害了城市道友你好，问遵，手油0.01折版，上线1000个648，改10套，神兽齐天大圣，打怪掉所有，集市珍宝全开，可搬砖，扣qun: 761728024",
    timestamp: Date.now() - 3600000,
    isMe: false,
  },
])

// 输入定时器
let typingTimer: number | null = null

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
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
})

// 滚动到底部
const scrollToBottom = () => {
  if (messages.value.length > 0) {
    const lastMessage = messages.value[messages.value.length - 1]
    scrollToMessage.value = `message-${lastMessage.id}`
  }
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
  // 清除之前的定时器
  if (typingTimer) {
    clearTimeout(typingTimer)
  }

  // 实际应用中，这里可以添加输入状态处理逻辑
  typingTimer = setTimeout(() => {
    // 输入状态处理
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
    title: "个人名片功能开发中",
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

// 开始视频通话
const startVideoCall = () => {
  uni.showToast({
    title: "视频通话功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 一起看功能
const watchTogether = () => {
  uni.showToast({
    title: "一起看功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送红包
const sendRedPacket = () => {
  uni.showToast({
    title: "红包功能开发中",
    icon: "none",
  })
  showActionsPanel.value = false
}

// 发送转账
const sendTransfer = () => {
  uni.showToast({
    title: "转账功能开发中",
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
