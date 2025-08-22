<template>
  <view class="navbar" :style="navbarStyle">
    <view class="navbar-content">
      <!-- 左侧内容 -->
      <view class="navbar-left">
        <view v-if="showBack" class="back-btn" @click="handleBack">
          <text class="iconfont icon-arrow-left"></text>
        </view>
        <slot name="left"></slot>
      </view>
      
      <!-- 中间标题或搜索框 -->
      <view class="navbar-center">
        <view v-if="showSearch" class="search-container" @click="handleSearchClick">
          <text class="iconfont icon-search"></text>
          <text class="search-placeholder">{{ searchPlaceholder }}</text>
        </view>
        <text v-else class="navbar-title">{{ title }}</text>
        <slot name="center"></slot>
      </view>
      
      <!-- 右侧内容 -->
      <view class="navbar-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  title?: string
  showBack?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  backgroundColor?: string
  textColor?: string
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showBack: false,
  showSearch: false,
  searchPlaceholder: '搜索你想要的',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  transparent: false
})

const emit = defineEmits<{
  back: []
  searchClick: []
}>()

const statusBarHeight = ref(0)

const navbarStyle = computed(() => ({
  backgroundColor: props.transparent ? 'transparent' : props.backgroundColor,
  color: props.textColor,
  paddingTop: `${statusBarHeight.value}px`
}))

const handleBack = () => {
  emit('back')
  uni.navigateBack()
}

const handleSearchClick = () => {
  emit('searchClick')
}

onMounted(() => {
  // 获取状态栏高度
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;

  .navbar-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    position: relative;

    .navbar-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      .back-btn {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16rpx;

        .icon-arrow-left {
          font-size: 32rpx;
          color: #333;
        }
      }
    }

    .navbar-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .search-container {
        flex: 1;
        height: 64rpx;
        background: #f5f5f5;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        padding: 0 24rpx;
        max-width: 500rpx;

        .icon-search {
          font-size: 28rpx;
          color: #999;
          margin-right: 12rpx;
        }

        .search-placeholder {
          font-size: 28rpx;
          color: #999;
        }
      }

      .navbar-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }
    }

    .navbar-right {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
  }
}
</style>