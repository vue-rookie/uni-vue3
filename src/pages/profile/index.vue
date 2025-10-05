<template>
  <view class="min-h-screen bg-white">
    <!-- 背景图 -->
    <view class="relative">
      <view class="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></view>

      <!-- 顶部操作栏 -->
      <view class="pt-12 px-4 pb-4 flex justify-between items-center relative z-10">
        <view
          class="bg-black bg-opacity-30 rounded-full py-2 px-4 flex items-center"
          @click="navigateToAddFriends"
        >
          <text class="i-ri-user-add-line text-white text-lg mr-2"></text>
          <text class="text-white text-sm">添加朋友</text>
        </view>
        <view class="flex items-center space-x-3">
          <view class="bg-black bg-opacity-30 rounded-full py-2 px-4 flex items-center">
            <text class="i-ri-team-line text-white text-lg mr-2"></text>
            <text class="text-white text-sm">新访客 5</text>
          </view>
          <view
            class="w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center"
          >
            <text class="i-ri-search-line text-white text-xl"></text>
          </view>
          <view
            class="w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center"
          >
            <text class="i-ri-menu-line text-white text-xl"></text>
          </view>
        </view>
      </view>

      <!-- 用户信息 -->
      <view class="pb-8 relative z-10">
        <view class="px-4">
          <!-- 头像区域 -->
          <view class="flex mb-4">
            <view class="relative">
              <image
                src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg"
                class="w-24 h-24 rounded-full border-2 border-white"
                mode="aspectFill"
              ></image>
              <!-- 添加按钮 -->
              <view
                class="absolute right-0 bottom-0 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white"
              >
                <text class="i-ri-add-line text-white text-lg"></text>
              </view>
            </view>

            <!-- 用户名和抖音号 -->
            <view class="flex flex-col justify-center ml-4">
              <view class="flex items-center mb-1">
                <text class="text-white text-xl font-medium mr-1">庆倦了城市</text>
              </view>
              <view class="flex items-center">
                <text class="text-white text-sm opacity-80">抖音号：959321199</text>
                <text class="i-ri-file-copy-line text-white text-sm ml-1"></text>
              </view>
            </view>
          </view>

          <!-- 个人简介 -->
          <view class="mb-4 pl-1">
            <text class="text-white text-base">保持心底善良，可抵岁月漫长!</text>
          </view>

          <!-- 地区和年龄 -->
          <view class="flex items-center space-x-3 mb-6 pl-1">
            <view class="bg-black bg-opacity-10 rounded-sm px-2 py-0.5">
              <text class="text-white text-xs">北京·朝阳</text>
            </view>
            <view class="bg-black bg-opacity-10 rounded-sm px-2 py-0.5">
              <text class="text-white text-xs">男·32岁</text>
            </view>
          </view>
        </view>

        <!-- 统计数据和编辑按钮 -->
        <view class="bg-white rounded-t-xl pt-6 pb-4 -mb-8 w-full">
          <view class="flex items-center justify-between px-4">
            <!-- 统计数据 -->
            <view class="flex items-center space-x-6">
              <view class="text-center">
                <text class="text-black text-xl font-medium block">3116</text>
                <text class="text-gray-500 text-xs">获赞</text>
              </view>
              <view class="text-center">
                <text class="text-black text-xl font-medium block">67</text>
                <text class="text-gray-500 text-xs">互关</text>
              </view>
              <view class="text-center">
                <text class="text-black text-xl font-medium block">720</text>
                <text class="text-gray-500 text-xs">关注</text>
              </view>
              <view class="text-center">
                <text class="text-black text-xl font-medium block">196</text>
                <text class="text-gray-500 text-xs">粉丝</text>
              </view>
            </view>

            <!-- 编辑按钮 -->
            <view class="bg-gray-100 rounded-md py-2 px-4 flex items-center justify-center">
              <text class="text-gray-800 text-sm">编辑主页</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="flex justify-between items-center px-4 py-4 border-b border-gray-100">
      <view class="flex flex-col items-center">
        <text class="i-ri-shopping-cart-line text-gray-700 text-2xl mb-1"></text>
        <text class="text-xs text-gray-600">我的订单</text>
      </view>
      <view class="flex flex-col items-center">
        <text class="i-ri-time-line text-gray-700 text-2xl mb-1"></text>
        <text class="text-xs text-gray-600">观看历史</text>
      </view>
      <view class="flex flex-col items-center">
        <text class="i-ri-wallet-3-line text-gray-700 text-2xl mb-1"></text>
        <text class="text-xs text-gray-600">我的钱包</text>
      </view>
      <view class="flex flex-col items-center">
        <text class="i-ri-user-3-line text-gray-700 text-2xl mb-1"></text>
        <text class="text-xs text-gray-600">常访问的人</text>
      </view>
      <view class="flex flex-col items-center">
        <text class="i-ri-grid-line text-gray-700 text-2xl mb-1"></text>
        <text class="text-xs text-gray-600">全部功能</text>
      </view>
    </view>

    <!-- 内容标签页 -->
    <uve-tabs
      :items="tabItems"
      :custom-item-class="'flex-1'"
      :custom-line-class="'bg-gray-900 h-0.5'"
      :custom-content-class="'h-[calc(100vh-430px)]'"
      :custom-active-text-class="'font-bold text-gray-900'"
      :custom-inactive-text-class="'text-gray-500'"
      @change="handleTabChange"
    >
      <!-- 作品标签内容 -->
      <template #content-0>
        <scroll-view scroll-y class="h-full">
          <!-- 私密作品 -->
          <view
            class="p-3 border-b border-gray-100 flex items-center"
            @click="navigateToPrivateWorks"
          >
            <view class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
              <text class="i-ri-lock-line text-gray-500 text-xl"></text>
            </view>
            <view class="flex-1 ml-3">
              <text class="text-gray-800">私密作品</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-400 mr-1">26</text>
              <text class="i-ri-arrow-right-s-line text-gray-400 text-xl"></text>
            </view>
          </view>

          <!-- 草稿箱 -->
          <view class="p-3 border-b border-gray-100 flex items-center" @click="navigateToDrafts">
            <view class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
              <text class="i-ri-draft-line text-gray-500 text-xl"></text>
            </view>
            <view class="flex-1 ml-3">
              <text class="text-gray-800">草稿箱·12</text>
            </view>
            <view class="flex items-center">
              <text class="i-ri-arrow-right-s-line text-gray-400 text-xl"></text>
            </view>
          </view>

          <!-- 作品列表 -->
          <view class="grid grid-cols-3">
            <view
              v-for="(work, index) in works"
              :key="index"
              class="aspect-square relative"
              @click="openVideoDetail(work)"
            >
              <image :src="work.cover" class="w-full h-full object-cover" mode="aspectFill"></image>

              <!-- 视频信息 -->
              <view class="absolute bottom-2 left-2 flex items-center">
                <text class="i-ri-play-fill text-white text-sm mr-1"></text>
                <text class="text-white text-sm">{{ formatCount(work.views) }}</text>
              </view>

              <!-- AI标签 -->
              <view
                v-if="work.isAI"
                class="absolute top-2 left-2 bg-black bg-opacity-50 rounded px-1 py-0.5"
              >
                <text class="text-white text-xs">AI 已完成</text>
              </view>

              <!-- 地点标签 -->
              <view
                v-if="work.location"
                class="absolute bottom-2 right-2 bg-black bg-opacity-30 rounded px-1 py-0.5"
              >
                <text class="text-white text-xs">{{ work.location }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </template>

      <!-- 日常标签内容 -->
      <template #content-1>
        <scroll-view scroll-y class="h-full">
          <view class="flex items-center justify-center h-full">
            <text class="text-gray-400">暂无日常内容</text>
          </view>
        </scroll-view>
      </template>

      <!-- 推荐标签内容 -->
      <template #content-2>
        <scroll-view scroll-y class="h-full">
          <view class="flex items-center justify-center h-full">
            <text class="text-gray-400">暂无推荐内容</text>
          </view>
        </scroll-view>
      </template>

      <!-- 收藏标签内容 -->
      <template #content-3>
        <scroll-view scroll-y class="h-full">
          <view class="flex items-center justify-center h-full">
            <text class="text-gray-400">暂无收藏内容</text>
          </view>
        </scroll-view>
      </template>

      <!-- 喜欢标签内容 -->
      <template #content-4>
        <scroll-view scroll-y class="h-full">
          <view class="flex items-center justify-center h-full">
            <text class="text-gray-400">暂无喜欢内容</text>
          </view>
        </scroll-view>
      </template>
    </uve-tabs>
  </view>

  <!-- 自定义底部导航栏 -->
  <uve-tabbar :current="4" :tab-list="tabList" @change="handleTabbarChange" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import UveTabbar from "@/components/uve-tabbar/index.vue"
import { defaultTabList, type TabItem } from "@/config/tabbar.config"

// 底部导航栏数据
const tabList = ref<TabItem[]>(defaultTabList)

// 标签页数据
const tabItems = ref([
  { name: "作品 ▼" },
  { name: "日常" },
  { name: "推荐" },
  { name: "收藏" },
  { name: "喜欢" },
])

// 作品数据
const works = ref([
  {
    id: 1,
    cover: "https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg",
    views: 10000,
    isAI: true,
    location: "",
  },
  {
    id: 2,
    cover: "https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_1280.jpg",
    views: 1999,
    isAI: false,
    location: "",
  },
  {
    id: 3,
    cover: "https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg",
    views: 0,
    isAI: false,
    location: "太原的晚高峰有多堵",
  },
])

// 处理标签页切换
const handleTabChange = (index: number) => {
  console.log("当前标签页:", index)
}

// 导航到私密作品
const navigateToPrivateWorks = () => {
  uni.navigateTo({
    url: "/pages-sub/private-works/index",
  })
}

// 导航到草稿箱
const navigateToDrafts = () => {
  uni.navigateTo({
    url: "/pages-sub/drafts/index",
  })
}

// 打开视频详情
const openVideoDetail = (work: any) => {
  uni.navigateTo({
    url: `/pages-sub/video-detail/index?id=${work.id}`,
  })
}

// 格式化数字
const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 10000) return (count / 1000).toFixed(1) + "k"
  return (count / 10000).toFixed(1) + "w"
}

// 处理底部导航栏切换
const handleTabbarChange = (index: number, item: any) => {
  console.log("切换到:", item.text, item.path)
}

// 跳转到添加朋友页面
const navigateToAddFriends = () => {
  uni.navigateTo({
    url: "/pages-sub/add-friends/index",
  })
}
</script>
