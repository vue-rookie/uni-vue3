<template>
  <view
    class="w-9/10 m-auto bg-white rounded-3 pt-5 mb-4 shadow-[0_4rpx_64rpx_0_rgba(6,11,45,0.08)] mt-[32rpx]"
  >
    <view class="w-full flex">
      <view class="rounded-r-lg w-1 h-6" :style="`background: ${linearBg}`"></view>
      <view class="text-[30rpx] pl-4 font-medium">{{ title }}</view>
    </view>
    <view class="pr-5 py-4">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
defineOptions({
  name: "driverCard",
})
const props = defineProps<{
  linearBg: string
  title: string
}>()
</script>

<style scoped></style>
