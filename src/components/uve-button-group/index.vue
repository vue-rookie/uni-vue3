<template>
  <view 
    class="uve-button-group"
    :class="[
      'inline-flex',
      {
        'flex-col': direction === 'vertical',
        'flex-row': direction === 'horizontal',
        'w-full': block,
      },
      customClass
    ]"
    :style="customStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
interface Props {
  /** 按钮组方向 */
  direction?: 'horizontal' | 'vertical'
  /** 是否为块级元素 */
  block?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  block: false,
  customClass: '',
  customStyle: '',
})
</script>

<style lang="scss" scoped>
.uve-button-group {
  // 水平布局
  &.flex-row {
    :deep(.uve-button) {
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
        position: relative;
      }
      
      &:focus,
      &:focus-visible {
        z-index: 2;
        position: relative;
      }
    }
  }
  
  // 垂直布局
  &.flex-col {
    :deep(.uve-button) {
      margin: 0;
      width: 100%;
      
      &:not(:first-child) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: -1px;
      }
      
      &:not(:last-child) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      
      &:hover {
        z-index: 1;
        position: relative;
      }
      
      &:focus,
      &:focus-visible {
        z-index: 2;
        position: relative;
      }
    }
  }
}
</style>