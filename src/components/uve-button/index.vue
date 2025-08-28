<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium text-center whitespace-nowrap transition-all duration-300 ease-in-out relative overflow-hidden',
      type === 'default'
        ? 'border border-gray-300 bg-white border-default text-defualt'
        : 'border border-transparent',
      {
        'text-white !bg-primary shadow-primary': type === 'primary' && !plain,
        'text-white !bg-success shadow-success': type === 'success' && !plain,
        'text-white !bg-warning shadow-warning': type === 'warning' && !plain,
        'text-white !bg-danger shadow-danger': type === 'danger' && !plain,
        'text-white !bg-info shadow-info': type === 'info' && !plain,
      },
      {
        'bg-white border-default': plain,
        'text-primary hover:bg-primary/10 hover:border-primary/50': plain && type === 'primary',
        'text-success hover:bg-success/10 hover:border-success/50': plain && type === 'success',
        'text-warning hover:bg-warning/10 hover:border-warning/50': plain && type === 'warning',
        'text-danger hover:bg-danger/10 hover:border-danger/50': plain && type === 'danger',
        'text-info hover:bg-info/10 hover:border-info/50': plain && type === 'info',
      },
      {
        'h-11 px-6 text-base rounded-lg': size === 'large',
        'h-10 px-4 text-sm rounded-md': size === 'normal',
        'h-8 px-3 text-xs rounded': size === 'small',
        'h-6 px-2 text-xs rounded': size === 'mini',
      },
      { 'rounded-full': round },
      { 'flex w-full': block },
      { 'cursor-not-allowed opacity-50': disabled },
      { 'opacity-90': loading && !disabled },
      'after:border-none',
      customClass,
    ]"
    :style="customStyle"
    :disabled="disabled"
    :hover-class="disabled || loading ? '' : 'transform scale-95'"
    hover-stay-time="150"
    @click="handleClick"
  >
    <!-- 波纹效果 -->
    <view
      v-if="!disabled && !loading && rippleEffect"
      class="absolute inset-0 bg-white/20 rounded-inherit animate-ping"
      :class="{ 'animate-pulse': !isPressed }"
    ></view>

    <!-- 加载状态 -->
    <view
      v-if="loading"
      class="loading-spinner inline-block w-5 h-5 mr-2"
      :style="{
        border: `3px solid ${!plain && type !== 'default' ? '#ffffff' : '#333333'}`,
        borderTop: `3px solid transparent`,
        borderRadius: '50%',
      }"
    ></view>

    <!-- 按钮内容 -->
    <view class="relative z-10 flex items-center justify-center">
      <slot></slot>
    </view>
  </button>
</template>

<script setup lang="ts">
interface Props {
  /** 按钮类型 */
  type?: "primary" | "success" | "warning" | "danger" | "info" | "default"
  /** 按钮尺寸 */
  size?: "large" | "normal" | "small" | "mini"
  /** 是否为块级元素 */
  block?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为朴素按钮 */
  plain?: boolean
  /** 是否为圆角按钮 */
  round?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否显示波纹效果 */
  ripple?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "default",
  size: "normal",
  block: false,
  disabled: false,
  plain: false,
  round: false,
  loading: false,
  ripple: true,
  customClass: "",
  customStyle: "",
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()

const isPressed = ref(false)
const rippleEffect = ref(false)

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return

  // 触发波纹效果
  if (props.ripple) {
    rippleEffect.value = true
    setTimeout(() => {
      rippleEffect.value = false
    }, 600)
  }

  emit("click", event)
}

// 按钮按下效果
const handleTouchStart = () => {
  if (!props.disabled && !props.loading) {
    isPressed.value = true
  }
}

const handleTouchEnd = () => {
  isPressed.value = false
}
</script>
<style lang="scss" scoped>
// 修复拼写错误
.border-default {
  border: 0.5px solid #e5e7eb;
}

// 阴影效果
.shadow-primary {
  box-shadow: 0 2px 4px rgb(0 122 255 / 30%);
}

.shadow-success {
  box-shadow: 0 2px 4px rgb(76 217 100 / 30%);
}

.shadow-warning {
  box-shadow: 0 2px 4px rgb(240 173 78 / 30%);
}

.shadow-danger {
  box-shadow: 0 2px 4px rgb(230 67 64 / 30%);
}

.shadow-info {
  box-shadow: 0 2px 4px rgb(144 147 153 / 30%);
}

@keyframes button-ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(4);
    opacity: 0;
  }
}

// 改进的波纹效果
.animate-ripple {
  animation: button-ripple 0.6s linear;
}

// 加载状态样式优化
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

// 加载状态特殊样式
button:has(.loading-spinner) {
  position: relative;
  overflow: hidden;
}

// 加载图标样式
.loading-spinner {
  animation: spin 1s linear infinite;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
