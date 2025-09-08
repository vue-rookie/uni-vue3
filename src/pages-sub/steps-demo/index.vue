<template>
  <view class="page-container bg-white min-h-screen p-4">
    <view class="text-xl font-bold mb-6">uve-steps 步骤条</view>

    <view class="text-sm text-gray-500 mb-4">
      步骤条组件，用于引导用户按照流程完成任务，或者展示当前任务的进度。
    </view>

    <!-- 基础用法 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">基础用法</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="basicSteps" :active="basicActive" />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('basicActive', basicSteps.length)"
            :disabled="basicActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('basicActive', basicSteps.length)"
            :disabled="basicActive === basicSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        基础步骤条，通过 active 属性控制当前步骤
      </view>
    </view>

    <!-- 垂直方向 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">垂直方向</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="verticalSteps" :active="verticalActive" direction="vertical" />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('verticalActive', verticalSteps.length)"
            :disabled="verticalActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('verticalActive', verticalSteps.length)"
            :disabled="verticalActive === verticalSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        垂直方向的步骤条，通过 direction="vertical" 设置
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">不显示对勾图标</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="customSteps" :active="customActive" :show-check-icon="false" />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('customActive', customSteps.length)"
            :disabled="customActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('customActive', customSteps.length)"
            :disabled="customActive === customSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 show-check-icon="false" 可以不显示完成步骤的对勾图标
      </view>
    </view>

    <!-- 预设颜色 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">预设颜色</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="colorSteps" :active="colorActive" active-color="success" />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('colorActive', colorSteps.length)"
            :disabled="colorActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="success"
            @click="nextStep('colorActive', colorSteps.length)"
            :disabled="colorActive === colorSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 active-color 属性可以使用预设颜色，可选值：primary、success、warning、danger
      </view>
    </view>

    <!-- 自定义UnoCSS颜色 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义UnoCSS颜色</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps
          :steps="unocssColorSteps"
          :active="unocssColorActive"
          custom-active-color="blue-500"
          custom-finished-color="blue-300"
        />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('unocssColorActive', unocssColorSteps.length)"
            :disabled="unocssColorActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            style="background-color: #3b82f6; color: white"
            @click="nextStep('unocssColorActive', unocssColorSteps.length)"
            :disabled="unocssColorActive === unocssColorSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 custom-active-color 和 custom-finished-color 属性可以使用UnoCSS颜色类
      </view>
    </view>

    <!-- 自定义CSS颜色值 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义CSS颜色值</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps
          :steps="cssColorSteps"
          :active="cssColorActive"
          active-color-value="#8B5CF6"
          finished-color-value="#C4B5FD"
        />
        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('cssColorActive', cssColorSteps.length)"
            :disabled="cssColorActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            style="background-color: #8b5cf6; color: white"
            @click="nextStep('cssColorActive', cssColorSteps.length)"
            :disabled="cssColorActive === cssColorSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 active-color-value 和 finished-color-value 属性可以使用任意CSS颜色值
      </view>
    </view>

    <!-- 自定义插槽 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">自定义插槽</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="slotSteps" :active="slotActive">
          <!-- 自定义图标 -->
          <template #icon="{ index }">
            <text v-if="index === 0" class="i-ri-home-line text-base"></text>
            <text v-else-if="index === 1" class="i-ri-settings-line text-base"></text>
            <text v-else-if="index === 2" class="i-ri-flag-line text-base"></text>
          </template>

          <!-- 自定义标题 -->
          <template #title="{ index, step, active }">
            <view class="flex items-center">
              <text class="font-bold" :class="{ 'text-blue-500': index === active }">
                {{ step.title }}
              </text>
              <text v-if="index === active" class="ml-1 text-xs text-blue-500">(当前)</text>
            </view>
          </template>

          <!-- 自定义描述 -->
          <template #description="{ index, step, active }">
            <view class="text-xs italic" :class="{ 'text-blue-400': index === active }">
              {{ step.description }}
            </view>
          </template>
        </uve-steps>

        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('slotActive', slotSteps.length)"
            :disabled="slotActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('slotActive', slotSteps.length)"
            :disabled="slotActive === slotSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过插槽可以自定义图标、标题和描述的显示方式
      </view>
    </view>

    <!-- 特定步骤自定义 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">特定步骤自定义</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="specificSteps" :active="specificActive">
          <!-- 第一步自定义图标 -->
          <template #icon-0>
            <view
              class="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center"
            >
              <text class="i-ri-star-line"></text>
            </view>
          </template>

          <!-- 第二步自定义内容 -->
          <template #content-1="{ step }">
            <view class="bg-blue-50 p-2 rounded">
              <view class="text-blue-700 font-medium">{{ step.title }}</view>
              <view class="text-blue-500 text-xs mt-1">{{ step.description }}</view>
              <view class="text-xs text-gray-500 mt-2 bg-white p-1 rounded">自定义内容区域</view>
            </view>
          </template>
        </uve-steps>

        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('specificActive', specificSteps.length)"
            :disabled="specificActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('specificActive', specificSteps.length)"
            :disabled="specificActive === specificSteps.length - 1"
          >
            下一步
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        可以为特定步骤自定义内容，如 #icon-0 表示第一步的图标，#content-1 表示第二步的整个内容区域
      </view>
    </view>

    <!-- 结合表单使用 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">结合表单使用</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-steps :steps="formSteps" :active="formActive" />

        <!-- 步骤内容 -->
        <view class="mt-4 p-4 border border-gray-200 rounded-lg">
          <!-- 第一步：基本信息 -->
          <view v-if="formActive === 0">
            <view class="text-base font-medium mb-3">基本信息</view>
            <view class="mb-3">
              <text class="text-sm text-gray-600 mb-1 block">姓名</text>
              <input class="border border-gray-300 rounded p-2 w-full" placeholder="请输入姓名" />
            </view>
            <view class="mb-3">
              <text class="text-sm text-gray-600 mb-1 block">手机号</text>
              <input class="border border-gray-300 rounded p-2 w-full" placeholder="请输入手机号" />
            </view>
          </view>

          <!-- 第二步：地址信息 -->
          <view v-if="formActive === 1">
            <view class="text-base font-medium mb-3">地址信息</view>
            <view class="mb-3">
              <text class="text-sm text-gray-600 mb-1 block">省市区</text>
              <input class="border border-gray-300 rounded p-2 w-full" placeholder="请选择省市区" />
            </view>
            <view class="mb-3">
              <text class="text-sm text-gray-600 mb-1 block">详细地址</text>
              <textarea
                class="border border-gray-300 rounded p-2 w-full"
                placeholder="请输入详细地址"
              />
            </view>
          </view>

          <!-- 第三步：付款方式 -->
          <view v-if="formActive === 2">
            <view class="text-base font-medium mb-3">付款方式</view>
            <view class="mb-3">
              <text class="text-sm text-gray-600 mb-1 block">选择支付方式</text>
              <view class="flex flex-col gap-2">
                <view class="flex items-center p-2 border border-gray-300 rounded">
                  <radio checked />
                  <text class="ml-2">微信支付</text>
                </view>
                <view class="flex items-center p-2 border border-gray-300 rounded">
                  <radio />
                  <text class="ml-2">支付宝</text>
                </view>
                <view class="flex items-center p-2 border border-gray-300 rounded">
                  <radio />
                  <text class="ml-2">银行卡</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 第四步：完成 -->
          <view v-if="formActive === 3">
            <view class="text-center py-8">
              <view class="text-success text-4xl mb-4">✓</view>
              <view class="text-lg font-medium mb-2">提交成功</view>
              <view class="text-gray-500">您的信息已经提交成功，我们将尽快处理</view>
            </view>
          </view>
        </view>

        <view class="flex justify-between mt-4">
          <uve-button
            size="small"
            @click="prevStep('formActive', formSteps.length)"
            :disabled="formActive === 0"
          >
            上一步
          </uve-button>
          <uve-button
            size="small"
            type="primary"
            @click="nextStep('formActive', formSteps.length)"
            :disabled="formActive === formSteps.length - 1"
          >
            {{ formActive === formSteps.length - 2 ? "提交" : "下一步" }}
          </uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        结合表单使用，实现分步骤填写表单的功能
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import uveSteps from "@/components/uve-steps/index.vue"
import uveButton from "@/components/uve-button/index.vue"

// 基础步骤
const basicSteps = [
  { title: "步骤一", description: "描述文案" },
  { title: "步骤二", description: "描述文案" },
  { title: "步骤三", description: "描述文案" },
]
const basicActive = ref(0)

// 垂直步骤
const verticalSteps = [
  { title: "填写信息", description: "填写基本信息" },
  { title: "上传材料", description: "上传相关证明材料" },
  { title: "等待审核", description: "等待系统审核" },
  { title: "完成", description: "审核通过，流程完成" },
]
const verticalActive = ref(1)

// 自定义图标步骤
const customSteps = [
  { title: "购物车", description: "确认商品信息" },
  { title: "确认订单", description: "确认收货地址和支付方式" },
  { title: "付款", description: "完成支付" },
  { title: "完成", description: "订单完成" },
]
const customActive = ref(1)

// 预设颜色步骤
const colorSteps = [
  { title: "已完成", description: "2023-01-01 10:00" },
  { title: "进行中", description: "2023-01-02 10:00" },
  { title: "待处理", description: "2023-01-03 10:00" },
]
const colorActive = ref(1)

// 自定义UnoCSS颜色步骤
const unocssColorSteps = [
  { title: "计划", description: "项目规划阶段" },
  { title: "开发", description: "项目开发阶段" },
  { title: "测试", description: "项目测试阶段" },
]
const unocssColorActive = ref(1)

// 自定义CSS颜色值步骤
const cssColorSteps = [
  { title: "设计", description: "UI/UX设计阶段" },
  { title: "编码", description: "前端编码阶段" },
  { title: "部署", description: "应用部署阶段" },
]
const cssColorActive = ref(1)

// 自定义插槽步骤
const slotSteps = [
  { title: "开始", description: "项目启动" },
  { title: "进行中", description: "项目进行中" },
  { title: "结束", description: "项目结束" },
]
const slotActive = ref(1)

// 特定步骤自定义
const specificSteps = [
  { title: "特殊步骤", description: "自定义图标" },
  { title: "重要步骤", description: "自定义整个内容区域" },
  { title: "普通步骤", description: "默认样式" },
]
const specificActive = ref(1)

// 表单步骤
const formSteps = [
  { title: "基本信息" },
  { title: "地址信息" },
  { title: "付款方式" },
  { title: "完成" },
]
const formActive = ref(0)

// 上一步
const prevStep = (activeRef, maxSteps) => {
  // 使用对象引用代替eval
  const refObj = {
    basicActive,
    verticalActive,
    customActive,
    colorActive,
    unocssColorActive,
    cssColorActive,
    slotActive,
    specificActive,
    formActive,
  }

  if (refObj[activeRef].value > 0) {
    refObj[activeRef].value--
  }
}

// 下一步
const nextStep = (activeRef, maxSteps) => {
  // 使用对象引用代替eval
  const refObj = {
    basicActive,
    verticalActive,
    customActive,
    colorActive,
    unocssColorActive,
    cssColorActive,
    slotActive,
    specificActive,
    formActive,
  }

  if (refObj[activeRef].value < maxSteps - 1) {
    refObj[activeRef].value++
  }
}
</script>
