<template>
  <button
    :class="[
      'uve-button',
      'inline-flex items-center justify-center px-4 text-sm text-center whitespace-nowrap cursor-pointer transition-all duration-300 ease-out select-none relative overflow-hidden',
      // 按钮形状
      {
        'rounded': !round && !circle && !square,
        'rounded-full': round || circle,
        'rounded-none': square,
        'aspect-square': circle,
        'min-w-0 p-0': circle,
      },
      // 默认按钮样式
      type === 'default'
        ? 'border border-gray-300 text-gray-700 bg-white border-default hover:border-gray-400 hover:bg-gray-50'
        : 'border border-transparent',
      // 标准按钮类型
      {
        'text-white bg-primary border-primary hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg': 
          type === 'primary' && !plain && !ghost && !outline,
        'text-white bg-success border-success hover:bg-success-600 active:bg-success-700 shadow-md hover:shadow-lg': 
          type === 'success' && !plain && !ghost && !outline,
        'text-white bg-warning border-warning hover:bg-warning-600 active:bg-warning-700 shadow-md hover:shadow-lg': 
          type === 'warning' && !plain && !ghost && !outline,
        'text-white bg-danger border-danger hover:bg-danger-600 active:bg-danger-700 shadow-md hover:shadow-lg': 
          type === 'danger' && !plain && !ghost && !outline,
        'text-white bg-info border-info hover:bg-info-600 active:bg-info-700 shadow-md hover:shadow-lg': 
          type === 'info' && !plain && !ghost && !outline,
      },
      // 朴素按钮
      {
        'bg-white border-default': plain && !ghost && !outline,
        'text-primary border-primary bg-primary/10 hover:bg-primary hover:text-white':
          plain && type === 'primary',
        'text-success border-success bg-success/10 hover:bg-success hover:text-white': 
          plain && type === 'success',
        'text-warning border-warning bg-warning/10 hover:bg-warning hover:text-white': 
          plain && type === 'warning',
        'text-danger border-danger bg-danger/10 hover:bg-danger hover:text-white': 
          plain && type === 'danger',
        'text-info border-info bg-info/10 hover:bg-info hover:text-white': 
          plain && type === 'info',
      },
      // 幽灵按钮
      {
        'bg-transparent border-transparent': ghost,
        'text-primary hover:bg-primary/10 active:bg-primary/20': ghost && type === 'primary',
        'text-success hover:bg-success/10 active:bg-success/20': ghost && type === 'success',
        'text-warning hover:bg-warning/10 active:bg-warning/20': ghost && type === 'warning',
        'text-danger hover:bg-danger/10 active:bg-danger/20': ghost && type === 'danger',
        'text-info hover:bg-info/10 active:bg-info/20': ghost && type === 'info',
        'text-gray-600 hover:bg-gray/10 active:bg-gray/20': ghost && type === 'default',
      },
      // 边框按钮
      {
        'bg-transparent border-2': outline,
        'text-primary border-primary hover:bg-primary hover:text-white': outline && type === 'primary',
        'text-success border-success hover:bg-success hover:text-white': outline && type === 'success',
        'text-warning border-warning hover:bg-warning hover:text-white': outline && type === 'warning',
        'text-danger border-danger hover:bg-danger hover:text-white': outline && type === 'danger',
        'text-info border-info hover:bg-info hover:text-white': outline && type === 'info',
        'text-gray-600 border-gray-400 hover:bg-gray-600 hover:text-white': outline && type === 'default',
      },
      // 渐变背景
      {
        'bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700': 
          gradient && type === 'primary' && !plain && !ghost && !outline,
        'bg-gradient-to-r from-success to-success-600 hover:from-success-600 hover:to-success-700': 
          gradient && type === 'success' && !plain && !ghost && !outline,
        'bg-gradient-to-r from-warning to-warning-600 hover:from-warning-600 hover:to-warning-700': 
          gradient && type === 'warning' && !plain && !ghost && !outline,
        'bg-gradient-to-r from-danger to-danger-600 hover:from-danger-600 hover:to-danger-700': 
          gradient && type === 'danger' && !plain && !ghost && !outline,
        'bg-gradient-to-r from-info to-info-600 hover:from-info-600 hover:to-info-700': 
          gradient && type === 'info' && !plain && !ghost && !outline,
      },
      // 按钮尺寸
      {
        'h-12 px-6 text-base font-medium': size === 'large' && !circle,
        'h-10 px-4': size === 'normal' && !circle,
        'h-8 px-3 text-xs': size === 'small' && !circle,
        'h-6 px-2 text-xs': size === 'mini' && !circle,
        // 圆形按钮尺寸
        'w-12 h-12 text-base': circle && size === 'large',
        'w-10 h-10': circle && size === 'normal',
        'w-8 h-8 text-xs': circle && size === 'small',
        'w-6 h-6 text-xs': circle && size === 'mini',
      },
      // 块级按钮
      { 'flex w-full': block },
      // 禁用状态
      { 
        'cursor-not-allowed opacity-50 pointer-events-none': disabled || loading,
        'hover:transform-none hover:shadow-none': disabled || loading,
      },
      // 动画效果
      {
        'hover:scale-105 hover:-translate-y-0.5 active:scale-95': 
          !disabled && !loading && animation === 'bounce',
        'hover:rotate-3 active:rotate-0': 
          !disabled && !loading && animation === 'rotate',
        'hover:skew-x-3 active:skew-x-0': 
          !disabled && !loading && animation === 'skew',
      },
      // 自定义类名
      customClass,
    ]"
    :style="customStyle"
    :disabled="disabled || loading"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 波纹效果 -->
    <view 
      v-if="ripple && !disabled && !loading" 
      class="absolute inset-0 overflow-hidden rounded-inherit"
    >
      <view 
        v-for="(rippleItem, index) in rippleItems" 
        :key="index"
        class="absolute bg-white/20 rounded-full animate-ping"
        :style="{
          left: rippleItem.x + 'px',
          top: rippleItem.y + 'px',
          width: rippleItem.size + 'px',
          height: rippleItem.size + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      ></view>
    </view>
    
    <!-- 前置图标 -->
    <view 
      v-if="prefixIcon && !loading" 
      class="flex items-center justify-center"
      :class="{
        'mr-2': !circle && $slots.default,
        'mr-1': size === 'small' || size === 'mini',
      }"
    >
      <text class="iconfont" :class="prefixIcon" :style="{ fontSize: iconSize }"></text>
    </view>
    
    <!-- 加载动画 -->
    <view
      v-if="loading"
      class="flex items-center justify-center"
      :class="{ 'mr-2': !circle && $slots.default }"
    >
      <view class="uve-loading" :class="loadingClass"></view>
    </view>
    
    <!-- 按钮内容 -->
    <view v-if="!circle || (!prefixIcon && !suffixIcon && !loading)" class="flex items-center">
      <slot></slot>
    </view>
    
    <!-- 后置图标 -->
    <view 
      v-if="suffixIcon && !loading" 
      class="flex items-center justify-center"
      :class="{
        'ml-2': !circle && $slots.default,
        'ml-1': size === 'small' || size === 'mini',
      }"
    >
      <text class="iconfont" :class="suffixIcon" :style="{ fontSize: iconSize }"></text>
    </view>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface RippleItem {
  x: number
  y: number
  size: number
}

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
  /** 是否为幽灵按钮 */
  ghost?: boolean
  /** 是否为边框按钮 */
  outline?: boolean
  /** 是否为圆角按钮 */
  round?: boolean
  /** 是否为圆形按钮 */
  circle?: boolean
  /** 是否为正方形按钮 */
  square?: boolean
  /** 是否启用渐变背景 */
  gradient?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 前置图标 */
  prefixIcon?: string
  /** 后置图标 */
  suffixIcon?: string
  /** 是否启用波纹效果 */
  ripple?: boolean
  /** 动画效果类型 */
  animation?: "none" | "bounce" | "rotate" | "skew"
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
  ghost: false,
  outline: false,
  round: false,
  circle: false,
  square: false,
  gradient: false,
  loading: false,
  prefixIcon: "",
  suffixIcon: "",
  ripple: false,
  animation: "none",
  customClass: "",
  customStyle: "",
})

const emit = defineEmits<{
  (e: "click", event: Event): void
  (e: "touchstart", event: TouchEvent): void
  (e: "touchend", event: TouchEvent): void
}>()

// 波纹效果
const rippleItems = ref<RippleItem[]>([])

// 图标尺寸计算
const iconSize = computed(() => {
  const sizeMap = {
    mini: '10px',
    small: '12px',
    normal: '14px',
    large: '16px'
  }
  return sizeMap[props.size]
})

// 加载动画类名
const loadingClass = computed(() => {
  const sizeMap = {
    mini: 'w-2.5 h-2.5',
    small: 'w-3 h-3',
    normal: 'w-3.5 h-3.5',
    large: 'w-4 h-4'
  }
  return sizeMap[props.size]
})

// 创建波纹效果
const createRipple = (event: Event) => {
  if (!props.ripple || props.disabled || props.loading) return
  
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  let clientX: number, clientY: number
  
  if (event instanceof TouchEvent) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  } else if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    return
  }
  
  const x = clientX - rect.left
  const y = clientY - rect.top
  const size = Math.max(rect.width, rect.height) * 2
  
  const ripple: RippleItem = { x, y, size }
  rippleItems.value.push(ripple)
  
  // 1秒后移除波纹
  setTimeout(() => {
    const index = rippleItems.value.indexOf(ripple)
    if (index > -1) {
      rippleItems.value.splice(index, 1)
    }
  }, 1000)
}

const handleClick = (event: Event) => {
  if (props.disabled || props.loading) return
  createRipple(event)
  emit("click", event)
}

const handleTouchStart = (event: TouchEvent) => {
  if (props.disabled || props.loading) return
  createRipple(event)
  emit("touchstart", event)
}

const handleTouchEnd = (event: TouchEvent) => {
  if (props.disabled || props.loading) return
  emit("touchend", event)
}
</script>
<style lang="scss">
.border-default {
  border: 1px solid #dcdfe6;
}

.uve-button {
  // 基础样式
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  // 按钮动画效果
  &:not(:disabled):not(.pointer-events-none) {
    &:hover {
      transform: translateY(-1px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:active {
      transform: translateY(0);
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  
  // 渐变动画
  &.bg-gradient-to-r {
    background-size: 200% 100%;
    transition: all 0.3s ease;
    
    &:hover {
      background-position: 100% 0;
    }
  }
  
  // 阴影效果增强
  &.shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  &.hover\\:shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

// 加载动画
.uve-loading {
  border: 2px solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
  animation: uve-spin 1s linear infinite;
}

@keyframes uve-spin {
  to {
    transform: rotate(360deg);
  }
}

// 波纹动画增强
@keyframes uve-ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

.animate-ping {
  animation: uve-ripple 0.6s cubic-bezier(0, 0, 0.2, 1);
}

// 弹跳动画
@keyframes uve-bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

// 旋转动画
@keyframes uve-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 按钮组样式
.uve-button-group {
  display: inline-flex;
  
  .uve-button {
    margin: 0;
    
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: -1px;
    }
    
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    &:hover {
      z-index: 1;
    }
    
    &:focus {
      z-index: 2;
    }
  }
}

// 响应式优化
@media (max-width: 640px) {
  .uve-button {
    &.h-12 {
      height: 2.75rem; // 44px - 更适合移动端触摸
      min-height: 44px;
    }
    
    &.h-10 {
      height: 2.5rem; // 40px
      min-height: 40px;
    }
  }
}

// 深色模式支持
@media (prefers-color-scheme: dark) {
  .uve-button {
    &.bg-white {
      background-color: #1f2937;
      color: #f9fafb;
      border-color: #374151;
      
      &:hover {
        background-color: #374151;
        border-color: #4b5563;
      }
    }
    
    &.text-gray-700 {
      color: #f9fafb;
    }
    
    &.border-default {
      border-color: #374151;
    }
  }
}

// 无障碍优化
.uve-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

// 打印样式优化
@media print {
  .uve-button {
    background: transparent !important;
    border: 1px solid #000 !important;
    color: #000 !important;
    box-shadow: none !important;
  }
}
</style>
