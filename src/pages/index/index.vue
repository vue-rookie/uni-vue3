<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 组件列表，使用配置化方式渲染 -->
    <view v-for="(category, index) in componentCategories" :key="index" class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">{{ category.title }}</view>
      <view class="divide-y divide-gray-100">
        <view
          v-for="(item, itemIndex) in category.items"
          :key="itemIndex"
          @click="navigateTo(item.path)"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text :class="item.icon"></text>
            </view>
            <text>{{ item.name }}</text>
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
import { onMounted, ref } from "vue"

// 组件分类配置
const componentCategories = ref([
  {
    title: "基础组件",
    items: [
      { name: "uve-button按钮", path: "/pages-sub/button-demo/index", icon: "i-ri-cursor-line" },
      { name: "uve-border边框", path: "/pages-sub/border-demo/index", icon: "i-ri-layout-line" },
      { name: "uve-card卡片", path: "/pages-sub/card-demo/index", icon: "i-ri-id-card-fill" },
    ],
  },
  {
    title: "表单组件",
    items: [
      { name: "uve-form表单", path: "/pages-sub/form-demo/index", icon: "i-ri-file-list-line" },
      {
        name: "uve-checkbox复选框",
        path: "/pages-sub/checkbox-demo/index",
        icon: "i-ri-checkbox-multiple-line",
      },
      {
        name: "uve-radio单选框",
        path: "/pages-sub/radio-demo/index",
        icon: "i-ri-radio-button-line",
      },
      { name: "uve-input输入框", path: "/pages-sub/input-demo/index", icon: "i-ri-edit-line" },
      { name: "uve-picker选择器", path: "/pages-sub/picker-demo/index", icon: "i-ri-list-check" },
    ],
  },
  {
    title: "数据展示",
    items: [
      { name: "uve-ai-chat聊天", path: "/pages-sub/ai-chat-demo/index", icon: "i-ri-chat-1-line" },
      { name: "uve-swiper轮播", path: "/pages-sub/swiper-demo/index", icon: "i-ri-slideshow-line" },
      { name: "uve-steps步骤条", path: "/pages-sub/steps-demo/index", icon: "i-ri-list-ordered" },
    ],
  },
  {
    title: "反馈组件",
    items: [
      { name: "uve-popup弹窗", path: "/pages-sub/popup-demo/index", icon: "i-ri-window-line" },
    ],
  },
  {
    title: "导航组件",
    items: [
      { name: "uve-navbar导航栏", path: "/pages-sub/navbar-demo/index", icon: "i-ri-menu-line" },
      { name: "uve-tabs标签", path: "/pages-sub/tabs-demo/index", icon: "i-ri-function-line" },
    ],
  },
])

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
