<template>
  <view class="w-full h-screen bg-white flex flex-col">
    <scroll-view class="flex-1 overflow-y-auto" scroll-y>
      <view class="w-full bg-black">
        <swiper
          class="w-full h-500px"
          :indicator-dots="note.images.length > 1"
          indicator-color="rgba(255,255,255,0.5)"
          indicator-active-color="#fff"
        >
          <swiper-item v-for="(img, index) in note.images" :key="index">
            <image :src="img" mode="aspectFill" class="w-full h-full" />
          </swiper-item>
        </swiper>
      </view>

      <view class="p-4">
        <view class="flex items-center justify-between mb-4">
          <view class="flex items-center gap-2">
            <image :src="note.author.avatar" class="w-40px h-40px rounded-full" />
            <view class="flex flex-col gap-0.5">
              <text class="text-15px font-medium text-text">{{ note.author.name }}</text>
              <text class="text-12px text-text-placeholder">{{ note.createTime }}</text>
            </view>
          </view>
          <view class="px-4 py-1.5 bg-xhs text-white rounded-16px text-sm" @click="handleFollow">
            <text>+ 关注</text>
          </view>
        </view>

        <view class="text-lg font-bold text-text leading-1.4 mb-3">{{ note.title }}</view>

        <view class="text-15px text-text mb-4 whitespace-pre-wrap">{{ note.content }}</view>

        <view class="flex flex-wrap gap-2 mb-4">
          <view
            v-for="tag in note.tags"
            :key="tag"
            class="px-3 py-1 bg-bg-light rounded-12px text-13px text-text-secondary"
          >
            <text>#{{ tag }}</text>
          </view>
        </view>

        <view class="h-1px bg-border my-4"></view>

        <view class="flex items-center gap-1">
          <text class="text-13px text-text-placeholder">{{ note.likes }} 点赞</text>
          <text class="text-13px text-gray-300 mx-1">·</text>
          <text class="text-13px text-text-placeholder">
            {{ Math.floor(note.likes * 0.3) }} 收藏
          </text>
          <text class="text-13px text-gray-300 mx-1">·</text>
          <text class="text-13px text-text-placeholder">
            {{ Math.floor(note.likes * 0.2) }} 评论
          </text>
        </view>
      </view>
    </scroll-view>

    <view class="flex items-center px-4 py-3 border-t border-border bg-white gap-3">
      <view class="flex-1">
        <view
          class="h-36px bg-bg-light rounded-18px flex items-center px-4 text-sm text-text-placeholder"
          @click="handleComment"
        >
          <text>说点什么...</text>
        </view>
      </view>
      <view class="flex items-center gap-4">
        <view class="flex flex-col items-center gap-0.5" @click="handleLike">
          <text
            :class="[
              'text-22px',
              note.isLiked ? 'i-ri-heart-fill text-xhs' : 'i-ri-heart-line text-text',
            ]"
          ></text>
          <text class="text-11px text-text-secondary">{{ formatCount(note.likes) }}</text>
        </view>
        <view class="flex flex-col items-center gap-0.5" @click="handleCollect">
          <text
            :class="[
              'text-22px',
              note.isCollected ? 'i-ri-star-fill text-warning' : 'i-ri-star-line text-text',
            ]"
          ></text>
          <text class="text-11px text-text-secondary">收藏</text>
        </view>
        <view class="flex flex-col items-center gap-0.5" @click="handleShare">
          <text class="i-ri-share-line text-22px text-text"></text>
          <text class="text-11px text-text-secondary">分享</text>
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
