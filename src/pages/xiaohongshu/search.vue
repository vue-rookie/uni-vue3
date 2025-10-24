<template>
  <view class="w-full h-screen bg-bg-light">
    <view
      class="fixed top-0 left-0 right-0 z-999 bg-white pb-3 shadow-sm"
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <view class="flex items-center px-3 py-2 gap-2">
        <view class="flex-1 flex items-center bg-bg-light rounded-20px h-36px px-4 gap-2">
          <text class="i-ri-search-line text-18px text-text-placeholder"></text>
          <input
            v-model="searchKeyword"
            class="flex-1 text-sm text-text"
            placeholder="搜索你感兴趣的内容"
            placeholder-class="text-text-placeholder"
            focus
            @confirm="handleSearch"
          />
          <text
            v-if="searchKeyword"
            class="i-ri-close-circle-fill text-16px text-text-placeholder"
            @click="clearSearch"
          ></text>
        </view>
        <text class="text-15px text-text" @click="goBack">取消</text>
      </view>
    </view>

    <scroll-view
      class="pt-64px"
      scroll-y
      :style="{ height: scrollHeight + 'px' }"
    >
      <view v-if="!hasSearched" class="px-4 py-4">
        <view class="text-base font-medium text-text mb-3">热门搜索</view>
        <view class="flex flex-wrap gap-2">
          <view
            v-for="keyword in hotKeywords"
            :key="keyword"
            class="px-4 py-2 bg-white rounded-16px text-sm text-text"
            @click="searchHotKeyword(keyword)"
          >
            {{ keyword }}
          </view>
        </view>
      </view>

      <view v-else-if="searchResults.length > 0">
        <uve-waterfall>
          <template #left>
            <uve-note-card
              v-for="item in leftColumn"
              :key="item.id"
              :note="item"
              @click="goToDetail"
            />
          </template>
          <template #right>
            <uve-note-card
              v-for="item in rightColumn"
              :key="item.id"
              :note="item"
              @click="goToDetail"
            />
          </template>
        </uve-waterfall>

        <view v-if="loading" class="text-center py-5 text-text-placeholder text-sm">
          <text>加载中...</text>
        </view>
      </view>

      <view v-else class="flex flex-col items-center justify-center py-20 gap-3">
        <text class="i-ri-search-line text-48px text-gray-300"></text>
        <text class="text-sm text-text-placeholder">没有找到相关内容</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { getNoteList } from "@/api/xiaohongshu"
import type { NoteItem } from "@/types/xiaohongshu"

const statusBarHeight = ref(0)
const scrollHeight = ref(0)
const searchKeyword = ref("")
const hasSearched = ref(false)
const searchResults = ref<NoteItem[]>([])
const loading = ref(false)

const hotKeywords = [
  "穿搭",
  "美食",
  "旅行",
  "护肤",
  "美妆",
  "健身",
  "探店",
  "日常",
  "学习",
  "摄影",
  "家居",
  "数码",
]

const leftColumn = computed(() => {
  return searchResults.value.filter((_, index) => index % 2 === 0)
})

const rightColumn = computed(() => {
  return searchResults.value.filter((_, index) => index % 2 === 1)
})

const handleSearch = async () => {
  if (!searchKeyword.value.trim()) return

  hasSearched.value = true
  loading.value = true

  try {
    const data = await getNoteList(1, 10)
    searchResults.value = data
  } catch (error) {
    console.error("搜索失败:", error)
  } finally {
    loading.value = false
  }
}

const searchHotKeyword = (keyword: string) => {
  searchKeyword.value = keyword
  handleSearch()
}

const clearSearch = () => {
  searchKeyword.value = ""
  hasSearched.value = false
  searchResults.value = []
}

const goBack = () => {
  uni.navigateBack()
}

const goToDetail = (note: NoteItem) => {
  uni.navigateTo({
    url: `/pages/xiaohongshu/detail?id=${note.id}`,
  })
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  scrollHeight.value = systemInfo.windowHeight - 64
})
</script>
