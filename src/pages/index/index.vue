<template>
  <view>
    <up-swiper :list="swiperList" indicator indicatorMode="dot"></up-swiper>

    <view class="mt-4">
      <up-scroll-list>
        <view v-for="(item, index) in scrollList" :key="index">
          <image :src="item.thumb" class="w-[200rpx] h-[200rpx]"></image>
        </view>
      </up-scroll-list>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
const swiperList = reactive([
  "https://cdn.uviewui.com/uview/swiper/swiper1.png",
  "https://cdn.uviewui.com/uview/swiper/swiper2.png",
  "https://cdn.uviewui.com/uview/swiper/swiper3.png",
])
const scrollList = reactive([
  {
    thumb: "https://cdn.uviewui.com/uview/goods/1.jpg",
  },
  {
    thumb: "https://cdn.uviewui.com/uview/goods/2.jpg",
  },
  {
    thumb: "https://cdn.uviewui.com/uview/goods/3.jpg",
  },
  {
    thumb: "https://cdn.uviewui.com/uview/goods/4.jpg",
  },
  {
    thumb: "https://cdn.uviewui.com/uview/goods/5.jpg",
  },
])
</script>

<style lang="scss" scoped></style>
