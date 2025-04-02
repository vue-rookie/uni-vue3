<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 顶部导航 -->
    <view class="bg-white px-4 py-3 text-center text-lg font-medium border-b border-gray-100">
      系统设置
    </view>

    <!-- 账号设置 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">账号设置</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/security/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-shield-line"></text>
            </view>
            <text>账号安全</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/privacy/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-lock-line"></text>
            </view>
            <text>隐私设置</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 通知设置 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">通知设置</view>
      <view class="divide-y divide-gray-100">
        <view class="flex items-center justify-between px-4 py-3">
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-notification-line"></text>
            </view>
            <text>消息通知</text>
          </view>
          <switch :checked="messageNotify" @change="handleMessageNotifyChange" />
        </view>
        <view class="flex items-center justify-between px-4 py-3">
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-mail-line"></text>
            </view>
            <text>邮件通知</text>
          </view>
          <switch :checked="emailNotify" @change="handleEmailNotifyChange" />
        </view>
      </view>
    </view>

    <!-- 通用设置 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">通用设置</view>
      <view class="divide-y divide-gray-100">
        <view class="flex items-center justify-between px-4 py-3">
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-translate"></text>
            </view>
            <text>语言设置</text>
          </view>
          <view class="flex items-center">
            <text class="text-sm text-gray-500 mr-2">简体中文</text>
            <text class="i-ri-arrow-right-s-line text-gray-400"></text>
          </view>
        </view>
        <view class="flex items-center justify-between px-4 py-3">
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-moon-line"></text>
            </view>
            <text>深色模式</text>
          </view>
          <switch :checked="darkMode" @change="handleDarkModeChange" />
        </view>
      </view>
    </view>

    <!-- 其他设置 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">其他设置</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="handleClearCache"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-delete-bin-line"></text>
            </view>
            <text>清除缓存</text>
          </view>
          <view class="text-gray-400">
            <text class="text-sm">12.5MB</text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/about/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-information-line"></text>
            </view>
            <text>关于我们</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="mt-3 mb-3 px-4">
      <button
        @click="handleLogout"
        class="w-full py-2 bg-white text-red-500 rounded-md active:bg-gray-50"
      >
        退出登录
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const messageNotify = ref(true)
const emailNotify = ref(false)
const darkMode = ref(false)

const handleMessageNotifyChange = (e: any) => {
  messageNotify.value = e.detail.value
  uni.showToast({
    title: messageNotify.value ? "已开启消息通知" : "已关闭消息通知",
    icon: "none",
  })
}

const handleEmailNotifyChange = (e: any) => {
  emailNotify.value = e.detail.value
  uni.showToast({
    title: emailNotify.value ? "已开启邮件通知" : "已关闭邮件通知",
    icon: "none",
  })
}

const handleDarkModeChange = (e: any) => {
  darkMode.value = e.detail.value
  uni.showToast({
    title: darkMode.value ? "已开启深色模式" : "已关闭深色模式",
    icon: "none",
  })
}

const handleClearCache = () => {
  uni.showModal({
    title: "提示",
    content: "确定要清除缓存吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: "清除中...",
        })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: "清除成功",
            icon: "success",
          })
        }, 1500)
      }
    },
  })
}

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "退出成功",
          icon: "success",
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    },
  })
}
</script>
