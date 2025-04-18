<template>
  <view class="uve-popup">
    <!-- 遮罩层 -->
    <view
      v-if="visible"
      class="popup-mask fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-99"
      :class="{ 'animate-fade-in': visible }"
      @click="maskClosable ? close() : null"
      @touchmove.prevent="preventTouchMove"
    ></view>

    <!-- 弹出层内容 -->
    <view
      v-if="visible"
      class="popup-content fixed"
      :class="[
        positionClass,
        roundedClass,
        {
          'animate-slide-up': position === 'bottom' && visible,
          'animate-slide-down': position === 'top' && visible,
          'animate-slide-left': position === 'right' && visible,
          'animate-slide-right': position === 'left' && visible,
          'animate-zoom-in': position === 'center' && visible,
        },
      ]"
      :style="contentStyle"
      @touchmove.prevent="preventScroll ? preventTouchMove : null"
    >
      <!-- 关闭按钮 -->
      <view
        v-if="showClose"
        class="popup-close absolute p-2"
        :class="closeIconPosition === 'top-right' ? 'top-2 right-2' : 'top-2 left-2'"
        @click="close"
      >
        <text class="i-ri-close-line text-gray-500 text-lg"></text>
      </view>

      <!-- 标题栏 -->
      <view
        v-if="title || $slots.title"
        class="popup-title py-3 px-4 border-b border-gray-100 text-center"
      >
        <slot name="title">
          <text class="font-medium text-base text-gray-800">{{ title }}</text>
        </slot>
      </view>

      <!-- 内容区域 -->
      <view class="popup-body" :class="{ 'p-4': padding }" :style="bodyStyle">
        <slot></slot>
      </view>

      <!-- 底部区域 -->
      <view v-if="$slots.footer" class="popup-footer border-t border-gray-100 p-3">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from "vue"

const props = defineProps({
  // 是否显示弹出层
  visible: {
    type: Boolean,
    default: false,
  },
  // 弹出位置
  position: {
    type: String,
    default: "bottom",
    validator: (val: string) => ["top", "right", "bottom", "left", "center"].includes(val),
  },
  // 弹出层宽度，居中弹窗时生效
  width: {
    type: [String, Number],
    default: "80%",
  },
  // 弹出层高度，上下弹出时生效
  height: {
    type: [String, Number],
    default: "auto",
  },
  // 是否显示关闭图标
  showClose: {
    type: Boolean,
    default: false,
  },
  // 关闭图标位置
  closeIconPosition: {
    type: String,
    default: "top-right",
    validator: (val: string) => ["top-right", "top-left"].includes(val),
  },
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 是否显示圆角
  round: {
    type: Boolean,
    default: false,
  },
  // 圆角大小
  borderRadius: {
    type: [String, Number],
    default: "16rpx",
  },
  // 是否点击遮罩关闭
  maskClosable: {
    type: Boolean,
    default: true,
  },
  // 是否阻止滚动穿透
  preventScroll: {
    type: Boolean,
    default: true,
  },
  // 内容是否带内边距
  padding: {
    type: Boolean,
    default: true,
  },
  // z-index
  zIndex: {
    type: Number,
    default: 999,
  },
  // 自定义内容样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  // 自定义内容区域样式
  bodyStyle: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(["update:visible", "open", "close", "opened", "closed"])

// 计算弹出层位置样式
const positionClass = computed(() => {
  switch (props.position) {
    case "top":
      return "left-0 right-0 top-0"
    case "right":
      return "top-0 right-0 bottom-0"
    case "bottom":
      return "left-0 right-0 bottom-0"
    case "left":
      return "top-0 left-0 bottom-0"
    case "center":
      return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    default:
      return "left-0 right-0 bottom-0"
  }
})

// 计算内容样式
const contentStyle = computed(() => {
  const style: Record<string, any> = {
    zIndex: props.zIndex,
  }

  // 使用uni.getSystemInfoSync().statusBarHeight替代system.getStatusBarHeight
  // 处理顶部安全区域
  if (props.position === "top") {
    try {
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo && systemInfo.statusBarHeight) {
        style.paddingTop = `${systemInfo.statusBarHeight}px`
      }
    } catch (e) {
      console.error("获取状态栏高度失败", e)
    }
  }

  if (props.position === "center") {
    style.width = typeof props.width === "number" ? `${props.width}rpx` : props.width
    style.maxWidth = "90%"
    style.maxHeight = "90%"
  }

  if (props.position === "top" || props.position === "bottom") {
    style.height = typeof props.height === "number" ? `${props.height}rpx` : props.height
    style.maxHeight = "80%"
  }

  if (props.position === "left" || props.position === "right") {
    style.width = typeof props.width === "number" ? `${props.width}rpx` : props.width
    style.maxWidth = "80%"
  }

  return { ...style, ...props.customStyle }
})

// 计算圆角样式
const roundedClass = computed(() => {
  if (!props.round) return ""

  switch (props.position) {
    case "top":
      return "rounded-b-lg"
    case "right":
      return "rounded-l-lg"
    case "bottom":
      return "rounded-t-lg"
    case "left":
      return "rounded-r-lg"
    case "center":
      return "rounded-lg"
    default:
      return "rounded-t-lg"
  }
})

// 阻止默认的触摸行为
const preventTouchMove = (event: TouchEvent) => {
  event.preventDefault()
}

// 关闭弹窗
const close = () => {
  emits("update:visible", false)
  emits("close")

  // 延迟触发closed事件，等待动画结束
  setTimeout(() => {
    emits("closed")
  }, 300)
}

// 监听可见性变化
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        emits("open")
        // 延迟触发opened事件，等待动画结束
        setTimeout(() => {
          emits("opened")
        }, 300)
      })
    }
  },
)

// 组件卸载时确保清理
onUnmounted(() => {
  if (props.visible) {
    emits("update:visible", false)
  }
})
</script>

<style>
/* 动画效果 */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

.animate-slide-left {
  animation: slideLeft 0.3s ease-out;
}

.animate-slide-right {
  animation: slideRight 0.3s ease-out;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-left {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slide-right {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.popup-content {
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.popup-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
