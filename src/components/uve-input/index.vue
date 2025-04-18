<template>
  <view class="uve-input w-full relative box-border">
    <!-- 前缀图标 -->
    <view
      v-if="$slots.prefix || prefixIcon"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 box-border z-10"
    >
      <slot name="prefix">
        <text v-if="prefixIcon" :class="prefixIcon"></text>
      </slot>
    </view>

    <!-- 文本输入框 -->
    <template v-if="type !== 'textarea'">
      <input
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :password="type === 'password'"
        :focus="autofocus"
        :class="[
          'w-full transition-all border border-solid border-gray-300 rounded-md text-sm box-border',
          'focus:border-primary focus:shadow-sm',
          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800',
          error ? 'border-red-500' : '',
          hasPrefixIcon ? 'pl-10' : 'px-3',
          hasSuffixIcon ? 'pr-10' : 'px-3',
          'h-input',
          customClass,
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />
    </template>

    <!-- 文本域 -->
    <template v-else>
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :focus="autofocus"
        :auto-height="autoHeight"
        :show-confirm-bar="showConfirmBar"
        :class="[
          'w-full transition-all border border-solid border-gray-300 rounded-md text-sm box-border',
          'focus:outline-none focus:border-primary focus:shadow-sm',
          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800',
          error ? 'border-red-500' : '',
          'p-3',
          customClass,
        ]"
        :style="{ height: height }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />
    </template>

    <!-- 后缀图标 -->
    <view
      v-if="$slots.suffix || suffixIcon || clearable"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 box-border z-10"
    >
      <text
        v-if="clearable && modelValue && !disabled"
        class="i-ri-close-circle-line cursor-pointer hover:text-gray-600"
        @tap="handleClear"
      ></text>
      <slot name="suffix">
        <text v-if="suffixIcon" :class="suffixIcon"></text>
      </slot>
    </view>

    <!-- 错误信息 -->
    <view v-if="error && errorMessage" class="mt-1 text-xs text-red-500 box-border">
      {{ errorMessage }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue"

interface Props {
  /** 绑定值 */
  modelValue?: string
  /** 输入框类型 */
  type?: "text" | "password" | "number" | "digit" | "idcard" | "textarea"
  /** 占位提示文字 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 最大长度 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** 是否自动获取焦点 */
  autofocus?: boolean
  /** 是否有错误 */
  error?: boolean
  /** 错误提示信息 */
  errorMessage?: string
  /** 文本域高度 */
  height?: string
  /** 文本域是否自动增高 */
  autoHeight?: boolean
  /** 文本域确认按钮 */
  showConfirmBar?: boolean
  /** 自定义类名 */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  disabled: false,
  maxlength: -1,
  clearable: false,
  prefixIcon: "",
  suffixIcon: "",
  autofocus: false,
  error: false,
  errorMessage: "",
  height: "80px",
  autoHeight: false,
  showConfirmBar: true,
  customClass: "",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
  (e: "input", value: string): void
  (e: "focus", event: any): void
  (e: "blur", event: any): void
  (e: "confirm", value: string): void
  (e: "clear"): void
}>()

// 获取slots
const slots = useSlots()

// 处理输入事件
const handleInput = (event: any) => {
  const value = event.detail.value
  emit("update:modelValue", value)
  emit("input", value)
}

// 处理焦点事件
const handleFocus = (event: any) => {
  emit("focus", event)
}

// 处理失焦事件
const handleBlur = (event: any) => {
  emit("blur", event)
}

// 处理确认事件
const handleConfirm = (event: any) => {
  const value = event.detail.value
  emit("confirm", value)
}

// 处理清除按钮点击
const handleClear = () => {
  emit("update:modelValue", "")
  emit("clear")
}

// 计算输入框类型
const inputType = computed(() => {
  const typeMap: Record<string, string> = {
    text: "text",
    password: "text", // 使用password属性而不是type
    number: "number",
    digit: "digit",
    idcard: "idcard",
  }
  return typeMap[props.type] || "text"
})

// 是否有前缀图标
const hasPrefixIcon = computed(() => !!props.prefixIcon || !!slots.prefix)

// 是否有后缀图标
const hasSuffixIcon = computed(() => !!props.suffixIcon || !!slots.suffix || props.clearable)
</script>

<style scoped>
input,
textarea {
  font-size: 14px;
}

.h-input {
  height: 40px;
  line-height: 40px;
}

textarea {
  line-height: 1.5;
  min-height: 40px;
}

/* 确保focus状态边框 */
input:focus,
textarea:focus {
  border-color: var(--primary-color, #4880ff) !important;
}

/* 解决placeholder垂直居中问题 */
input::placeholder {
  text-align: left;
  vertical-align: middle;
}
</style>
