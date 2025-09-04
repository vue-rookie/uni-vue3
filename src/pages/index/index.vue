<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 常见页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">基础组件</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/button-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-cursor-line"></text>
            </view>
            <text>uve-button按钮</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/border-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-layout-line"></text>
            </view>
            <text>uve-border边框</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 表单组件 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">表单组件</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/form-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-file-list-line"></text>
            </view>
            <text>uve-form表单</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/checkbox-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-checkbox-multiple-line"></text>
            </view>
            <text>uve-checkbox复选框</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/radio-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-radio-button-line"></text>
            </view>
            <text>uve-radio单选框</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/input-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-edit-line"></text>
            </view>
            <text>uve-input输入框</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/picker-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-list-check"></text>
            </view>
            <text>uve-picker选择器</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据展示 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">数据展示</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/ai-chat-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-chat-1-line"></text>
            </view>
            <text>uve-ai-chat聊天</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/swiper-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-slideshow-line"></text>
            </view>
            <text>uve-swiper轮播</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 反馈 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">反馈组件</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/popup-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-window-line"></text>
            </view>
            <text>uve-popup弹窗</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 导航 -->
    <view class="mt-3 mb-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">导航组件</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/navbar-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-menu-line"></text>
            </view>
            <text>uve-navbar导航栏</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/tabs-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-function-line"></text>
            </view>
            <text>uve-tabs标签</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 底部提示 -->
  <view class="mt-6 mb-10 px-4 text-center pb-4">
    <view class="text-sm text-gray-500">更多组件实现中......，欢迎您提建议和issues</view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "组件示例",
  })
})

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}

const openURL = (url: string) => {
  // 在条件编译中打开URL
  // #ifdef H5
  window.open(url)
  // #endif

  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif

  // #ifdef MP
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({
        title: "链接已复制",
        icon: "none",
      })
    },
  })
  // #endif
}
</script>
