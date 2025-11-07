<template>
  <view class="w-full h-screen bg-bg-light">
    <view
      class="fixed top-0 left-0 right-0 z-999 bg-white shadow-sm"
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <view class="px-3 py-2">
        <view
          class="bg-bg-light rounded-20px h-36px flex items-center px-4 gap-2"
          @click="handleSearch"
        >
          <text class="i-ri-search-line text-18px text-text-placeholder"></text>
          <text class="text-sm text-text-placeholder">搜索你感兴趣的内容</text>
        </view>
      </view>
      <view class="flex items-center px-3 pb-2">
        <view
          v-for="tab in tabs"
          :key="tab.id"
          class="px-3 py-1 text-15px transition-all"
          :class="currentTab === tab.id ? 'text-text font-medium' : 'text-text-secondary'"
          @click="switchTab(tab.id)"
        >
          {{ tab.name }}
        </view>
      </view>
    </view>

    <scroll-view
      class="waterfall-scroll-view"
      scroll-y
      :style="{ height: scrollHeight + 'px', top: headerHeight + 'px' }"
      @scrolltolower="loadMore"
      :lower-threshold="100"
      :enable-back-to-top="true"
    >
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

      <view
        v-if="!hasMore && noteList.length > 0"
        class="text-center py-5 text-text-placeholder text-sm"
      >
        <text>没有更多了</text>
      </view>
    </scroll-view>

    <view
      class="fixed right-5 w-56px h-56px rounded-full bg-gradient-to-br from-xhs to-xhs-400 shadow-lg flex-center z-100 publish-btn"
      style="box-shadow: 0 4px 12px rgb(255 36 66 / 40%)"
      @click="goToPublish"
    >
      <text class="i-ri-add-line text-28px text-white"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue"
import { getNoteList } from "@/api/xiaohongshu"
import type { NoteItem } from "@/types/xiaohongshu"

const statusBarHeight = ref(0)
const scrollHeight = ref(0)
const headerHeight = ref(0)
const noteList = ref<NoteItem[]>([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const currentTab = ref("follow")

const tabs = [
  { id: "follow", name: "关注" },
  { id: "explore", name: "发现" },
  { id: "nearby", name: "附近" },
]

const leftColumn = computed(() => {
  return noteList.value.filter((_, index) => index % 2 === 0)
})

const rightColumn = computed(() => {
  return noteList.value.filter((_, index) => index % 2 === 1)
})

const loadData = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  try {
    const data = await getNoteList(page.value, 10)
    if (data.length < 10) {
      hasMore.value = false
    }
    noteList.value = [...noteList.value, ...data]
    page.value++
  } catch (error) {
    console.error("加载失败:", error)
    uni.showToast({
      title: "加载失败",
      icon: "none",
    })
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  loadData()
}

const goToDetail = (note: NoteItem) => {
  uni.navigateTo({
    url: `/pages/xiaohongshu/detail?id=${note.id}`,
  })
}

const handleSearch = () => {
  uni.navigateTo({
    url: "/pages/xiaohongshu/search",
  })
}

const goToPublish = () => {
  uni.navigateTo({
    url: "/pages/xiaohongshu/publish",
  })
}

const switchTab = (tabId: string) => {
  currentTab.value = tabId
  noteList.value = []
  page.value = 1
  hasMore.value = true
  loadData()
}

const calculateLayout = () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0

  const menuButtonInfo = uni.getMenuButtonBoundingClientRect?.()
  // 搜索栏区域高度（包含 padding）
  const searchBarArea = menuButtonInfo
    ? menuButtonInfo.bottom + 8 // 搜索栏底部 + 下方 padding
    : statusBarHeight.value + 52 // 默认值：状态栏 + 搜索栏高度

  // tabs 区域高度约为 44px（包含 padding）
  const tabsArea = 44

  // 计算顶部固定区域的总高度
  headerHeight.value = searchBarArea + tabsArea

  // tabBar 高度（从 pages.json 配置中得知是 64px）
  const tabBarHeight = 64

  // scroll-view 应该填充满整个可视区域，减去顶部和底部
  scrollHeight.value = systemInfo.windowHeight - headerHeight.value
}

onMounted(async () => {
  calculateLayout()
  await loadData()

  // 使用 nextTick 确保 DOM 渲染完成后再重新计算
  await nextTick()
  calculateLayout()
})
</script>

<style scoped>
.waterfall-scroll-view {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.waterfall-scroll-view ::v-deep(.uve-waterfall) {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 8px; /* 内容区域底部留一点间距 */
}

.publish-btn {
  bottom: 80px; /* tabBar 上方留出空间 */
}
</style>
