<template>
  <view :class="{ 'flex space-x-4': inline }">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch } from "vue"

interface Props {
  /** 选中的值 */
  modelValue?: string | number | boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否内联显示 */
  inline?: boolean
  /** 名称 */
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  disabled: false,
  inline: false,
  name: "",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void
  (e: "change", value: any): void
}>()

// 当前选中的值
const currentValue = ref(props.modelValue)

console.log("Radio group initialized with modelValue:", props.modelValue)

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    console.log("Radio group modelValue changed:", newValue)
    currentValue.value = newValue
  },
  { immediate: true },
)

// 处理选择变化
const handleChange = (value: any) => {
  console.log("Radio group handleChange called with value:", value)
  currentValue.value = value
  emit("update:modelValue", value)
  emit("change", value)
}

// 提供给子组件的上下文
provide("radioGroup", {
  name: props.name,
  disabled: props.disabled,
  currentValue,
  handleChange,
})

// 挂载时初始化
onMounted(() => {
  currentValue.value = props.modelValue
})
</script>
