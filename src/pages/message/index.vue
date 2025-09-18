<template>
  <view class="min-h-screen bg-white">
    <!-- 自定义导航栏 -->
    <uve-navbar
      :title="'消息'"
      :fixed="true"
      :border="false"
      :show-back="false"
      title-color="text-gray-800"
    >
      <template #right>
        <view class="flex items-center pr-4">
          <text class="i-ri-add-circle-line text-gray-800 text-xl"></text>
        </view>
      </template>
    </uve-navbar>

    <!-- 搜索栏 -->
    <view class="px-4 pt-2 pb-3 bg-white">
      <view class="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <text class="i-ri-search-line text-gray-500 mr-2"></text>
        <text class="text-gray-400 text-sm">搜索</text>
      </view>
    </view>

    <!-- 消息通知区域 -->
    <view class="bg-gray-50 px-4 py-2 flex items-center">
      <text class="i-ri-error-warning-line text-gray-500 mr-2"></text>
      <text class="text-gray-600 text-sm">当前无法接收朋友的消息提醒</text>
      <text class="text-blue-500 text-sm ml-auto">打开提醒 ></text>
    </view>

    <!-- 联系人列表 -->
    <scroll-view scroll-y class="h-[calc(100vh-180px)]">
      <!-- 联系人头像区域 -->
      <view class="p-4 border-b border-gray-100">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="inline-flex space-x-6">
            <!-- 添加好友按钮 -->
            <view class="flex flex-col items-center w-16">
              <view
                class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2"
              >
                <text class="i-ri-add-line text-gray-600 text-xl"></text>
              </view>
              <text class="text-xs text-gray-600 truncate w-full text-center">发日常</text>
            </view>

            <!-- 联系人列表 -->
            <view
              v-for="(contact, index) in contacts"
              :key="index"
              class="flex flex-col items-center w-16"
              @click="navigateToChat(contact)"
            >
              <view class="relative">
                <image
                  :src="contact.avatar"
                  class="w-14 h-14 rounded-full mb-2"
                  mode="aspectFill"
                ></image>
                <view
                  v-if="contact.badge"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <text class="text-white text-xs font-bold">+</text>
                </view>
              </view>
              <text class="text-xs text-gray-600 truncate w-full text-center">
                {{ contact.name }}
              </text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 消息列表 -->
      <view class="px-4">
        <!-- 新关注通知 -->
        <view
          class="py-4 border-b border-gray-100 flex items-center"
          @click="navigateToNotifications('follows')"
        >
          <view class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
            <text class="i-ri-user-add-line text-white text-xl"></text>
          </view>
          <view class="flex-1">
            <view class="flex justify-between items-center">
              <text class="font-medium text-gray-800">新关注我的</text>
              <text class="text-gray-400 text-xs">昨天 08:58</text>
            </view>
            <text class="text-gray-500 text-sm">没有新通知</text>
          </view>
        </view>

        <!-- 互动消息 -->
        <view
          class="py-4 border-b border-gray-100 flex items-center"
          @click="navigateToNotifications('interactions')"
        >
          <view class="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4">
            <text class="i-ri-message-2-line text-white text-xl"></text>
          </view>
          <view class="flex-1">
            <view class="flex justify-between items-center">
              <text class="font-medium text-gray-800">互动消息</text>
              <text class="text-gray-400 text-xs">07:01</text>
            </view>
            <text class="text-gray-500 text-sm">[余敏敏回答]... 等 3 人近期访问过你的主页</text>
          </view>
        </view>

        <!-- 群聊消息 -->
        <view
          v-for="(group, index) in groups"
          :key="'group-' + index"
          class="py-4 border-b border-gray-100 flex items-center"
          @click="navigateToChat(group)"
        >
          <view class="relative mr-4">
            <image :src="group.avatar" class="w-12 h-12 rounded-full" mode="aspectFill"></image>
            <view
              v-if="group.unread"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            >
              <text class="text-white text-xs">{{ group.unread > 99 ? "99+" : group.unread }}</text>
            </view>
          </view>
          <view class="flex-1">
            <view class="flex justify-between items-center">
              <text class="font-medium text-gray-800">{{ group.name }}</text>
              <text class="text-gray-400 text-xs">{{ group.time }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 text-sm truncate">{{ group.lastMessage }}</text>
              <view v-if="group.isOfficial" class="ml-2 px-1 bg-yellow-400 rounded-sm">
                <text class="text-white text-xs">☀️</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 个人聊天 -->
        <view
          v-for="(chat, index) in chats"
          :key="'chat-' + index"
          class="py-4 border-b border-gray-100 flex items-center"
          @click="navigateToChat(chat)"
        >
          <view class="relative mr-4">
            <image :src="chat.avatar" class="w-12 h-12 rounded-full" mode="aspectFill"></image>
            <view
              v-if="chat.unread"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            >
              <text class="text-white text-xs">{{ chat.unread > 99 ? "99+" : chat.unread }}</text>
            </view>
          </view>
          <view class="flex-1">
            <view class="flex justify-between items-center">
              <text class="font-medium text-gray-800">{{ chat.name }}</text>
              <text class="text-gray-400 text-xs">{{ chat.time }}</text>
            </view>
            <text class="text-gray-500 text-sm truncate">{{ chat.lastMessage }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 自定义底部导航栏 -->
  <uve-tabbar :current="3" :tab-list="tabList" @change="handleTabbarChange" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import UveTabbar from "@/components/uve-tabbar/index.vue"
import { defaultTabList, type TabItem } from "@/config/tabbar.config"

// 底部导航栏数据
const tabList = ref<TabItem[]>(defaultTabList)

// 联系人数据
const contacts = ref([
  {
    id: 1,
    name: "浮生一阙",
    avatar: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    badge: false,
  },
  {
    id: 2,
    name: "溜一溜",
    avatar: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    badge: true,
  },
  {
    id: 3,
    name: "牛®牛",
    avatar: "https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_1280.jpg",
    badge: false,
  },
  {
    id: 4,
    name: "我脸¹点也不像",
    avatar: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
    badge: false,
  },
])

// 群聊数据
const groups = ref([
  {
    id: 101,
    name: "问道手游小木的粉丝1群",
    avatar: "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png",
    lastMessage: "[群主发言]之前1.399，刚改价，手慢无",
    time: "22分钟前",
    unread: 1,
    isOfficial: false,
  },
  {
    id: 102,
    name: "陕南木子交流群",
    avatar: "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png",
    lastMessage: "[64条] 福建泉州明宏工艺品有限公司 通...",
    time: "09:40",
    unread: 1,
    isOfficial: false,
  },
])

// 聊天数据
const chats = ref([
  {
    id: 201,
    name: "浮生一阙",
    avatar: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    lastMessage: "[分享视频]一旦出现胎停，应该怎么处...",
    time: "刚刚",
    unread: 0,
  },
  {
    id: 202,
    name: "管氏翅吧的粉丝群 1",
    avatar: "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png",
    lastMessage: "[群主发言][直播预告]",
    time: "昨天 15:01",
    unread: 1,
  },
  {
    id: 203,
    name: "彤Toooang'",
    avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    lastMessage: "(1/3)",
    time: "昨天 11:57",
    unread: 0,
  },
])

// 导航到聊天页面
const navigateToChat = (item: any) => {
  uni.navigateTo({
    url: `/pages-sub/chat/index?id=${item.id}&name=${item.name}&avatar=${encodeURIComponent(item.avatar)}`,
  })
}

// 导航到通知页面
const navigateToNotifications = (type: string) => {
  uni.navigateTo({
    url: `/pages-sub/notifications/index?type=${type}`,
  })
}

// 处理底部导航栏切换
const handleTabbarChange = (index: number, item: any) => {
  console.log("切换到:", item.text, item.path)
}
</script>
