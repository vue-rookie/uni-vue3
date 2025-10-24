<template>
  <view class="page-container min-h-screen bg-gray-50 demo-section">
    <view class="p-4">
      <view class="text-xl font-bold mb-6">uve-popup 弹出层组件</view>
      <view class="text-sm text-gray-500 mb-4">
        弹出层组件，支持多种弹出方式，可自定义内容和样式。
      </view>

      <view class="space-y-6">
        <!-- 基础弹出层 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">基础用法</view>
          <view class="flex flex-wrap gap-3">
            <uve-button class="px-4 py-2 bg-primary text-white rounded" @tap="showBasic = true">
              显示弹出层
            </uve-button>
          </view>
          <uve-popup
            v-model:visible="showBasic"
            @open="onOpen('基础弹出层')"
            @close="onClose('基础弹出层')"
          >
            <view class="p-4 min-w-[250px] min-h-[200px] flex flex-col items-center justify-center">
              <view class="text-lg mb-4">基础弹出层</view>
            </view>
          </uve-popup>
        </view>

        <!-- 弹出位置 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">弹出位置</view>
          <view class="flex flex-wrap gap-3">
            <uve-button
              v-for="position in positions"
              :key="position.value"
              class="px-4 py-2 bg-primary text-white rounded"
              @tap="showPositionPopup(position.value)"
            >
              {{ position.label }}
            </uve-button>
          </view>
          <uve-popup
            v-model:visible="positionVisible"
            :position="currentPosition"
            @open="onOpen(`${getPositionLabel(currentPosition)}弹出层`)"
            @close="onClose(`${getPositionLabel(currentPosition)}弹出层`)"
          >
            <view class="p-4 min-w-[250px] min-h-[150px] flex flex-col items-center justify-center">
              <view class="text-lg mb-4">{{ getPositionLabel(currentPosition) }}弹出层</view>
            </view>
          </uve-popup>
        </view>

        <!-- 标题和关闭按钮 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">标题和关闭按钮</view>
          <view class="flex flex-wrap gap-3">
            <uve-button class="px-4 py-2 bg-primary text-white rounded" @tap="showWithTitle = true">
              带标题的弹出层
            </uve-button>
            <uve-button
              class="px-4 py-2 bg-primary text-white rounded"
              @tap="showWithCloseBtn = true"
            >
              带关闭按钮的弹出层
            </uve-button>
          </view>

          <uve-popup
            v-model:visible="showWithTitle"
            title="标题文本"
            @open="onOpen('带标题的弹出层')"
            @close="onClose('带标题的弹出层')"
          >
            <view class="p-4 min-w-[250px] min-h-[150px] flex items-center justify-center">
              <view class="text-center">这是一个带标题的弹出层</view>
            </view>
          </uve-popup>

          <uve-popup
            v-model:visible="showWithCloseBtn"
            showClose
            @open="onOpen('带关闭按钮的弹出层')"
            @close="onClose('带关闭按钮的弹出层')"
          >
            <view class="p-4 min-w-[250px] min-h-[150px] flex items-center justify-center">
              <view class="text-center">这是一个带关闭按钮的弹出层</view>
            </view>
          </uve-popup>
        </view>

        <!-- 自定义内容 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">自定义内容</view>
          <view class="flex flex-wrap gap-3">
            <uve-button class="px-4 py-2 bg-primary text-white rounded" @tap="showForm = true">
              表单弹出层
            </uve-button>
            <uve-button class="px-4 py-2 bg-primary text-white rounded" @tap="showImage = true">
              图片弹出层
            </uve-button>
          </view>

          <!-- 表单弹出层 -->
          <uve-popup
            v-model:visible="showForm"
            title="登录"
            position="center"
            :width="500"
            showClose
            @open="onOpen('表单弹出层')"
            @close="onClose('表单弹出层')"
          >
            <view class="p-4 w-full">
              <uve-form :model="loginForm" :rules="loginRules" label-width="0" ref="loginFormRef">
                <view class="flex justify-center w-full">
                  <uve-form-item prop="username">
                    <uve-input v-model="loginForm.username" placeholder="请输入用户名" />
                  </uve-form-item>
                </view>
                <view class="flex justify-center w-full">
                  <uve-form-item prop="password">
                    <uve-input
                      v-model="loginForm.password"
                      type="password"
                      placeholder="请输入密码"
                    />
                  </uve-form-item>
                </view>
                <view class="flex justify-center">
                  <uve-form-item>
                    <uve-button type="primary" class="w-full" @tap="handleLogin">登录</uve-button>
                  </uve-form-item>
                </view>
              </uve-form>
            </view>
          </uve-popup>

          <!-- 图片弹出层 -->
          <uve-popup
            v-model:visible="showImage"
            position="center"
            @open="onOpen('图片弹出层')"
            @close="onClose('图片弹出层')"
          >
            <view class="relative">
              <image
                src="https://qinqiang.oss-cn-beijing.aliyuncs.com/gh_0fb82a6dc9c4_344.jpg"
                mode="widthFix"
                class="w-[250px]"
              />
            </view>
          </uve-popup>
        </view>

        <!-- 遮罩层设置 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">遮罩层设置</view>
          <view class="flex flex-wrap gap-3">
            <uve-button class="px-4 py-2 bg-primary text-white rounded" @tap="showNoMask = true">
              无遮罩层
            </uve-button>
            <uve-button
              class="px-4 py-2 bg-primary text-white rounded"
              @tap="showNoMaskClose = true"
            >
              点击遮罩不关闭
            </uve-button>
          </view>

          <uve-popup
            v-model:visible="showNoMask"
            :mask="false"
            position="center"
            @open="onOpen('无遮罩层弹出层')"
            @close="onClose('无遮罩层弹出层')"
          >
            <view
              class="p-4 min-w-[250px] min-h-[150px] bg-white shadow-lg rounded-lg flex items-center justify-center"
            >
              <view class="text-center">这是一个无遮罩层的弹出层</view>
            </view>
          </uve-popup>

          <uve-popup
            v-model:visible="showNoMaskClose"
            :mask-closable="false"
            showClose
            position="center"
            @open="onOpen('点击遮罩不关闭弹出层')"
            @close="onClose('点击遮罩不关闭弹出层')"
          >
            <view class="p-4 min-w-[250px] min-h-[150px] flex flex-col items-center justify-center">
              <view class="text-center mb-4">点击遮罩不会关闭</view>
            </view>
          </uve-popup>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue"

// 基础弹出层
const showBasic = ref(false)

// 弹出位置
const positions = [
  { label: "顶部弹出", value: "top" },
  { label: "底部弹出", value: "bottom" },
  { label: "左侧弹出", value: "left" },
  { label: "右侧弹出", value: "right" },
  { label: "居中弹出", value: "center" },
]
const positionVisible = ref(false)
const currentPosition = ref("center")

const showPositionPopup = (position) => {
  currentPosition.value = position
  positionVisible.value = true
}

const getPositionLabel = (position) => {
  const pos = positions.find((p) => p.value === position)
  return pos ? pos.label.replace("弹出", "") : ""
}

// 标题和关闭按钮
const showWithTitle = ref(false)
const showWithCloseBtn = ref(false)

// 自定义内容
const showForm = ref(false)
const showImage = ref(false)
const showCustom = ref(false)
const options = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
  { label: "选项四", value: "4" },
  { label: "选项五", value: "5" },
]

// 登录表单
const loginForm = reactive({
  username: "",
  password: "",
})

const loginRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "submit" }],
  password: [{ required: true, message: "请输入密码", trigger: "submit" }],
}

const loginFormRef = ref(null)

// 处理登录表单提交
const handleLogin = () => {
  if (!loginFormRef.value) {
    console.error("表单引用为空")
    uni.showToast({
      title: "表单未准备好",
      icon: "error",
    })
    return
  }

  console.log("执行表单验证...")
  loginFormRef.value.validate((valid, invalidFields) => {
    console.log("验证结果:", valid, "错误字段:", invalidFields)
    if (valid) {
      // 验证通过，显示成功提示并关闭弹窗
      uni.showToast({
        title: "登录成功",
        icon: "success",
      })
      showForm.value = false
    } else {
      // 获取第一个错误信息
      const firstError = invalidFields ? Object.values(invalidFields)[0]?.message : "表单验证失败"
      // 验证失败，显示错误提示
      uni.showToast({
        title: firstError,
        icon: "error",
      })
    }
  })
}

// 遮罩层设置
const showNoMask = ref(false)
const showNoMaskClose = ref(false)

// 事件处理
const onOpen = (name) => {
  console.log(`${name}已打开`)
}

const onClose = (name) => {
  console.log(`${name}已关闭`)
}
</script>

<style>
.page-container {
  padding-bottom: 50px;
}

.bg-primary {
  background-color: var(--primary-color);
}
</style>
