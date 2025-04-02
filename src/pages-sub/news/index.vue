<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 顶部导航 -->
    <view class="bg-white px-4 py-3 text-center text-lg font-medium border-b border-gray-100">
      新闻列表
    </view>

    <!-- 分类标签 -->
    <view class="bg-white px-4 py-2">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view
          v-for="(item, index) in categories"
          :key="index"
          @click="selectCategory(index)"
          class="inline-block mr-4"
        >
          <text
            class="text-sm py-1"
            :class="
              currentCategory === index
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            "
          >
            {{ item }}
          </text>
        </view>
      </scroll-view>
    </view>

    <!-- 新闻列表 -->
    <scroll-view
      scroll-y
      class="flex-1"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      :refresher-threshold="80"
    >
      <view class="mt-3 bg-white">
        <view class="divide-y divide-gray-100">
          <view
            v-for="(item, index) in newsList"
            :key="index"
            @click="navigateTo('/pages-sub/article/index')"
            class="px-4 py-3 active:bg-gray-50"
          >
            <view class="flex">
              <view class="flex-1">
                <view class="text-base font-medium line-clamp-2">{{ item.title }}</view>
                <view class="flex items-center mt-2">
                  <view class="flex items-center">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-user-line text-xs"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.author }}</text>
                  </view>
                  <view class="flex items-center ml-4">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-time-line text-xs"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.time }}</text>
                  </view>
                  <view class="flex items-center ml-4">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-eye-line text-xs"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.views }}</text>
                  </view>
                </view>
              </view>
              <image
                v-if="item.image"
                :src="item.image"
                mode="aspectFill"
                class="w-20 h-20 rounded ml-3"
              />
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="py-3 text-center">
        <view v-if="isLoading" class="flex items-center justify-center">
          <view class="w-4 h-4 mr-2 animate-spin">
            <text class="i-ri-loader-4-line"></text>
          </view>
          <text class="text-sm text-gray-500">加载中...</text>
        </view>
        <text v-else-if="!hasMore" class="text-sm text-gray-500">没有更多内容了</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const categories = ["全部", "热点", "科技", "财经", "体育", "娱乐", "军事"]
const currentCategory = ref(0)

const newsList = ref([
  {
    title: "2024年全球科技创新大会在京召开，聚焦人工智能与可持续发展",
    author: "科技日报",
    time: "10分钟前",
    views: "1.2万",
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    title: "央行发布最新货币政策报告，强调稳健货币政策取向不变",
    author: "财经网",
    time: "30分钟前",
    views: "2.5万",
    image: "https://picsum.photos/200/200?random=2",
  },
  {
    title: "中国女足晋级世界杯八强，创造历史最佳战绩",
    author: "体育周刊",
    time: "1小时前",
    views: "5.8万",
    image: "https://picsum.photos/200/200?random=3",
  },
  {
    title: "新一代国产操作系统发布，性能提升显著",
    author: "IT之家",
    time: "2小时前",
    views: "3.4万",
    image: "https://picsum.photos/200/200?random=4",
  },
  {
    title: "全国多地迎来强降雨，气象部门发布预警",
    author: "中国天气",
    time: "3小时前",
    views: "1.9万",
    image: "https://picsum.photos/200/200?random=5",
  },
])

const hasMore = ref(true)
const isLoading = ref(false)
const isRefreshing = ref(false)

const selectCategory = (index: number) => {
  currentCategory.value = index
  loadNews()
}

const loadNews = () => {
  isLoading.value = true
  // 模拟加载数据
  setTimeout(() => {
    newsList.value = [
      {
        title: "2024年全球科技创新大会在京召开，聚焦人工智能与可持续发展",
        author: "科技日报",
        time: "10分钟前",
        views: "1.2万",
        image: "https://picsum.photos/200/200?random=1",
      },
      {
        title: "央行发布最新货币政策报告，强调稳健货币政策取向不变",
        author: "财经网",
        time: "30分钟前",
        views: "2.5万",
        image: "https://picsum.photos/200/200?random=2",
      },
      {
        title: "中国女足晋级世界杯八强，创造历史最佳战绩",
        author: "体育周刊",
        time: "1小时前",
        views: "5.8万",
        image: "https://picsum.photos/200/200?random=3",
      },
    ]
    isLoading.value = false
    hasMore.value = true
  }, 1000)
}

const onRefresh = () => {
  if (isRefreshing.value) return
  isRefreshing.value = true

  // 模拟刷新数据
  setTimeout(() => {
    newsList.value = [
      {
        title: "2024年全球科技创新大会在京召开，聚焦人工智能与可持续发展",
        author: "科技日报",
        time: "刚刚",
        views: "1.2万",
        image: "https://picsum.photos/200/200?random=1",
      },
      {
        title: "央行发布最新货币政策报告，强调稳健货币政策取向不变",
        author: "财经网",
        time: "5分钟前",
        views: "2.5万",
        image: "https://picsum.photos/200/200?random=2",
      },
    ]
    isRefreshing.value = false
    hasMore.value = true
  }, 1000)
}

const onLoadMore = () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true

  // 模拟加载更多数据
  setTimeout(() => {
    const newItems = [
      {
        title: "新能源汽车销量创新高，市场占有率突破30%",
        author: "汽车之家",
        time: "4小时前",
        views: "2.1万",
        image: "https://picsum.photos/200/200?random=6",
      },
      {
        title: "全国多地开展夏季旅游促销活动",
        author: "旅游频道",
        time: "5小时前",
        views: "1.5万",
        image: "https://picsum.photos/200/200?random=7",
      },
    ]

    newsList.value.push(...newItems)
    isLoading.value = false

    // 模拟没有更多数据的情况
    if (newsList.value.length >= 10) {
      hasMore.value = false
    }
  }, 1000)
}

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}
</script>
