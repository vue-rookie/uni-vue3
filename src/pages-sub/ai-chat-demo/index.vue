<template>
  <view class="ai-chat-demo">
    <view class="chat-wrapper">
      <uve-ai-chat
        ref="aiChatRef"
        @send="handleSendMessage"
        @receive="handleReceiveMessage"
        :aiAvatar="'/static/log.jpg'"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

// 获取聊天组件引用
const aiChatRef = ref()

// 处理发送消息
const handleSendMessage = (message: string) => {
  console.log("用户发送消息:", message)
  // 这里可以添加实际的API调用逻辑
}

// 处理接收消息
const handleReceiveMessage = (message: string) => {
  console.log("AI回复消息:", message)
}

// 示例：如何从外部添加消息
const addExternalMessage = () => {
  // 添加一条用户消息
  aiChatRef.value.addMessage("user", "这是从外部添加的用户消息")

  // 模拟延迟后添加AI回复
  setTimeout(() => {
    aiChatRef.value.addMessage("ai", "这是从外部添加的AI回复消息")
  }, 1000)
}

// 组件挂载后的操作
onMounted(() => {
  // 这里可以进行初始化操作
  // 例如：加载历史消息等
})
</script>

<style lang="scss" scoped>
.ai-chat-demo {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  .chat-wrapper {
    flex: 1;
    overflow: hidden;
  }
}
</style>
