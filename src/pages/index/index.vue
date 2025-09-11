<template>
  <view class="min-h-screen bg-gray-50 pb-24">
    <!-- 搜索框 -->
    <view class="flex justify-center px-4">
      <view
        class="relative w-full max-w-sm h-10 bg-gray-100 rounded-2xl flex items-center px-5 shadow-inner"
      >
        <text class="i-ri-search-line text-gray-500 text-lg mr-3"></text>
        <input
          type="text"
          placeholder="输入您想用的工具"
          class="flex-1 border-none bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </view>
    </view>

    <!-- 为你推荐 -->
    <view class="bg-white px-6 py-6 mt-2 shadow-sm">
      <view class="flex items-center justify-between mb-6">
        <text class="text-2xl font-bold text-gray-900">为你推荐</text>
        <text class="i-ri-arrow-right-s-line text-gray-400 text-xl"></text>
      </view>

      <scroll-view class="w-full whitespace-nowrap" scroll-x="true" show-scrollbar="false">
        <view class="flex gap-4">
          <view
            v-for="(app, index) in recommendedApps"
            :key="index"
            class="inline-block w-80 flex-shrink-0"
          >
            <view
              class="flex items-center bg-white rounded-2xl p-5 border border-gray-300 hover:border-gray-400 transition-colors duration-200"
            >
              <view class="relative mr-5">
                <view
                  class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm"
                  :class="app.bgColor"
                >
                  <text class="text-3xl">{{ app.image }}</text>
                </view>
              </view>
              <view class="flex-1">
                <text class="block text-base font-bold text-gray-900 mb-1">{{ app.title }}</text>
                <text class="block text-sm text-gray-600 mb-4 leading-relaxed">
                  {{ app.description }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 浏览分类 -->
    <view class="bg-white px-6 py-6 mt-2 shadow-sm">
      <view class="flex items-center justify-between mb-6">
        <text class="text-2xl font-bold text-gray-900">浏览</text>
        <text class="i-ri-arrow-right-s-line text-gray-400 text-xl"></text>
      </view>

      <view class="grid grid-cols-2 gap-4">
        <view v-for="(category, index) in categories" :key="index" class="h-32">
          <view
            :class="[
              'w-full h-full rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200',
              category.bgClass,
            ]"
          >
            <view class="mb-3">
              <view
                class="w-16 h-16 bg-opacity-20 flex items-center justify-center backdrop-blur-sm"
              >
                <text class="text-2xl">{{ category.iconImage }}</text>
              </view>
            </view>
            <text class="text-white text-lg font-bold text-center drop-shadow-sm">
              {{ category.title }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view
      class="fixed bottom-0 left-0 right-0 h-20 bg-white flex items-center justify-around border-t border-gray-200 shadow-lg pb-safe"
    >
      <view class="flex flex-col items-center flex-1">
        <view class="w-8 h-8 mb-1 bg-gray-400 rounded-lg flex items-center justify-center">
          <text class="i-ri-calendar-line text-white text-sm"></text>
        </view>
        <text class="text-xs text-gray-500">Today</text>
      </view>
      <view class="flex flex-col items-center flex-1">
        <view class="w-8 h-8 mb-1 bg-gray-400 rounded-lg flex items-center justify-center">
          <text class="i-ri-gamepad-line text-white text-sm"></text>
        </view>
        <text class="text-xs text-gray-500">游戏</text>
      </view>
      <view class="flex flex-col items-center flex-1">
        <view class="w-8 h-8 mb-1 bg-gray-400 rounded-lg flex items-center justify-center">
          <text class="i-ri-apps-line text-white text-sm"></text>
        </view>
        <text class="text-xs text-gray-500">App</text>
      </view>
      <view class="flex flex-col items-center flex-1">
        <view
          class="w-8 h-8 mb-1 bg-blue-500 rounded-lg flex items-center justify-center shadow-md"
        >
          <text class="i-ri-search-line text-white text-sm"></text>
        </view>
        <text class="text-xs text-blue-500 font-bold">搜索</text>
      </view>
      <view class="flex flex-col items-center flex-1">
        <view class="w-8 h-8 mb-1 bg-gray-400 rounded-lg flex items-center justify-center">
          <text class="i-ri-user-line text-white text-sm"></text>
        </view>
        <text class="text-xs text-gray-500"></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"

// 推荐应用数据
const recommendedApps = ref([
  {
    image: "▶️",
    title: "红果短剧 - 海量热门短...",
    description: "海量高清短剧视频内容，追剧必...",
    isAd: true,
    bgColor: "bg-gradient-to-br from-orange-400 to-orange-500",
  },
  {
    image: "📷",
    title: "ProCCD - 复古CCD相机滤镜",
    description: "模拟 ccd 相机和胶片滤镜，怀旧...",
    isAd: false,
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    image: "🐕",
    title: "楼下的早餐店:美食烹饪游戏",
    description: "经营中华美食餐厅，模拟餐厅大...",
    isAd: false,
    bgColor: "bg-gradient-to-br from-yellow-200 to-yellow-300",
  },
])

// 工具分类数据
const categories = ref([
  {
    title: "App 排行",
    bgClass: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    iconImage: "📊",
  },
  {
    title: "游戏排行",
    bgClass: "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700",
    iconImage: "🎮",
  },
  {
    title: "社交",
    bgClass: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    iconImage: "💬",
  },
  {
    title: "摄影与录像",
    bgClass: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700",
    iconImage: "📷",
  },
  {
    title: "娱乐",
    bgClass: "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
    iconImage: "🎭",
  },
  {
    title: "工具",
    bgClass: "bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700",
    iconImage: "🔧",
  },
])
</script>
