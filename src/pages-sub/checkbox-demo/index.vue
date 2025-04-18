<template>
  <view class="p-4 bg-gray-100 min-h-screen">
    <view class="text-xl font-bold mb-6">多选框 Checkbox</view>
    <view class="text-sm text-gray-500 mb-4">多选框组件用于在一组选项中选择多个选项。</view>

    <!-- 基础用法 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">基础用法</view>
      <view class="flex flex-wrap gap-4">
        <uve-checkbox label="选项1" v-model:checked="checkbox1"></uve-checkbox>
        <uve-checkbox label="选项2" v-model:checked="checkbox2"></uve-checkbox>
      </view>
    </view>

    <!-- v-model用法 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">v-model用法</view>
      <view class="flex flex-wrap gap-4">
        <uve-checkbox label="选项A" value="A" v-model:modelValue="modelValues"></uve-checkbox>
        <uve-checkbox label="选项B" value="B" v-model:modelValue="modelValues"></uve-checkbox>
        <uve-checkbox label="选项C" value="C" v-model:modelValue="modelValues"></uve-checkbox>
      </view>
      <view class="mt-2 text-sm text-gray-500">当前选中：{{ modelValues.join(", ") }}</view>
    </view>

    <!-- 禁用状态 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">禁用状态</view>
      <view class="flex flex-wrap gap-4">
        <uve-checkbox label="禁用未选中" disabled></uve-checkbox>
        <uve-checkbox label="禁用已选中" :checked="true" disabled></uve-checkbox>
      </view>
    </view>

    <!-- 多选框组 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">多选框组</view>
      <uve-checkbox-group v-model="groupValue1">
        <view class="flex flex-wrap gap-4">
          <uve-checkbox label="选项A" value="A"></uve-checkbox>
          <uve-checkbox label="选项B" value="B"></uve-checkbox>
          <uve-checkbox label="选项C" value="C"></uve-checkbox>
        </view>
      </uve-checkbox-group>
      <view class="mt-2 text-sm text-gray-500">当前选中：{{ groupValue1.join(", ") }}</view>
    </view>

    <!-- 多选框组禁用 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">整组禁用</view>
      <uve-checkbox-group v-model="groupValue2" disabled>
        <view class="flex flex-wrap gap-4">
          <uve-checkbox label="选项X" value="X"></uve-checkbox>
          <uve-checkbox label="选项Y" value="Y"></uve-checkbox>
          <uve-checkbox label="选项Z" value="Z"></uve-checkbox>
        </view>
      </uve-checkbox-group>
    </view>

    <!-- 自定义内容 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">自定义内容</view>
      <uve-checkbox-group v-model="groupValue3">
        <view class="flex flex-wrap gap-4">
          <uve-checkbox value="custom1">
            <view class="ml-2 flex items-center">
              <text class="i-ri-computer-line mr-1"></text>
              <text>个人电脑</text>
            </view>
          </uve-checkbox>
          <uve-checkbox value="custom2">
            <view class="ml-2 flex items-center">
              <text class="i-ri-smartphone-line mr-1"></text>
              <text>移动设备</text>
            </view>
          </uve-checkbox>
        </view>
      </uve-checkbox-group>
    </view>

    <!-- 尺寸 -->
    <view class="bg-white rounded p-4 mb-4">
      <view class="font-medium mb-3">不同尺寸</view>
      <view class="flex flex-col gap-4">
        <view class="flex items-center gap-4">
          <uve-checkbox label="小尺寸" size="small" v-model:checked="sizeCheck"></uve-checkbox>
          <uve-checkbox label="默认尺寸" v-model:checked="sizeCheck"></uve-checkbox>
          <uve-checkbox label="大尺寸" size="large" v-model:checked="sizeCheck"></uve-checkbox>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 单独使用
const checkbox1 = ref(true)
const checkbox2 = ref(false)
const sizeCheck = ref(true)
const modelValues = ref(["A", "C"])

// 多选框组
const groupValue1 = ref(["A", "B"])
const groupValue2 = ref(["Y"])
const groupValue3 = ref(["custom1"])

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "多选框示例",
  })
})
</script>
