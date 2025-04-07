<template>
  <view>
    <!-- 消息提示组件 -->
    <view
      v-if="visible"
      class="fixed left-0 right-0 z-50 flex justify-center"
      :class="[
        // 位置
        {
          'top-10': position === 'top',
          'bottom-10': position === 'bottom',
          'top-1/2 -translate-y-1/2': position === 'center',
        },
        customClass,
      ]"
    >
      <view
        class="min-w-64 max-w-[90%] px-4 py-3 rounded-md shadow-lg flex items-center transition-all duration-300"
        :class="[
          // 类型样式
          {
            'bg-primary text-white': type === 'primary',
            'bg-success text-white': type === 'success',
            'bg-warning text-white': type === 'warning',
            'bg-danger text-white': type === 'danger',
            'bg-info text-white': type === 'info',
            'bg-white text-gray-700 border border-gray-200': type === 'default',
          },
          // 淡入淡出动画
          {
            'opacity-0 translate-y-[-20px]': !appeared && position === 'top',
            'opacity-0 translate-y-[20px]': !appeared && position === 'bottom',
            'opacity-0 scale-90': !appeared && position === 'center',
            'opacity-100 translate-y-0 scale-100': appeared,
          },
        ]"
      >
        <!-- 图标 -->
        <text v-if="showIcon" class="mr-2">
          <text v-if="type === 'primary'" class="i-ri-information-line"></text>
          <text v-else-if="type === 'success'" class="i-ri-checkbox-circle-line"></text>
          <text v-else-if="type === 'warning'" class="i-ri-alert-line"></text>
          <text v-else-if="type === 'danger'" class="i-ri-close-circle-line"></text>
          <text v-else-if="type === 'info'" class="i-ri-information-line"></text>
          <text v-else class="i-ri-message-3-line"></text>
        </text>

        <!-- 消息内容 -->
        <text class="flex-1">{{ message }}</text>

        <!-- 关闭按钮 -->
        <text
          v-if="closable"
          @tap="handleClose"
          class="ml-2 text-xs opacity-70 hover:opacity-100 cursor-pointer"
        >
          <text class="i-ri-close-line"></text>
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  /** 消息内容 */
  message: {
    type: String,
    default: "",
  },
  /** 消息类型 */
  type: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["default", "primary", "success", "warning", "danger", "info"].includes(value)
    },
  },
  /** 显示时长(毫秒)，0为不自动关闭 */
  duration: {
    type: Number,
    default: 3000,
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: "",
  },
  /** 显示位置 */
  position: {
    type: String,
    default: "top",
    validator: (value) => {
      return ["top", "center", "bottom"].includes(value)
    },
  },
  /** 是否可关闭 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 关闭时的回调函数 */
  onClose: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(["close"])

// 控制消息显示状态
const visible = ref(false)
const appeared = ref(false)
let timer = null

// 显示消息
const show = () => {
  visible.value = true
  // 使用nextTick确保DOM更新后再添加动画class
  setTimeout(() => {
    appeared.value = true
  }, 50)

  // 设置自动关闭
  if (props.duration > 0) {
    timer = setTimeout(() => {
      hide()
    }, props.duration)
  }
}

// 隐藏消息
const hide = () => {
  appeared.value = false
  // 等待动画结束后移除DOM
  setTimeout(() => {
    visible.value = false
    emit("close")
    if (typeof props.onClose === "function") {
      props.onClose()
    }
  }, 300) // 300ms等于动画时长
}

// 关闭按钮点击处理
const handleClose = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  hide()
}

// 生命周期钩子
onMounted(() => {
  show()
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

// 暴露方法
defineExpose({
  hide,
})
</script>
