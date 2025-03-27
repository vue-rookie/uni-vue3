<template>
  <view class="flex items-center h-full w-full flex-col h-screen">
    <view class="w-full pb-5 font-500">
      <view class="text-[44rpx] text-center px-[64rpx] text-[#060B2D]]">您好,</view>
      <view class="text-[44rpx] text-center px-[64rpx] text-[#060B2D]">欢迎使用uni-vue3</view>
    </view>
    <view class="bg-white w-full login-wrap">
      <view class="mt-[180rpx] text-center px-[64rpx]">
        <button
          type="primary"
          :open-type="agree ? 'getPhoneNumber' : ''"
          @getphonenumber="getPhoneNumber"
          @click.stop="checkedAgree"
          class="login-btn"
        >
          手机号快捷登录
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user"
import { usePageScroll } from "@/hooks/usePageScroll"
const userStore = useUserStore()
const agree = ref<boolean>(false)
const isErrorStatus = ref<boolean>(false)

const getPhoneNumber = async (e) => {
  console.log(e)

  uni.showToast({
    icon: "success",
    title: "登录成功",
    duration: 3000,
  })
  loginSuccessDeal()
}
const loginSuccessDeal = () => {
  uni.switchTab({
    url: "/pages/index/index",
  })
}
const toLogin = (type) => {
  uni.navigateTo({
    url: `/pages-sub/login/loginForm?type=${type}`,
  })
}
const checkedAgree = () => {
  if (!agree.value) {
    isErrorStatus.value = true
    setTimeout(() => {
      isErrorStatus.value = false
    }, 500)
    uni.showToast({
      title: "请先阅读并勾选协议",
      icon: "none",
      duration: 3000,
    })
    uni.vibrateShort()
  }
}
const handleChange = (e) => {
  console.log(e)
}
</script>
<style lang="scss">
.circle {
  border: 2rpx solid #ccd4dd;
  box-shadow: 0 2px 4px rgb(6 11 45 / 6%);
}

.login-wrap {
  height: 100%;
  border-radius: 32rpx 32rpx 0;
  box-shadow: 0 4rpx 64rpx 0 rgb(6 11 45 / 8%);
}

.error-status {
  animation: shake 0.5s !important;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  15% {
    transform: translateX(-10rpx);
  }

  30% {
    transform: translateX(10rpx);
  }

  45% {
    transform: translateX(-10rpx);
  }

  60% {
    transform: translateX(10rpx);
  }

  75% {
    transform: translateX(-10rpx);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
