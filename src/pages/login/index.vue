<template>
  <view class="page-container bg-white min-h-screen flex flex-col">
    <!-- Logo区域 -->
    <view class="mt-12 mb-6 flex justify-center text-2xl font-bold text-[#060b2d]">
      你好，uni-vue3
    </view>

    <!-- 登录表单容器 -->
    <view class="px-10 w-full flex-1">
      <!-- 标签页切换部分 - 作为切换登录方式的入口 -->
      <view v-if="!showOtherLoginMethods" class="flex justify-between items-center mb-10">
        <text class="text-xl font-bold text-[#060b2d]">
          {{ loginTypeLabels[loginType] }}
        </text>
        <text class="text-sm text-[#06f]" @click="showOtherLoginMethods = true">其他登录方式</text>
      </view>

      <!-- 其他登录方式选择 -->
      <view v-if="showOtherLoginMethods" class="mb-10">
        <view class="flex items-center mb-5">
          <text
            class="i-ri-arrow-left-line mr-3 text-[#060b2d]"
            @click="showOtherLoginMethods = false"
          ></text>
          <text class="text-xl font-bold text-[#060b2d]">选择登录方式</text>
        </view>

        <view class="grid grid-cols-2 gap-5">
          <view
            v-for="(name, type) in loginTypeLabels"
            :key="type"
            class="flex flex-col items-center justify-center p-5 rounded-lg border border-gray-100 active:bg-gray-50"
            @click="switchLoginType(type)"
          >
            <view class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2">
              <text class="text-xl text-[#06f]" :class="loginTypeIcons[type]"></text>
            </view>
            <text class="text-[#060b2d]">{{ name }}</text>
          </view>
        </view>
      </view>

      <!-- 快捷授权登录 -->
      <view v-if="loginType === 'quick' && !showOtherLoginMethods" class="animate-fade-in">
        <view class="space-y-5">
          <button
            :open-type="agree ? 'getPhoneNumber' : ''"
            @getphonenumber="getPhoneNumber"
            @click.stop="checkedAgree"
            class="w-full py-3 rounded-xl active:opacity-90 text-white text-base font-medium bg-[#06f]"
          >
            快捷登录
          </button>

          <view class="flex items-center justify-center mt-3">
            <view
              class="w-5 h-5 rounded-full flex items-center justify-center mr-2 border-[1px]"
              :class="agree ? 'bg-[#06f] border-[#06f]' : 'border-gray-400 border-solid'"
              @click="agree = !agree"
            >
              <text v-if="agree" class="i-ri-check-line text-white text-xs"></text>
            </view>
            <text class="text-sm text-[#060b2d]">
              我已阅读并同意
              <text class="text-[#06f]">《用户注册协议》</text>
              和
              <text class="text-[#06f]">《隐私协议》</text>
            </text>
          </view>
        </view>
      </view>

      <!-- 密码登录 -->
      <view v-if="loginType === 'password' && !showOtherLoginMethods" class="animate-fade-in">
        <view class="space-y-5">
          <view class="flex items-center px-5 py-4 bg-gray-50 rounded-xl">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-phone-line text-[#060b2d]"></text>
            </view>
            <input
              v-model="phone"
              type="number"
              placeholder="请输入手机号码"
              class="flex-1 bg-transparent text-base focus:outline-none text-[#060b2d]"
            />
          </view>

          <view class="flex items-center px-5 py-4 bg-gray-50 rounded-xl">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-lock-line text-[#060b2d]"></text>
            </view>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              class="flex-1 bg-transparent text-base focus:outline-none text-[#060b2d]"
            />
            <view
              class="w-6 h-6 flex items-center justify-center"
              @click="showPassword = !showPassword"
            >
              <text v-if="showPassword" class="i-ri-eye-line text-[#060b2d]"></text>
              <text v-else class="i-ri-eye-off-line text-[#060b2d]"></text>
            </view>
          </view>

          <view class="flex justify-end">
            <text class="text-sm text-[#06f]" @click="navigateTo('/pages/forgot/index')">
              忘记密码?
            </text>
          </view>

          <button
            @click="handleLogin"
            class="w-full py-3 mt-3 rounded-xl active:opacity-90 text-white text-base font-medium bg-[#06f]"
          >
            登录
          </button>

          <view class="flex items-center justify-center mt-3">
            <view
              class="w-5 h-5 rounded-full flex items-center justify-center mr-2 border-[1px]"
              :class="agree ? 'bg-[#06f] border-[#06f]' : 'border-gray-400 border-solid'"
              @click="agree = !agree"
            >
              <text v-if="agree" class="i-ri-check-line text-white text-xs"></text>
            </view>
            <text class="text-sm text-[#060b2d]">
              我已阅读并同意
              <text class="text-[#06f]">《用户注册协议》</text>
              和
              <text class="text-[#06f]">《隐私协议》</text>
            </text>
          </view>
        </view>
      </view>

      <!-- 验证码登录 -->
      <view v-if="loginType === 'code' && !showOtherLoginMethods" class="animate-fade-in">
        <view class="space-y-5">
          <view class="flex items-center px-5 py-4 bg-gray-50 rounded-xl">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-phone-line text-[#060b2d]"></text>
            </view>
            <input
              v-model="phone"
              type="number"
              placeholder="请输入手机号码"
              class="flex-1 bg-transparent text-base focus:outline-none text-[#060b2d]"
            />
          </view>

          <view class="flex items-center px-5 py-2 bg-gray-50 rounded-xl">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-shield-keyhole-line text-[#060b2d]"></text>
            </view>
            <input
              v-model="code"
              type="number"
              placeholder="请输入验证码"
              class="flex-1 bg-transparent text-base focus:outline-none text-[#060b2d]"
            />
            <button
              @click="getCode"
              class="px-3 py-2 rounded-lg text-sm"
              :class="countdown > 0 ? 'text-gray-400 bg-gray-200' : 'text-white bg-[#06f]'"
              :disabled="countdown > 0"
            >
              {{ countdown > 0 ? `${countdown}s` : "获取验证码" }}
            </button>
          </view>

          <button
            @click="handleLogin"
            class="w-full py-3 mt-3 rounded-xl active:opacity-90 text-white text-base font-medium bg-[#06f]"
          >
            登录
          </button>

          <view class="flex items-center justify-center mt-3">
            <view
              class="w-5 h-5 rounded-full flex items-center justify-center mr-2 border-[1px]"
              :class="agree ? 'bg-[#06f] border-[#06f]' : 'border-gray-400 border-solid'"
              @click="agree = !agree"
            >
              <text v-if="agree" class="i-ri-check-line text-white text-xs"></text>
            </view>
            <text class="text-sm text-[#060b2d]">
              我已阅读并同意
              <text class="text-[#06f]">《用户注册协议》</text>
              和
              <text class="text-[#06f]">《隐私协议》</text>
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 注册入口 -->
    <view class="mt-auto mb-10 text-center">
      <text class="text-sm text-[#060b2d]">还没有账号？</text>
      <text @click="navigateTo('/pages/register/index')" class="text-sm ml-1 text-[#06f]">
        立即注册
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const phone = ref("")
const password = ref("")
const code = ref("")
const countdown = ref(0)
const agree = ref(false)
const showPassword = ref(false)
const showOtherLoginMethods = ref(false)
const loginType = ref("quick") // quick, password, code

// 登录类型标签
const loginTypeLabels = {
  quick: "快捷登录",
  password: "密码登录",
  code: "验证码登录",
}

// 登录类型图标
const loginTypeIcons = {
  quick: "i-ri-phone-line",
  password: "i-ri-lock-line",
  code: "i-ri-shield-keyhole-line",
}

// 切换登录类型
const switchLoginType = (type) => {
  loginType.value = type
  showOtherLoginMethods.value = false
}

const getCode = () => {
  if (countdown.value > 0) return
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleLogin = () => {
  // 这里添加登录逻辑
  console.log("登录信息：", {
    type: loginType.value,
    phone: phone.value,
    password: password.value,
    code: code.value,
  })
}

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

const checkedAgree = () => {
  if (!agree.value) {
    uni.showToast({
      title: "请先阅读并勾选协议",
      icon: "none",
      duration: 3000,
    })
    uni.vibrateShort()
  }
}

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}
</script>

<style>
.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
