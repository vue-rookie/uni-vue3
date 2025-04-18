<template>
  <view class="page-container min-h-screen bg-gray-50">
    <uve-navbar
      title="自定义导航栏"
      :border="false"
      backgroundColor="#333333"
      titleColor="text-white"
      :fixed="true"
      :placeholder="true"
    />
    <view class="p-4">
      <view class="text-xl font-bold mb-6">uve-navbar 导航栏</view>
      <view class="text-sm text-gray-500 mb-4">
        导航栏组件，用于页面顶部显示标题、返回按钮等操作区域，支持固定顶部、自定义背景色等功能。
      </view>

      <view class="space-y-6">
        <!-- 基础导航栏 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">基础导航栏</view>
          <view class="border rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar title="基础导航栏" :border="false" :fixed="false" />
          </view>
          <view class="text-sm text-gray-500">基本导航栏，只设置标题，无边框</view>
        </view>

        <!-- 自定义背景色 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">自定义背景色</view>
          <view class="rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar
              title="主题色背景"
              backgroundColor="#ccc"
              titleColor="#000"
              :border="false"
              :fixed="false"
            />
          </view>
          <view class="text-sm text-gray-500 mb-4">使用主题色作为背景，黑色文字</view>

          <view class="rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar
              title="深色背景"
              backgroundColor="#333333"
              titleColor="text-white"
              :border="false"
              :fixed="false"
            />
          </view>
          <view class="text-sm text-gray-500 mb-4">深色背景，适合夜间模式</view>

          <view class="rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar
              title="渐变背景"
              backgroundColor="linear-gradient(to right, #4facfe, #00f2fe)"
              titleColor="text-white"
              :border="false"
              :fixed="false"
            />
          </view>
          <view class="text-sm text-gray-500">渐变背景效果，增强视觉体验</view>
        </view>

        <!-- 返回按钮 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">返回按钮</view>
          <view class="border rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar title="带返回按钮" :show-back="true" @back="onBack" :fixed="false" />
          </view>
          <view class="text-sm text-gray-500 mb-4">显示返回按钮，点击可返回上一页</view>

          <view class="border rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar
              title="带返回文字"
              :show-back="true"
              back-text="返回"
              @back="onBack"
              :fixed="false"
            />
          </view>
          <view class="text-sm text-gray-500">返回按钮带文字，提升可读性</view>
        </view>

        <!-- 自定义左侧/右侧内容 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">自定义左侧/右侧内容</view>
          <view class="border rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar title="自定义左侧" :fixed="false">
              <template #left>
                <view class="flex items-center pl-3">
                  <text class="text-lg text-primary mr-1">≡</text>
                  <text class="text-primary">菜单</text>
                </view>
              </template>
            </uve-navbar>
          </view>
          <view class="text-sm text-gray-500 mb-4">自定义左侧区域，可放置菜单按钮</view>

          <view class="border rounded-lg overflow-hidden mb-2 h-12 relative">
            <uve-navbar title="自定义右侧" :fixed="false">
              <template #right>
                <view class="flex items-center pr-3">
                  <text class="text-lg text-gray-600 mr-3">🔍</text>
                  <text class="text-lg text-gray-600">⋮</text>
                </view>
              </template>
            </uve-navbar>
          </view>
          <view class="text-sm text-gray-500">自定义右侧区域，可放置搜索、更多按钮</view>
        </view>

        <!-- 带标签页的导航栏 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">带标签页的导航栏</view>
          <view class="border rounded-lg overflow-hidden h-20 relative">
            <uve-navbar title="" :border="true" :fixed="false">
              <view class="flex border-t border-gray-100">
                <view class="flex-1 py-2 text-center text-primary border-b-2 border-primary">
                  <text class="text-sm">推荐</text>
                </view>
                <view class="flex-1 py-2 text-center text-gray-600">
                  <text class="text-sm">关注</text>
                </view>
                <view class="flex-1 py-2 text-center text-gray-600">
                  <text class="text-sm">热门</text>
                </view>
              </view>
            </uve-navbar>
          </view>
          <view class="text-sm text-gray-500 mt-2">底部添加标签页导航，适合内容分类浏览</view>
        </view>

        <!-- 透明背景 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">透明背景</view>
          <view class="relative rounded-lg overflow-hidden h-60">
            <image
              src="https://picsum.photos/id/1018/800/400"
              mode="aspectFill"
              class="absolute inset-0 w-full h-full"
            />
            <uve-navbar
              title="透明导航栏"
              :transparent="true"
              titleColor="text-white"
              :border="false"
              :show-back="true"
              :fixed="false"
              @back="onBack"
            />
          </view>
          <view class="text-sm text-gray-500 mt-2">透明背景导航栏，适合放在图片或视频上方</view>
        </view>

        <!-- 实用场景示例 -->
        <view class="bg-white p-4 rounded-lg">
          <view class="text-lg font-bold mb-4">实用场景示例</view>
          <view class="space-y-4">
            <!-- 电商导航栏 -->
            <view class="border rounded-lg overflow-hidden h-12 relative">
              <uve-navbar :border="true" :fixed="false">
                <template #left>
                  <view class="flex items-center pl-3">
                    <text class="text-lg">⌂</text>
                  </view>
                </template>
                <template #title>
                  <view
                    class="bg-gray-100 rounded-full flex items-center px-3 py-1 w-full max-w-xs"
                  >
                    <text class="text-gray-400 mr-2">🔍</text>
                    <text class="text-gray-400 text-sm">搜索商品</text>
                  </view>
                </template>
                <template #right>
                  <view class="flex items-center pr-3">
                    <text class="text-lg mr-3">💬</text>
                    <text class="text-lg">🛒</text>
                  </view>
                </template>
              </uve-navbar>
            </view>
            <view class="text-sm text-gray-500 mt-1 mb-4">电商App导航栏，带搜索框和购物车</view>

            <!-- 社交媒体导航栏 -->
            <view class="border rounded-lg overflow-hidden h-12 relative">
              <uve-navbar backgroundColor="#1DA1F2" :border="false" :fixed="false">
                <template #left>
                  <view class="flex items-center pl-3">
                    <text class="text-white text-lg">👤</text>
                  </view>
                </template>
                <template #title>
                  <text class="text-white font-bold">社交平台</text>
                </template>
                <template #right>
                  <view class="flex items-center pr-3">
                    <text class="text-white text-lg">✨</text>
                  </view>
                </template>
              </uve-navbar>
            </view>
            <view class="text-sm text-gray-500 mt-1">社交媒体导航栏，突出品牌色</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"

// 标签页数据
const tabs = [
  { name: "推荐", value: "recommend" },
  { name: "关注", value: "following" },
  { name: "热门", value: "hot" },
]

// 当前选中的标签页
const currentTab = ref("recommend")

// 返回按钮点击事件
const onBack = () => {
  uni.showToast({
    title: "点击了返回按钮",
    icon: "none",
  })
}
</script>

<style>
.page-container {
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
