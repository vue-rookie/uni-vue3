<template>
  <view
    :class="[
      'bg-white rounded-lg overflow-hidden transition-all duration-200',
      sizeClasses,
      variantClasses,
      {
        'shadow-sm': shadow && variant !== 'elevated',
        'shadow-lg': shadow && variant === 'elevated',
        'border border-gray-200': border || variant === 'outlined',
        'hover:shadow-md hover:scale-105': hover,
        'cursor-pointer': clickable,
        'active:scale-95': clickable,
      },
    ]"
    @click="handleClick"
  >
    <!-- 卡片头部 -->
    <view v-if="$slots.header || title" class="mb-3">
      <slot name="header">
        <view class="text-lg font-semibold text-gray-900">{{ title }}</view>
        <view v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</view>
      </slot>
    </view>

    <!-- 卡片内容 -->
    <view class="flex-1">
      <slot></slot>
    </view>

    <!-- 卡片底部 -->
    <view v-if="$slots.footer" class="mt-3 pt-3 border-t border-gray-100">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Props {
  // 卡片尺寸
  size?: "small" | "medium" | "large"
  // 卡片变体
  variant?: "default" | "outlined" | "filled" | "elevated"
  // 是否显示阴影
  shadow?: boolean
  // 是否显示边框
  border?: boolean
  // 是否支持悬停效果
  hover?: boolean
  // 是否可点击
  clickable?: boolean
  // 标题
  title?: string
  // 副标题
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  variant: "default",
  shadow: true,
  border: false,
  hover: false,
  clickable: false,
  title: "",
  subtitle: "",
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const sizeClasses = computed(() => {
  const sizeMap = {
    small: "p-3",
    medium: "p-4",
    large: "p-6",
  }
  return sizeMap[props.size]
})

const variantClasses = computed(() => {
  const variantMap = {
    default: "bg-white",
    outlined: "bg-white border border-gray-200",
    filled: "bg-gray-50",
    elevated: "bg-white shadow-lg",
  }
  return variantMap[props.variant]
})

const handleClick = (event: Event) => {
  if (props.clickable) {
    emit("click", event)
  }
}
</script>
