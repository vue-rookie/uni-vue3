<template>
  <view class="note-card" @click="handleClick">
    <view class="note-card-image-container">
      <!-- 占位符 -->
      <view v-if="!imageLoaded" class="note-card-placeholder">
        <text class="i-ri-image-line placeholder-icon"></text>
      </view>
      <!-- 图片 -->
      <image
        :src="note.cover"
        mode="widthFix"
        class="note-card-image"
        :class="{ 'image-loaded': imageLoaded }"
        @load="handleImageLoad"
        @error="handleImageError"
        :lazy-load="true"
      />
      <view v-if="showTag && note.tags && note.tags.length > 0" class="note-card-tag">
        {{ note.tags[0] }}
      </view>
    </view>
    <view class="note-card-content">
      <view class="note-card-title">
        {{ note.title }}
      </view>
      <view class="note-card-footer">
        <view class="note-card-author">
          <view class="note-card-avatar-container">
            <!-- 头像占位符 -->
            <view v-if="!avatarLoaded" class="avatar-placeholder"></view>
            <image
              :src="note.author.avatar"
              class="note-card-avatar"
              :class="{ 'avatar-loaded': avatarLoaded }"
              @load="handleAvatarLoad"
              @error="handleAvatarError"
              mode="aspectFill"
            />
          </view>
          <text class="note-card-author-name">
            {{ note.author.name }}
          </text>
        </view>
        <view class="note-card-likes">
          <text class="i-ri-heart-line text-14px text-text-secondary"></text>
          <text class="text-12px text-text-secondary">{{ formatLikes(note.likes) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.note-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  margin-bottom: 8px;
  box-sizing: border-box;
  width: 100%;
}

.note-card-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-card-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  z-index: 1;
  min-height: 200px;
}

.placeholder-icon {
  font-size: 48px;
  color: #d0d0d0;
  opacity: 0.6;
}

.note-card-image {
  width: 100%;
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: relative;
  z-index: 2;
}

.note-card-image.image-loaded {
  opacity: 1;
}

.note-card-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgb(0 0 0 / 50%);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.note-card-content {
  padding: 8px;
  box-sizing: border-box;
}

.note-card-title {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  line-height: 1.4;
}

.note-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.note-card-author {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.note-card-avatar-container {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.avatar-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
  z-index: 1;
}

.note-card-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: relative;
  z-index: 2;
}

.note-card-avatar.avatar-loaded {
  opacity: 1;
}

.note-card-author-name {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.note-card-likes {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
</style>

<script setup lang="ts">
import { ref } from "vue"
import type { NoteItem } from "@/types/xiaohongshu"

interface Props {
  note: NoteItem
  showTag?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTag: true,
})

const emit = defineEmits<{
  click: [note: NoteItem]
}>()

const imageLoaded = ref(false)
const avatarLoaded = ref(false)

const formatLikes = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }
  return count.toString()
}

const handleClick = () => {
  emit("click", props.note)
}

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  // 加载失败时也隐藏占位符，显示错误状态
  imageLoaded.value = true
}

const handleAvatarLoad = () => {
  avatarLoaded.value = true
}

const handleAvatarError = () => {
  // 头像加载失败时也隐藏占位符
  avatarLoaded.value = true
}
</script>
