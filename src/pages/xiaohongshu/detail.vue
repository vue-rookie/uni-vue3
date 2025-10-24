<template>
  <view class="detail-page">
    <scroll-view class="scroll-content" scroll-y>
      <view class="image-swiper">
        <swiper
          class="swiper"
          :indicator-dots="note.images.length > 1"
          indicator-color="rgba(255,255,255,0.5)"
          indicator-active-color="#fff"
        >
          <swiper-item v-for="(img, index) in note.images" :key="index">
            <image :src="img" mode="aspectFill" class="swiper-image" />
          </swiper-item>
        </swiper>
      </view>

      <view class="detail-content">
        <view class="author-info">
          <view class="author-left">
            <image :src="note.author.avatar" class="author-avatar" />
            <view class="author-text">
              <text class="author-name">{{ note.author.name }}</text>
              <text class="publish-time">{{ note.createTime }}</text>
            </view>
          </view>
          <view class="follow-btn" @click="handleFollow">
            <text>+ 关注</text>
          </view>
        </view>

        <view class="note-title">{{ note.title }}</view>

        <view class="note-content">{{ note.content }}</view>

        <view class="note-tags">
          <view v-for="tag in note.tags" :key="tag" class="tag-item">
            <text>#{{ tag }}</text>
          </view>
        </view>

        <view class="divider"></view>

        <view class="interaction-info">
          <text class="info-text">{{ note.likes }} 点赞</text>
          <text class="info-divider">·</text>
          <text class="info-text">{{ Math.floor(note.likes * 0.3) }} 收藏</text>
          <text class="info-divider">·</text>
          <text class="info-text">{{ Math.floor(note.likes * 0.2) }} 评论</text>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view class="bottom-left">
        <view class="input-placeholder" @click="handleComment">
          <text>说点什么...</text>
        </view>
      </view>
      <view class="bottom-actions">
        <view class="action-btn" @click="handleLike">
          <text
            :class="['action-icon', note.isLiked ? 'i-ri-heart-fill' : 'i-ri-heart-line']"
            :style="{ color: note.isLiked ? '#ff2442' : '#333' }"
          ></text>
          <text class="action-text">{{ formatCount(note.likes) }}</text>
        </view>
        <view class="action-btn" @click="handleCollect">
          <text
            :class="['action-icon', note.isCollected ? 'i-ri-star-fill' : 'i-ri-star-line']"
            :style="{ color: note.isCollected ? '#ffc107' : '#333' }"
          ></text>
          <text class="action-text">收藏</text>
        </view>
        <view class="action-btn" @click="handleShare">
          <text class="action-icon i-ri-share-line"></text>
          <text class="action-text">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { getNoteDetail, likeNote, collectNote } from "@/api/xiaohongshu"
import type { NoteItem } from "@/types/xiaohongshu"

const note = ref<NoteItem>({
  id: "",
  title: "",
  cover: "",
  author: {
    id: "",
    name: "",
    avatar: "",
  },
  likes: 0,
  images: [],
  tags: [],
  content: "",
  createTime: "",
  isLiked: false,
  isCollected: false,
})

const formatCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }
  return count.toString()
}

const loadDetail = async (id: string) => {
  try {
    const data = await getNoteDetail(id)
    note.value = data
  } catch (error) {
    console.error("加载详情失败:", error)
    uni.showToast({
      title: "加载失败",
      icon: "none",
    })
  }
}

const handleLike = async () => {
  try {
    await likeNote(note.value.id)
    if (note.value.isLiked) {
      note.value.likes--
      note.value.isLiked = false
    } else {
      note.value.likes++
      note.value.isLiked = true
    }
  } catch (error) {
    console.error("点赞失败:", error)
  }
}

const handleCollect = async () => {
  try {
    await collectNote(note.value.id)
    note.value.isCollected = !note.value.isCollected
    uni.showToast({
      title: note.value.isCollected ? "收藏成功" : "取消收藏",
      icon: "none",
    })
  } catch (error) {
    console.error("收藏失败:", error)
  }
}

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    success: () => {
      console.log("分享成功")
    },
  })
}

const handleComment = () => {
  uni.showToast({
    title: "评论功能开发中",
    icon: "none",
  })
}

const handleFollow = () => {
  uni.showToast({
    title: "已关注",
    icon: "success",
  })
}

onLoad((options: any) => {
  if (options.id) {
    loadDetail(options.id)
  }
})
</script>

<style scoped lang="scss">
.detail-page {
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.scroll-content {
  flex: 1;
  overflow-y: auto;
}

.image-swiper {
  width: 100%;
  background: #000;
}

.swiper {
  width: 100%;
  height: 500px;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.detail-content {
  padding: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.author-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.publish-time {
  font-size: 12px;
  color: #999;
}

.follow-btn {
  padding: 6px 16px;
  background: #ff2442;
  color: #fff;
  border-radius: 16px;
  font-size: 14px;
}

.note-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 12px;
}

.note-content {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-item {
  padding: 4px 12px;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 13px;
  color: #666;
}

.divider {
  height: 1px;
  background: #f0f0f0;
  margin: 16px 0;
}

.interaction-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-text {
  font-size: 13px;
  color: #999;
}

.info-divider {
  font-size: 13px;
  color: #ddd;
  margin: 0 4px;
}

.bottom-bar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  gap: 12px;
}

.bottom-left {
  flex: 1;
}

.input-placeholder {
  height: 36px;
  background: #f5f5f5;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  color: #999;
}

.bottom-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.action-icon {
  font-size: 22px;
  color: #333;
}

.action-text {
  font-size: 11px;
  color: #666;
}
</style>
