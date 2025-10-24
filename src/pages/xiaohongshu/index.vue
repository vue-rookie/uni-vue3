<template>
  <view class="xhs-home">
    <view class="search-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="search-input" @click="handleSearch">
        <text class="i-ri-search-line search-icon"></text>
        <text class="search-placeholder">搜索你感兴趣的内容</text>
      </view>
    </view>

    <scroll-view
      class="scroll-container"
      scroll-y
      :style="{ height: scrollHeight + 'px' }"
      @scrolltolower="loadMore"
      :lower-threshold="100"
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

      <view v-if="loading" class="loading-more">
        <text>加载中...</text>
      </view>

      <view v-if="!hasMore && noteList.length > 0" class="no-more">
        <text>没有更多了</text>
      </view>
    </scroll-view>

    <view class="publish-fab" @click="goToPublish">
      <text class="i-ri-add-line fab-icon"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { getNoteList } from "@/api/xiaohongshu"
import type { NoteItem } from "@/types/xiaohongshu"

const statusBarHeight = ref(0)
const scrollHeight = ref(0)
const noteList = ref<NoteItem[]>([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)

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
  uni.showToast({
    title: "搜索功能开发中",
    icon: "none",
  })
}

const goToPublish = () => {
  uni.navigateTo({
    url: "/pages/xiaohongshu/publish",
  })
}

onMounted(async () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0

  const menuButtonInfo = uni.getMenuButtonBoundingClientRect?.()
  const searchBarHeight = menuButtonInfo
    ? menuButtonInfo.bottom + menuButtonInfo.top - statusBarHeight.value
    : 44

  scrollHeight.value = systemInfo.windowHeight - searchBarHeight - 50

  await loadData()
})
</script>

<style scoped lang="scss">
.xhs-home {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #fff;
  padding-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input {
  margin: 0 12px;
  background: #f5f5f5;
  border-radius: 20px;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.search-icon {
  font-size: 18px;
  color: #999;
}

.search-placeholder {
  font-size: 14px;
  color: #999;
}

.scroll-container {
  padding-top: 52px;
}

.loading-more,
.no-more {
  text-align: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}

.publish-fab {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff2442 0%, #ff6b6b 100%);
  box-shadow: 0 4px 12px rgba(255, 36, 66, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.fab-icon {
  font-size: 28px;
  color: #fff;
}
</style>
