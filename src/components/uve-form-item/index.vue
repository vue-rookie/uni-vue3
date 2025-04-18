<template>
  <view
    class="flex items-start relative box-border"
    :class="[
      inline ? 'inline-flex mr-4 align-top' : 'w-full',
      labelPosition === 'top' ? 'flex-col' : '',
      isError ? 'has-error' : '',
      disabled ? 'opacity-60' : '',
    ]"
    :style="{ marginBottom: inline ? '0' : `${gutter}px` }"
    :data-field="prop"
  >
    <!-- 表单项标签 -->
    <view
      v-if="label || $slots.label"
      class="text-sm text-gray-600 leading-8 pr-3 box-border"
      :class="[
        labelPosition === 'left' ? 'text-left' : '',
        labelPosition === 'right' ? 'text-right' : '',
      ]"
      :style="{ width: labelPosition === 'top' ? '100%' : labelWidth }"
    >
      <slot name="label">
        <text class="label-text">
          <text v-if="isRequired && !hideRequiredAsterisk" class="text-red-500 mr-1">*</text>
          {{ label }}
        </text>
      </slot>
    </view>

    <!-- 表单项内容 -->
    <view class="relative text-sm leading-8 box-border flex-1 w-full" :class="{ 'flex-1': inline }">
      <slot></slot>
      <!-- 错误提示 -->
      <view v-if="isError" class="text-xs text-red-500 mt-1 box-border">
        {{ errorMessage }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  // 表单项标签
  label: {
    type: String,
    default: "",
  },
  // 表单项标识，必须与表单数据中的字段名一致
  prop: {
    type: String,
    default: "",
  },
  // 表单项是否必填
  required: {
    type: Boolean,
    default: undefined,
  },
  // 表单项是否禁用
  disabled: {
    type: Boolean,
    default: undefined,
  },
})

// 注入表单组件提供的数据和方法
const form = inject<any>("form", null)

// 从表单配置中获取标签宽度、位置等
const labelWidth = computed(() => (form ? form.config.labelWidth : "80px"))
const labelPosition = computed(() => (form ? form.config.labelPosition : "left"))
const inline = computed(() => (form ? form.config.inline : false))
const hideRequiredAsterisk = computed(() => (form ? form.config.hideRequiredAsterisk : false))
const gutter = computed(() => (form ? form.config.gutter : 16))

// 计算表单项是否禁用
const isDisabled = computed(() => {
  if (props.disabled !== undefined) {
    return props.disabled
  }
  return form ? form.disabled : false
})

// 计算表单项是否必填
const isRequired = computed(() => {
  if (props.required !== undefined) {
    return props.required
  }

  if (!form || !form.rules || !props.prop) {
    return false
  }

  const rules = form.rules[props.prop]
  if (!rules) {
    return false
  }

  if (Array.isArray(rules)) {
    return rules.some((rule) => rule.required)
  } else {
    return !!rules.required
  }
})

// 错误状态和消息
const isError = computed(() => {
  if (!form || !form.state || !props.prop) {
    return false
  }
  return !!form.state.errorFields[props.prop]
})

const errorMessage = computed(() => {
  if (!form || !form.state || !props.prop) {
    return ""
  }
  return form.state.errorFields[props.prop] || ""
})

// 当组件挂载时
onMounted(() => {
  if (props.prop && form) {
    console.log("表单项挂载:", props.prop)
  }
})

// 当组件销毁前
onBeforeUnmount(() => {
  if (props.prop && form) {
    console.log("表单项销毁:", props.prop)
  }
})
</script>

<style>
.has-error input,
.has-error textarea {
  border-color: #f56c6c !important;
}
</style>
