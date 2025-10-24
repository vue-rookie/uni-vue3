<template>
  <view class="profile-page">
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="header-content">
        <view class="avatar-section">
          <image :src="userProfile.avatar" class="avatar" />
          <view class="user-info">
            <view class="username">{{ userProfile.name }}</view>
            <view class="signature">{{ userProfile.signature }}</view>
          </view>
        </view>
        <view class="edit-btn" @click="editProfile">编辑资料</view>
      </view>

      <view class="stats">
        <view class="stat-item">
          <view class="stat-value">{{ userProfile.follows }}</view>
          <view class="stat-label">关注</view>
        </view>
        <view class="stat-item">
          <view class="stat-value">{{ userProfile.fans }}</view>
          <view class="stat-label">粉丝</view>
        </view>
        <view class="stat-item">
          <view class="stat-value">{{ formatCount(userProfile.likes) }}</view>
          <view class="stat-label">获赞与收藏</view>
        </view>
      </view>
    </view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: currentTab === tab.value }"
        @click="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
      </view>
    </view>

    <scroll-view class="content" scroll-y :style="{ height: scrollHeight + 'px' }">
      <view v-if="currentTab === 'notes'" class="notes-grid">
        <view
          v-for="note in userProfile.notes"
          :key="note.id"
          class="note-item"
          @click="goToDetail(note)"
        >
          <image :src="note.cover" mode="aspectFill" class="note-cover" />
          <view class="note-info">
            <view class="note-title-small">{{ note.title }}</view>
            <view class="note-likes-small">
              <text class="i-ri-heart-line"></text>
              <text>{{ formatCount(note.likes) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="currentTab === 'liked'" class="empty-state">
        <text class="i-ri-heart-line empty-icon"></text>
        <text class="empty-text">还没有点赞的笔记</text>
      </view>

      <view v-if="currentTab === 'collected'" class="empty-state">
        <text class="i-ri-star-line empty-icon"></text>
        <text class="empty-text">还没有收藏的笔记</text>
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

<style scoped lang="scss">
.profile-page {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
}

.header {
  background: #fff;
  padding: 16px;
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.avatar-section {
  display: flex;
  gap: 12px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.username {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.signature {
  font-size: 13px;
  color: #999;
}

.edit-btn {
  padding: 6px 16px;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #333;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.stat-label {
  font-size: 13px;
  color: #999;
}

.tabs {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 8px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-size: 15px;
  color: #666;
  position: relative;

  &.active {
    color: #333;
    font-weight: 500;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 2px;
      background: #ff2442;
    }
  }
}

.content {
  overflow-y: auto;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #fff;
  margin-top: 2px;
}

.note-item {
  position: relative;
  width: 100%;
  padding-bottom: 133%;
  overflow: hidden;
}

.note-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.note-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgb(0 0 0 / 60%));
  color: #fff;
}

.note-title-small {
  font-size: 12px;
  line-height: 1.3;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.note-likes-small {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
}

.empty-icon {
  font-size: 48px;
  color: #ddd;
}

.empty-text {
  font-size: 14px;
  color: #999;
}
</style>
