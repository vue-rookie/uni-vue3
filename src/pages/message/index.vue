<template>
  <view class="message-page">
    <!-- 顶部标签切换 -->
    <view class="message-tabs">
      <view 
        class="tab-item"
        :class="{ active: currentTab === 'chat' }"
        @click="switchTab('chat')"
      >
        <text class="tab-text">聊天</text>
        <view v-if="unreadChatCount > 0" class="badge">{{ unreadChatCount }}</view>
      </view>
      <view 
        class="tab-item"
        :class="{ active: currentTab === 'notification' }"
        @click="switchTab('notification')"
      >
        <text class="tab-text">通知</text>
        <view v-if="unreadNotificationCount > 0" class="badge">{{ unreadNotificationCount }}</view>
      </view>
    </view>

    <!-- 聊天列表 -->
    <view v-if="currentTab === 'chat'" class="chat-list">
      <view 
        class="chat-item"
        v-for="chat in chatList"
        :key="chat.id"
        @click="openChat(chat)"
      >
        <view class="avatar-container">
          <image :src="chat.avatar" class="chat-avatar" />
          <view v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</view>
        </view>
        <view class="chat-content">
          <view class="chat-header">
            <text class="chat-name">{{ chat.name }}</text>
            <text class="chat-time">{{ formatTime(chat.lastMessageTime) }}</text>
          </view>
          <view class="chat-message">
            <text class="message-content">{{ chat.lastMessage }}</text>
          </view>
        </view>
      </view>
      
      <view v-if="chatList.length === 0" class="empty-state">
        <text class="iconfont icon-message-empty empty-icon"></text>
        <text class="empty-text">暂无聊天记录</text>
        <text class="empty-desc">快去和朋友们聊天吧~</text>
      </view>
    </view>

    <!-- 通知列表 -->
    <view v-if="currentTab === 'notification'" class="notification-list">
      <view 
        class="notification-item"
        v-for="notification in notificationList"
        :key="notification.id"
        @click="handleNotificationClick(notification)"
      >
        <view class="notification-icon">
          <text class="iconfont" :class="getNotificationIcon(notification.type)"></text>
        </view>
        <view class="notification-content">
          <view class="notification-header">
            <text class="notification-title">{{ notification.title }}</text>
            <text class="notification-time">{{ formatTime(notification.time) }}</text>
          </view>
          <text class="notification-desc">{{ notification.description }}</text>
        </view>
        <view v-if="!notification.isRead" class="unread-dot"></view>
      </view>

      <view v-if="notificationList.length === 0" class="empty-state">
        <text class="iconfont icon-notification-empty empty-icon"></text>
        <text class="empty-text">暂无通知</text>
        <text class="empty-desc">有新通知时会在这里显示</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: number
  unreadCount: number
}

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'system'
  title: string
  description: string
  time: number
  isRead: boolean
}

const currentTab = ref<'chat' | 'notification'>('chat')
const chatList = ref<Chat[]>([])
const notificationList = ref<Notification[]>([])

const unreadChatCount = computed(() => {
  return chatList.value.reduce((count, chat) => count + chat.unreadCount, 0)
})

const unreadNotificationCount = computed(() => {
  return notificationList.value.filter(n => !n.isRead).length
})

const switchTab = (tab: 'chat' | 'notification') => {
  currentTab.value = tab
}

const openChat = (chat: Chat) => {
  uni.navigateTo({
    url: `/pages/chat/index?id=${chat.id}&name=${chat.name}`
  })
}

const handleNotificationClick = (notification: Notification) => {
  // 标记为已读
  notification.isRead = true
  
  // 根据通知类型跳转到相应页面
  switch (notification.type) {
    case 'like':
    case 'comment':
      uni.navigateTo({
        url: `/pages/detail/index?id=${notification.id}`
      })
      break
    case 'follow':
      uni.navigateTo({
        url: `/pages/profile/index?id=${notification.id}`
      })
      break
    default:
      break
  }
}

const getNotificationIcon = (type: string) => {
  const iconMap = {
    like: 'icon-heart-fill',
    comment: 'icon-comment-fill',
    follow: 'icon-user-plus',
    system: 'icon-notification'
  }
  return iconMap[type] || 'icon-notification'
}

const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }
}

const loadData = () => {
  // 模拟聊天数据
  chatList.value = [
    {
      id: 'chat_1',
      name: '小红书官方',
      avatar: 'https://picsum.photos/60/60?random=official',
      lastMessage: '欢迎来到小红书！',
      lastMessageTime: Date.now() - 30 * 60 * 1000,
      unreadCount: 1
    },
    {
      id: 'chat_2',
      name: '美妆达人Alice',
      avatar: 'https://picsum.photos/60/60?random=alice',
      lastMessage: '这个口红色号真的超好看！',
      lastMessageTime: Date.now() - 2 * 60 * 60 * 1000,
      unreadCount: 0
    },
    {
      id: 'chat_3',
      name: '旅行博主Bob',
      avatar: 'https://picsum.photos/60/60?random=bob',
      lastMessage: '下次一起去这个地方吧~',
      lastMessageTime: Date.now() - 1 * 24 * 60 * 60 * 1000,
      unreadCount: 2
    }
  ]

  // 模拟通知数据
  notificationList.value = [
    {
      id: 'notif_1',
      type: 'like',
      title: '点赞通知',
      description: 'Alice 赞了你的笔记',
      time: Date.now() - 10 * 60 * 1000,
      isRead: false
    },
    {
      id: 'notif_2',
      type: 'comment',
      title: '评论通知',
      description: 'Bob 评论了你的笔记："太棒了！"',
      time: Date.now() - 30 * 60 * 1000,
      isRead: false
    },
    {
      id: 'notif_3',
      type: 'follow',
      title: '关注通知',
      description: 'Charlie 关注了你',
      time: Date.now() - 60 * 60 * 1000,
      isRead: true
    },
    {
      id: 'notif_4',
      type: 'system',
      title: '系统通知',
      description: '你的笔记已通过审核',
      time: Date.now() - 2 * 60 * 60 * 1000,
      isRead: true
    }
  ]
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.message-page {
  height: 100vh;
  background: #f8f8f8;

  .message-tabs {
    background: #fff;
    display: flex;
    border-bottom: 1rpx solid #f0f0f0;

    .tab-item {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32rpx 0;

      .tab-text {
        font-size: 32rpx;
        color: #666;
        font-weight: 500;
      }

      .badge {
        position: absolute;
        top: 20rpx;
        right: 50%;
        transform: translateX(40rpx);
        background: #ff2442;
        color: #fff;
        font-size: 20rpx;
        min-width: 32rpx;
        height: 32rpx;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 8rpx;
      }

      &.active {
        .tab-text {
          color: #ff2442;
          font-weight: 600;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60rpx;
          height: 4rpx;
          background: #ff2442;
          border-radius: 2rpx;
        }
      }
    }
  }

  .chat-list {
    background: #fff;

    .chat-item {
      display: flex;
      align-items: center;
      padding: 32rpx 24rpx;
      border-bottom: 1rpx solid #f8f8f8;

      &:last-child {
        border-bottom: none;
      }

      .avatar-container {
        position: relative;
        margin-right: 24rpx;

        .chat-avatar {
          width: 96rpx;
          height: 96rpx;
          border-radius: 50%;
        }

        .unread-badge {
          position: absolute;
          top: -8rpx;
          right: -8rpx;
          background: #ff2442;
          color: #fff;
          font-size: 20rpx;
          min-width: 32rpx;
          height: 32rpx;
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8rpx;
        }
      }

      .chat-content {
        flex: 1;

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8rpx;

          .chat-name {
            font-size: 28rpx;
            font-weight: 600;
            color: #333;
          }

          .chat-time {
            font-size: 22rpx;
            color: #999;
          }
        }

        .chat-message {
          .message-content {
            font-size: 26rpx;
            color: #666;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }

  .notification-list {
    background: #fff;

    .notification-item {
      display: flex;
      align-items: center;
      padding: 32rpx 24rpx;
      border-bottom: 1rpx solid #f8f8f8;
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      .notification-icon {
        width: 80rpx;
        height: 80rpx;
        background: #f5f5f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;

        .iconfont {
          font-size: 40rpx;
          color: #ff2442;
        }
      }

      .notification-content {
        flex: 1;

        .notification-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8rpx;

          .notification-title {
            font-size: 28rpx;
            font-weight: 600;
            color: #333;
          }

          .notification-time {
            font-size: 22rpx;
            color: #999;
          }
        }

        .notification-desc {
          font-size: 26rpx;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }

      .unread-dot {
        width: 16rpx;
        height: 16rpx;
        background: #ff2442;
        border-radius: 50%;
        position: absolute;
        right: 24rpx;
        top: 32rpx;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 40rpx;
    text-align: center;

    .empty-icon {
      font-size: 120rpx;
      color: #ddd;
      margin-bottom: 32rpx;
    }

    .empty-text {
      font-size: 32rpx;
      color: #999;
      margin-bottom: 16rpx;
    }

    .empty-desc {
      font-size: 26rpx;
      color: #ccc;
    }
  }
}
</style>