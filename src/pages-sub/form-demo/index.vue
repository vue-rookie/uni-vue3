<template>
  <view class="p-4 bg-gray-100 min-h-screen demo-section">
    <view class="text-xl font-bold mb-6">表单 Form</view>
    <view class="text-sm text-gray-500 mb-4">
      表单组件用于收集、验证和提交数据，包含多种输入控件。
    </view>

    <!-- 基础表单 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">基础表单</view>
      <uve-form :model="basicForm" :rules="basicRules" label-width="80px" ref="basicFormRef">
        <uve-form-item label="字段1" prop="username">
          <uve-input
            v-model="basicForm.username"
            placeholder="请输入字段1"
            @blur="handleFieldBlur(basicFormRef, 'username')"
          />
        </uve-form-item>
        <uve-form-item label="字段2" prop="password">
          <uve-input
            v-model="basicForm.password"
            type="text"
            placeholder="请输入字段2"
            @blur="handleFieldBlur(basicFormRef, 'password')"
          />
        </uve-form-item>
        <uve-form-item>
          <view class="flex space-x-3">
            <view>
              <uve-button type="primary" @click="submitBasicForm">提交</uve-button>
            </view>
            <view>
              <uve-button type="default" @click="resetBasicForm">重置</uve-button>
            </view>
          </view>
        </uve-form-item>
      </uve-form>
    </view>

    <!-- 表单校验 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">表单校验</view>
      <uve-form
        :model="validateForm"
        :rules="validateRules"
        label-width="80px"
        ref="validateFormRef"
      >
        <uve-form-item label="字段1" prop="name">
          <uve-input
            v-model="validateForm.name"
            placeholder="请输入字段1"
            @blur="handleFieldBlur(validateFormRef, 'name')"
          />
        </uve-form-item>
        <uve-form-item label="字段2" prop="email">
          <uve-input
            v-model="validateForm.email"
            placeholder="请输入字段2"
            @blur="handleFieldBlur(validateFormRef, 'email')"
          />
        </uve-form-item>
        <uve-form-item label="字段3" prop="mobile">
          <uve-input
            v-model="validateForm.mobile"
            placeholder="请输入字段3"
            @blur="handleFieldBlur(validateFormRef, 'mobile')"
          />
        </uve-form-item>
        <uve-form-item>
          <view class="flex space-x-3">
            <view>
              <uve-button type="primary" @click="submitValidateForm">提交</uve-button>
            </view>
            <view>
              <uve-button type="default" @click="resetValidateForm">重置</uve-button>
            </view>
          </view>
        </uve-form-item>
      </uve-form>
    </view>

    <!-- 多类型表单 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">多类型表单</view>
      <uve-form :model="complexForm" label-width="80px" ref="complexFormRef">
        <uve-form-item label="字段1">
          <uve-input v-model="complexForm.name" placeholder="请输入内容" class="w-full" />
        </uve-form-item>
        <uve-form-item label="字段2">
          <view class="flex space-x-4">
            <uve-radio
              label="选项1"
              value="male"
              v-model:modelValue="complexForm.gender"
            ></uve-radio>
            <uve-radio
              label="选项2"
              value="female"
              v-model:modelValue="complexForm.gender"
            ></uve-radio>
          </view>
        </uve-form-item>
        <uve-form-item label="字段3">
          <view class="flex flex-wrap gap-4">
            <uve-checkbox
              label="选项1"
              value="reading"
              v-model:modelValue="complexForm.hobbies"
            ></uve-checkbox>
            <uve-checkbox
              label="选项2"
              value="gaming"
              v-model:modelValue="complexForm.hobbies"
            ></uve-checkbox>
            <uve-checkbox
              label="选项3"
              value="travel"
              v-model:modelValue="complexForm.hobbies"
            ></uve-checkbox>
          </view>
        </uve-form-item>
        <uve-form-item label="字段4" class="w-full">
          <view class="w-full">
            <uve-input
              v-model="complexForm.remark"
              type="textarea"
              placeholder="请输入内容"
              auto-height
              height="120px"
              class="w-full"
            />
          </view>
        </uve-form-item>
        <uve-form-item>
          <view class="flex space-x-3">
            <view>
              <uve-button type="primary" @click="submitComplexForm">提交</uve-button>
            </view>
            <view>
              <uve-button type="default" @click="resetComplexForm">重置</uve-button>
            </view>
          </view>
        </uve-form-item>
      </uve-form>
    </view>

    <!-- 行内表单 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">行内表单</view>
      <uve-form
        :model="inlineForm"
        :inline="true"
        label-width="60px"
        class="flex flex-wrap items-center"
      >
        <uve-form-item label="字段1" class="mb-2 mr-3">
          <uve-input v-model="inlineForm.name" placeholder="请输入内容" class="w-[180px]" />
        </uve-form-item>
        <uve-form-item label="字段2" class="mb-2 mr-3">
          <uve-input v-model="inlineForm.department" placeholder="请输入内容" class="w-[180px]" />
        </uve-form-item>
        <uve-form-item class="mb-2">
          <uve-button type="primary">查询</uve-button>
        </uve-form-item>
      </uve-form>
    </view>

    <!-- 不同标签位置 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">不同标签位置</view>
      <view class="space-y-6">
        <view>
          <view class="text-sm text-gray-500 mb-2">左对齐（默认）</view>
          <uve-form :model="{}" label-width="80px" label-position="left">
            <uve-form-item label="标签">
              <uve-input placeholder="左对齐内容" />
            </uve-form-item>
          </uve-form>
        </view>
        <view>
          <view class="text-sm text-gray-500 mb-2">右对齐</view>
          <uve-form :model="{}" label-width="80px" label-position="right">
            <uve-form-item label="标签">
              <uve-input placeholder="右对齐内容" />
            </uve-form-item>
          </uve-form>
        </view>
        <view>
          <view class="text-sm text-gray-500 mb-2">顶部对齐</view>
          <uve-form :model="{}" label-width="80px" label-position="top">
            <uve-form-item label="标签">
              <uve-input placeholder="顶部对齐内容" />
            </uve-form-item>
          </uve-form>
        </view>
      </view>
    </view>

    <!-- 验证表单 -->
    <view class="bg-white rounded p-4 mb-4 box-border">
      <view class="font-medium mb-3">验证表单</view>
      <uve-form
        ref="validationFormRef"
        :model="validationForm"
        :rules="validationRules"
        label-width="80px"
      >
        <uve-form-item label="字段1" prop="username">
          <uve-input
            v-model="validationForm.username"
            placeholder="请输入字段1"
            @blur="handleBlur('username')"
          />
        </uve-form-item>
        <uve-form-item label="字段2" prop="password">
          <uve-input
            v-model="validationForm.password"
            placeholder="请输入字段2"
            @blur="handleBlur('password')"
          />
        </uve-form-item>
        <uve-form-item>
          <view class="flex space-x-3">
            <view>
              <uve-button type="primary" @tap="submitValidationForm">提交</uve-button>
            </view>
            <view>
              <uve-button class="ml-2" @tap="resetValidationForm">重置</uve-button>
            </view>
          </view>
        </uve-form-item>
      </uve-form>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
// 基础表单
const basicFormRef = ref(null)
const basicForm = reactive({
  username: "",
  password: "",
})
const basicRules = {
  username: [{ required: true, message: "请输入字段", trigger: ["blur", "submit"] }],
  password: [{ required: true, message: "请输入字段", trigger: ["blur", "submit"] }],
}

// 表单校验
const validateFormRef = ref(null)
const validateForm = reactive({
  name: "",
  email: "",
  mobile: "",
})
const validateRules = {
  name: [
    { required: true, message: "请输入字段", trigger: ["blur", "submit"] },
    { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: ["blur", "submit"] },
  ],
  email: [
    { required: true, message: "请输入字段", trigger: ["blur", "submit"] },
    {
      pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
      message: "请输入正确格式的字段",
      trigger: ["blur", "submit"],
    },
  ],
  mobile: [
    { required: true, message: "请输入字段1", trigger: ["blur", "submit"] },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的字段1", trigger: ["blur", "submit"] },
  ],
}

// 多类型表单
const complexFormRef = ref(null)
const complexForm = reactive({
  name: "",
  gender: "male",
  hobbies: ["reading"],
  remark: "",
})

// 行内表单
const inlineForm = reactive({
  name: "",
  department: "",
})

// 验证表单相关
const validationFormRef = ref(null)
const validationForm = reactive({
  username: "",
  password: "",
  email: "",
  mobile: "",
})

const validationRules = {
  username: [{ required: true, message: "请输入字段1", trigger: ["blur", "submit"] }],
  password: [{ required: true, message: "请输入字段2", trigger: ["blur", "submit"] }],
  email: [
    { required: true, message: "请输入字段3", trigger: ["blur", "submit"] },
    {
      pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
      message: "请输入正确格式的字段3",
      trigger: ["blur", "submit"],
    },
  ],
  mobile: [
    { required: true, message: "请输入字段4", trigger: ["blur", "submit"] },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确格式的字段4", trigger: ["blur", "submit"] },
  ],
}

// 通用字段验证辅助方法
const handleFieldBlur = (formRef, field) => {
  if (formRef?.value?.validateField) {
    formRef.value.validateField(field, "blur")
  }
}

// 处理输入框失焦事件，触发单字段验证
const handleBlur = (field) => {
  handleFieldBlur(validationFormRef, field)
}

// 基础表单方法
const submitBasicForm = () => {
  console.log("尝试提交基础表单")
  if (!basicFormRef.value) {
    console.error("表单ref为空")
    return
  }

  // 直接使用submit方法
  const res = basicFormRef.value.submit()
  console.log("表单提交结果:", res)
}

const resetBasicForm = () => {
  if (basicFormRef.value) {
    basicFormRef.value.reset()
  }
}

// 表单校验方法
const submitValidateForm = () => {
  console.log("尝试提交校验表单")
  if (!validateFormRef.value) {
    console.error("表单ref为空")
    return
  }

  // 直接使用submit方法
  const res = validateFormRef.value.submit()
  console.log("表单提交结果:", res)
}

const resetValidateForm = () => {
  validateFormRef.value?.reset()
}

// 多类型表单方法
const submitComplexForm = () => {
  uni.showToast({
    title: "提交成功",
    icon: "success",
  })
  console.log("提交的表单数据:", complexForm)
}

const resetComplexForm = () => {
  complexFormRef.value?.reset()
}

// 验证表单方法
const submitValidationForm = async () => {
  try {
    if (!validationFormRef.value) {
      console.error("表单ref为空")
      return
    }

    // 直接使用submit方法
    const res = validationFormRef.value.submit()
    console.log("表单提交结果:", res)
  } catch (error) {
    console.log("表单验证失败：", error)
  }
}

const resetValidationForm = () => {
  if (validationFormRef.value) {
    validationFormRef.value.reset()
  }
}

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "表单示例",
  })
})
</script>
