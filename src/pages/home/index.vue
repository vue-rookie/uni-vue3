<template>
  <CommonPageLayout title="我的" :leftArrow="false">
    <!-- 个人信息部分 -->
    <view class="mt-4">这是一个自定义导航栏页面</view>
    自定义图标：
    <view class="i-ri-add-fill" />
    <up-button type="primary" @click="toOrderDetail">跳转分包页面</up-button>
  </CommonPageLayout>
</template>

<script lang="ts" setup>
import CommonPageLayout from "@/layouts/CommonPageLayout/index.vue"
const toOrderDetail = () => {
  uni.navigateTo({
    url: "/pages-sub/orderDetail/index",
  })
}
</script>

<style lang="scss" scoped></style>
