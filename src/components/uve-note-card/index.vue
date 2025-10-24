<template>
  <view class="note-card" @click="handleClick">
    <view class="note-image-wrapper">
      <image :src="note.cover" mode="widthFix" class="note-image" />
      <view v-if="showTag && note.tags && note.tags.length > 0" class="note-tag">
        {{ note.tags[0] }}
      </view>
    </view>
    <view class="note-content">
      <view class="note-title">{{ note.title }}</view>
      <view class="note-footer">
        <view class="note-author">
          <image :src="note.author.avatar" class="author-avatar" />
          <text class="author-name">{{ note.author.name }}</text>
        </view>
        <view class="note-likes">
          <text class="i-ri-heart-line like-icon"></text>
          <text class="like-count">{{ formatLikes(note.likes) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
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

const formatLikes = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }
  return count.toString()
}

const handleClick = () => {
  emit("click", props.note)
}
</script>

<style scoped lang="scss">
.note-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
}

.note-image-wrapper {
  position: relative;
  width: 100%;
}

.note-image {
  width: 100%;
  display: block;
}

.note-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgb(0 0 0 / 50%);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.note-content {
  padding: 8px;
}

.note-title {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}

.note-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.note-author {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.author-name {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-likes {
  display: flex;
  align-items: center;
  gap: 2px;
}

.like-icon {
  font-size: 14px;
  color: #666;
}

.like-count {
  font-size: 12px;
  color: #666;
}
</style>
