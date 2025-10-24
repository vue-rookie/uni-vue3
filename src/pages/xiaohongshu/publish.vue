<template>
  <view class="w-full h-screen bg-white flex flex-col">
    <view class="flex items-center justify-between px-4 py-3 border-b border-border">
      <view class="text-15px text-text-secondary" @click="handleCancel">取消</view>
      <view class="text-16px font-medium text-text">发布笔记</view>
      <view
        class="text-15px"
        :class="canPublish ? 'text-xhs' : 'text-gray-300'"
        @click="handlePublish"
      >
        发布
      </view>
    </view>

    <scroll-view class="flex-1 overflow-y-auto" scroll-y>
      <view class="p-4">
        <view class="grid grid-cols-3 gap-2 mb-2">
          <view v-for="(img, index) in images" :key="index" class="relative w-full pb-100%">
            <image
              :src="img"
              mode="aspectFill"
              class="absolute top-0 left-0 w-full h-full rounded-lg"
            />
            <view
              class="absolute top-1 right-1 w-20px h-20px bg-black/50 rounded-full flex-center text-white text-14px"
              @click="deleteImage(index)"
            >
              <text class="i-ri-close-line"></text>
            </view>
          </view>
          <view
            v-if="images.length < 9"
            class="relative w-full pb-100% bg-bg-light rounded-lg"
            @click="chooseImage"
          >
            <view
              class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-1"
            >
              <text class="i-ri-add-line text-32px text-text-placeholder"></text>
              <text class="text-12px text-text-placeholder">添加图片</text>
            </view>
          </view>
        </view>
        <view class="text-12px text-text-placeholder mb-4">最多添加9张图片</view>
      </view>

      <view class="px-4">
        <view class="pb-4 border-b border-border relative">
          <textarea
            v-model="title"
            class="w-full pr-16 text-15px text-text min-h-44px font-medium"
            placeholder="填写标题，会有更多赞哦~"
            maxlength="100"
            :auto-height="true"
          />
          <view class="absolute bottom-4 right-0 text-12px text-text-placeholder">
            {{ title.length }}/100
          </view>
        </view>

        <view class="py-4 border-b border-border relative">
          <textarea
            v-model="content"
            class="w-full pr-16 text-15px text-text min-h-44px"
            placeholder="添加正文"
            maxlength="1000"
            :auto-height="true"
          />
          <view class="absolute bottom-4 right-0 text-12px text-text-placeholder">
            {{ content.length }}/1000
          </view>
        </view>

        <view class="py-4 border-b border-border" @click="showTagPicker = true">
          <view class="flex items-center gap-2 mb-3">
            <text class="i-ri-price-tag-3-line text-18px text-text"></text>
            <text class="text-15px text-text">添加话题</text>
          </view>
          <view v-if="tags.length === 0" class="text-right text-14px text-text-placeholder mr-2">
            选择话题可以获得更多曝光
          </view>
          <view v-else class="flex flex-wrap gap-2">
            <view
              v-for="tag in tags"
              :key="tag"
              class="px-3 py-1 bg-bg-light rounded-12px text-13px text-text-secondary"
            >
              <text>#{{ tag }}</text>
            </view>
          </view>
          <text
            class="absolute right-4 top-1/2 -translate-y-1/2 i-ri-arrow-right-s-line text-18px text-gray-300"
          ></text>
        </view>

        <view
          class="flex items-center justify-between py-4 border-b border-border"
          @click="showLocationPicker = true"
        >
          <view class="flex items-center gap-2">
            <text class="i-ri-map-pin-line text-18px text-text"></text>
            <text class="text-15px text-text">添加地点</text>
          </view>
          <view class="flex items-center gap-2">
            <text v-if="location" class="text-14px text-text">{{ location }}</text>
            <text v-else class="text-14px text-text-placeholder">你在哪里？</text>
            <text class="i-ri-arrow-right-s-line text-18px text-gray-300"></text>
          </view>
        </view>
      </view>
    </scroll-view>

    <uve-popup v-model:show="showTagPicker" position="bottom" :round="true">
      <view class="bg-white rounded-t-16px max-h-60vh">
        <view class="flex items-center justify-between px-4 py-4 border-b border-border">
          <view class="text-16px font-medium text-text">选择话题</view>
          <view class="text-15px text-xhs" @click="showTagPicker = false">完成</view>
        </view>
        <view class="px-4 py-4 flex flex-wrap gap-3">
          <view
            v-for="tag in availableTags"
            :key="tag"
            class="px-4 py-2 rounded-16px text-14px"
            :class="tags.includes(tag) ? 'bg-xhs-100 text-xhs' : 'bg-bg-light text-text-secondary'"
            @click="toggleTag(tag)"
          >
            <text>#{{ tag }}</text>
          </view>
        </view>
      </view>
    </uve-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const images = ref<string[]>([])
const title = ref("")
const content = ref("")
const tags = ref<string[]>([])
const location = ref("")
const showTagPicker = ref(false)
const showLocationPicker = ref(false)

const availableTags = [
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

const canPublish = computed(() => {
  return images.value.length > 0 && title.value.trim().length > 0
})

const chooseImage = () => {
  uni.chooseImage({
    count: 9 - images.value.length,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      const paths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
      images.value = [...images.value, ...paths]
    },
  })
}

const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}

const toggleTag = (tag: string) => {
  const index = tags.value.indexOf(tag)
  if (index > -1) {
    tags.value.splice(index, 1)
  } else {
    if (tags.value.length < 5) {
      tags.value.push(tag)
    } else {
      uni.showToast({
        title: "最多选择5个话题",
        icon: "none",
      })
    }
  }
}

const handleCancel = () => {
  uni.showModal({
    title: "提示",
    content: "确定要放弃发布吗？",
    success: (res) => {
      if (res.confirm) {
        uni.navigateBack()
      }
    },
  })
}

const handlePublish = () => {
  if (!canPublish.value) {
    uni.showToast({
      title: "请完善内容",
      icon: "none",
    })
    return
  }

  uni.showLoading({
    title: "发布中...",
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: "发布成功",
      icon: "success",
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1500)
}
</script>
