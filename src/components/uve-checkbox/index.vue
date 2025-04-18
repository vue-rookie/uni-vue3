<template>
  <view class="inline-flex items-center" @click="handleChange">
    <view
      class="relative flex items-center justify-center rounded border border-solid transition-all box-border"
      :class="[
        isChecked ? 'border-primary bg-primary' : 'border-gray-300 bg-white',
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        sizeClasses,
      ]"
      :style="{ borderWidth: '1px' }"
    >
      <!-- 选中状态的勾选图标 -->
      <view
        v-if="isChecked"
        class="text-white flex items-center justify-center absolute"
        :style="{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }"
      >
        <text class="i-ri-check-line" :class="iconSizeClasses"></text>
      </view>
    </view>
    <!-- 标签 -->
    <text
      v-if="label"
      class="ml-2"
      :class="[isDisabled ? 'text-gray-400' : 'text-gray-700', textSizeClasses]"
    >
      {{ label }}
    </text>
    <slot v-else></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"

type CheckboxSize = "small" | "medium" | "large"

interface Props {
  /** 是否选中 */
  checked?: boolean
  /** 禁用状态 */
  disabled?: boolean
  /** 值 */
  value?: any
  /** 标签文本 */
  label?: string
  /** 名称 */
  name?: string
  /** 尺寸 */
  size?: CheckboxSize
  /** 支持v-model绑定值 */
  modelValue?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  value: "",
  label: "",
  name: "",
  size: "medium",
  modelValue: undefined,
})

const emit = defineEmits<{
  /** 值变化事件 */
  (e: "update:checked", checked: boolean): void
  /** 选中事件 */
  (e: "change", value: any): void
  /** 支持标准v-model */
  (e: "update:modelValue", value: any[]): void
}>()

// 注入checkbox-group上下文
const checkboxGroup = inject("checkboxGroup", null) as any | null

// 获取从checkboxGroup继承的属性
const isChecked = computed(() => {
  if (checkboxGroup) {
    // 确保modelValue存在，并且是一个数组
    const groupModelValue = checkboxGroup.modelValue ? checkboxGroup.modelValue.value : []
    return Array.isArray(groupModelValue) ? groupModelValue.includes(props.value) : false
  }
  if (props.modelValue !== undefined) {
    // 确保modelValue是一个数组
    return Array.isArray(props.modelValue) ? props.modelValue.includes(props.value) : false
  }
  // 最后是checked属性
  return props.checked
})

const isDisabled = computed(() => {
  return props.disabled || (checkboxGroup && checkboxGroup.disabled)
})

// 获取继承的尺寸
const checkboxSize = computed(() => {
  return (checkboxGroup && checkboxGroup.size) || props.size
})

// 根据尺寸计算样式类
const sizeClasses = computed(() => {
  switch (checkboxSize.value) {
    case "small":
      return "w-4 h-4"
    case "large":
      return "w-6 h-6"
    default:
      return "w-5 h-5"
  }
})

const iconSizeClasses = computed(() => {
  switch (checkboxSize.value) {
    case "small":
      return "text-xs"
    case "large":
      return "text-base"
    default:
      return "text-sm"
  }
})

const textSizeClasses = computed(() => {
  switch (checkboxSize.value) {
    case "small":
      return "text-xs"
    case "large":
      return "text-base"
    default:
      return "text-sm"
  }
})

/**
 * 处理选择变化
 */
const handleChange = () => {
  if (isDisabled.value) return

  if (checkboxGroup) {
    // 如果在组内，通知组更新值
    checkboxGroup.handleChange(props.value)
  } else if (props.modelValue !== undefined) {
    // 如果使用了标准v-model绑定
    const newModelValue = [...props.modelValue]
    const index = newModelValue.indexOf(props.value)
    if (index > -1) {
      newModelValue.splice(index, 1)
    } else {
      newModelValue.push(props.value)
    }
    emit("update:modelValue", newModelValue)
    emit("change", props.value)
  } else {
    // 否则直接更新本地状态
    emit("update:checked", !props.checked)
    emit("change", props.value)
  }
}
</script>
