<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 自定义导航栏 -->
    <uve-navbar
      :title="'添加朋友'"
      :fixed="true"
      :border="false"
      :show-back="true"
      title-color="text-gray-800"
    ></uve-navbar>

    <!-- 选项卡 -->
    <view class="bg-white pt-4 pb-2">
      <view class="flex border-b border-gray-100">
        <view
          class="flex-1 text-center py-3 relative"
          :class="{ 'active-tab': currentTab === 0 }"
          @click="switchTab(0)"
        >
          <text :class="currentTab === 0 ? 'text-gray-900 font-medium' : 'text-gray-500'">
            添加朋友
          </text>
          <view
            v-if="currentTab === 0"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-900"
          ></view>
        </view>
        <view
          class="flex-1 text-center py-3 relative"
          :class="{ 'active-tab': currentTab === 1 }"
          @click="switchTab(1)"
        >
          <text :class="currentTab === 1 ? 'text-gray-900 font-medium' : 'text-gray-500'">
            朋友申请
          </text>
          <view
            v-if="currentTab === 1"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-900"
          ></view>
        </view>
        <view
          class="flex-1 text-center py-3 relative"
          :class="{ 'active-tab': currentTab === 2 }"
          @click="switchTab(2)"
        >
          <text :class="currentTab === 2 ? 'text-gray-900 font-medium' : 'text-gray-500'">
            朋友
          </text>
          <view
            v-if="currentTab === 2"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-900"
          ></view>
        </view>
      </view>
    </view>

    <!-- 添加朋友 Tab -->
    <view v-if="currentTab === 0">
      <!-- 搜索框 -->
      <view class="p-4">
        <view class="flex items-center bg-gray-200 rounded-lg px-3 py-2">
          <text class="i-ri-search-line text-gray-500 mr-2"></text>
          <input
            type="text"
            placeholder="搜索用户名字/抖音号"
            class="flex-1 bg-transparent text-gray-800 text-sm"
            placeholder-class="text-gray-400 text-sm"
          />
          <text class="i-ri-scan-line text-gray-500 ml-2"></text>
        </view>
      </view>

      <!-- 快捷添加方式 -->
      <view class="bg-white mt-2 p-4">
        <view class="grid grid-cols-4 gap-4">
          <view class="flex flex-col items-center" @click="navigateToContacts">
            <view class="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
              <text class="i-ri-contacts-book-line text-purple-500 text-2xl"></text>
            </view>
            <text class="text-gray-800 text-sm">通讯录</text>
          </view>
          <view class="flex flex-col items-center" @click="scanQRCode">
            <view class="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <text class="i-ri-qr-scan-line text-blue-500 text-2xl"></text>
            </view>
            <text class="text-gray-800 text-sm">扫一扫</text>
          </view>
          <view class="flex flex-col items-center" @click="showMyQRCode">
            <view class="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <text class="i-ri-qr-code-line text-blue-500 text-2xl"></text>
            </view>
            <text class="text-gray-800 text-sm">二维码</text>
          </view>
          <view class="flex flex-col items-center" @click="importWechatFriends">
            <view class="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-2">
              <text class="i-ri-wechat-line text-green-500 text-2xl"></text>
            </view>
            <text class="text-gray-800 text-sm">微信朋友</text>
          </view>
        </view>
      </view>

      <!-- 为你推荐 -->
      <view class="mt-4 px-4">
        <view class="flex items-center mb-4">
          <text class="text-gray-700">为你推荐</text>
          <text class="i-ri-information-line text-gray-400 ml-1"></text>
        </view>

        <!-- 推荐用户列表 -->
        <view class="space-y-4">
          <!-- 推荐用户1 -->
          <view class="bg-white rounded-lg p-4">
            <view class="flex">
              <image
                src="https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg"
                class="w-14 h-14 rounded-full"
                mode="aspectFill"
              ></image>
              <view class="ml-3 flex-1">
                <view class="flex items-center">
                  <text class="text-gray-900 font-medium">Promise。</text>
                  <text class="i-ri-fire-line text-red-500 ml-1"></text>
                </view>
                <text class="text-gray-500 text-sm mt-1">共同关注了 3 人</text>
              </view>
              <view class="ml-2">
                <button class="bg-red-500 text-white text-sm rounded-full px-6 py-1.5">关注</button>
              </view>
            </view>
            <view class="flex mt-3 space-x-2">
              <image
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
              <image
                src="https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
              <image
                src="https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
            </view>
          </view>

          <!-- 推荐用户2 -->
          <view class="bg-white rounded-lg p-4">
            <view class="flex">
              <image
                src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg"
                class="w-14 h-14 rounded-full"
                mode="aspectFill"
              ></image>
              <view class="ml-3 flex-1">
                <view class="flex items-center">
                  <text class="text-gray-900 font-medium">babysbreath.</text>
                </view>
                <view class="flex items-center mt-1">
                  <image
                    src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg"
                    class="w-4 h-4 rounded-full"
                    mode="aspectFill"
                  ></image>
                  <text class="text-gray-500 text-xs ml-1">与泡芙小狗等 2 人互关</text>
                </view>
              </view>
              <view class="ml-2">
                <button class="bg-red-500 text-white text-sm rounded-full px-6 py-1.5">关注</button>
              </view>
            </view>
            <view class="flex mt-3 space-x-2">
              <image
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
              <image
                src="https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
              <image
                src="https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg"
                class="w-24 h-24 rounded-md"
                mode="aspectFill"
              ></image>
            </view>
          </view>

          <!-- 推荐用户3 -->
          <view class="bg-white rounded-lg p-4">
            <view class="flex">
              <image
                src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg"
                class="w-14 h-14 rounded-full"
                mode="aspectFill"
              ></image>
              <view class="ml-3 flex-1">
                <view class="flex items-center">
                  <text class="text-gray-900 font-medium">都会越来越好</text>
                  <text class="i-ri-flower-line text-pink-500 ml-1"></text>
                </view>
                <text class="text-gray-500 text-sm mt-1">有 2 个共同互关的人</text>
              </view>
              <view class="ml-2">
                <button class="bg-red-500 text-white text-sm rounded-full px-6 py-1.5">关注</button>
              </view>
            </view>
          </view>

          <!-- 推荐用户4 -->
          <view class="bg-white rounded-lg p-4">
            <view class="flex">
              <image
                src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg"
                class="w-14 h-14 rounded-full"
                mode="aspectFill"
              ></image>
              <view class="ml-3 flex-1">
                <view class="flex items-center">
                  <text class="text-gray-900 font-medium">糊涂蛋蛋</text>
                  <text class="i-ri-pig-line text-pink-500 ml-1"></text>
                </view>
                <text class="text-gray-500 text-sm mt-1">可能认识的人</text>
              </view>
              <view class="ml-2">
                <button class="bg-red-500 text-white text-sm rounded-full px-6 py-1.5">关注</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 朋友申请 Tab -->
    <view v-else-if="currentTab === 1" class="p-4">
      <view class="flex flex-col items-center justify-center py-16">
        <view class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <text class="i-ri-user-received-2-line text-gray-400 text-4xl"></text>
        </view>
        <text class="text-gray-500 mb-2">暂无好友申请</text>
        <text class="text-gray-400 text-sm">添加好友后，对方需要通过你的验证申请</text>
      </view>
    </view>

    <!-- 朋友列表 Tab -->
    <view v-else-if="currentTab === 2" class="p-4">
      <view class="flex flex-col items-center justify-center py-16">
        <view class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <text class="i-ri-user-smile-line text-gray-400 text-4xl"></text>
        </view>
        <text class="text-gray-500 mb-2">暂无好友</text>
        <text class="text-gray-400 text-sm">添加好友后，可以开始聊天互动</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 当前选中的选项卡
const currentTab = ref(0)

// 切换选项卡
const switchTab = (index: number) => {
  currentTab.value = index
  console.log(currentTab.value)
}

// 跳转到通讯录
const navigateToContacts = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  })
}

// 扫描二维码
const scanQRCode = () => {
  uni.scanCode({
    success: (res) => {
      console.log("扫码结果:", res)
      uni.showToast({
        title: "扫码成功",
        icon: "success",
      })
    },
    fail: () => {
      uni.showToast({
        title: "扫码失败",
        icon: "none",
      })
    },
  })
}

// 显示我的二维码
const showMyQRCode = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  })
}

// 导入微信朋友
const importWechatFriends = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  })
}

// 设置页面标题
uni.setNavigationBarTitle({
  title: "添加朋友",
})
</script>

<style>
.active-tab {
  position: relative;
}
</style>
