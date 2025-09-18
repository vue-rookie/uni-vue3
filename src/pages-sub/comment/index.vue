<template>
  <view class="min-h-screen bg-white">
    <!-- 半屏弹出层 -->
    <view
      class="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-50 max-h-[80vh] flex flex-col"
    >
      <!-- 顶部标题栏 -->
      <view class="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <text class="text-gray-800 font-medium text-lg">{{ comments.length }} 条评论</text>
        <text class="i-ri-close-line text-gray-600 text-xl" @click="closeComments"></text>
      </view>

      <!-- 评论列表 -->
      <scroll-view scroll-y class="flex-1 px-4" :scroll-into-view="scrollToComment">
        <!-- 评论项 -->
        <view
          v-for="(comment, index) in comments"
          :key="comment.id"
          :id="`comment-${comment.id}`"
          class="py-3 flex"
          :class="{ 'border-b border-gray-100': index !== comments.length - 1 }"
        >
          <!-- 用户头像 -->
          <image
            :src="comment.user.avatar"
            class="w-10 h-10 rounded-full mr-3"
            mode="aspectFill"
            @click="navigateToUserDetail(comment.user.id)"
          ></image>

          <!-- 评论内容 -->
          <view class="flex-1">
            <!-- 用户名和评论内容 -->
            <view class="mb-1">
              <text class="text-gray-500 text-sm">{{ comment.user.username }}</text>
              <text class="text-gray-800 text-base block">{{ comment.content }}</text>
            </view>

            <!-- 评论时间和操作 -->
            <view class="flex items-center">
              <text class="text-gray-400 text-xs">{{ comment.time }}</text>

              <!-- 回复按钮 -->
              <view class="ml-4 flex items-center" @click="replyToComment(comment)">
                <text class="text-gray-500 text-xs">回复</text>
              </view>

              <!-- 点赞区域 -->
              <view class="ml-auto flex items-center" @click="likeComment(comment)">
                <text
                  :class="[
                    comment.isLiked
                      ? 'i-ri-heart-fill text-red-500'
                      : 'i-ri-heart-line text-gray-500',
                    'mr-1',
                  ]"
                ></text>
                <text class="text-gray-500 text-xs">{{ formatCount(comment.likes) }}</text>
              </view>
            </view>

            <!-- 回复列表 -->
            <view
              v-if="comment.replies && comment.replies.length > 0"
              class="mt-2 bg-gray-50 rounded-lg p-2"
            >
              <view
                v-for="(reply, rIndex) in comment.replies"
                :key="`${comment.id}-${rIndex}`"
                class="mb-2 last:mb-0"
              >
                <view class="flex">
                  <text class="text-gray-500 text-sm mr-1">{{ reply.user.username }}</text>
                  <text class="text-gray-500 text-sm" v-if="reply.replyTo">回复</text>
                  <text class="text-gray-500 text-sm mr-1" v-if="reply.replyTo">
                    {{ reply.replyTo.username }}
                  </text>
                  <text class="text-gray-800 text-sm">{{ reply.content }}</text>
                </view>

                <!-- 回复的时间和操作 -->
                <view class="flex items-center mt-1">
                  <text class="text-gray-400 text-xs">{{ reply.time }}</text>

                  <!-- 回复按钮 -->
                  <view class="ml-4 flex items-center" @click="replyToReply(comment, reply)">
                    <text class="text-gray-500 text-xs">回复</text>
                  </view>

                  <!-- 点赞区域 -->
                  <view class="ml-auto flex items-center" @click="likeReply(comment, reply)">
                    <text
                      :class="[
                        reply.isLiked
                          ? 'i-ri-heart-fill text-red-500'
                          : 'i-ri-heart-line text-gray-500',
                        'mr-1',
                      ]"
                    ></text>
                    <text class="text-gray-500 text-xs">{{ formatCount(reply.likes) }}</text>
                  </view>
                </view>
              </view>

              <!-- 查看更多回复 -->
              <view
                v-if="comment.totalReplies > comment.replies.length"
                class="mt-1 flex items-center"
                @click="loadMoreReplies(comment)"
              >
                <text class="text-blue-500 text-xs">查看更多回复</text>
                <text class="i-ri-arrow-down-s-line text-blue-500 text-xs ml-1"></text>
              </view>
            </view>
          </view>
        </view>

        <!-- 加载更多 -->
        <view
          v-if="hasMoreComments"
          class="py-3 flex items-center justify-center"
          @click="loadMoreComments"
        >
          <text class="text-gray-500 text-sm">加载更多评论</text>
        </view>

        <!-- 无更多评论 -->
        <view v-else class="py-3 flex items-center justify-center">
          <text class="text-gray-400 text-sm">没有更多评论了</text>
        </view>
      </scroll-view>

      <!-- 评论输入框 -->
      <view class="px-4 py-2 border-t border-gray-100 flex items-center">
        <input
          v-model="commentText"
          class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
          :placeholder="replyPlaceholder"
          confirm-type="send"
          @confirm="submitComment"
        />
        <view
          class="ml-3 px-4 py-2 bg-red-500 rounded-full"
          :class="{ 'opacity-50': !commentText.trim() }"
          @click="submitComment"
        >
          <text class="text-white text-sm">发送</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

// 评论文本
const commentText = ref("")
// 回复占位符文本
const replyPlaceholder = ref("发布评论...")
// 当前回复的评论ID
const replyToCommentId = ref<string | null>(null)
// 当前回复的回复ID
const replyToReplyId = ref<string | null>(null)
// 滚动到的评论ID
const scrollToComment = ref("")
// 是否有更多评论
const hasMoreComments = ref(true)
// 视频ID
const videoId = ref("")

// 模拟评论数据
const comments = ref([
  {
    id: "c1",
    content: "这个地方真的太美了，下次我也要去！",
    time: "2小时前",
    likes: 128,
    isLiked: false,
    totalReplies: 3,
    user: {
      id: "u1",
      username: "旅行达人",
      avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    },
    replies: [
      {
        id: "r1",
        content: "是的，那里的夜景真的很棒",
        time: "1小时前",
        likes: 24,
        isLiked: false,
        user: {
          id: "u2",
          username: "城市摄影师",
          avatar: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
        },
        replyTo: null,
      },
      {
        id: "r2",
        content: "请问这是在哪里拍的呀？",
        time: "50分钟前",
        likes: 8,
        isLiked: false,
        user: {
          id: "u3",
          username: "好奇宝宝",
          avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg",
        },
        replyTo: null,
      },
    ],
  },
  {
    id: "c2",
    content: "拍得真好，用的什么相机？",
    time: "3小时前",
    likes: 56,
    isLiked: true,
    totalReplies: 1,
    user: {
      id: "u4",
      username: "摄影爱好者",
      avatar: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    },
    replies: [
      {
        id: "r3",
        content: "用的是iPhone 13 Pro，夜景模式",
        time: "2小时前",
        likes: 32,
        isLiked: false,
        user: {
          id: "u5",
          username: "视频作者",
          avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg",
        },
        replyTo: null,
      },
    ],
  },
  {
    id: "c3",
    content: "这个视频的背景音乐是什么？好好听！",
    time: "5小时前",
    likes: 89,
    isLiked: false,
    totalReplies: 0,
    user: {
      id: "u6",
      username: "音乐控",
      avatar: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    },
    replies: [],
  },
  {
    id: "c4",
    content: "太原的夜景确实很美，我住了十几年了，每次看夜景都有不同感受",
    time: "6小时前",
    likes: 102,
    isLiked: false,
    totalReplies: 0,
    user: {
      id: "u7",
      username: "太原本地人",
      avatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    },
    replies: [],
  },
  {
    id: "c5",
    content: "希望有机会也能去太原旅游，看起来很有魅力的城市",
    time: "8小时前",
    likes: 45,
    isLiked: false,
    totalReplies: 0,
    user: {
      id: "u8",
      username: "旅行爱好者",
      avatar: "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
    },
    replies: [],
  },
])

// 获取页面参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const options = currentPage.$page?.options

  if (options && options.videoId) {
    videoId.value = options.videoId
    // 实际应用中，这里应该根据videoId加载评论数据
    loadComments(options.videoId)
  }

  // 如果有commentId参数，滚动到指定评论
  if (options && options.commentId) {
    scrollToComment.value = `comment-${options.commentId}`
  }
})

// 加载评论数据
const loadComments = (videoId: string) => {
  // 实际应用中，这里应该调用API加载评论数据
  console.log(`加载视频 ${videoId} 的评论数据`)

  // 模拟加载完成后的处理
  setTimeout(() => {
    // 评论数据已经在comments中预设
  }, 300)
}

// 加载更多评论
const loadMoreComments = () => {
  // 实际应用中，这里应该调用API加载更多评论
  console.log("加载更多评论")

  // 模拟加载更多评论
  setTimeout(() => {
    // 添加更多模拟评论
    comments.value.push({
      id: `c${comments.value.length + 1}`,
      content: "这个地方我也去过，确实很美，强烈推荐！",
      time: "12小时前",
      likes: 36,
      isLiked: false,
      totalReplies: 0,
      user: {
        id: `u${Math.floor(Math.random() * 100) + 10}`,
        username: `用户${Math.floor(Math.random() * 1000)}`,
        avatar: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
      },
      replies: [],
    })

    // 如果评论数量达到10条，设置没有更多评论
    if (comments.value.length >= 10) {
      hasMoreComments.value = false
    }
  }, 500)
}

// 加载更多回复
const loadMoreReplies = (comment: any) => {
  // 实际应用中，这里应该调用API加载更多回复
  console.log(`加载评论 ${comment.id} 的更多回复`)

  // 模拟加载更多回复
  setTimeout(() => {
    // 添加一条模拟回复
    comment.replies.push({
      id: `r${Math.floor(Math.random() * 1000)}`,
      content: "谢谢分享，真的很美！",
      time: `${Math.floor(Math.random() * 12)}小时前`,
      likes: Math.floor(Math.random() * 20),
      isLiked: false,
      user: {
        id: `u${Math.floor(Math.random() * 100) + 20}`,
        username: `用户${Math.floor(Math.random() * 1000)}`,
        avatar: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
      },
      replyTo: null,
    })

    // 如果回复数量等于总回复数，设置没有更多回复
    if (comment.replies.length >= comment.totalReplies) {
      comment.totalReplies = comment.replies.length
    }
  }, 500)
}

// 回复评论
const replyToComment = (comment: any) => {
  replyToCommentId.value = comment.id
  replyToReplyId.value = null
  replyPlaceholder.value = `回复 ${comment.user.username}：`
  // 自动聚焦输入框
  // 在实际应用中，可能需要使用DOM操作或组件引用来实现
}

// 回复回复
const replyToReply = (comment: any, reply: any) => {
  replyToCommentId.value = comment.id
  replyToReplyId.value = reply.id
  replyPlaceholder.value = `回复 ${reply.user.username}：`
  // 自动聚焦输入框
}

// 提交评论
const submitComment = () => {
  if (!commentText.value.trim()) return

  // 如果是回复评论
  if (replyToCommentId.value) {
    const commentIndex = comments.value.findIndex((c) => c.id === replyToCommentId.value)
    if (commentIndex !== -1) {
      const comment = comments.value[commentIndex]

      // 创建新回复
      const newReply = {
        id: `r${Date.now()}`,
        content: commentText.value,
        time: "刚刚",
        likes: 0,
        isLiked: false,
        user: {
          id: "current-user", // 实际应用中应该使用当前登录用户的ID
          username: "我", // 实际应用中应该使用当前登录用户的用户名
          avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg", // 实际应用中应该使用当前登录用户的头像
        },
        replyTo: replyToReplyId.value
          ? comment.replies.find((r) => r.id === replyToReplyId.value)?.user
          : null,
      }

      // 添加到回复列表
      if (!comment.replies) {
        comment.replies = []
      }
      comment.replies.push(newReply)
      comment.totalReplies = (comment.totalReplies || 0) + 1
    }
  }
  // 如果是新评论
  else {
    // 创建新评论
    const newComment = {
      id: `c${Date.now()}`,
      content: commentText.value,
      time: "刚刚",
      likes: 0,
      isLiked: false,
      totalReplies: 0,
      user: {
        id: "current-user", // 实际应用中应该使用当前登录用户的ID
        username: "我", // 实际应用中应该使用当前登录用户的用户名
        avatar: "https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg", // 实际应用中应该使用当前登录用户的头像
      },
      replies: [],
    }

    // 添加到评论列表
    comments.value.unshift(newComment)
  }

  // 清空输入框和重置回复状态
  commentText.value = ""
  replyToCommentId.value = null
  replyToReplyId.value = null
  replyPlaceholder.value = "发布评论..."

  // 显示提交成功提示
  uni.showToast({
    title: "评论成功",
    icon: "success",
  })
}

// 点赞评论
const likeComment = (comment: any) => {
  comment.isLiked = !comment.isLiked
  comment.likes += comment.isLiked ? 1 : -1
}

// 点赞回复
const likeReply = (comment: any, reply: any) => {
  reply.isLiked = !reply.isLiked
  reply.likes += reply.isLiked ? 1 : -1
}

// 关闭评论页面
const closeComments = () => {
  uni.navigateBack()
}

// 跳转到用户详情页
const navigateToUserDetail = (userId: string) => {
  uni.navigateTo({
    url: `/pages-sub/user-detail/index?id=${userId}`,
  })
}

// 格式化数字
const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 10000) return (count / 1000).toFixed(1) + "k"
  return (count / 10000).toFixed(1) + "w"
}
</script>
