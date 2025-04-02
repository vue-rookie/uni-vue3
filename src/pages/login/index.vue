<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 顶部导航 -->
    <view class="bg-white px-4 py-3 text-center text-lg font-medium border-b border-gray-100">
      登录注册
    </view>

    <!-- 登录表单 -->
    <view class="mt-6 px-4">
      <view class="bg-white rounded-lg shadow-sm p-4">
        <!-- 登录方式切换 -->
        <view class="flex items-center justify-center mb-4">
          <view
            @click="loginType = 'quick'"
            class="flex-1 text-center py-2"
            :class="
              loginType === 'quick' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            "
          >
            <text class="text-sm">快捷授权登录</text>
          </view>
          <view
            @click="loginType = 'password'"
            class="flex-1 text-center py-2"
            :class="
              loginType === 'password'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            "
          >
            <text class="text-sm">密码登录</text>
          </view>
          <view
            @click="loginType = 'code'"
            class="flex-1 text-center py-2"
            :class="
              loginType === 'code' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            "
          >
            <text class="text-sm">验证码登录</text>
          </view>
        </view>

        <!-- 快捷授权登录 -->
        <view v-if="loginType === 'quick'" class="text-center">
          <button
            type="primary"
            :open-type="agree ? 'getPhoneNumber' : ''"
            @getphonenumber="getPhoneNumber"
            @click.stop="checkedAgree"
            class="w-full py-1.5 bg-blue-500 text-white rounded-md active:bg-blue-600 text-sm"
          >
            手机号快捷登录
          </button>
          <view class="flex items-center justify-center mt-3">
            <checkbox
              :checked="agree"
              @click="agree = !agree"
              color="#3b82f6"
              style="transform: scale(0.8)"
            />
            <text class="text-xs text-gray-500 ml-1">
              我已阅读并同意
              <text class="text-blue-500">《用户协议》</text>
              和
              <text class="text-blue-500">《隐私政策》</text>
            </text>
          </view>
        </view>

        <!-- 密码登录 -->
        <view v-if="loginType === 'password'" class="space-y-3">
          <view>
            <view class="flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
              <view class="w-4 h-4 mr-2 flex items-center justify-center">
                <text class="i-ri-phone-line text-gray-400"></text>
              </view>
              <input
                v-model="phone"
                type="number"
                placeholder="请输入手机号"
                class="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </view>
          </view>
          <view>
            <view class="flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
              <view class="w-4 h-4 mr-2 flex items-center justify-center">
                <text class="i-ri-lock-line text-gray-400"></text>
              </view>
              <input
                v-model="password"
                type="password"
                placeholder="请输入密码"
                class="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </view>
          </view>
          <button
            @click="handleLogin"
            class="w-full py-1.5 bg-blue-500 text-white rounded-md active:bg-blue-600 text-sm"
          >
            登录
          </button>
        </view>

        <!-- 验证码登录 -->
        <view v-if="loginType === 'code'" class="space-y-3">
          <view>
            <view class="flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
              <view class="w-4 h-4 mr-2 flex items-center justify-center">
                <text class="i-ri-phone-line text-gray-400"></text>
              </view>
              <input
                v-model="phone"
                type="number"
                placeholder="请输入手机号"
                class="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </view>
          </view>
          <view>
            <view class="flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
              <view class="w-4 h-4 mr-2 flex items-center justify-center">
                <text class="i-ri-mail-send-line text-gray-400"></text>
              </view>
              <input
                v-model="code"
                type="number"
                placeholder="请输入验证码"
                class="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button
                @click="getCode"
                class="ml-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm"
                :disabled="countdown > 0"
              >
                {{ countdown > 0 ? `${countdown}s` : "获取验证码" }}
              </button>
            </view>
          </view>
          <button
            @click="handleLogin"
            class="w-full py-1.5 bg-blue-500 text-white rounded-md active:bg-blue-600 text-sm"
          >
            登录
          </button>
        </view>
      </view>

      <!-- 注册入口 -->
      <view class="mt-4 text-center">
        <text class="text-sm text-gray-500">还没有账号？</text>
        <text @click="navigateTo('/pages/register/index')" class="text-sm text-blue-500 ml-1">
          立即注册
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const loginType = ref("quick") // quick, password, code
const phone = ref("")
const password = ref("")
const code = ref("")
const countdown = ref(0)
const agree = ref(false)

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
