<template>
  <scroll-view class="bg-white min-h-screen" scroll-y>
    <view class="p-6">
      <!-- 页面头部 -->
      <view class="text-center mb-8">
        <view class="text-2xl font-bold text-gray-800 mb-2">🃏 uve-card 卡片组件</view>
        <view class="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full inline-block">
          灵活的内容容器，支持多种尺寸和样式变体
        </view>
      </view>

      <!-- 基础用法 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">📦 基础用法</view>
          <view class="section-desc">最简单的卡片使用方式</view>
        </view>
        <view class="demo-card">
          <uve-card title="基础卡片" subtitle="这是一个基础的卡片组件">
            <text class="text-gray-600">这是卡片的内容区域，可以放置任何内容。</text>
          </uve-card>
        </view>
        <view class="code-hint">
          <text class="code-text">title</text>
          和
          <text class="code-text">subtitle</text>
          属性可以快速设置卡片标题
        </view>
      </view>

      <!-- 不同尺寸 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">📏 不同尺寸</view>
          <view class="section-desc">三种预设尺寸，适应不同场景</view>
        </view>
        <view class="demo-card">
          <view class="space-y-4">
            <uve-card size="small" title="小尺寸卡片">
              <text class="text-gray-600">小尺寸卡片内容，适合紧凑布局</text>
            </uve-card>

            <uve-card size="medium" title="中等尺寸卡片">
              <text class="text-gray-600">中等尺寸卡片内容，默认推荐尺寸</text>
            </uve-card>

            <uve-card size="large" title="大尺寸卡片">
              <text class="text-gray-600">大尺寸卡片内容，适合重要信息展示</text>
            </uve-card>
          </view>
        </view>
        <view class="code-hint">
          <text class="code-text">size</text>
          可设置为：small、medium、large
        </view>
      </view>

      <!-- 不同变体 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🎨 不同变体</view>
          <view class="section-desc">多种视觉样式，满足不同设计需求</view>
        </view>
        <view class="demo-card">
          <view class="space-y-4">
            <uve-card variant="default" title="默认样式">
              <text class="text-gray-600">默认的卡片样式，简洁清爽</text>
            </uve-card>

            <uve-card variant="outlined" title="边框样式">
              <text class="text-gray-600">带边框的卡片样式，层次分明</text>
            </uve-card>

            <uve-card variant="filled" title="填充样式">
              <text class="text-gray-600">填充背景的卡片样式，温和舒适</text>
            </uve-card>

            <uve-card variant="elevated" title="阴影样式">
              <text class="text-gray-600">带阴影的卡片样式，立体感强</text>
            </uve-card>
          </view>
        </view>
        <view class="code-hint">
          <text class="code-text">variant</text>
          可设置为：default、outlined、filled、elevated
        </view>
      </view>

      <!-- 交互效果 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">⚡ 交互效果</view>
          <view class="section-desc">丰富的交互反馈，提升用户体验</view>
        </view>
        <view class="demo-card">
          <view class="space-y-4">
            <uve-card hover title="悬停效果" subtitle="鼠标悬停时有缩放效果">
              <text class="text-gray-600">悬停时卡片会有缩放和阴影效果</text>
            </uve-card>

            <uve-card
              clickable
              title="可点击卡片"
              subtitle="点击时有缩放效果"
              @click="handleCardClick"
            >
              <text class="text-gray-600">点击卡片会有缩放效果，并触发点击事件</text>
            </uve-card>
          </view>
        </view>
        <view class="code-hint">
          <text class="code-text">hover</text>
          和
          <text class="code-text">clickable</text>
          属性控制交互效果
        </view>
      </view>

      <!-- 自定义内容 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🎯 自定义内容</view>
          <view class="section-desc">使用插槽自定义头部和底部内容</view>
        </view>
        <view class="demo-card">
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
              <view class="flex justify-end space-x-2">
                <view class="px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">取消</view>
                <view class="px-3 py-1 bg-blue-500 rounded text-sm text-white">确认</view>
              </view>
            </template>
          </uve-card>
        </view>
        <view class="code-hint">
          使用
          <text class="code-text">#header</text>
          和
          <text class="code-text">#footer</text>
          插槽自定义内容
        </view>
      </view>

      <!-- 图片卡片 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🖼️ 图片卡片</view>
          <view class="section-desc">展示包含图片的卡片样式</view>
        </view>
        <view class="demo-card">
          <uve-card title="图片卡片" subtitle="包含图片的卡片">
            <view class="space-y-3">
              <view
                class="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center"
              >
                <text class="text-white text-lg">示例图片</text>
              </view>
              <text class="text-gray-600">这是一个包含图片的卡片示例，图片可以是任何内容。</text>
            </view>
          </uve-card>
        </view>
        <view class="code-hint">卡片内容区域可以放置任何元素，包括图片、视频等</view>
      </view>

      <!-- 网格布局 -->
      <view class="demo-section mb-8">
        <view class="section-header">
          <view class="section-title">🔲 网格布局</view>
          <view class="section-desc">卡片在网格中的使用示例</view>
        </view>
        <view class="demo-card">
          <view class="grid grid-cols-2 gap-4">
            <uve-card
              v-for="(item, index) in gridItems"
              :key="index"
              size="small"
              :title="item.title"
              clickable
              @click="handleGridItemClick(item)"
            >
              <view class="text-center">
                <view
                  class="w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-full"
                  :class="item.bgColor"
                >
                  <text :class="item.icon" class="text-white text-lg"></text>
                </view>
                <text class="text-sm text-gray-600">{{ item.description }}</text>
              </view>
            </uve-card>
          </view>
        </view>
        <view class="code-hint">卡片可以很好地适应网格布局，提供一致的用户体验</view>
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

<style scoped>
.demo-section {
  @apply mb-8;
}

.section-header {
  @apply mb-4;
}

.section-title {
  @apply text-lg font-semibold text-gray-800 mb-1;
}

.section-desc {
  @apply text-sm text-gray-600;
}

.demo-card {
  @apply bg-gray-50 p-4 rounded-lg border border-gray-200;
}

.code-hint {
  @apply mt-3 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded;
}

.code-text {
  @apply font-mono bg-gray-200 px-1 rounded text-gray-700;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}
</style>
