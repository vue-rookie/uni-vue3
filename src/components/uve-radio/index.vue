<template>
  <view class="inline-flex items-center" @click="handleChange">
    <view
      class="relative flex items-center justify-center rounded-full border border-solid transition-all box-border"
      :class="[
        isChecked ? 'border-primary bg-primary-10' : 'border-gray-300 bg-white',
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        sizeClasses,
      ]"
      :style="{ borderWidth: '1px' }"
    >
      <!-- 选中状态的内圆 -->
      <view
        v-if="isChecked"
        class="rounded-full bg-primary absolute"
        :class="innerSizeClasses"
        :style="{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }"
      ></view>
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

type RadioSize = "small" | "medium" | "large"

interface Props {
  /** 是否选中 */
  checked?: boolean
  /** 禁用状态 */
  disabled?: boolean
  /** 值 */
  value?: string | number | boolean
  /** 标签文本 */
  label?: string
  /** 名称 */
  name?: string
  /** 尺寸 */
  size?: RadioSize
  /** 支持v-model绑定值 */
  modelValue?: string | number | boolean
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
  (e: "update:modelValue", value: any): void
}>()

// 注入radio-group上下文
const radioGroup = inject("radioGroup", null) as any | null

// 获取从radioGroup继承的属性
const isChecked = computed(() => {
  if (radioGroup) {
    // 单选框组优先级最高
    return radioGroup.currentValue.value === props.value
  }
  if (props.modelValue !== undefined) {
    // 其次是v-model绑定
    return props.modelValue === props.value
  }
  // 最后是checked属性
  return props.checked
})

const isDisabled = computed(() => {
  return props.disabled || (radioGroup && radioGroup.disabled)
})

// 获取继承的尺寸
const radioSize = computed(() => {
  return (radioGroup && radioGroup.size) || props.size
})

// 根据尺寸计算样式类
const sizeClasses = computed(() => {
  switch (radioSize.value) {
    case "small":
      return "w-4 h-4"
    case "large":
      return "w-6 h-6"
    default:
      return "w-5 h-5"
  }
})

const innerSizeClasses = computed(() => {
  switch (radioSize.value) {
    case "small":
      return "w-2 h-2"
    case "large":
      return "w-4 h-4"
    default:
      return "w-3 h-3"
  }
})

const textSizeClasses = computed(() => {
  switch (radioSize.value) {
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

  if (radioGroup) {
    // 如果在组内，通知组更新值
    radioGroup.handleChange(props.value)
  } else if (props.modelValue !== undefined) {
    // 如果使用了标准v-model绑定
    emit("update:modelValue", props.value)
    emit("change", props.value)
  } else {
    // 否则直接更新本地状态
    emit("update:checked", !props.checked)
    emit("change", props.value)
  }
}
</script>
