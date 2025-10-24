<template>
  <view class="home-page">
    <!-- 自定义导航栏 -->
    <xhs-navbar :show-search="true" search-placeholder="搜索你想要的">
      <template #right>
        <view class="nav-icons">
          <text class="iconfont icon-scan nav-icon"></text>
          <text class="iconfont icon-message nav-icon"></text>
        </view>
      </template>
    </xhs-navbar>

    <!-- 内容区域 -->
    <view class="content" :style="{ paddingTop: navbarHeight + 'px' }">
      <!-- 分类标签 -->
      <view class="category-tabs">
        <scroll-view class="tabs-scroll" scroll-x show-scrollbar="false">
          <view
            class="tab-item"
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: currentTab === tab.id }"
            @click="switchTab(tab.id)"
          >
            {{ tab.name }}
          </view>
        </scroll-view>
      </view>

      <!-- 瀑布流内容 -->
      <view class="waterfall-wrapper">
        <xhs-waterfall :notes="filteredNotes" @note-click="handleNoteClick" />
      </view>

      <!-- 加载更多 -->
      <view v-if="loading" class="loading">
        <text class="loading-text">加载中...</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"

interface Author {
  id: string
  name: string
  avatar: string
}

interface Note {
  id: string
  title: string
  coverImage: string
  isVideo: boolean
  likes: number
  comments: number
  author: Author
  category: string
}

interface Tab {
  id: string
  name: string
}

const navbarHeight = ref(132) // 导航栏高度
const currentTab = ref("recommend")
const loading = ref(false)
const notes = ref<Note[]>([])

const tabs: Tab[] = [
  { id: "recommend", name: "推荐" },
  { id: "follow", name: "关注" },
  { id: "fashion", name: "时尚" },
  { id: "beauty", name: "美妆" },
  { id: "food", name: "美食" },
  { id: "travel", name: "旅行" },
  { id: "fitness", name: "健身" },
  { id: "home", name: "居家" },
  { id: "pet", name: "萌宠" },
]

const filteredNotes = computed(() => {
  if (currentTab.value === "recommend") {
    return notes.value
  }
  return notes.value.filter((note) => note.category === currentTab.value)
})

const switchTab = (tabId: string) => {
  currentTab.value = tabId
  // 这里可以重新加载对应分类的数据
  loadNotes()
}

const handleNoteClick = (note: Note) => {
  uni.navigateTo({
    url: `/pages/detail/index?id=${note.id}`,
  })
}

const loadNotes = async () => {
  loading.value = true

  // 模拟加载数据
  setTimeout(() => {
    const mockNotes: Note[] = Array.from({ length: 20 }, (_, index) => ({
      id: `note_${Date.now()}_${index}`,
      title: `这是一篇很棒的笔记标题 ${index + 1}`,
      coverImage: `https://picsum.photos/300/${
        300 + Math.floor(Math.random() * 200)
      }?random=${index}`,
      isVideo: Math.random() > 0.7,
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000),
      category: tabs[Math.floor(Math.random() * tabs.length)].id,
      author: {
        id: `user_${index}`,
        name: `用户${index + 1}`,
        avatar: `https://picsum.photos/100/100?random=user${index}`,
      },
    }))

    if (notes.value.length === 0) {
      notes.value = mockNotes
    } else {
      notes.value.push(...mockNotes)
    }

    loading.value = false
  }, 1000)
}

onMounted(() => {
  loadNotes()

  // 获取系统信息计算导航栏高度
  const systemInfo = uni.getSystemInfoSync()
  navbarHeight.value = (systemInfo.statusBarHeight || 0) + 44 + 40 // 状态栏 + 导航栏 + 标签栏
})

// 触底加载更多
onReachBottom(() => {
  if (!loading.value) {
    loadNotes()
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
  background: #f8f8f8;

  .content {
    height: 100%;

    .category-tabs {
      background: #fff;
      padding: 0 24rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .tabs-scroll {
        white-space: nowrap;

        .tab-item {
          display: inline-block;
          padding: 24rpx 32rpx;
          font-size: 28rpx;
          color: #666;
          position: relative;

          &.active {
            color: #ff2442;
            font-weight: 600;

            &::after {
              content: "";
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
    }

    .waterfall-wrapper {
      padding-top: 24rpx;
      min-height: calc(100vh - 200rpx);
    }

    .loading {
      padding: 40rpx;
      text-align: center;

      .loading-text {
        color: #999;
        font-size: 28rpx;
      }
    }
  }

  .nav-icons {
    display: flex;
    align-items: center;
    gap: 32rpx;

    .nav-icon {
      font-size: 40rpx;
      color: #333;
    }
  }
}
</style>
