<template>
  <scroll-view class="bg-white" style="min-height: 100vh" scroll-y>
    <view class="p-6 demo-section">
      <!-- 页面头部 -->
      <view class="text-center mb-8 demo-section">
        <view class="text-2xl font-bold text-gray-800 mb-2">🃏 uve-card 卡片组件</view>
        <view
          class="text-sm text-gray-600 bg-white bg-opacity-80 px-4 py-2 rounded-full inline-block"
        >
          灵活的内容容器，支持多种尺寸和样式变体
        </view>
      </view>

      <!-- 基础用法 -->
      <view class="mb-8 demo-section">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">📦 基础用法</view>
          <view class="text-sm text-gray-600">最简单的卡片使用方式</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <uve-card title="基础卡片" subtitle="这是一个基础的卡片组件" shadow>
            <text class="text-gray-600">这是卡片的内容区域，可以放置任何内容。</text>
          </uve-card>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">title</text>
          和
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">subtitle</text>
          属性可以快速设置卡片标题
        </view>
      </view>

      <!-- 不同尺寸 -->
      <view class="mb-8 demo-section">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">📏 不同尺寸</view>
          <view class="text-sm text-gray-600">三种预设尺寸，适应不同场景</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <view class="mb-4">
            <uve-card size="small" title="小尺寸卡片" variant="outlined" border>
              <text class="text-gray-600">小尺寸卡片内容，适合紧凑布局</text>
            </uve-card>
          </view>
          <view class="mb-4">
            <uve-card size="medium" title="中等尺寸卡片" shadow>
              <text class="text-gray-600">中等尺寸卡片内容，默认推荐尺寸</text>
            </uve-card>
          </view>
          <view>
            <uve-card size="large" title="大尺寸卡片" variant="filled" shadow>
              <text class="text-gray-600">大尺寸卡片内容，适合重要信息展示</text>
            </uve-card>
          </view>
          <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
            <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">size</text>
            可设置为：small、medium、large
          </view>
        </view>
      </view>

      <!-- 不同变体 -->
      <view class="mb-8">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">🎨 不同变体</view>
          <view class="text-sm text-gray-600">多种视觉样式，满足不同设计需求</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <view class="mb-4">
            <uve-card variant="default" title="默认样式" shadow>
              <text class="text-gray-600">默认的卡片样式，简洁清爽，带轻微阴影</text>
            </uve-card>
          </view>
          <view class="mb-4">
            <uve-card variant="outlined" title="边框样式" border>
              <text class="text-gray-600">带边框的卡片样式，层次分明，无阴影</text>
            </uve-card>
          </view>
          <view class="mb-4">
            <uve-card variant="filled" title="填充样式" backgroundColor="#ccc">
              <text class="text-gray-600">填充背景的卡片样式，温和舒适，灰色背景</text>
            </uve-card>
          </view>
          <view>
            <uve-card variant="elevated" title="阴影样式" shadow>
              <text class="text-gray-600">带阴影的卡片样式，立体感强，突出显示</text>
            </uve-card>
          </view>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">variant</text>
          可设置为：default、outlined、filled、elevated
        </view>
      </view>

      <!-- 交互效果 -->
      <view class="mb-8">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">⚡ 交互效果</view>
          <view class="text-sm text-gray-600">丰富的交互反馈，提升用户体验</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <view class="mb-4">
            <uve-card
              hover
              title="悬停效果"
              subtitle="鼠标悬停时有缩放效果"
              variant="outlined"
              border
              class="mb-4"
            >
              <text class="text-gray-600">悬停时卡片会有缩放和阴影效果</text>
            </uve-card>
          </view>
          <view class="mb-4">
            <uve-card
              clickable
              title="可点击卡片"
              subtitle="点击时有缩放效果"
              variant="elevated"
              shadow
              @click="handleCardClick"
            >
              <text class="text-gray-600">点击卡片会有缩放效果，并触发点击事件</text>
            </uve-card>
          </view>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">hover</text>
          和
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">clickable</text>
          属性控制交互效果
        </view>
      </view>

      <!-- 自定义内容 -->
      <view class="mb-8">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">🎯 自定义内容</view>
          <view class="text-sm text-gray-600">使用插槽自定义头部和底部内容</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <uve-card>
            <template #header>
              <view class="flex items-center justify-between">
                <view class="flex items-center">
                  <view
                    class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3"
                  >
                    <text class="i-ri-user-line text-white text-sm"></text>
                  </view>
                  <view>
                    <text class="text-base font-semibold text-gray-900">用户信息</text>
                    <text class="text-sm text-gray-500 block">自定义头部内容</text>
                  </view>
                </view>
                <view class="text-blue-500">
                  <text class="i-ri-more-line text-lg"></text>
                </view>
              </view>
            </template>

            <view class="space-y-2">
              <view class="flex justify-between">
                <text class="text-gray-600">用户名</text>
                <text class="text-gray-900">张三</text>
              </view>
              <view class="flex justify-between">
                <text class="text-gray-600">邮箱</text>
                <text class="text-gray-900">zhangsan@example.com</text>
              </view>
              <view class="flex justify-between">
                <text class="text-gray-600">手机</text>
                <text class="text-gray-900">138****8888</text>
              </view>
            </view>

            <template #footer>
              <view class="space-x-2 text-right">
                <uve-button size="small" plain>取消</uve-button>
                <uve-button size="small" type="primary">确认</uve-button>
              </view>
            </template>
          </uve-card>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          使用
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">#header</text>
          和
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">#footer</text>
          插槽自定义内容
        </view>
      </view>

      <!-- 图片卡片 -->
      <view class="mb-8 demo-section">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">🖼️ 图片卡片</view>
          <view class="text-sm text-gray-600">展示包含图片的卡片样式</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <uve-card title="图片卡片" subtitle="包含图片的卡片" variant="elevated" shadow>
            <view class="space-y-3">
              <view
                class="w-full h-32 rounded-lg flex items-center justify-center"
                style="background: linear-gradient(to right, #60a5fa, #a855f7)"
              >
                <text class="text-white text-lg">示例图片</text>
              </view>
              <text class="text-gray-600">这是一个包含图片的卡片示例，图片可以是任何内容。</text>
            </view>
          </uve-card>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          卡片内容区域可以放置任何元素，包括图片、视频等
        </view>
      </view>

      <!-- 网格布局 -->
      <view class="mb-8 demo-section">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">🔲 网格布局</view>
          <view class="text-sm text-gray-600">卡片在网格中的使用示例</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <view class="flex flex-wrap">
            <view class="w-1/2 pr-1 mb-2" style="width: 50%">
              <uve-card
                size="small"
                title="设置"
                clickable
                @click="handleGridItemClick(gridItems[0])"
              >
                <view class="text-center">
                  <view
                    class="w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full bg-blue-500"
                  >
                    <text class="i-ri-settings-line text-white text-lg"></text>
                  </view>
                  <text class="text-sm text-gray-600">系统设置</text>
                </view>
              </uve-card>
            </view>
            <view class="w-1/2 pl-1 mb-2" style="width: 50%">
              <uve-card
                size="small"
                title="消息"
                clickable
                @click="handleGridItemClick(gridItems[1])"
              >
                <view class="text-center">
                  <view
                    class="w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full bg-green-500"
                  >
                    <text class="i-ri-message-line text-white text-lg"></text>
                  </view>
                  <text class="text-sm text-gray-600">消息中心</text>
                </view>
              </uve-card>
            </view>
            <view class="w-1/2 pr-1 mb-2" style="width: 50%">
              <uve-card
                size="small"
                title="收藏"
                clickable
                @click="handleGridItemClick(gridItems[2])"
              >
                <view class="text-center">
                  <view
                    class="w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full bg-red-500"
                  >
                    <text class="i-ri-heart-line text-white text-lg"></text>
                  </view>
                  <text class="text-sm text-gray-600">我的收藏</text>
                </view>
              </uve-card>
            </view>
            <view class="w-1/2 pl-1 mb-2" style="width: 50%">
              <uve-card
                size="small"
                title="帮助"
                clickable
                @click="handleGridItemClick(gridItems[3])"
              >
                <view class="text-center">
                  <view
                    class="w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full bg-purple-500"
                  >
                    <text class="i-ri-question-line text-white text-lg"></text>
                  </view>
                  <text class="text-sm text-gray-600">帮助中心</text>
                </view>
              </uve-card>
            </view>
          </view>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          卡片可以很好地适应网格布局，提供一致的用户体验
        </view>
      </view>

      <!-- 自定义颜色 -->
      <view class="mb-8 demo-section">
        <view class="mb-4">
          <view class="text-lg font-semibold text-gray-800 mb-1">🎨 自定义颜色</view>
          <view class="text-sm text-gray-600">支持自定义背景色、边框色和文字色</view>
        </view>
        <view class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <view class="mb-4">
            <uve-card
              title="自定义背景色"
              subtitle="蓝色背景的卡片"
              backgroundColor="#dbeafe"
              borderColor="#3b82f6"
            >
              <text class="text-gray-700">这是一个自定义背景色的卡片示例</text>
            </uve-card>
          </view>
          <view class="mb-4">
            <uve-card
              title="自定义边框色"
              subtitle="绿色边框的卡片"
              backgroundColor="#f0fdf4"
              borderColor="#22c55e"
              border
            >
              <text class="text-gray-700">这是一个自定义边框色的卡片示例</text>
            </uve-card>
          </view>
          <view>
            <uve-card
              title="自定义文字色"
              subtitle="紫色文字的卡片"
              backgroundColor="#faf5ff"
              textColor="#7c3aed"
            >
              <text>这是一个自定义文字色的卡片示例</text>
            </uve-card>
          </view>
        </view>
        <view class="mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
          使用
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">backgroundColor</text>
          、
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">borderColor</text>
          和
          <text class="font-mono bg-gray-200 px-1 rounded text-gray-700">textColor</text>
          属性自定义颜色
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="text-center mt-8 mb-4">
        <view class="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full inline-block">
          💡 卡片组件支持丰富的自定义选项，满足各种设计需求
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 网格项目数据
const gridItems = ref([
  {
    title: "设置",
    description: "系统设置",
    icon: "i-ri-settings-line",
    bgColor: "bg-blue-500",
  },
  {
    title: "消息",
    description: "消息中心",
    icon: "i-ri-message-line",
    bgColor: "bg-green-500",
  },
  {
    title: "收藏",
    description: "我的收藏",
    icon: "i-ri-heart-line",
    bgColor: "bg-red-500",
  },
  {
    title: "帮助",
    description: "帮助中心",
    icon: "i-ri-question-line",
    bgColor: "bg-purple-500",
  },
])

// 处理卡片点击
const handleCardClick = () => {
  uni.showToast({
    title: "卡片被点击了！",
    icon: "none",
  })
}

// 处理网格项目点击
const handleGridItemClick = (item: any) => {
  uni.showToast({
    title: `点击了${item.title}`,
    icon: "none",
  })
}

// 设置页面标题
uni.setNavigationBarTitle({
  title: "uve-card 演示",
})
</script>
