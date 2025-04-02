<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 常见页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">基础页面</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages/login/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-login-box-line text-blue-500"></text>
            </view>
            <text>登录注册</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/user/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-user-line text-blue-500"></text>
            </view>
            <text>个人中心</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/settings/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-settings-3-line text-blue-500"></text>
            </view>
            <text>系统设置</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 列表页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">列表页面</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages/news/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-newspaper-line text-orange-500"></text>
            </view>
            <text>新闻列表</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/goods/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-shopping-bag-line text-orange-500"></text>
            </view>
            <text>商品列表</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/message/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-message-2-line text-orange-500"></text>
            </view>
            <text>消息列表</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 详情页面 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">详情页面</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages/article/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-article-line text-green-500"></text>
            </view>
            <text>文章详情</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/product/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-box-3-line text-green-500"></text>
            </view>
            <text>商品详情</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/order/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-bill-line text-green-500"></text>
            </view>
            <text>订单详情</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能页面 -->
    <view class="mt-3 mb-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">功能页面</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages/map/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-map-pin-line text-purple-500"></text>
            </view>
            <text>地图导航</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/scan/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-qr-scan-line text-purple-500"></text>
            </view>
            <text>扫码功能</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages/payment/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-bank-card-line text-purple-500"></text>
            </view>
            <text>支付中心</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "页面示例",
  })
})

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}
</script>
