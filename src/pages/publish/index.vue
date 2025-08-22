<template>
  <view class="publish-page">
    <!-- 自定义导航栏 -->
    <xhs-navbar title="发布笔记" :show-back="true">
      <template #right>
        <view class="publish-btn" @click="handlePublish">
          <text class="publish-text">发布</text>
        </view>
      </template>
    </xhs-navbar>

    <!-- 内容区域 -->
    <view class="content" :style="{ paddingTop: navbarHeight + 'px' }">
      <!-- 图片选择区域 -->
      <view class="image-section">
        <view class="image-grid">
          <view 
            class="image-item" 
            v-for="(image, index) in selectedImages" 
            :key="index"
          >
            <image :src="image" class="selected-image" />
            <view class="delete-btn" @click="removeImage(index)">
              <text class="iconfont icon-close"></text>
            </view>
            <view v-if="index === 0" class="cover-badge">封面</view>
          </view>
          <view 
            v-if="selectedImages.length < 9" 
            class="add-image-btn" 
            @click="selectImage"
          >
            <text class="iconfont icon-plus add-icon"></text>
            <text class="add-text">添加图片</text>
          </view>
        </view>
        <view class="image-tip">
          <text class="tip-text">最多可添加9张图片，第一张将作为封面</text>
        </view>
      </view>

      <!-- 内容编辑 -->
      <view class="content-section">
        <textarea 
          class="content-input"
          v-model="content"
          placeholder="分享你的生活..."
          :maxlength="1000"
          auto-height
        />
        <view class="content-count">{{ content.length }}/1000</view>
      </view>

      <!-- 话题标签 -->
      <view class="topic-section">
        <view class="section-title">
          <text class="iconfont icon-hashtag"></text>
          <text class="title-text">添加话题</text>
        </view>
        <view class="topic-input-container">
          <input 
            class="topic-input"
            v-model="topicInput"
            placeholder="输入话题名称"
            @confirm="addTopic"
          />
          <view class="add-topic-btn" @click="addTopic">
            <text class="add-topic-text">添加</text>
          </view>
        </view>
        <view class="selected-topics">
          <view 
            class="topic-tag" 
            v-for="(topic, index) in selectedTopics" 
            :key="index"
          >
            <text class="topic-text"># {{ topic }}</text>
            <text class="iconfont icon-close topic-close" @click="removeTopic(index)"></text>
          </view>
        </view>
      </view>

      <!-- 位置信息 -->
      <view class="location-section" @click="selectLocation">
        <view class="section-title">
          <text class="iconfont icon-location"></text>
          <text class="title-text">添加位置</text>
        </view>
        <view class="location-info">
          <text class="location-text" v-if="selectedLocation">{{ selectedLocation }}</text>
          <text class="location-placeholder" v-else>点击添加位置信息</text>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>

      <!-- 发布设置 -->
      <view class="settings-section">
        <view class="setting-item">
          <text class="setting-label">同步到微博</text>
          <switch class="setting-switch" :checked="syncWeibo" @change="handleSyncWeiboChange" />
        </view>
        <view class="setting-item">
          <text class="setting-label">允许评论</text>
          <switch class="setting-switch" :checked="allowComment" @change="handleAllowCommentChange" />
        </view>
        <view class="setting-item">
          <text class="setting-label">公开可见</text>
          <switch class="setting-switch" :checked="isPublic" @change="handleIsPublicChange" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const navbarHeight = ref(88)
const selectedImages = ref<string[]>([])
const content = ref('')
const topicInput = ref('')
const selectedTopics = ref<string[]>([])
const selectedLocation = ref('')
const syncWeibo = ref(false)
const allowComment = ref(true)
const isPublic = ref(true)

const selectImage = () => {
  uni.chooseImage({
    count: 9 - selectedImages.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      selectedImages.value.push(...res.tempFilePaths)
    }
  })
}

const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1)
}

const addTopic = () => {
  if (topicInput.value.trim() && !selectedTopics.value.includes(topicInput.value.trim())) {
    selectedTopics.value.push(topicInput.value.trim())
    topicInput.value = ''
  }
}

const removeTopic = (index: number) => {
  selectedTopics.value.splice(index, 1)
}

const selectLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      selectedLocation.value = res.name || res.address
    }
  })
}

const handleSyncWeiboChange = (e: any) => {
  syncWeibo.value = e.detail.value
}

const handleAllowCommentChange = (e: any) => {
  allowComment.value = e.detail.value
}

const handleIsPublicChange = (e: any) => {
  isPublic.value = e.detail.value
}

const handlePublish = async () => {
  if (selectedImages.value.length === 0) {
    uni.showToast({
      title: '请至少添加一张图片',
      icon: 'none'
    })
    return
  }

  if (!content.value.trim()) {
    uni.showToast({
      title: '请输入内容',
      icon: 'none'
    })
    return
  }

  uni.showLoading({
    title: '发布中...'
  })

  // 模拟发布过程
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '发布成功',
      icon: 'success'
    })
    
    // 返回首页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/home/index'
      })
    }, 1500)
  }, 2000)
}

onMounted(() => {
  // 获取系统信息计算导航栏高度
  const systemInfo = uni.getSystemInfoSync()
  navbarHeight.value = (systemInfo.statusBarHeight || 0) + 44
})
</script>

<style lang="scss" scoped>
.publish-page {
  height: 100vh;
  background: #f8f8f8;

  .publish-btn {
    background: #ff2442;
    border-radius: 40rpx;
    padding: 12rpx 32rpx;

    .publish-text {
      font-size: 28rpx;
      color: #fff;
    }
  }

  .content {
    padding: 24rpx;

    .image-section {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 24rpx;

      .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16rpx;
        margin-bottom: 16rpx;

        .image-item {
          position: relative;
          aspect-ratio: 1;

          .selected-image {
            width: 100%;
            height: 100%;
            border-radius: 12rpx;
          }

          .delete-btn {
            position: absolute;
            top: 8rpx;
            right: 8rpx;
            width: 40rpx;
            height: 40rpx;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-close {
              font-size: 20rpx;
              color: #fff;
            }
          }

          .cover-badge {
            position: absolute;
            bottom: 8rpx;
            left: 8rpx;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            font-size: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 20rpx;
          }
        }

        .add-image-btn {
          aspect-ratio: 1;
          border: 2rpx dashed #ddd;
          border-radius: 12rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fafafa;

          .add-icon {
            font-size: 48rpx;
            color: #999;
            margin-bottom: 8rpx;
          }

          .add-text {
            font-size: 24rpx;
            color: #999;
          }
        }
      }

      .image-tip {
        .tip-text {
          font-size: 22rpx;
          color: #999;
        }
      }
    }

    .content-section {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 24rpx;
      position: relative;

      .content-input {
        width: 100%;
        min-height: 200rpx;
        font-size: 28rpx;
        line-height: 1.6;
        color: #333;
      }

      .content-count {
        position: absolute;
        bottom: 16rpx;
        right: 24rpx;
        font-size: 22rpx;
        color: #999;
      }
    }

    .topic-section {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 24rpx;

      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;

        .iconfont {
          font-size: 32rpx;
          color: #ff2442;
          margin-right: 12rpx;
        }

        .title-text {
          font-size: 28rpx;
          font-weight: 600;
          color: #333;
        }
      }

      .topic-input-container {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;

        .topic-input {
          flex: 1;
          height: 80rpx;
          background: #f5f5f5;
          border-radius: 12rpx;
          padding: 0 24rpx;
          font-size: 28rpx;
          margin-right: 16rpx;
        }

        .add-topic-btn {
          background: #ff2442;
          border-radius: 12rpx;
          padding: 0 32rpx;
          height: 80rpx;
          display: flex;
          align-items: center;
          justify-content: center;

          .add-topic-text {
            font-size: 28rpx;
            color: #fff;
          }
        }
      }

      .selected-topics {
        display: flex;
        flex-wrap: wrap;
        gap: 16rpx;

        .topic-tag {
          background: #f0f0f0;
          border-radius: 40rpx;
          padding: 12rpx 24rpx;
          display: flex;
          align-items: center;

          .topic-text {
            font-size: 24rpx;
            color: #333;
            margin-right: 8rpx;
          }

          .topic-close {
            font-size: 20rpx;
            color: #999;
          }
        }
      }
    }

    .location-section {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 24rpx;

      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        .iconfont {
          font-size: 32rpx;
          color: #ff2442;
          margin-right: 12rpx;
        }

        .title-text {
          font-size: 28rpx;
          font-weight: 600;
          color: #333;
        }
      }

      .location-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .location-text {
          font-size: 26rpx;
          color: #333;
        }

        .location-placeholder {
          font-size: 26rpx;
          color: #999;
        }

        .icon-arrow-right {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .settings-section {
      background: #fff;
      border-radius: 16rpx;
      padding: 24rpx;

      .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24rpx 0;
        border-bottom: 1rpx solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .setting-label {
          font-size: 28rpx;
          color: #333;
        }

        .setting-switch {
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>