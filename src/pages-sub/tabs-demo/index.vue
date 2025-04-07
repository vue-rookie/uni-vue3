<template>
  <view class="page-container bg-white min-h-screen p-4">
    <view class="text-xl font-bold mb-6">uve-tabs 标签页</view>

    <view class="text-sm text-gray-500 mb-4">标签页组件，用于在不同的内容区域之间进行切换。</view>

    <!-- 基础用法 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">基础用法</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-tabs :items="basicItems" @change="onTabChange">
          <template #content-0>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">标签一的内容区域</view>
            </view>
          </template>
          <template #content-1>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">标签二的内容区域</view>
            </view>
          </template>
          <template #content-2>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">标签三的内容区域</view>
            </view>
          </template>
        </uve-tabs>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        基础的标签页，通过
        <text class="font-mono">items</text>
        属性设置标签项
      </view>
    </view>

    <!-- 自定义内容 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义内容示例</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-tabs :items="customItems" :initial-index="1">
          <template #content-0>
            <view class="p-4 bg-white rounded">
              <view class="flex flex-col items-center">
                <text class="i-ri-user-line text-4xl text-primary mb-2"></text>
                <text class="text-gray-700">用户信息内容区域</text>
              </view>
            </view>
          </template>
          <template #content-1>
            <view class="p-4 bg-white rounded">
              <view class="flex flex-col items-center">
                <text class="i-ri-shopping-cart-line text-4xl text-primary mb-2"></text>
                <text class="text-gray-700">购物车内容区域</text>
              </view>
            </view>
          </template>
          <template #content-2>
            <view class="p-4 bg-white rounded">
              <view class="flex flex-col items-center">
                <text class="i-ri-settings-line text-4xl text-primary mb-2"></text>
                <text class="text-gray-700">设置内容区域</text>
              </view>
            </view>
          </template>
        </uve-tabs>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        使用
        <text class="font-mono">initial-index</text>
        属性设置默认选中的标签
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义样式</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-tabs
          :items="basicItems"
          custom-item-class="px-6"
          custom-line-class="bg-success w-12"
          custom-content-class="h-32"
        >
          <template #content-0>
            <view class="h-full flex items-center justify-center bg-success/5 rounded">
              <text class="text-success">自定义样式的内容区域</text>
            </view>
          </template>
          <template #content-1>
            <view class="h-full flex items-center justify-center bg-success/5 rounded">
              <text class="text-success">自定义样式的内容区域</text>
            </view>
          </template>
          <template #content-2>
            <view class="h-full flex items-center justify-center bg-success/5 rounded">
              <text class="text-success">自定义样式的内容区域</text>
            </view>
          </template>
        </uve-tabs>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">custom-item-class</text>
        、
        <text class="font-mono">custom-line-class</text>
        和
        <text class="font-mono">custom-content-class</text>
        属性自定义样式
      </view>
    </view>

    <!-- 事件演示 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">事件监听</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-tabs :items="eventItems" @change="handleTabChange">
          <template #content-0>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">切换标签查看事件效果</view>
            </view>
          </template>
          <template #content-1>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">切换标签查看事件效果</view>
            </view>
          </template>
          <template #content-2>
            <view class="p-4 bg-white rounded">
              <view class="text-center text-gray-600">切换标签查看事件效果</view>
            </view>
          </template>
        </uve-tabs>

        <view v-if="lastTabChange" class="mt-4 p-3 bg-primary/5 rounded text-sm">
          <text class="text-primary">
            最后一次切换: 切换到了 "{{ lastTabChange.item.name }}" 标签，索引为
            {{ lastTabChange.index }}
          </text>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">@change</text>
        事件监听标签切换
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import uveTabs from "@/components/uve-tabs/index.vue"

// 基础标签数据
const basicItems = [{ name: "标签一" }, { name: "标签二" }, { name: "标签三" }]

// 自定义标签数据
const customItems = [
  { name: "用户", icon: "user" },
  { name: "购物车", icon: "shopping-cart" },
  { name: "设置", icon: "settings" },
]

// 事件标签数据
const eventItems = [
  { name: "选项A", id: "a" },
  { name: "选项B", id: "b" },
  { name: "选项C", id: "c" },
]

// 用于记录上次切换的标签
const lastTabChange = ref(null)

// 标签切换事件处理
const handleTabChange = (index, item) => {
  lastTabChange.value = { index, item }
}

// 基础示例切换事件
const onTabChange = () => {
  // 可以在这里处理基础示例的切换事件
}
</script>
