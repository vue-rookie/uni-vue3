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
              <text class="i-ri-login-box-line"></text>
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
              <text class="i-ri-user-line"></text>
            </view>
            <text>uve-border边框</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 列表页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">form表单</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/picker-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-newspaper-line"></text>
            </view>
            <text>uve-picker选择器</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 详情页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">data数据</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/article/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-article-line"></text>
            </view>
            <text>uve-article文章</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 反馈 -->
    <view class="mt-3 mb-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">反馈组件</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/message-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-map-pin-line"></text>
            </view>
            <text>uve-message</text>
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
          @click="navigateTo('/pages-sub/tabs-demo/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-map-pin-line"></text>
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
</template>

<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "页面示例",
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
</script>
