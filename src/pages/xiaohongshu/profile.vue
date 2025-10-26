<template>
  <view class="w-full h-screen bg-bg-light">
    <view class="bg-white px-4" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="flex items-start justify-between mb-5">
        <view class="flex gap-3">
          <image :src="userProfile.avatar" class="w-64px h-64px rounded-full" />
          <view class="flex flex-col gap-1.5 justify-center">
            <view class="text-lg font-medium text-text">{{ userProfile.name }}</view>
            <view class="text-13px text-text-placeholder">{{ userProfile.signature }}</view>
          </view>
        </view>
        <view class="px-4 py-1.5 bg-bg-light rounded-16px text-sm text-text" @click="editProfile">
          编辑资料
        </view>
      </view>

      <view class="flex items-center justify-around pt-4 border-t border-border">
        <view class="flex flex-col items-center gap-1">
          <view class="text-lg font-medium text-text">{{ userProfile.follows }}</view>
          <view class="text-13px text-text-placeholder">关注</view>
        </view>
        <view class="flex flex-col items-center gap-1">
          <view class="text-lg font-medium text-text">{{ userProfile.fans }}</view>
          <view class="text-13px text-text-placeholder">粉丝</view>
        </view>
        <view class="flex flex-col items-center gap-1">
          <view class="text-lg font-medium text-text">{{ formatCount(userProfile.likes) }}</view>
          <view class="text-13px text-text-placeholder">获赞与收藏</view>
        </view>
      </view>
    </view>

    <view class="flex bg-white border-b border-border mt-2">
      <view
        v-for="tab in tabs"
        :key="tab.value"
        class="flex-1 text-center py-3.5 text-15px text-text-secondary relative"
        :class="{ 'text-text font-medium': currentTab === tab.value }"
        @click="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
        <view
          v-if="currentTab === tab.value"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-24px h-2px bg-xhs"
        ></view>
      </view>
    </view>

    <scroll-view class="overflow-y-auto" scroll-y :style="{ height: scrollHeight + 'px' }">
      <view v-if="currentTab === 'notes'" class="grid grid-cols-3 gap-0.5 bg-white mt-0.5">
        <view
          v-for="note in userProfile.notes"
          :key="note.id"
          class="relative w-full pb-133% overflow-hidden"
          @click="goToDetail(note)"
        >
          <image :src="note.cover" mode="aspectFill" class="absolute top-0 left-0 w-full h-full" />
          <view
            class="absolute bottom-0 left-0 right-0 px-2 py-2 text-white"
            style="background: linear-gradient(transparent, rgb(0 0 0 / 60%))"
          >
            <view class="text-12px mb-1 overflow-hidden text-ellipsis line-clamp-2">
              {{ note.title }}
            </view>
            <view class="flex items-center gap-1 text-11px">
              <text class="i-ri-heart-line"></text>
              <text>{{ formatCount(note.likes) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view
        v-if="currentTab === 'liked'"
        class="flex flex-col items-center justify-center py-20 gap-3"
      >
        <text class="i-ri-heart-line text-48px text-gray-300"></text>
        <text class="text-sm text-text-placeholder">还没有点赞的笔记</text>
      </view>

      <view
        v-if="currentTab === 'collected'"
        class="flex flex-col items-center justify-center py-20 gap-3"
      >
        <text class="i-ri-star-line text-48px text-gray-300"></text>
        <text class="text-sm text-text-placeholder">还没有收藏的笔记</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getUserProfile } from "@/api/xiaohongshu"
import type { UserProfile, NoteItem } from "@/types/xiaohongshu"

const statusBarHeight = ref(0)
const scrollHeight = ref(0)
const currentTab = ref("notes")

const tabs = [
  { label: "笔记", value: "notes" },
  { label: "赞过", value: "liked" },
  { label: "收藏", value: "collected" },
]

const userProfile = ref<UserProfile>({
  id: "",
  name: "",
  avatar: "",
  signature: "",
  follows: 0,
  fans: 0,
  likes: 0,
  notes: [],
})

const formatCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }
  return count.toString()
}

const loadProfile = async () => {
  try {
    const data = await getUserProfile()
    userProfile.value = data
  } catch (error) {
    console.error("加载用户信息失败:", error)
  }
}

const switchTab = (tab: string) => {
  currentTab.value = tab
}

const editProfile = () => {
  uni.showToast({
    title: "编辑资料功能开发中",
    icon: "none",
  })
}

const goToDetail = (note: NoteItem) => {
  uni.navigateTo({
    url: `/pages/xiaohongshu/detail?id=${note.id}`,
  })
}

onMounted(async () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  scrollHeight.value = systemInfo.windowHeight - 44 - 280

  await loadProfile()
})
</script>
