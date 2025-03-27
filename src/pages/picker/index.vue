<template>
  <view class="p-4">
    <view class="text-lg font-bold mb-6">Picker 选择器组件</view>

    <view class="mb-8">
      <view class="text-base font-medium mb-2">基础用法</view>
      <Picker
        v-model="selected"
        :columns="options"
        placeholder="请选择一个选项"
        @change="onChange"
      />
      <view class="mt-2 text-gray-500 text-sm">当前选择: {{ selected || "未选择" }}</view>
    </view>

    <view class="mb-8">
      <view class="text-base font-medium mb-2">禁用状态</view>
      <Picker v-model="selected2" :columns="options" placeholder="禁用状态" disabled />
    </view>

    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义标题</view>
      <Picker v-model="selected3" :columns="options" placeholder="请选择" title="城市选择" />
    </view>

    <view class="mb-8">
      <view class="text-base font-medium mb-2">多列选择</view>
      <Picker
        v-model="multiSelected"
        :columns="multiColumns"
        placeholder="请选择日期"
        @change="onMultiChange"
      />
      <view class="mt-2 text-gray-500 text-sm">
        当前选择:
        {{
          multiSelected
            ? `${multiSelected[0]}年${multiSelected[1]}月${multiSelected[2]}日`
            : "未选择"
        }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import Picker from "@/components/Picker/index.vue"

// 单列选择数据
const options = [
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "杭州", value: "hangzhou", disabled: true },
  { label: "成都", value: "chengdu" },
  { label: "武汉", value: "wuhan" },
]

// 多列选择数据
const years = Array.from({ length: 30 }, (_, i) => ({
  label: `${2000 + i}年`,
  value: 2000 + i,
}))

const months = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}月`,
  value: i + 1,
}))

const days = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}日`,
  value: i + 1,
}))

const multiColumns = [years, months, days]

// 选中值
const selected = ref(null)
const selected2 = ref("beijing")
const selected3 = ref(null)
const multiSelected = ref(null)

// 事件处理
const onChange = (value) => {
  console.log("选择变化:", value)
}

const onMultiChange = (values) => {
  console.log("多列选择变化:", values)
}
</script>
