<script setup lang="ts">
import { computed } from "vue"
/**
 * 比如自定义一个组件
 */
const props = withDefaults(
  defineProps<{
    content?: string
    type?: "warning" | "success" | "primary" | "danger" | "info"
    size: number
  }>(),
  {
    size: 128,
  },
)

const stampColor = computed(() => {
  switch (props.type) {
    case "warning":
      return "#FFCD80"
    case "success":
      return "#A4E795"
    case "primary":
      return "#88D0FF"
    case "danger":
      return "#F39B98"
    case "info":
      return "#9B59B6"
    default:
      return "#A4E795"
  }
})
</script>

<template>
  <view class="order-stamp" :style="`color:${stampColor}`">
    <view :class="`icon icon-stamp w-[100%] h-[100%] relative text-[48rpx] ${type}`">
      <view
        class="text-[24rpx] px-2 py-1 order-stamp-content font-700"
        :style="`color:${stampColor};border:2rpx solid ${stampColor};`"
      >
        {{ content }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.order-stamp {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: max-content;
    background: #fff;
    transform: translate(-50%, -50%) rotate(-25deg);
  }
  .icon-stamp:before {
    font-size: 180rpx;
    color: #a4e795;
  }
  .success:before {
    color: #a4e795;
  }
  .warning:before {
    color: #ffcd80;
  }
  .primary:before {
    color: #88d0ff;
  }
  .danger:before {
    color: #f39b98;
  }
  .info:before {
    color: #e74c3c;
  }
}
</style>
