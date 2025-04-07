<template>
  <view class="page-container bg-white min-h-screen p-4">
    <view class="text-xl font-bold mb-6">uve-picker 选择器</view>

    <view class="text-sm text-gray-500 mb-4">
      选择器组件，用于从一组选项中进行选择，支持单列和多列选择。
    </view>

    <!-- 基础用法 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">基础用法</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-3">
          <text class="text-sm text-gray-600 mb-2">选择城市：</text>
          <uve-picker
            :columns="cities"
            v-model="selectedCity"
            placeholder="请选择城市"
            @change="onCityChange"
          />
        </view>
        <view v-if="selectedCity" class="mt-3 text-sm text-primary">
          当前选择：{{ getCityLabel(selectedCity) }}
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        基础的单列选择器，通过 v-model 绑定选中值
      </view>
    </view>

    <!-- 多列选择器 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">多列选择器</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-3">
          <text class="text-sm text-gray-600 mb-2">选择日期：</text>
          <uve-picker
            :columns="[years, months, days]"
            v-model="selectedDate"
            placeholder="请选择日期"
            title="选择日期"
            @change="onDateChange"
          />
        </view>
        <view v-if="selectedDate && selectedDate.length === 3" class="mt-3 text-sm text-primary">
          当前选择：{{ selectedDate[0] }}年{{ selectedDate[1] }}月{{ selectedDate[2] }}日
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        多列选择器，传入二维数组作为 columns
      </view>
    </view>

    <!-- 禁用选项 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">禁用选项</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-3">
          <text class="text-sm text-gray-600 mb-2">选择水果：</text>
          <uve-picker
            :columns="fruitsWithDisabled"
            v-model="selectedFruit"
            placeholder="请选择水果"
            @change="onFruitChange"
          />
        </view>
        <view v-if="selectedFruit" class="mt-3 text-sm text-primary">
          当前选择：{{ getFruitLabel(selectedFruit) }}
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过设置 disabled 属性来禁用某些选项
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义样式</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-picker
          :columns="themes"
          v-model="selectedTheme"
          placeholder="请选择主题"
          @change="onThemeChange"
          class="border-2 border-primary rounded-lg"
        />
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        可以通过添加 class 自定义选择器的外观
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">禁用状态</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-picker
          :columns="cities"
          v-model="selectedCity"
          placeholder="禁用状态的选择器"
          disabled
        />
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置 disabled 属性可以禁用整个选择器
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import uvePicker from "@/components/uve-picker/index.vue"

// 城市数据
const cities = [
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "杭州", value: "hangzhou" },
]

// 年份数据
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => ({
  label: `${currentYear - 5 + i}年`,
  value: currentYear - 5 + i,
}))

// 月份数据
const months = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}月`,
  value: i + 1,
}))

// 日期数据
const days = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}日`,
  value: i + 1,
}))

// 带禁用选项的水果数据
const fruitsWithDisabled = [
  { label: "苹果", value: "apple" },
  { label: "香蕉", value: "banana" },
  { label: "橙子", value: "orange", disabled: true },
  { label: "葡萄", value: "grape" },
  { label: "西瓜", value: "watermelon", disabled: true },
]

// 主题数据
const themes = [
  { label: "默认主题", value: "default" },
  { label: "暗黑主题", value: "dark" },
  { label: "蓝色主题", value: "blue" },
  { label: "绿色主题", value: "green" },
]

// 选中的值
const selectedCity = ref("")
const selectedDate = ref([currentYear, 1, 1])
const selectedFruit = ref("")
const selectedTheme = ref("")

// 事件处理
const onCityChange = (value) => {
  console.log("城市变更:", value)
}

const onDateChange = (value) => {
  console.log("日期变更:", value)
}

const onFruitChange = (value) => {
  console.log("水果变更:", value)
}

const onThemeChange = (value) => {
  console.log("主题变更:", value)
}

// 辅助函数
const getCityLabel = (value) => {
  const city = cities.find((item) => item.value === value)
  return city ? city.label : ""
}

const getFruitLabel = (value) => {
  const fruit = fruitsWithDisabled.find((item) => item.value === value)
  return fruit ? fruit.label : ""
}
</script>
