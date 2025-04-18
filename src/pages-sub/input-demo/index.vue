<template>
  <view class="p-4 bg-gray-100 min-h-screen">
    <view class="text-xl font-bold mb-6">输入框 Input</view>
    <view class="text-sm text-gray-500 mb-4">
      输入框组件允许用户输入文本内容，支持多种类型和样式。
    </view>

    <!-- 基础用法 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">基础用法</view>
      <view class="space-y-4 w-full box-border">
        <uve-input v-model="input1" placeholder="请输入内容" />
        <view class="text-sm text-gray-500">当前输入: {{ input1 }}</view>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">禁用状态</view>
      <uve-input v-model="input2" placeholder="禁用状态" disabled />
    </view>

    <!-- 不同类型 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">不同类型</view>
      <view class="space-y-4">
        <view>
          <uve-input v-model="inputText" placeholder="文本输入框" />
        </view>
        <view>
          <uve-input v-model="inputPassword" type="password" placeholder="密码输入框" />
        </view>
        <view>
          <uve-input v-model="inputNumber" type="number" placeholder="数字输入框" />
        </view>
        <view>
          <uve-input v-model="inputIdcard" type="idcard" placeholder="身份证输入框" />
        </view>
      </view>
    </view>

    <!-- 带图标 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">带图标</view>
      <view class="space-y-4">
        <view>
          <uve-input v-model="inputPrefix" placeholder="带前缀图标" prefix-icon="i-ri-user-line" />
        </view>
        <view>
          <uve-input
            v-model="inputSuffix"
            placeholder="带后缀图标"
            suffix-icon="i-ri-calendar-line"
          />
        </view>
        <view>
          <uve-input v-model="inputClear" placeholder="可清除内容" clearable />
        </view>
      </view>
    </view>

    <!-- 错误状态 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">错误状态</view>
      <uve-input
        v-model="inputError"
        placeholder="验证失败状态"
        error
        error-message="请输入有效的内容"
      />
    </view>

    <!-- 文本域 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">文本域</view>
      <uve-input
        v-model="inputTextarea"
        type="textarea"
        placeholder="请输入多行文本"
        height="120px"
      />
    </view>

    <!-- 自动增高文本域 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">自动增高文本域</view>
      <uve-input
        v-model="inputAutoHeight"
        type="textarea"
        placeholder="输入文本自动增高"
        auto-height
      />
    </view>

    <!-- 限制长度 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">限制长度</view>
      <uve-input v-model="inputMaxlength" placeholder="最多输入20个字符" :maxlength="20" />
      <view class="text-sm text-gray-500 mt-1">已输入 {{ inputMaxlength.length }}/20</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
// 基础输入框
const input1 = ref("")
const input2 = ref("禁用状态的内容")

// 不同类型
const inputText = ref("")
const inputPassword = ref("")
const inputNumber = ref("")
const inputIdcard = ref("")

// 带图标
const inputPrefix = ref("")
const inputSuffix = ref("")
const inputClear = ref("可点击右侧清除")

// 错误状态
const inputError = ref("")

// 文本域
const inputTextarea = ref("")
const inputAutoHeight = ref("")

// 限制长度
const inputMaxlength = ref("")

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "输入框示例",
  })
})
</script>
