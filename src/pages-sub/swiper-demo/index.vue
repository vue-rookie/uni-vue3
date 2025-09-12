<template>
  <view class="page-container min-h-screen bg-gray-50 demo-section">
    <view class="p-4">
      <view class="text-xl font-bold mb-6">uve-swiper 轮播组件</view>
      <view class="text-sm text-gray-500 mb-4">
        轮播组件，用于展示多张图片或内容，支持自动播放、循环播放、指示器等功能。
      </view>

      <view class="space-y-6">
        <!-- 基础轮播 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">基础轮播</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper :items="baseItems" height="180px" @change="onChange" @click="onItemClick" />
          </view>
        </view>

        <!-- 卡片模式 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">卡片模式</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper
              :items="cardItems"
              height="200px"
              mode="card"
              @change="onChange"
              @click="onItemClick"
            />
          </view>
        </view>

        <!-- 堆叠模式 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">堆叠模式</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper
              :items="stackItems"
              height="200px"
              mode="stack"
              @change="onChange"
              @click="onItemClick"
            />
          </view>
        </view>

        <!-- 自定义指示器 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">自定义指示器</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper
              :items="customItems"
              height="180px"
              indicator-position="bottom-right"
              indicator-style="circle"
              indicator-color="#ffffff"
              indicator-active-color="var(--primary-color)"
              @change="onChange"
              @click="onItemClick"
            />
          </view>
        </view>

        <!-- 图片标题 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">图片标题</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper
              :items="titleItems"
              height="200px"
              :show-title="true"
              title-position="bottom"
              @change="onChange"
              @click="onItemClick"
            />
          </view>
        </view>

        <!-- 垂直轮播 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">垂直轮播</view>
          <view class="rounded-lg overflow-hidden">
            <uve-swiper
              :items="verticalItems"
              height="220px"
              direction="vertical"
              @change="onChange"
              @click="onItemClick"
            />
          </view>
        </view>

        <!-- 高级配置 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">高级配置</view>
          <view class="rounded-lg overflow-hidden mb-4">
            <uve-swiper
              :items="configItems"
              height="180px"
              :autoplay="autoplay"
              :circular="circular"
              :indicator-dots="indicatorDots"
              @change="onChange"
              @click="onItemClick"
            />
          </view>

          <view class="flex flex-wrap justify-between mt-3">
            <view class="flex items-center mb-2 mr-4">
              <text class="mr-2">自动播放</text>
              <uve-button
                class="px-4 py-2 bg-primary text-white rounded ml-2"
                @tap="autoplay = !autoplay"
              >
                {{ autoplay ? "停止自动播放" : "开始自动播放" }}
              </uve-button>
            </view>
            <view class="flex items-center mb-2 mr-4">
              <text class="mr-2">循环播放</text>
              <uve-button
                class="px-4 py-2 bg-primary text-white rounded ml-2"
                @tap="circular = !circular"
              >
                {{ circular ? "停止循环播放" : "开始循环播放" }}
              </uve-button>
            </view>
            <view class="flex items-center mb-2">
              <text class="mr-2">指示器</text>
              <uve-button
                class="px-4 py-2 bg-primary text-white rounded ml-2"
                @tap="indicatorDots = !indicatorDots"
              >
                {{ indicatorDots ? "隐藏指示器" : "显示指示器" }}
              </uve-button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"

// 基础轮播数据
const baseItems = [
  {
    image: "https://picsum.photos/id/1018/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1015/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1019/800/400",
    url: "/pages/index/index",
  },
]

// 卡片模式数据
const cardItems = [
  {
    image: "https://picsum.photos/id/1005/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1011/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1025/800/400",
    url: "/pages/index/index",
  },
]

// 堆叠模式数据
const stackItems = [
  {
    image: "https://picsum.photos/id/1039/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1043/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1051/800/400",
    url: "/pages/index/index",
  },
]

// 自定义指示器数据
const customItems = [
  {
    image: "https://picsum.photos/id/1059/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1060/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1069/800/400",
    url: "/pages/index/index",
  },
]

// 图片标题数据
const titleItems = [
  {
    image: "https://picsum.photos/id/1074/800/400",
    title: "美丽的山脉风景",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1080/800/400",
    title: "宁静的湖泊",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1068/800/400",
    title: "城市的夜景",
    url: "/pages/index/index",
  },
]

// 垂直轮播数据
const verticalItems = [
  {
    image: "https://picsum.photos/id/1015/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1039/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1043/800/400",
    url: "/pages/index/index",
  },
]

// 高级配置数据
const configItems = [
  {
    image: "https://picsum.photos/id/1083/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1037/800/400",
    url: "/pages/index/index",
  },
  {
    image: "https://picsum.photos/id/1041/800/400",
    url: "/pages/index/index",
  },
]

// 轮播配置
const autoplay = ref(true)
const circular = ref(true)
const indicatorDots = ref(true)

// 轮播切换事件
const onChange = (e) => {
  console.log("轮播切换", e)
}

// 轮播项点击事件
const onItemClick = (item) => {
  console.log("点击轮播项", item)
  uni.showToast({
    title: "点击了轮播项",
    icon: "none",
  })
}
</script>

<style>
.page-container {
  padding-bottom: 50px;
}
</style>
