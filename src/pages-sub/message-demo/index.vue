<template>
  <view class="page-container bg-white min-h-screen p-4">
    <view class="text-xl font-bold mb-6">uve-message 消息提示</view>

    <view class="text-sm text-gray-500 mb-4">
      消息提示组件，用于向用户显示通知、提示或操作反馈。
    </view>

    <view class="space-y-4">
      <!-- 基础用法 -->
      <view class="space-y-2">
        <text class="text-lg font-bold">基础用法</text>
        <view class="flex flex-wrap gap-2">
          <button class="btn-primary" @tap="showBasicMessage">显示消息</button>
          <button class="btn-success" @tap="showSuccessMessage">成功消息</button>
          <button class="btn-warning" @tap="showWarningMessage">警告消息</button>
          <button class="btn-danger" @tap="showErrorMessage">错误消息</button>
          <button class="btn-info" @tap="showInfoMessage">信息消息</button>
        </view>
      </view>

      <!-- 自定义时长 -->
      <view class="space-y-2">
        <text class="text-lg font-bold">自定义时长</text>
        <view class="flex flex-wrap gap-2">
          <button class="btn-primary" @tap="showShortMessage">短时间(1秒)</button>
          <button class="btn-primary" @tap="showLongMessage">长时间(5秒)</button>
        </view>
      </view>

      <!-- 不同位置 -->
      <view class="space-y-2">
        <text class="text-lg font-bold">不同位置</text>
        <view class="flex flex-wrap gap-2">
          <button class="btn-primary" @tap="showTopMessage">顶部显示</button>
          <button class="btn-primary" @tap="showCenterMessage">中间显示</button>
          <button class="btn-primary" @tap="showBottomMessage">底部显示</button>
        </view>
      </view>

      <!-- 可关闭 -->
      <view class="space-y-2">
        <text class="text-lg font-bold">可关闭</text>
        <view class="flex flex-wrap gap-2">
          <button class="btn-primary" @tap="showClosableMessage">显示可关闭消息</button>
        </view>
      </view>
    </view>

    <!-- 消息内容预览 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">消息预览</view>
      <view class="bg-gray-50 p-4 rounded-lg space-y-3">
        <view class="bg-primary text-white px-4 py-3 rounded flex items-center">
          <text class="i-ri-information-line mr-2"></text>
          <text>这是一条普通消息提示</text>
        </view>

        <view class="bg-success text-white px-4 py-3 rounded flex items-center">
          <text class="i-ri-checkbox-circle-line mr-2"></text>
          <text>操作成功提示消息</text>
        </view>

        <view class="bg-warning text-white px-4 py-3 rounded flex items-center">
          <text class="i-ri-alert-line mr-2"></text>
          <text>警告提示消息</text>
        </view>

        <view class="bg-danger text-white px-4 py-3 rounded flex items-center">
          <text class="i-ri-close-circle-line mr-2"></text>
          <text>错误提示消息</text>
        </view>

        <view class="bg-info text-white px-4 py-3 rounded flex items-center">
          <text class="i-ri-information-line mr-2"></text>
          <text>信息提示消息</text>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        以上为不同类型消息的样式预览
      </view>
    </view>
  </view>
</template>

<script setup>
import { Message } from "@/components/uve-message/message"

// 基础消息
const showBasicMessage = () => {
  Message.show("这是一条基础消息")
}

// 成功消息
const showSuccessMessage = () => {
  Message.success("操作成功")
}

// 警告消息
const showWarningMessage = () => {
  Message.warning("请注意")
}

// 错误消息
const showErrorMessage = () => {
  Message.error("操作失败")
}

// 信息消息
const showInfoMessage = () => {
  Message.info("这是一条提示信息")
}

// 短时间消息
const showShortMessage = () => {
  Message.show({
    message: "这条消息将在1秒后消失",
    duration: 1000,
  })
}

// 长时间消息
const showLongMessage = () => {
  Message.show({
    message: "这条消息将在5秒后消失",
    duration: 5000,
  })
}

// 顶部消息
const showTopMessage = () => {
  Message.show({
    message: "顶部消息",
    position: "top",
  })
}

// 中间消息
const showCenterMessage = () => {
  Message.show({
    message: "中间消息",
    position: "center",
  })
}

// 底部消息
const showBottomMessage = () => {
  Message.show({
    message: "底部消息",
    position: "bottom",
  })
}

// 可关闭消息
const showClosableMessage = () => {
  Message.show({
    message: "这是一条可关闭的消息",
    closable: true,
  })
}
</script>
