<template>
  <view
    :class="[
      // 边框样式
      {
        'border-solid': borderStyle === 'solid' || !borderStyle,
        'border-dashed': borderStyle === 'dashed',
        'border-dotted': borderStyle === 'dotted',
        'border-double': borderStyle === 'double',
        'border-hidden': borderStyle === 'hidden',
        'border-none': borderStyle === 'none',
      },
      // 边框位置
      {
        border: position === 'all' || !position,
        'border-t': position === 'top',
        'border-r': position === 'right',
        'border-b': position === 'bottom',
        'border-l': position === 'left',
        'border-x': position === 'x',
        'border-y': position === 'y',
      },
      // 边框厚度
      {
        border: thickness === 'normal' || !thickness,
        'border-0': thickness === '0',
        'border-2': thickness === '2',
        'border-4': thickness === '4',
        'border-8': thickness === '8',
      },
      // 边框颜色
      {
        'border-transparent': color === 'transparent',
        'border-current': color === 'current',
        'border-primary': color === 'primary',
        'border-success': color === 'success',
        'border-warning': color === 'warning',
        'border-danger': color === 'danger',
        'border-info': color === 'info',
        'border-gray-100': color === 'gray-100',
        'border-gray-200': color === 'gray-200',
        'border-gray-300': color === 'gray-300',
        'border-gray-400': color === 'gray-400',
        'border-gray-500': color === 'gray-500',
        'border-gray-600': color === 'gray-600',
        'border-gray-700': color === 'gray-700',
        'border-gray-800': color === 'gray-800',
        'border-gray-900': color === 'gray-900',
      },
      // 圆角
      {
        'rounded-none': rounded === 'none',
        'rounded-sm': rounded === 'sm',
        rounded: rounded === 'normal',
        'rounded-md': rounded === 'md',
        'rounded-lg': rounded === 'lg',
        'rounded-xl': rounded === 'xl',
        'rounded-2xl': rounded === '2xl',
        'rounded-3xl': rounded === '3xl',
        'rounded-full': rounded === 'full',
      },
      customClass,
    ]"
    :style="customStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup>
defineProps({
  /** 边框样式 */
  borderStyle: {
    type: String,
    default: "solid",
    validator: (value) => {
      return ["solid", "dashed", "dotted", "double", "hidden", "none"].includes(value)
    },
  },
  /** 边框位置 */
  position: {
    type: String,
    default: "all",
    validator: (value) => {
      return ["all", "top", "right", "bottom", "left", "x", "y"].includes(value)
    },
  },
  /** 边框厚度 */
  thickness: {
    type: String,
    default: "normal",
    validator: (value) => {
      return ["0", "normal", "2", "4", "8"].includes(value)
    },
  },
  /** 边框颜色 */
  color: {
    type: String,
    default: "gray-300",
    validator: (value) => {
      return [
        "transparent",
        "current",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "gray-100",
        "gray-200",
        "gray-300",
        "gray-400",
        "gray-500",
        "gray-600",
        "gray-700",
        "gray-800",
        "gray-900",
      ].includes(value)
    },
  },
  /** 圆角 */
  rounded: {
    type: String,
    default: "none",
    validator: (value) => {
      return ["none", "sm", "normal", "md", "lg", "xl", "2xl", "3xl", "full"].includes(value)
    },
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: "",
  },
  /** 自定义样式 */
  customStyle: {
    type: String,
    default: "",
  },
})
</script>
