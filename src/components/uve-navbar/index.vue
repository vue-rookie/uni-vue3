<template>
  <view
    class="relative z-900"
    :class="[
      fixed ? 'fixed top-0 left-0 right-0 z-50' : '',
      border ? 'border-b border-gray-200' : '',
      transparent ? 'bg-transparent' : '',
    ]"
    :style="navbarStyle"
  >
    <!-- 状态栏占位 -->
    <view
      v-if="fixed && !transparentStatusBar"
      class="w-full"
      :style="{ height: `${statusBarHeight}px` }"
    ></view>

    <!-- 导航栏内容 -->
    <view
      class="navbar-content flex items-center relative"
      :style="{
        height: `${navbarHeight}px`,
      }"
    >
      <!-- 左侧区域 -->
      <view
        class="navbar-left absolute left-0 h-full flex items-center"
        :style="{ width: `${leftWidth}rpx` }"
      >
        <slot name="left">
          <view
            v-if="showBack"
            class="navbar-back flex items-center justify-center pl-3 pr-2 h-full"
            @click="handleBack"
          >
            <text
              class="i-ri-arrow-left-line text-lg"
              :class="titleColor ? titleColor : 'text-gray-700'"
            ></text>
            <text
              v-if="backText"
              class="ml-1 text-sm"
              :class="titleColor ? titleColor : 'text-gray-700'"
            >
              {{ backText }}
            </text>
          </view>
        </slot>
      </view>

      <!-- 中间标题区域 -->
      <view class="navbar-title flex-1 flex items-center justify-center mx-auto px-2">
        <slot name="title">
          <text
            v-if="title"
            class="text-base font-medium truncate text-center"
            :class="[titleColor ? titleColor : 'text-gray-800']"
            :style="{ maxWidth: '70%' }"
          >
            {{ title }}
          </text>
        </slot>
      </view>

      <!-- 右侧区域 -->
      <view
        class="navbar-right absolute right-0 h-full flex items-center justify-end"
        :style="{ width: `${rightWidth}rpx` }"
      >
        <slot name="right"></slot>
      </view>
      <!-- 默认插槽区域 -->
      <slot></slot>
    </view>
    <!-- 底部插槽，可用于放置tabs等 -->
    <slot name="bottom"></slot>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useSystem } from "@/hooks"

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 标题颜色
  titleColor: {
    type: String,
    default: "",
  },
  // 是否固定在顶部
  fixed: {
    type: Boolean,
    default: true,
  },
  // 是否显示下边框
  border: {
    type: Boolean,
    default: true,
  },
  // 是否背景透明
  transparent: {
    type: Boolean,
    default: false,
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  // 导航栏高度，不包括状态栏
  navbarHeight: {
    type: Number,
    default: 44,
  },
  // 左侧宽度 (rpx)
  leftWidth: {
    type: Number,
    default: 180,
  },
  // 右侧宽度 (rpx)
  rightWidth: {
    type: Number,
    default: 180,
  },
  // 是否显示返回按钮
  showBack: {
    type: Boolean,
    default: true,
  },
  // 返回按钮文字
  backText: {
    type: String,
    default: "",
  },
  // 是否显示占位元素
  placeholder: {
    type: Boolean,
    default: true,
  },
  // 是否透明状态栏
  transparentStatusBar: {
    type: Boolean,
    default: false,
  },
  // 返回的页面层级
  delta: {
    type: Number,
    default: 1,
  },
})

const emits = defineEmits(["back"])

// 安全地获取状态栏高度
const statusBarHeight = ref(20) // 默认值，确保始终有一个合理的值

// 尝试获取系统状态栏高度
onMounted(() => {
  try {
    // 方法1: 使用hooks
    const system = useSystem()
    if (system?.systemInfo?.value?.statusBarHeight) {
      statusBarHeight.value = system.systemInfo.value.statusBarHeight
    } else {
      // 方法2: 直接调用uni.getSystemInfoSync
      const sysInfo = uni.getSystemInfoSync()
      if (sysInfo && sysInfo.statusBarHeight) {
        statusBarHeight.value = sysInfo.statusBarHeight
      }
    }
  } catch (error) {
    console.error("获取状态栏高度失败:", error)
    // 保持默认值
  }
})

// 计算导航栏总高度（状态栏 + 导航栏）
const height = computed(() => {
  return props.fixed && !props.transparentStatusBar
    ? statusBarHeight.value + props.navbarHeight
    : props.navbarHeight
})

// 计算导航栏样式
const navbarStyle = computed(() => {
  const style: Record<string, string> = {}
  if (!props.transparent) {
    // 支持渐变背景
    if (props.backgroundColor.includes("gradient")) {
      style.backgroundImage = props.backgroundColor
    } else {
      style.backgroundColor = props.backgroundColor
    }
  }
  return style
})

// 返回按钮点击事件
const handleBack = () => {
  emits("back")
  uni.navigateBack({
    delta: props.delta,
    fail: () => {
      // 如果返回失败，可能是没有上一级页面，则跳转到首页
      uni.reLaunch({
        url: "/pages/index/index",
      })
    },
  })
}

// 导出方法，用于获取导航栏高度 (供其他组件使用)
const getNavbarHeight = () => {
  return height.value
}

defineExpose({
  getNavbarHeight,
})
</script>

<style>
.navbar-content {
  box-sizing: border-box;
}
</style>
