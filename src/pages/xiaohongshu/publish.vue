<template>
  <view class="publish-page">
    <view class="header">
      <view class="header-btn" @click="handleCancel">取消</view>
      <view class="header-title">发布笔记</view>
      <view class="header-btn publish-btn" :class="{ active: canPublish }" @click="handlePublish">
        发布
      </view>
    </view>

    <scroll-view class="content" scroll-y>
      <view class="image-section">
        <view class="image-grid">
          <view v-for="(img, index) in images" :key="index" class="image-item">
            <image :src="img" mode="aspectFill" class="uploaded-image" />
            <view class="delete-btn" @click="deleteImage(index)">
              <text class="i-ri-close-line"></text>
            </view>
          </view>
          <view v-if="images.length < 9" class="add-image" @click="chooseImage">
            <text class="i-ri-add-line add-icon"></text>
            <text class="add-text">添加图片</text>
          </view>
        </view>
        <view class="image-tip">最多添加9张图片</view>
      </view>

      <view class="form-section">
        <view class="form-item">
          <textarea
            v-model="title"
            class="title-input"
            placeholder="填写标题，会有更多赞哦~"
            maxlength="100"
            :auto-height="true"
          />
          <view class="char-count">{{ title.length }}/100</view>
        </view>

        <view class="form-item">
          <textarea
            v-model="content"
            class="content-input"
            placeholder="添加正文"
            maxlength="1000"
            :auto-height="true"
          />
          <view class="char-count">{{ content.length }}/1000</view>
        </view>

        <view class="form-item tags-item" @click="showTagPicker = true">
          <view class="label">
            <text class="i-ri-price-tag-3-line label-icon"></text>
            <text>添加话题</text>
          </view>
          <view class="tags-display">
            <text v-if="tags.length === 0" class="placeholder">选择话题可以获得更多曝光</text>
            <view v-else class="selected-tags">
              <view v-for="tag in tags" :key="tag" class="tag-chip">
                <text>#{{ tag }}</text>
              </view>
            </view>
          </view>
          <text class="i-ri-arrow-right-s-line arrow-icon"></text>
        </view>

        <view class="form-item" @click="showLocationPicker = true">
          <view class="label">
            <text class="i-ri-map-pin-line label-icon"></text>
            <text>添加地点</text>
          </view>
          <text v-if="location" class="value">{{ location }}</text>
          <text v-else class="placeholder">你在哪里？</text>
          <text class="i-ri-arrow-right-s-line arrow-icon"></text>
        </view>
      </view>
    </scroll-view>

    <uve-popup v-model:show="showTagPicker" position="bottom" :round="true">
      <view class="tag-picker">
        <view class="picker-header">
          <view class="picker-title">选择话题</view>
          <view class="picker-close" @click="showTagPicker = false">完成</view>
        </view>
        <view class="tag-list">
          <view
            v-for="tag in availableTags"
            :key="tag"
            class="tag-option"
            :class="{ selected: tags.includes(tag) }"
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

<style scoped lang="scss">
.publish-page {
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.header-btn {
  font-size: 15px;
  color: #666;
}

.publish-btn {
  color: #ccc;

  &.active {
    color: #ff2442;
  }
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.image-section {
  padding: 16px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.image-item {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.uploaded-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgb(0 0 0 / 50%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}

.add-image {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-size: 32px;
  color: #999;
}

.add-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  font-size: 12px;
  color: #999;
}

.image-tip {
  font-size: 12px;
  color: #999;
}

.form-section {
  padding: 0 16px;
}

.form-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

.title-input,
.content-input {
  flex: 1;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  min-height: 44px;
  width: 100%;
}

.title-input {
  font-weight: 500;
}

.char-count {
  position: absolute;
  bottom: 16px;
  right: 0;
  font-size: 12px;
  color: #999;
}

.tags-item {
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}

.label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #333;
}

.label-icon {
  font-size: 18px;
}

.tags-display {
  flex: 1;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  padding: 4px 12px;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 13px;
  color: #666;
}

.value {
  flex: 1;
  text-align: right;
  color: #333;
  font-size: 14px;
  margin-right: 8px;
}

.placeholder {
  flex: 1;
  text-align: right;
  color: #999;
  font-size: 14px;
  margin-right: 8px;
}

.arrow-icon {
  font-size: 18px;
  color: #ccc;
}

.tag-picker {
  background: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 60vh;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.picker-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.picker-close {
  font-size: 15px;
  color: #ff2442;
}

.tag-list {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-option {
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #666;

  &.selected {
    background: #ffe5e9;
    color: #ff2442;
  }
}
</style>
