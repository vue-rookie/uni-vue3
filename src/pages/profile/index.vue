<template>
  <view class="profile-page">
    <!-- 自定义导航栏 -->
    <xhs-navbar :transparent="true" text-color="#ffffff">
      <template #right>
        <text class="iconfont icon-setting nav-icon" @click="goToSettings"></text>
      </template>
    </xhs-navbar>

    <!-- 用户信息头部 -->
    <view class="profile-header">
      <image :src="userInfo.backgroundImage" class="background-image" />
      <view class="header-overlay"></view>
      <view class="header-content" :style="{ paddingTop: navbarHeight + 'px' }">
        <view class="user-basic">
          <image :src="userInfo.avatar" class="user-avatar" />
          <view class="user-info">
            <text class="user-name">{{ userInfo.name }}</text>
            <text class="user-id">小红书号：{{ userInfo.id }}</text>
            <text class="user-desc">{{ userInfo.description }}</text>
          </view>
        </view>
        
        <view class="user-stats">
          <view class="stat-item" @click="showFollows">
            <text class="stat-number">{{ formatNumber(userInfo.followingCount) }}</text>
            <text class="stat-label">关注</text>
          </view>
          <view class="stat-item" @click="showFans">
            <text class="stat-number">{{ formatNumber(userInfo.followersCount) }}</text>
            <text class="stat-label">粉丝</text>
          </view>
          <view class="stat-item" @click="showLikes">
            <text class="stat-number">{{ formatNumber(userInfo.totalLikes) }}</text>
            <text class="stat-label">获赞</text>
          </view>
        </view>

        <view class="action-buttons">
          <view class="edit-profile-btn" @click="editProfile">
            <text class="btn-text">编辑资料</text>
          </view>
          <view class="share-btn" @click="shareProfile">
            <text class="iconfont icon-share"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 内容切换标签 -->
    <view class="content-tabs">
      <view 
        class="tab-item"
        :class="{ active: currentTab === 'notes' }"
        @click="switchTab('notes')"
      >
        <text class="tab-text">笔记</text>
      </view>
      <view 
        class="tab-item"
        :class="{ active: currentTab === 'collections' }"
        @click="switchTab('collections')"
      >
        <text class="tab-text">收藏</text>
      </view>
      <view 
        class="tab-item"
        :class="{ active: currentTab === 'likes' }"
        @click="switchTab('likes')"
      >
        <text class="tab-text">赞过</text>
      </view>
    </view>

    <!-- 内容展示区 -->
    <view class="content-area">
      <!-- 笔记列表 -->
      <view v-if="currentTab === 'notes'" class="notes-content">
        <xhs-waterfall 
          :notes="userNotes" 
          @note-click="handleNoteClick"
        />
        <view v-if="userNotes.length === 0" class="empty-state">
          <text class="iconfont icon-note-empty empty-icon"></text>
          <text class="empty-text">还没有发布过笔记</text>
          <view class="create-note-btn" @click="createNote">
            <text class="create-text">去发布第一篇笔记</text>
          </view>
        </view>
      </view>

      <!-- 收藏列表 -->
      <view v-if="currentTab === 'collections'" class="collections-content">
        <view class="collection-folders">
          <view 
            class="folder-item"
            v-for="folder in collectionFolders"
            :key="folder.id"
            @click="openFolder(folder)"
          >
            <view class="folder-cover">
              <image v-if="folder.coverImage" :src="folder.coverImage" class="cover-image" />
              <view v-else class="default-cover">
                <text class="iconfont icon-folder"></text>
              </view>
            </view>
            <text class="folder-name">{{ folder.name }}</text>
            <text class="folder-count">{{ folder.count }}个内容</text>
          </view>
        </view>
      </view>

      <!-- 赞过列表 -->
      <view v-if="currentTab === 'likes'" class="likes-content">
        <xhs-waterfall 
          :notes="likedNotes" 
          @note-click="handleNoteClick"
        />
        <view v-if="likedNotes.length === 0" class="empty-state">
          <text class="iconfont icon-heart-empty empty-icon"></text>
          <text class="empty-text">还没有点赞过笔记</text>
          <text class="empty-desc">去首页看看喜欢的内容吧~</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UserInfo {
  id: string
  name: string
  avatar: string
  backgroundImage: string
  description: string
  followingCount: number
  followersCount: number
  totalLikes: number
}

interface Note {
  id: string
  title: string
  coverImage: string
  isVideo: boolean
  likes: number
  comments: number
  author: {
    id: string
    name: string
    avatar: string
  }
}

interface CollectionFolder {
  id: string
  name: string
  coverImage?: string
  count: number
}

const navbarHeight = ref(88)
const currentTab = ref<'notes' | 'collections' | 'likes'>('notes')

const userInfo = ref<UserInfo>({
  id: '123456789',
  name: '小红书用户',
  avatar: 'https://picsum.photos/120/120?random=user',
  backgroundImage: 'https://picsum.photos/750/400?random=bg',
  description: '记录生活的美好时刻 ✨',
  followingCount: 128,
  followersCount: 1567,
  totalLikes: 8932
})

const userNotes = ref<Note[]>([])
const likedNotes = ref<Note[]>([])
const collectionFolders = ref<CollectionFolder[]>([])

const switchTab = (tab: 'notes' | 'collections' | 'likes') => {
  currentTab.value = tab
  loadTabContent()
}

const handleNoteClick = (note: Note) => {
  uni.navigateTo({
    url: `/pages/detail/index?id=${note.id}`
  })
}

const goToSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/index'
  })
}

const editProfile = () => {
  uni.navigateTo({
    url: '/pages/edit-profile/index'
  })
}

const shareProfile = () => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    href: `https://xiaohongshu.com/user/${userInfo.value.id}`,
    title: `${userInfo.value.name}的小红书主页`,
    summary: userInfo.value.description,
    imageUrl: userInfo.value.avatar
  })
}

const showFollows = () => {
  uni.navigateTo({
    url: '/pages/follow-list/index?type=following'
  })
}

const showFans = () => {
  uni.navigateTo({
    url: '/pages/follow-list/index?type=followers'
  })
}

const showLikes = () => {
  // 切换到赞过标签
  currentTab.value = 'likes'
  loadTabContent()
}

const createNote = () => {
  uni.switchTab({
    url: '/pages/publish/index'
  })
}

const openFolder = (folder: CollectionFolder) => {
  uni.navigateTo({
    url: `/pages/collection-detail/index?id=${folder.id}&name=${folder.name}`
  })
}

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const loadTabContent = () => {
  switch (currentTab.value) {
    case 'notes':
      loadUserNotes()
      break
    case 'collections':
      loadCollections()
      break
    case 'likes':
      loadLikedNotes()
      break
  }
}

const loadUserNotes = () => {
  // 模拟用户笔记数据
  userNotes.value = Array.from({ length: 12 }, (_, index) => ({
    id: `user_note_${index}`,
    title: `我的笔记 ${index + 1}`,
    coverImage: `https://picsum.photos/300/${300 + Math.floor(Math.random() * 200)}?random=user_note${index}`,
    isVideo: Math.random() > 0.8,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    author: {
      id: userInfo.value.id,
      name: userInfo.value.name,
      avatar: userInfo.value.avatar
    }
  }))
}

const loadCollections = () => {
  // 模拟收藏夹数据
  collectionFolders.value = [
    {
      id: 'folder_1',
      name: '美妆心得',
      coverImage: 'https://picsum.photos/200/200?random=makeup',
      count: 24
    },
    {
      id: 'folder_2',
      name: '旅行攻略',
      coverImage: 'https://picsum.photos/200/200?random=travel',
      count: 18
    },
    {
      id: 'folder_3',
      name: '美食分享',
      count: 32
    }
  ]
}

const loadLikedNotes = () => {
  // 模拟点赞的笔记数据
  likedNotes.value = Array.from({ length: 8 }, (_, index) => ({
    id: `liked_note_${index}`,
    title: `喜欢的笔记 ${index + 1}`,
    coverImage: `https://picsum.photos/300/${300 + Math.floor(Math.random() * 200)}?random=liked${index}`,
    isVideo: Math.random() > 0.7,
    likes: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 500),
    author: {
      id: `author_${index}`,
      name: `作者${index + 1}`,
      avatar: `https://picsum.photos/60/60?random=author${index}`
    }
  }))
}

onMounted(() => {
  // 获取系统信息计算导航栏高度
  const systemInfo = uni.getSystemInfoSync()
  navbarHeight.value = (systemInfo.statusBarHeight || 0) + 44
  
  // 加载初始内容
  loadTabContent()
})
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: #f8f8f8;

  .nav-icon {
    font-size: 40rpx;
    color: #ffffff;
  }

  .profile-header {
    position: relative;
    height: 600rpx;
    overflow: hidden;

    .background-image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.3));
    }

    .header-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40rpx 24rpx;
      color: #fff;

      .user-basic {
        display: flex;
        align-items: center;
        margin-bottom: 32rpx;

        .user-avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          border: 4rpx solid rgba(255, 255, 255, 0.8);
          margin-right: 24rpx;
        }

        .user-info {
          flex: 1;

          .user-name {
            display: block;
            font-size: 36rpx;
            font-weight: 600;
            margin-bottom: 8rpx;
          }

          .user-id {
            display: block;
            font-size: 24rpx;
            opacity: 0.8;
            margin-bottom: 8rpx;
          }

          .user-desc {
            font-size: 26rpx;
            opacity: 0.9;
            line-height: 1.4;
          }
        }
      }

      .user-stats {
        display: flex;
        margin-bottom: 32rpx;

        .stat-item {
          margin-right: 48rpx;
          text-align: center;

          .stat-number {
            display: block;
            font-size: 32rpx;
            font-weight: 600;
            margin-bottom: 4rpx;
          }

          .stat-label {
            font-size: 24rpx;
            opacity: 0.8;
          }
        }
      }

      .action-buttons {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .edit-profile-btn {
          flex: 1;
          height: 72rpx;
          background: rgba(255, 255, 255, 0.2);
          border: 2rpx solid rgba(255, 255, 255, 0.5);
          border-radius: 36rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);

          .btn-text {
            font-size: 28rpx;
            color: #fff;
          }
        }

        .share-btn {
          width: 72rpx;
          height: 72rpx;
          background: rgba(255, 255, 255, 0.2);
          border: 2rpx solid rgba(255, 255, 255, 0.5);
          border-radius: 36rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);

          .iconfont {
            font-size: 32rpx;
            color: #fff;
          }
        }
      }
    }
  }

  .content-tabs {
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
        font-size: 28rpx;
        color: #666;
        font-weight: 500;
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
          width: 40rpx;
          height: 4rpx;
          background: #ff2442;
          border-radius: 2rpx;
        }
      }
    }
  }

  .content-area {
    padding: 24rpx 0;

    .notes-content,
    .likes-content {
      min-height: 400rpx;
    }

    .collections-content {
      padding: 0 24rpx;

      .collection-folders {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24rpx;

        .folder-item {
          background: #fff;
          border-radius: 16rpx;
          padding: 24rpx;
          text-align: center;

          .folder-cover {
            width: 120rpx;
            height: 120rpx;
            margin: 0 auto 16rpx;
            border-radius: 12rpx;
            overflow: hidden;

            .cover-image {
              width: 100%;
              height: 100%;
            }

            .default-cover {
              width: 100%;
              height: 100%;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;

              .iconfont {
                font-size: 48rpx;
                color: #999;
              }
            }
          }

          .folder-name {
            display: block;
            font-size: 28rpx;
            font-weight: 600;
            color: #333;
            margin-bottom: 8rpx;
          }

          .folder-count {
            font-size: 22rpx;
            color: #999;
          }
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
        margin-bottom: 32rpx;
      }

      .create-note-btn {
        background: #ff2442;
        border-radius: 40rpx;
        padding: 24rpx 48rpx;

        .create-text {
          font-size: 28rpx;
          color: #fff;
        }
      }
    }
  }
}
</style>