<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 用户信息卡片 -->
    <view class="bg-primary p-6 text-white">
      <view class="flex items-center space-x-4">
        <image
          class="w-16 h-16 rounded-full border-2 border-white/20"
          src="https://placekitten.com/100/100"
          mode="aspectFill"
        />
        <view>
          <text class="text-lg font-medium">用户名</text>
          <text class="text-sm opacity-80">ID: 888888</text>
        </view>
      </view>
    </view>

    <!-- 用户数据统计 -->
    <view class="bg-white -mt-4 mx-4 rounded-lg shadow-sm p-4">
      <view class="grid grid-cols-3 gap-4">
        <view class="text-center">
          <text class="text-lg font-medium text-gray-900">128</text>
          <text class="text-sm text-gray-500">收藏</text>
        </view>
        <view class="text-center">
          <text class="text-lg font-medium text-gray-900">32</text>
          <text class="text-sm text-gray-500">关注</text>
        </view>
        <view class="text-center">
          <text class="text-lg font-medium text-gray-900">256</text>
          <text class="text-sm text-gray-500">足迹</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="mt-4 mx-4 space-y-4">
      <!-- 订单相关 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <view class="p-4 border-b border-gray-100">
          <text class="text-base font-medium text-gray-900">我的订单</text>
        </view>
        <view class="grid grid-cols-4 p-4">
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">📦</text>
            </view>
            <text class="text-sm text-gray-600">待付款</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">🚚</text>
            </view>
            <text class="text-sm text-gray-600">待发货</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">📝</text>
            </view>
            <text class="text-sm text-gray-600">待评价</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">📋</text>
            </view>
            <text class="text-sm text-gray-600">全部订单</text>
          </view>
        </view>
      </view>

      <!-- 其他功能 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <view class="p-4 border-b border-gray-100">
          <text class="text-base font-medium text-gray-900">常用功能</text>
        </view>
        <view class="grid grid-cols-4 p-4">
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">❤️</text>
            </view>
            <text class="text-sm text-gray-600">我的收藏</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">👥</text>
            </view>
            <text class="text-sm text-gray-600">我的关注</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">🎁</text>
            </view>
            <text class="text-sm text-gray-600">优惠券</text>
          </view>
          <view class="flex flex-col items-center space-y-2">
            <view class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <text class="text-primary text-lg">💳</text>
            </view>
            <text class="text-sm text-gray-600">我的钱包</text>
          </view>
        </view>
      </view>

      <!-- 设置列表 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <view class="p-4 border-b border-gray-100">
          <text class="text-base font-medium text-gray-900">设置</text>
        </view>
        <view class="divide-y divide-gray-100">
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center space-x-3">
              <text class="text-lg">⚙️</text>
              <text class="text-gray-600">账号设置</text>
            </view>
            <text class="text-gray-400">></text>
          </view>
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center space-x-3">
              <text class="text-lg">🔔</text>
              <text class="text-gray-600">消息通知</text>
            </view>
            <text class="text-gray-400">></text>
          </view>
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center space-x-3">
              <text class="text-lg">🔒</text>
              <text class="text-gray-600">隐私设置</text>
            </view>
            <text class="text-gray-400">></text>
          </view>
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center space-x-3">
              <text class="text-lg">❓</text>
              <text class="text-gray-600">帮助与反馈</text>
            </view>
            <text class="text-gray-400">></text>
          </view>
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center space-x-3">
              <text class="text-lg">ℹ️</text>
              <text class="text-gray-600">关于我们</text>
            </view>
            <text class="text-gray-400">></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 这里可以添加页面逻辑
</script>
