<template>
  <view>
    <up-swiper :list="swiperList" indicator indicatorMode="dot"></up-swiper>
    自定义图标：
    <view class="i-ri-add-fill" />
    <up-button type="primary" @click="toOrderDetail">跳转分包页面</up-button>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
const swiperList = reactive([
  "https://cdn.uviewui.com/uview/swiper/swiper1.png",
  "https://cdn.uviewui.com/uview/swiper/swiper2.png",
  "https://cdn.uviewui.com/uview/swiper/swiper3.png",
])
const toOrderDetail = () => {
  uni.navigateTo({
    url: "/pages-sub/orderDetail/index",
  })
}
</script>

<style lang="scss" scoped></style>
