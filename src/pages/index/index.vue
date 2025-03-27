<template>
  <view class="p-4">
    <view class="mb-4 text-lg font-bold">基础标签页演示</view>
    <Tabs :items="items" @change="onTabChange" />
  </view>
  <Button type="primary" customClass="w-full fixed bottom-0 left-0">提交按钮</Button>
  <Picker
    v-model="selected"
    :columns="pickerOptions"
    placeholder="请选择一个选项"
    @change="onPickerChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/Button/index.vue"
import Tabs from "@/components/Tabs/index.vue"
import Picker from "@/components/Picker/index.vue"

const items = ref([{ name: "标签 1" }, { name: "标签 2" }, { name: "标签 3" }])
const selected = ref(null)
const pickerOptions = [
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 },
  { label: "选项3", value: 3 },
]

const onTabChange = (index: number, item: any) => {
  console.log(`切换到标签: ${index}`, item)
}

const onPickerChange = (value: any) => {
  console.log(`选择值: ${value}`)
}
</script>
