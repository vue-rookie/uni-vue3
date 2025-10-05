<template>
  <view class="bg-black min-h-screen relative">
    <!-- 视频滑动区域 -->
    <swiper
      class="absolute left-0 right-0 top-0"
      :style="{ bottom: 'calc(50px + env(safe-area-inset-bottom))' }"
      vertical
      :current="currentIndex"
      @change="handleSwiperChange"
      :skip-hidden-item-layout="true"
    >
      <swiper-item v-for="(video, index) in videoList" :key="video.id" class="w-full h-full">
        <video-player
          :src="video.videoUrl"
          :poster="video.coverUrl"
          :video-id="`video-${video.id}`"
          :is-active="currentIndex === index"
          :loop="true"
          :autoplay="currentIndex === index"
          :muted="false"
          object-fit="cover"
        >
          <!-- 视频信息 -->
          <template #info>
            <view class="p-4">
              <view class="mb-2">
                <text class="text-white text-base">@{{ video.author.username }}</text>
              </view>
              <view class="mb-3">
                <text class="text-white text-sm">{{ video.description }}</text>
              </view>
              <view v-if="video.music" class="flex items-center">
                <text class="i-ri-music-fill text-white mr-2"></text>
                <text class="text-white text-xs">{{ video.music }}</text>
              </view>
            </view>
          </template>

          <!-- 右侧操作按钮 -->
          <template #actions>
            <!-- 作者头像 -->
            <view class="flex flex-col items-center mb-4">
              <view class="relative">
                <image
                  :src="video.author.avatar"
                  class="w-12 h-12 rounded-full border-2 border-white"
                  mode="aspectFill"
                  @click.stop="navigateToUserDetail(video.author.id)"
                ></image>
                <view
                  class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <text class="i-ri-add-line text-[14px] font-[500px] text-white"></text>
                </view>
              </view>
            </view>

            <!-- 点赞 -->
            <view class="flex flex-col items-center mt-1">
              <view
                class="w-12 h-10 bg-opacity-30 flex items-center justify-center"
                @click.stop="toggleLike(video.id)"
              >
                <text
                  :class="[
                    'text-3xl',
                    likedMap[video.id]
                      ? 'i-ri-heart-fill text-red-500'
                      : 'i-ri-heart-fill text-white',
                  ]"
                ></text>
              </view>
              <text class="text-white text-[14px]">{{ formatCount(video.likes) }}</text>
            </view>

            <!-- 评论 -->
            <view class="flex flex-col items-center mt-1">
              <view
                class="w-12 h-12 bg-opacity-30 flex items-center justify-center"
                @click.stop="openComments(video.id)"
              >
                <text class="i-ri-chat-1-fill text-white text-3xl"></text>
              </view>
              <text class="text-white text-[14px]">{{ formatCount(video.comments) }}</text>
            </view>

            <!-- 收藏 -->
            <view class="flex flex-col items-center mt-1">
              <view
                class="w-12 h-12 bg-opacity-30 flex items-center justify-center"
                @click.stop="toggleFav(video.id)"
              >
                <text
                  :class="[
                    'text-3xl',
                    favoredMap[video.id]
                      ? 'i-ri-star-fill text-red-500'
                      : 'i-ri-star-fill text-white',
                  ]"
                ></text>
              </view>
              <text class="text-white text-[14px]">10</text>
            </view>

            <!-- 分享 -->
            <view class="flex flex-col items-center mt-1">
              <view class="w-12 h-12 bg-opacity-30 flex items-center justify-center">
                <text class="i-ri-share-forward-fill text-white text-3xl"></text>
              </view>
              <text class="text-white text-[14px]">12</text>
            </view>

            <!-- 音乐旋转图标 -->
            <view class="mt-4">
              <image
                :src="video.author.avatar"
                class="w-10 h-12 rounded-full animate-spin-slow"
                mode="aspectFill"
              ></image>
            </view>
          </template>
        </video-player>
      </swiper-item>
    </swiper>

    <!-- 自定义底部导航栏 -->
    <uve-tabbar :current="1" :tab-list="tabList" @change="handleTabbarChange" />

    <!-- 评论弹窗：从底部弹出 -->
    <view v-if="showComments" class="fixed inset-0 z-[1001]" @click="closeComments">
      <!-- 遮罩层 -->
      <view class="absolute inset-0 bg-black bg-opacity-50"></view>
      <!-- 底部抽屉 -->
      <view
        class="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl"
        :style="{ height: '60vh', paddingBottom: 'env(safe-area-inset-bottom)' }"
        @click.stop
      >
        <!-- 顶部拖拽条与标题 -->
        <view class="py-2">
          <view class="mx-auto h-1.5 w-10 rounded-full bg-gray-300"></view>
        </view>
        <view class="px-4 pb-2 flex items-center justify-between">
          <text class="text-gray-900 text-base font-medium">评论</text>
          <text class="i-ri-close-line text-2xl text-gray-500" @click.stop="closeComments"></text>
        </view>
        <!-- 评论列表 -->
        <scroll-view scroll-y class="px-4" :style="{ height: 'calc(60vh - 56px - 56px)' }">
          <view v-if="commentList.length === 0" class="h-full flex items-center justify-center">
            <text class="text-gray-400">还没有评论，抢个沙发~</text>
          </view>
          <view v-for="c in commentList" :key="c.id" class="py-3 flex">
            <image :src="c.avatar" mode="aspectFill" class="w-9 h-9 rounded-full mr-3"></image>
            <view class="flex-1">
              <view class="flex items-center justify-between">
                <text class="text-gray-900 text-sm font-medium">{{ c.user }}</text>
                <text class="text-gray-400 text-xs">{{ c.time }}</text>
              </view>
              <text class="text-gray-800 text-sm leading-snug">{{ c.content }}</text>
            </view>
          </view>
        </scroll-view>
        <!-- 输入区 -->
        <view class="px-3 pt-2 pb-3 bg-white border-t border-gray-100 flex items-center space-x-2">
          <input
            v-model="commentInput"
            class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-900"
            placeholder="友善评论，理性发言"
            confirm-type="send"
            @confirm="submitComment"
          />
          <view
            class="px-3 py-2 rounded-full"
            :class="commentInput ? 'bg-blue-600' : 'bg-gray-300'"
            @click.stop="submitComment"
          >
            <text class="text-white text-sm">发送</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue"
import VideoPlayer from "@/components/video-player/index.vue"
import UveTabbar from "@/components/uve-tabbar/index.vue"
import { defaultTabList, type TabItem } from "@/config/tabbar.config"

// 当前视频索引
const currentIndex = ref(0)

// 底部导航栏数据
const tabList = ref<TabItem[]>(defaultTabList)

// 朋友页面的视频数据
const videoList = ref([
  {
    id: "f1",
    videoUrl: "https://cdn.pixabay.com/video/2016/02/14/2165-155327596_large.mp4",
    coverUrl: "",
    description: "朋友分享的美好时光 #友谊万岁",
    likes: 890,
    comments: 67,
    music: "原声 - 朋友",
    author: {
      id: "friend1",
      username: "傲娇的煜公主",
      avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    },
  },
  {
    id: "f2",
    videoUrl: "https://cdn.pixabay.com/video/2023/09/05/179212-861403629_large.mp4",
    coverUrl: "",
    description: "和朋友们一起的快乐时光",
    likes: 1234,
    comments: 89,
    music: "原声 - 青春",
    author: {
      id: "friend2",
      username: "青春无悔",
      avatar: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    },
  },
  {
    id: "f3",
    videoUrl:
      "https://cdn.pixabay.com/video/2025/03/23/266987_large.mp4?width=1280&hash=e9e3a1cc45a5f0e2c0f6e3d3d7c3f9d6e8b5b2b3b3",
    coverUrl: "",
    description: "朋友聚会，欢声笑语不断",
    likes: 567,
    comments: 45,
    music: "原声 - 聚会",
    author: {
      id: "friend3",
      username: "聚会达人",
      avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg",
    },
  },
])

// 点赞/收藏状态（内存态）
const likedMap = reactive<Record<string, boolean>>({})
const favoredMap = reactive<Record<string, boolean>>({})

const toggleLike = (videoId: string) => {
  likedMap[videoId] = !likedMap[videoId]
}

const toggleFav = (videoId: string) => {
  favoredMap[videoId] = !favoredMap[videoId]
}

// 处理视频切换
const handleSwiperChange = (e: any) => {
  currentIndex.value = e.detail.current
}

// 格式化数字
const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 10000) return (count / 1000).toFixed(1) + "k"
  return (count / 10000).toFixed(1) + "w"
}

// 跳转到用户详情页
const navigateToUserDetail = (userId: string) => {
  uni.navigateTo({
    url: `/pages-sub/user-detail/index?id=${userId}`,
  })
}

// 打开评论
const openComments = (videoId: string) => {
  currentCommentVideoId.value = videoId
  showComments.value = true
}

// 评论弹层逻辑
const showComments = ref(false)
const currentCommentVideoId = ref<string | null>(null)
const commentInput = ref("")
const commentList = ref<
  Array<{ id: string; user: string; avatar: string; time: string; content: string }>
>([
  {
    id: "c1",
    user: "小明",
    avatar: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
    time: "刚刚",
    content: "朋友间的快乐时光！",
  },
  {
    id: "c2",
    user: "橘子汽水",
    avatar: "https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_1280.jpg",
    time: "1分钟前",
    content: "友谊万岁～",
  },
])

const closeComments = () => {
  showComments.value = false
}

const submitComment = () => {
  const content = commentInput.value.trim()
  if (!content) return
  commentList.value.unshift({
    id: `c_${Date.now()}`,
    user: "我",
    avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    time: "刚刚",
    content,
  })
  commentInput.value = ""
}

// 处理底部导航栏切换
const handleTabbarChange = (index: number, item: any) => {
  console.log("切换到:", item.text, item.path)
}

// 页面挂载时自动播放当前视频
onMounted(() => {
  const videoContext = uni.createVideoContext(`video-${videoList.value[currentIndex.value].id}`)
  if (videoContext) {
    setTimeout(() => {
      videoContext.play()
    }, 300)
  }
})

// 页面卸载时暂停视频
onUnmounted(() => {
  const videoContext = uni.createVideoContext(`video-${videoList.value[currentIndex.value].id}`)
  if (videoContext) {
    videoContext.pause()
  }
})

// 设置页面标题
uni.setNavigationBarTitle({
  title: "朋友",
})
</script>

<style>
/* 自定义动画 */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
