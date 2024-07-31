<template>
  <view class="min-h-full" :style="{ paddingTop: navHeight + 'rpx' }">
    <up-navbar
      safeAreaInsetTop
      :fixed="true"
      autoBack
      :title="title"
      :customStyle="`background:rgba(255,255,255,${opacity}`"
    ></up-navbar>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { usePageScroll } from "@/hooks/usePageScroll"
const { navHeight, opacity } = usePageScroll()
defineProps({
  isShowBack: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  leftArrow: {
    type: Boolean,
    default: true,
  },
  backPage: {
    type: String,
    default: "",
  },
})
</script>

<style scoped></style>
