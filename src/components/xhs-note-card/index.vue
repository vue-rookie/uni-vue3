<template>
  <view class="note-card" @click="handleClick">
    <view class="note-image-container">
      <image 
        :src="note.coverImage" 
        class="note-image" 
        mode="aspectFill"
        :lazy-load="true"
      />
      <view v-if="note.isVideo" class="video-icon">
        <text class="iconfont icon-play"></text>
      </view>
      <view class="note-overlay">
        <view class="note-title">{{ note.title }}</view>
        <view class="note-author">
          <image :src="note.author.avatar" class="author-avatar" />
          <text class="author-name">{{ note.author.name }}</text>
        </view>
      </view>
    </view>
    <view class="note-stats">
      <view class="stat-item">
        <text class="iconfont icon-heart"></text>
        <text class="stat-text">{{ formatNumber(note.likes) }}</text>
      </view>
      <view class="stat-item" v-if="note.comments > 0">
        <text class="iconfont icon-comment"></text>
        <text class="stat-text">{{ formatNumber(note.comments) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Author {
  id: string
  name: string
  avatar: string
}

interface Note {
  id: string
  title: string
  coverImage: string
  isVideo: boolean
  likes: number
  comments: number
  author: Author
}

interface Props {
  note: Note
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '48%'
})

const emit = defineEmits<{
  click: [note: Note]
}>()

const cardStyle = computed(() => ({
  width: props.width
}))

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const handleClick = () => {
  emit('click', props.note)
}
</script>

<style lang="scss" scoped>
.note-card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .note-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;

    .note-image {
      width: 100%;
      height: 100%;
      border-radius: 12rpx 12rpx 0 0;
    }

    .video-icon {
      position: absolute;
      top: 16rpx;
      right: 16rpx;
      width: 48rpx;
      height: 48rpx;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-play {
        color: #fff;
        font-size: 24rpx;
      }
    }

    .note-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
      padding: 40rpx 16rpx 16rpx;

      .note-title {
        color: #fff;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 1.4;
        margin-bottom: 12rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .note-author {
        display: flex;
        align-items: center;

        .author-avatar {
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          margin-right: 8rpx;
        }

        .author-name {
          color: rgba(255, 255, 255, 0.9);
          font-size: 22rpx;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .note-stats {
    padding: 12rpx 16rpx;
    display: flex;
    align-items: center;
    gap: 24rpx;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 6rpx;

      .iconfont {
        font-size: 24rpx;
        color: #666;
      }

      .stat-text {
        font-size: 22rpx;
        color: #666;
      }
    }
  }
}
</style>