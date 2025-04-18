<template>
  <view class="p-4 bg-gray-100 min-h-screen">
    <view class="text-xl font-bold mb-6">单选框 Radio</view>
    <view class="text-sm text-gray-500 mb-4">单选框组件用于在一组选项中选择一个选项。</view>

    <!-- 基础用法 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">基础用法</view>
      <view class="flex flex-wrap gap-4">
        <uve-radio label="选项1" value="1" v-model="radioValue"></uve-radio>
        <uve-radio label="选项2" value="2" v-model="radioValue"></uve-radio>
      </view>
      <view class="mt-2 text-sm text-gray-500">当前选中：{{ radioValue }}</view>
    </view>

    <!-- 禁用状态 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">禁用状态</view>
      <view class="flex flex-wrap gap-4">
        <uve-radio label="禁用未选中" disabled></uve-radio>
        <uve-radio label="禁用已选中" :checked="true" disabled></uve-radio>
      </view>
    </view>

    <!-- 单选框组 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">单选框组</view>
      <uve-radio-group v-model="groupValue1">
        <view class="flex flex-wrap gap-4">
          <uve-radio label="选项A" value="A"></uve-radio>
          <uve-radio label="选项B" value="B"></uve-radio>
          <uve-radio label="选项C" value="C"></uve-radio>
        </view>
      </uve-radio-group>
      <view class="mt-2 text-sm text-gray-500">当前选中：{{ groupValue1 }}</view>
    </view>

    <!-- 单选框组禁用 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">整组禁用</view>
      <uve-radio-group v-model="groupValue2" disabled>
        <view class="flex flex-wrap gap-4">
          <uve-radio label="选项X" value="X"></uve-radio>
          <uve-radio label="选项Y" value="Y"></uve-radio>
          <uve-radio label="选项Z" value="Z"></uve-radio>
        </view>
      </uve-radio-group>
    </view>

    <!-- 自定义内容 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">自定义内容</view>
      <uve-radio-group v-model="groupValue3">
        <view class="flex flex-wrap gap-4">
          <uve-radio value="custom1">
            <view class="ml-2 flex items-center">
              <text class="i-ri-smartphone-line mr-1"></text>
              <text>手机</text>
            </view>
          </uve-radio>
          <uve-radio value="custom2">
            <view class="ml-2 flex items-center">
              <text class="i-ri-computer-line mr-1"></text>
              <text>电脑</text>
            </view>
          </uve-radio>
        </view>
      </uve-radio-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 单独使用
const radioValue = ref("1")

// 单选框组
const groupValue1 = ref("A")
const groupValue2 = ref("Y")
const groupValue3 = ref("custom1")

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "单选框示例",
  })
})
</script>
