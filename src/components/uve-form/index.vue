<template>
  <view class="w-full">
    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      :class="{ 'flex flex-wrap items-start': inline }"
    >
      <slot></slot>
      <slot name="footer"></slot>
    </form>
  </view>
</template>

<script setup lang="ts">
import { reactive, provide, onMounted, watch } from "vue"
import { useValidation } from "@/hooks"

// 表单数据和验证状态
const props = defineProps({
  // 表单数据
  model: {
    type: Object,
    default: () => ({}),
  },
  // 表单验证规则
  rules: {
    type: Object,
    default: () => ({}),
  },
  // 表单标签宽度
  labelWidth: {
    type: String,
    default: "80px",
  },
  // 表单项间距
  gutter: {
    type: Number,
    default: 16,
  },
  // 是否显示必填星号
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  // 是否内联布局
  inline: {
    type: Boolean,
    default: false,
  },
  // 表单域标签的位置
  labelPosition: {
    type: String,
    default: "left",
    validator: (value: string) => ["left", "right", "top"].includes(value),
  },
  // 表单禁用状态
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否在提交时验证表单
  validateOnSubmit: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(["submit", "reset", "validate"])

// 表单验证
const validation = useValidation()

// 设置表单数据和规则
onMounted(() => {
  console.log("表单组件挂载，初始化数据和规则")
  validation.setFormData(props.model)
  validation.setRules(props.rules)
})

// 监听表单数据变化
watch(
  () => props.model,
  (newVal) => {
    console.log("表单数据变化，更新验证状态")
    validation.setFormData(newVal)
  },
  { deep: true },
)

// 监听表单规则变化
watch(
  () => props.rules,
  (newVal) => {
    console.log("表单规则变化，更新验证规则")
    validation.setRules(newVal)
  },
  { deep: true },
)

// 表单状态
const formState = reactive({
  submitting: false,
  valid: true,
  errorFields: {} as Record<string, string>,
})

// 表单配置
const formConfig = reactive({
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
  inline: props.inline,
  disabled: props.disabled,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  gutter: props.gutter,
})

// 提供表单上下文
provide("form", {
  model: props.model,
  rules: props.rules,
  config: formConfig,
  state: formState,
  disabled: props.disabled,
  validateField: validation.validateField,
})

// 表单验证
const validate = async (callback?: (error: any, valid: boolean) => void) => {
  console.log("开始验证表单")
  formState.submitting = true

  try {
    const result = await validation.validateForm(true)
    console.log("表单验证结果:", result)

    formState.valid = result.valid
    formState.errorFields = Object.keys(result.invalidFields).reduce(
      (errors, field) => {
        errors[field] = result.invalidFields[field].message
        return errors
      },
      {} as Record<string, string>,
    )

    emits("validate", {
      valid: result.valid,
      errorFields: formState.errorFields,
    })

    if (callback) callback(null, result.valid)
    formState.submitting = false
    return result.valid
  } catch (error) {
    console.error("表单验证异常:", error)
    formState.submitting = false
    if (callback) {
      callback(error, false)
    }
    return false
  }
}

// 表单提交处理
const onSubmit = async (e) => {
  console.log("表单提交，事件对象:", e)
  let isValid = false // 默认为false，必须验证通过才能设为true

  if (props.validateOnSubmit) {
    try {
      const result = await validation.validateForm(true)
      console.log("表单验证结果:", result)

      formState.valid = result.valid
      formState.errorFields = Object.keys(result.invalidFields).reduce(
        (errors, field) => {
          errors[field] = result.invalidFields[field].message
          return errors
        },
        {} as Record<string, string>,
      )

      emits("validate", {
        valid: result.valid,
        errorFields: formState.errorFields,
      })

      isValid = result.valid
    } catch (err) {
      console.error("表单验证异常:", err)
      isValid = false
      // 设置formState
      formState.valid = false
    }
  } else {
    isValid = true // 不需要验证时，直接设为有效
  }

  if (isValid) {
    console.log("表单验证通过，触发submit事件")
    emits("submit", props.model)

    // 显示成功提示
    if (uni && typeof uni.showToast === "function") {
      uni.showToast({
        title: "提交成功",
        icon: "success",
      })
    }

    return true
  } else {
    console.log("表单验证失败，阻止提交")
    // 阻止默认提交行为
    e?.preventDefault?.()
    e?.stopPropagation?.()
    return false
  }
}

// 表单提交方法 (供外部调用)
const submit = async () => {
  console.log("调用submit方法")
  return onSubmit(null)
}

// 表单重置处理
const onReset = () => {
  console.log("表单重置")
  // 重置验证状态
  validation.resetForm(props.model)
  formState.valid = true
  formState.errorFields = {}

  // 触发reset事件
  emits("reset")
}

// 表单重置方法 (供外部调用)
const reset = () => {
  console.log("调用reset方法")
  return onReset()
}

// 清除验证
const clearValidate = (fields?: string | string[]) => {
  console.log("清除验证信息", fields)
  if (!fields) {
    // 清除所有字段的验证结果
    Object.keys(formState.errorFields).forEach((field) => {
      delete formState.errorFields[field]
    })
  } else {
    const fieldArray = Array.isArray(fields) ? fields : [fields]
    fieldArray.forEach((field) => {
      delete formState.errorFields[field]
    })
  }
}

// 暴露方法给外部
defineExpose({
  validate,
  reset,
  submit,
  clearValidate,
  resetFields: reset, // 兼容性别名
  submitForm: submit, // 兼容性别名
  validateField: (field, trigger) => validation.validateField(field, trigger), // 添加单字段验证方法
})
</script>
