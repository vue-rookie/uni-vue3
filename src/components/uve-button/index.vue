<template>
  <button
    :class="[
      'inline-flex items-center justify-center px-4 text-sm text-center whitespace-nowrap cursor-pointer rounded  transition-all duration-200',
      // 默认按钮样式
      type === 'default'
        ? 'border border-gray-300 text-gray-700 bg-white border-defualt'
        : 'border border-transparent',
      // 其他按钮类型
      {
        'text-white !bg-primary border-primary': type === 'primary' && !plain,
        'text-white !bg-success border-success': type === 'success' && !plain,
        'text-white !bg-warning border-warning': type === 'warning' && !plain,
        'text-white !bg-danger border-danger': type === 'danger' && !plain,
        'text-white !bg-info border-info': type === 'info' && !plain,
      },
      // 朴素按钮
      {
        'bg-white border-defualt': plain,
        'text-primary  hover:bg-primary bg-primary/50 hover:text-white':
          plain && type === 'primary',
        'text-success hover:bg-success bg-success/50 hover:text-white': plain && type === 'success',
        'text-warning hover:bg-warning bg-warning/50 hover:text-white': plain && type === 'warning',
        'text-danger hover:bg-danger bg-danger/50 hover:text-white': plain && type === 'danger',
        'text-info hover:bg-info bg-info/50 hover:text-white': plain && type === 'info',
      },
      // 按钮尺寸
      {
        'h-11 px-4 text-base': size === 'large',
        'h-10': size === 'normal',
        'h-8 px-2 text-xs': size === 'small',
        'h-6 px-2 text-xs': size === 'mini',
      },
      // 圆角按钮
      { 'rounded-full': round },
      // 块级按钮
      { 'flex w-full': block },
      // 禁用状态
      { 'cursor-not-allowed opacity-50': disabled || loading },
      // 自定义类名
      customClass,
    ]"
    :style="customStyle"
    :disabled="disabled || loading"
    :hover-class="disabled || loading ? '' : 'opacity-80 scale-98'"
    hover-stay-time="100"
    @click="handleClick"
  >
    <view
      v-if="loading"
      class="inline-block w-3.5 h-3.5 mr-1.5 border-2 border-current border-l-transparent rounded-full animate-spin"
    ></view>
    <slot></slot>
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
  customClass: "",
  customStyle: "",
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit("click", event)
}
</script>
<style lang="scss">
.border-defualt {
  border: 1px solid #dcdfe6;
}
</style>
