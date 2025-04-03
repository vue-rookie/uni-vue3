<template>
  <view class="page-container bg-white min-h-screen">
    <!-- 分类标签 -->
    <view class="bg-white px-4 pt-2 pb-0 sticky top-0 z-10 shadow-sm">
      <scroll-view scroll-x class="whitespace-nowrap" show-scrollbar="false" enhanced>
        <view class="tabs-container flex pb-2 relative">
          <view
            v-for="(item, index) in categories"
            :key="index"
            @click="selectCategory(index)"
            class="tab-item px-4 py-2 relative"
          >
            <text
              class="text-sm transition-all duration-300"
              :class="currentCategory === index ? 'text-[#06f] font-medium' : 'text-[#060b2d]'"
            >
              {{ item }}
            </text>
            <!-- 底部激活线条 -->
            <view
              v-if="currentCategory === index"
              class="tab-line absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-[#06f] rounded-full transition-all duration-300"
              :style="{ width: '50%', transform: 'translateX(0)' }"
            ></view>
          </view>
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
      style="height: calc(100vh - 100px)"
    >
      <view class="mt-3">
        <view class="divide-y divide-gray-100">
          <view
            v-for="(item, index) in newsList"
            :key="index"
            @click="navigateTo('/pages-sub/article/index')"
            class="px-4 py-3 active:bg-gray-50"
          >
            <view class="flex">
              <view class="flex-1 pr-3">
                <view class="text-base font-medium line-clamp-2 text-[#060b2d]">
                  {{ item.title }}
                </view>
                <view class="flex items-center mt-2">
                  <view class="flex items-center">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-user-line text-xs text-gray-400"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.author }}</text>
                  </view>
                  <view class="flex items-center ml-4">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-time-line text-xs text-gray-400"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.time }}</text>
                  </view>
                  <view class="flex items-center ml-4">
                    <view class="w-4 h-4 mr-1 flex items-center justify-center">
                      <text class="i-ri-eye-line text-xs text-gray-400"></text>
                    </view>
                    <text class="text-xs text-gray-500">{{ item.views }}</text>
                  </view>
                </view>
              </view>
              <image
                v-if="item.image"
                :src="item.image"
                mode="aspectFill"
                class="w-20 h-20 rounded-lg ml-auto"
              />
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="py-4 text-center">
        <view v-if="isLoading" class="flex items-center justify-center">
          <view class="w-8 h-8 mr-2 animate-spin">
            <text class="i-ri-loader-4-line text-[#06f]"></text>
          </view>
          <text class="text-sm text-gray-500">加载中...</text>
        </view>
        <text v-else-if="!hasMore" class="text-sm text-gray-500">没有更多内容了</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import Tabs from "@/components/Tabs.vue"
const categories = ["全部", "类型1", "类型2", "类型3", "类型4", "类型5"]
const currentCategory = ref(0)

const newsList = ref([
  {
    title: "标题标题标题标题",
    author: "作者作者作者作者",
    time: "10分钟前",
    views: "1.2万",
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    title: "标题标题标题标题",
    author: "作者作者作者作者",
    time: "30分钟前",
    views: "2.5万",
    image: "https://picsum.photos/200/200?random=2",
  },
  {
    title: "标题标题标题标题",
    author: "作者作者作者作者",
    time: "1小时前",
    views: "5.8万",
    image: "https://picsum.photos/200/200?random=3",
  },
  {
    title: "标题标题标题标题",
    author: "作者作者作者作者",
    time: "2小时前",
    views: "3.4万",
    image: "https://picsum.photos/200/200?random=4",
  },
  {
    title: "标题标题标题标题",
    author: "作者作者作者作者",
    time: "3小时前",
    views: "1.9万",
    image: "https://picsum.photos/200/200?random=5",
  },
])

const hasMore = ref(true)
const isLoading = ref(false)
const isRefreshing = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)

const selectCategory = (index: number) => {
  if (currentCategory.value === index) return
  currentCategory.value = index
  loadNews(true)
}

const loadNews = (reset = false) => {
  if (reset) {
    pageNum.value = 1
    isLoading.value = true

    // 模拟加载数据
    setTimeout(() => {
      newsList.value = generateNewsItems(pageSize.value, currentCategory.value)
      isLoading.value = false
      hasMore.value = true
    }, 800)
  }
}

// 生成新闻数据函数
const generateNewsItems = (count: number, categoryIndex: number) => {
  const category = categories[categoryIndex]
  const items = []

  for (let i = 0; i < count; i++) {
    items.push({
      title: `${category !== "全部" ? `[${category}] ` : ""} ${getRandomTitle()}`,
      author: getRandomAuthor(),
      time: getRandomTime(),
      views: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)}万`,
      image: `https://picsum.photos/200/200?random=${i + 10}`,
    })
  }

  return items
}

// 随机标题
const getRandomTitle = () => {
  const titles = [
    "标题标题标题标题1",
    "标题标题标题标题2",
    "标题标题标题标题3",
    "标题标题标题标题4",
    "标题标题标题标题5",
    "标题标题标题标题6",
    "标题标题标题标题7",
    "标题标题标题标题8",
    "标题标题标题标题9",
    "标题标题标题标题10",
    "标题标题标题标题11",
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

// 随机作者
const getRandomAuthor = () => {
  const authors = [
    "作者1",
    "作者2",
    "作者3",
    "作者4",
    "作者5",
    "作者6",
    "作者7",
    "作者8",
    "作者9",
    "作者10",
  ]
  return authors[Math.floor(Math.random() * authors.length)]
}

// 随机时间
const getRandomTime = () => {
  const times = [
    "刚刚",
    "5分钟前",
    "10分钟前",
    "30分钟前",
    "1小时前",
    "2小时前",
    "3小时前",
    "今天",
    "昨天",
    "前天",
  ]
  return times[Math.floor(Math.random() * times.length)]
}

const onRefresh = () => {
  if (isRefreshing.value) return
  isRefreshing.value = true

  // 模拟刷新数据
  setTimeout(() => {
    newsList.value = generateNewsItems(pageSize.value, currentCategory.value)
    isRefreshing.value = false
    hasMore.value = true
    pageNum.value = 1
  }, 1000)
}

const onLoadMore = () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true
  pageNum.value++

  // 模拟加载更多数据
  setTimeout(() => {
    const newItems = generateNewsItems(10, currentCategory.value)
    newsList.value.push(...newItems)
    isLoading.value = false

    // 最多加载3页数据
    if (pageNum.value >= 3) {
      hasMore.value = false
    }
  }, 800)
}

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}

onMounted(() => {
  // 初始加载
  nextTick(() => {
    loadNews(true)
  })
})
</script>

<style>
.tabs-container {
  position: relative;
  overflow: hidden;
}

.tab-item {
  position: relative;
  transition: all 0.3s ease;
}

.tab-line {
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    width: 0;
  }

  to {
    opacity: 1;
    width: 50%;
  }
}
</style>
