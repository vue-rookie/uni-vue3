<template>
  <view :class="{ 'flex flex-wrap gap-4': inline }">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch } from "vue"

interface Props {
  /** 选中的值数组 */
  modelValue?: Array<string | number | boolean>
  /** 是否禁用 */
  disabled?: boolean
  /** 是否内联显示 */
  inline?: boolean
  /** 最小选择数量 */
  min?: number
  /** 最大选择数量 */
  max?: number
  /** 名称 */
  name?: string
  /** 尺寸 */
  size?: "small" | "medium" | "large"
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  disabled: false,
  inline: false,
  min: 0,
  max: Infinity,
  name: "",
  size: "medium",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: Array<string | number | boolean>): void
  (e: "change", value: Array<string | number | boolean>): void
}>()

// 当前选中的值数组
const modelValue = ref<Array<string | number | boolean>>(props.modelValue || [])

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue || []
  },
  { immediate: true },
)

// 处理复选框变化
const handleChange = (value: any) => {
  const newValues = [...modelValue.value]
  const index = newValues.indexOf(value)

  if (index === -1) {
    // 添加值，并检查最大数量限制
    if (newValues.length < props.max) {
      newValues.push(value)
    }
  } else {
    // 移除值，并检查最小数量限制
    if (newValues.length > props.min) {
      newValues.splice(index, 1)
    }
  }

  modelValue.value = newValues
  emit("update:modelValue", newValues)
  emit("change", newValues)
}

// 提供给子组件的上下文
provide("checkboxGroup", {
  name: props.name,
  disabled: props.disabled,
  size: props.size,
  modelValue,
  handleChange,
})

// 挂载时初始化
onMounted(() => {
  modelValue.value = props.modelValue || []
})
</script>
