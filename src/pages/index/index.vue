<template>
  <view>
    <view v-for="(layout, index) in body.bodyList" :key="index">
      <up-swiper
        :list="swiperList"
        indicator
        indicatorMode="dot"
        v-if="layout.type === 'banner'"
      ></up-swiper>

      <view class="mt-4" v-if="layout.type === 'card'">{{ layout.title }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import pageConfig from "@/config/style.config"
const { body } = pageConfig.layoutEnum?.indexPage || {}
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
