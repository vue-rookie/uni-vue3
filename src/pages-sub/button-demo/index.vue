<template>
  <scroll-view class="bg-white min-h-screen" scroll-y>
    <view class="p-6">
      <!-- 页面头部 -->
      <view class="text-center mb-8">
        <view class="text-2xl font-bold text-gray-800 mb-2">🔘 uve-button 按钮组件</view>
        <view class="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full inline-block">
          支持多种类型、尺寸、状态的交互按钮
        </view>
      </view>

      <!-- 基础类型 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🎨 基础类型</view>
          <view class="section-desc">不同颜色主题的按钮样式</view>
        </view>
        <view class="demo-card">
          <view class="flex flex-wrap gap-2">
            <uve-button>默认按钮</uve-button>
            <uve-button type="primary">主要按钮</uve-button>
            <uve-button type="success">成功按钮</uve-button>
            <uve-button type="warning">警告按钮</uve-button>
            <uve-button type="danger">危险按钮</uve-button>
            <uve-button type="info">信息按钮</uve-button>
          </view>
        </view>
        <view class="code-hint">
          <text class="code-text">type</text>
          可设置为：default、primary、success、warning、danger、info
        </view>
      </view>

      <!-- 朴素按钮 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🌟 朴素按钮</view>
          <view class="section-desc">简洁的边框样式，适合次要操作</view>
        </view>
        <view class="demo-card">
          <view class="flex flex-wrap gap-2">
            <uve-button plain>朴素按钮</uve-button>
            <uve-button type="primary" plain>主要按钮</uve-button>
            <uve-button type="success" plain>成功按钮</uve-button>
            <uve-button type="warning" plain>警告按钮</uve-button>
            <uve-button type="danger" plain>危险按钮</uve-button>
            <uve-button type="info" plain>信息按钮</uve-button>
          </view>
        </view>
        <view class="code-hint">
          设置
          <text class="code-text">plain</text>
          属性可以使按钮变为朴素样式
        </view>
      </view>

      <!-- 按钮尺寸 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">📏 按钮尺寸</view>
          <view class="section-desc">从迷你到大号的四种尺寸选择</view>
        </view>
        <view class="demo-card">
          <view class="size-showcase">
            <view class="size-item">
              <uve-button type="primary" size="mini">迷你按钮</uve-button>
              <text class="size-label">mini</text>
            </view>
            <view class="size-item">
              <uve-button type="primary" size="small">小型按钮</uve-button>
              <text class="size-label">small</text>
            </view>
            <view class="size-item">
              <uve-button type="primary">默认大小</uve-button>
              <text class="size-label">normal</text>
            </view>
            <view class="size-item">
              <uve-button type="primary" size="large">大号按钮</uve-button>
              <text class="size-label">large</text>
            </view>
          </view>
        </view>
        <view class="code-hint">
          <text class="code-text">size</text>
          可设置为：mini、small、normal、large
        </view>
      </view>

      <!-- 圆角按钮 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🔄 圆角按钮</view>
          <view class="section-desc">圆角设计，更加现代美观</view>
        </view>
        <view class="demo-card">
          <view class="flex flex-wrap gap-2">
            <uve-button round>默认圆角</uve-button>
            <uve-button type="primary" round>主要圆角</uve-button>
            <uve-button type="success" round>成功圆角</uve-button>
            <uve-button type="warning" round>警告圆角</uve-button>
            <uve-button type="danger" round>危险圆角</uve-button>
          </view>
        </view>
        <view class="code-hint">
          设置
          <text class="code-text">round</text>
          属性可以使按钮变为圆角样式
        </view>
      </view>

      <!-- 状态演示 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">⚡ 按钮状态</view>
          <view class="section-desc">加载状态和禁用状态的展示</view>
        </view>
        <view class="demo-card">
          <!-- 禁用状态 -->
          <view class="mb-6">
            <view class="text-sm font-medium text-gray-700 mb-3">禁用状态</view>
            <view class="flex flex-wrap gap-2">
              <uve-button disabled>禁用按钮</uve-button>
              <uve-button type="primary" disabled>禁用主要</uve-button>
              <uve-button type="success" plain disabled>禁用朴素</uve-button>
            </view>
          </view>

          <!-- 加载状态 -->
          <view class="mb-6">
            <view class="text-sm font-medium text-gray-700 mb-3">加载状态</view>
            <view class="flex flex-wrap gap-2">
              <uve-button loading>加载中</uve-button>
              <uve-button type="primary" loading>加载中</uve-button>
              <uve-button type="success" loading>加载中</uve-button>
              <uve-button type="warning" loading>加载中</uve-button>
              <uve-button type="danger" loading>加载中</uve-button>
            </view>
          </view>

          <!-- 动态加载演示 -->
          <view>
            <view class="text-sm font-medium text-gray-700 mb-3">动态加载演示</view>
            <uve-button :type="loadingType" :loading="isLoading" @click="handleLoadingDemo">
              {{ isLoading ? "加载中..." : "点击演示加载" }}
            </uve-button>
          </view>
        </view>
        <view class="code-hint">
          设置
          <text class="code-text">disabled</text>
          或
          <text class="code-text">loading</text>
          属性控制按钮状态
        </view>
      </view>

      <!-- 块级按钮 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">📱 块级按钮</view>
          <view class="section-desc">宽度100%的按钮，适合移动端</view>
        </view>
        <view class="demo-card">
          <uve-button type="primary" block>主要块级按钮</uve-button>
          <view class="h-3"></view>
          <uve-button type="success" block>成功块级按钮</uve-button>
          <view class="h-3"></view>
          <uve-button type="warning" block round>圆角块级按钮</uve-button>
        </view>
        <view class="code-hint">
          设置
          <text class="code-text">block</text>
          属性可以让按钮变为块级样式
        </view>
      </view>

      <!-- 交互演示 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🎯 交互演示</view>
          <view class="section-desc">按钮点击事件和波纹效果</view>
        </view>
        <view class="demo-card">
          <view class="interaction-demo">
            <uve-button type="primary" @click="handleClick" :ripple="rippleEnabled">
              🎯 点击我 ({{ clickCount }})
            </uve-button>

            <view class="mt-4 flex flex-wrap gap-2">
              <uve-button
                size="small"
                :type="rippleEnabled ? 'primary' : 'default'"
                @click="toggleRipple"
              >
                {{ rippleEnabled ? "关闭" : "开启" }}波纹效果
              </uve-button>

              <uve-button size="small" type="info" @click="resetCounter">重置计数</uve-button>
            </view>

            <view v-if="clickCount > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
              <view class="text-sm text-blue-600">
                🎉 按钮被点击了
                <text class="font-bold">{{ clickCount }}</text>
                次！
              </view>
            </view>
          </view>
        </view>
        <view class="code-hint">
          通过
          <text class="code-text">@click</text>
          监听点击事件，设置
          <text class="code-text">ripple</text>
          控制波纹效果
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 基础交互状态
const clickCount = ref(0)
const rippleEnabled = ref(true)

// 动态加载演示
const isLoading = ref(false)
const loadingType = ref<"primary" | "success" | "warning" | "danger">("primary")
const loadingTypes = ["primary", "success", "warning", "danger"] as const

// 点击事件处理
const handleClick = () => {
  clickCount.value++
}

// 重置计数器
const resetCounter = () => {
  clickCount.value = 0
}

// 切换波纹效果
const toggleRipple = () => {
  rippleEnabled.value = !rippleEnabled.value
}

// 动态加载演示
const handleLoadingDemo = async () => {
  if (isLoading.value) return

  isLoading.value = true

  // 模拟异步操作
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // 切换按钮类型
  const currentIndex = loadingTypes.indexOf(loadingType.value)
  loadingType.value = loadingTypes[(currentIndex + 1) % loadingTypes.length]

  isLoading.value = false
}
</script>

<style lang="scss" scoped>
// 页面样式
.page-container {
  min-height: 100vh;
}

// 演示区块样式
.demo-section {
  animation: fade-in-up 0.6s ease-out forwards;

  .section-header {
    margin-bottom: 16px;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-desc {
      font-size: 14px;
      color: #6b7280;
    }
  }

  .demo-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow:
      0 1px 3px rgb(0 0 0 / 10%),
      0 1px 2px rgb(0 0 0 / 6%);
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;

    &:hover {
      box-shadow:
        0 4px 6px rgb(0 0 0 / 10%),
        0 2px 4px rgb(0 0 0 / 6%);
      transform: translateY(-1px);
    }
  }

  .code-hint {
    margin-top: 12px;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 12px;
    color: #64748b;

    .code-text {
      font-family: "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace;
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
      color: #334155;
    }
  }
}

// 尺寸展示
.size-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .size-label {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
    }
  }
}

// 交互演示
.interaction-demo {
  .mt-4 {
    margin-top: 16px;
  }

  .flex {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .gap-2 {
    gap: 8px;
  }

  .p-3 {
    padding: 12px;
  }

  .rounded-lg {
    border-radius: 8px;
  }

  .text-sm {
    font-size: 14px;
  }

  .font-bold {
    font-weight: 600;
  }
}

// 代码示例样式
.code-example {
  .code-block {
    background: #1e293b;
    border-radius: 8px;
    padding: 16px;
    font-family: "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #e2e8f0;
    overflow-x: auto;
    white-space: pre-wrap;
  }
}

// 响应式设计
@media (width <= 640px) {
  .page-container {
    padding: 16px;
  }

  .demo-section {
    margin-bottom: 24px;

    .demo-card {
      padding: 16px;
      border-radius: 12px;
    }

    .section-header {
      .section-title {
        font-size: 16px;
      }
    }
  }
}

// 动画效果
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 悬停效果已在.demo-card规则中定义
</style>
