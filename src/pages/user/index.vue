<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 用户信息 -->
    <view class="mt-3 bg-white">
      <view class="flex items-center px-4 py-4">
        <view class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <text class="i-ri-user-line text-3xl"></text>
        </view>
        <view class="ml-4 flex-1">
          <view class="text-lg font-medium">用户名</view>
          <view class="text-sm text-gray-500 mt-1">ID: 123456789</view>
        </view>
        <view class="text-gray-400">
          <text class="i-ri-arrow-right-s-line inline-block"></text>
        </view>
      </view>
    </view>

    <!-- 主要功能 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">主要功能</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/order/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-bill-line"></text>
            </view>
            <text>我的订单</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/address/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-map-pin-line"></text>
            </view>
            <text>收货地址</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/coupon/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-coupon-line"></text>
            </view>
            <text>优惠券</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 其他功能 -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">其他功能</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="navigateTo('/pages-sub/feedback/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-feedback-line"></text>
            </view>
            <text>意见反馈</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="navigateTo('/pages-sub/about/index')"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-information-line"></text>
            </view>
            <text>关于我们</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="mt-3 mb-3 px-4">
      <button
        @click="handleLogout"
        class="w-full py-2 bg-white text-red-500 rounded-md active:bg-gray-50"
      >
        退出登录
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        // 这里添加退出登录的逻辑
        uni.showToast({
          title: "退出成功",
          icon: "success",
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    },
  })
}
</script>
