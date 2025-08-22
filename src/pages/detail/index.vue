<template>
  <view class="detail-page">
    <!-- 自定义导航栏 -->
    <xhs-navbar :show-back="true" :transparent="true" text-color="#ffffff">
      <template #right>
        <text class="iconfont icon-share nav-icon" @click="shareNote"></text>
        <text class="iconfont icon-more nav-icon" @click="showMoreActions"></text>
      </template>
    </xhs-navbar>

    <!-- 图片轮播 -->
    <view class="image-swiper-container">
      <swiper 
        class="image-swiper" 
        :indicator-dots="noteDetail.images.length > 1"
        indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#ffffff"
        circular
        @change="onSwiperChange"
      >
        <swiper-item v-for="(image, index) in noteDetail.images" :key="index">
          <image :src="image" class="swiper-image" mode="aspectFill" />
        </swiper-item>
      </swiper>
      
      <!-- 图片计数 -->
      <view v-if="noteDetail.images.length > 1" class="image-count">
        {{ currentImageIndex + 1 }} / {{ noteDetail.images.length }}
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-container">
      <!-- 笔记信息 -->
      <view class="note-info">
        <view class="note-header">
          <text class="note-title">{{ noteDetail.title }}</text>
          <view class="note-meta">
            <text class="note-time">{{ formatTime(noteDetail.publishTime) }}</text>
            <text class="note-location" v-if="noteDetail.location">
              <text class="iconfont icon-location"></text>
              {{ noteDetail.location }}
            </text>
          </view>
        </view>
        
        <text class="note-content">{{ noteDetail.content }}</text>
        
        <!-- 话题标签 -->
        <view class="note-topics" v-if="noteDetail.topics.length > 0">
          <view 
            class="topic-tag" 
            v-for="topic in noteDetail.topics" 
            :key="topic"
            @click="goToTopic(topic)"
          >
            # {{ topic }}
          </view>
        </view>
      </view>

      <!-- 作者信息 -->
      <view class="author-info" @click="goToAuthorProfile">
        <image :src="noteDetail.author.avatar" class="author-avatar" />
        <view class="author-details">
          <text class="author-name">{{ noteDetail.author.name }}</text>
          <text class="author-desc">{{ noteDetail.author.description }}</text>
        </view>
        <view class="follow-btn" :class="{ followed: noteDetail.author.isFollowed }" @click.stop="toggleFollow">
          <text class="follow-text">{{ noteDetail.author.isFollowed ? '已关注' : '关注' }}</text>
        </view>
      </view>

      <!-- 互动统计 -->
      <view class="interaction-stats">
        <text class="stats-text">{{ formatNumber(noteDetail.likes) }} 点赞 · {{ formatNumber(noteDetail.collections) }} 收藏 · {{ formatNumber(noteDetail.comments) }} 评论</text>
      </view>

      <!-- 评论列表 -->
      <view class="comments-section">
        <view class="section-title">评论 {{ noteDetail.comments }}</view>
        <view class="comments-list">
          <view 
            class="comment-item" 
            v-for="comment in commentList" 
            :key="comment.id"
          >
            <image :src="comment.user.avatar" class="comment-avatar" />
            <view class="comment-content">
              <view class="comment-header">
                <text class="comment-user">{{ comment.user.name }}</text>
                <text class="comment-time">{{ formatTime(comment.time) }}</text>
              </view>
              <text class="comment-text">{{ comment.content }}</text>
              <view class="comment-actions">
                <view class="comment-like" :class="{ liked: comment.isLiked }" @click="toggleCommentLike(comment)">
                  <text class="iconfont icon-heart"></text>
                  <text class="like-count" v-if="comment.likes > 0">{{ comment.likes }}</text>
                </view>
                <text class="comment-reply" @click="replyComment(comment)">回复</text>
              </view>
              
              <!-- 回复列表 -->
              <view class="replies-list" v-if="comment.replies && comment.replies.length > 0">
                <view 
                  class="reply-item" 
                  v-for="reply in comment.replies" 
                  :key="reply.id"
                >
                  <text class="reply-user">{{ reply.user.name }}</text>
                  <text class="reply-target" v-if="reply.replyTo">回复 {{ reply.replyTo.name }}</text>
                  <text class="reply-content">: {{ reply.content }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        
        <view v-if="commentList.length === 0" class="empty-comments">
          <text class="empty-text">还没有评论，快来抢沙发吧~</text>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-actions">
      <view class="comment-input" @click="showCommentInput">
        <text class="input-placeholder">说点什么...</text>
      </view>
      <view class="action-buttons">
        <view class="action-btn" :class="{ active: noteDetail.isLiked }" @click="toggleLike">
          <text class="iconfont icon-heart"></text>
          <text class="btn-text">{{ formatNumber(noteDetail.likes) }}</text>
        </view>
        <view class="action-btn" :class="{ active: noteDetail.isCollected }" @click="toggleCollect">
          <text class="iconfont icon-bookmark"></text>
          <text class="btn-text">{{ formatNumber(noteDetail.collections) }}</text>
        </view>
        <view class="action-btn" @click="showCommentInput">
          <text class="iconfont icon-comment"></text>
          <text class="btn-text">{{ formatNumber(noteDetail.comments) }}</text>
        </view>
      </view>
    </view>

    <!-- 评论输入弹窗 -->
    <view v-if="showCommentModal" class="comment-modal" @click="hideCommentInput">
      <view class="comment-input-container" @click.stop>
        <textarea 
          v-model="commentText" 
          class="comment-textarea"
          placeholder="写下你的评论..."
          :focus="showCommentModal"
          auto-height
        />
        <view class="comment-actions">
          <text class="cancel-btn" @click="hideCommentInput">取消</text>
          <text class="submit-btn" @click="submitComment">发布</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: string
  name: string
  avatar: string
  description?: string
  isFollowed?: boolean
}

interface Comment {
  id: string
  user: User
  content: string
  time: number
  likes: number
  isLiked: boolean
  replies?: Reply[]
}

interface Reply {
  id: string
  user: User
  content: string
  replyTo?: User
}

interface NoteDetail {
  id: string
  title: string
  content: string
  images: string[]
  publishTime: number
  location?: string
  topics: string[]
  author: User
  likes: number
  collections: number
  comments: number
  isLiked: boolean
  isCollected: boolean
}

const currentImageIndex = ref(0)
const showCommentModal = ref(false)
const commentText = ref('')
const noteDetail = ref<NoteDetail>({
  id: '',
  title: '',
  content: '',
  images: [],
  publishTime: 0,
  topics: [],
  author: {
    id: '',
    name: '',
    avatar: '',
    description: ''
  },
  likes: 0,
  collections: 0,
  comments: 0,
  isLiked: false,
  isCollected: false
})
const commentList = ref<Comment[]>([])

const onSwiperChange = (e: any) => {
  currentImageIndex.value = e.detail.current
}

const shareNote = () => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    href: `https://xiaohongshu.com/note/${noteDetail.value.id}`,
    title: noteDetail.value.title,
    summary: noteDetail.value.content,
    imageUrl: noteDetail.value.images[0]
  })
}

const showMoreActions = () => {
  uni.showActionSheet({
    itemList: ['举报', '不感兴趣'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 举报功能
        uni.showToast({ title: '已举报', icon: 'success' })
      } else if (res.tapIndex === 1) {
        // 不感兴趣
        uni.showToast({ title: '已标记为不感兴趣', icon: 'success' })
      }
    }
  })
}

const goToAuthorProfile = () => {
  uni.navigateTo({
    url: `/pages/profile/index?id=${noteDetail.value.author.id}`
  })
}

const goToTopic = (topic: string) => {
  uni.navigateTo({
    url: `/pages/topic/index?name=${encodeURIComponent(topic)}`
  })
}

const toggleFollow = () => {
  noteDetail.value.author.isFollowed = !noteDetail.value.author.isFollowed
  uni.showToast({
    title: noteDetail.value.author.isFollowed ? '关注成功' : '取消关注',
    icon: 'success'
  })
}

const toggleLike = () => {
  noteDetail.value.isLiked = !noteDetail.value.isLiked
  noteDetail.value.likes += noteDetail.value.isLiked ? 1 : -1
  
  uni.showToast({
    title: noteDetail.value.isLiked ? '点赞成功' : '取消点赞',
    icon: 'success'
  })
}

const toggleCollect = () => {
  noteDetail.value.isCollected = !noteDetail.value.isCollected
  noteDetail.value.collections += noteDetail.value.isCollected ? 1 : -1
  
  uni.showToast({
    title: noteDetail.value.isCollected ? '收藏成功' : '取消收藏',
    icon: 'success'
  })
}

const showCommentInput = () => {
  showCommentModal.value = true
}

const hideCommentInput = () => {
  showCommentModal.value = false
  commentText.value = ''
}

const submitComment = () => {
  if (!commentText.value.trim()) {
    uni.showToast({ title: '请输入评论内容', icon: 'none' })
    return
  }

  // 添加新评论
  const newComment: Comment = {
    id: Date.now().toString(),
    user: {
      id: 'current_user',
      name: '我',
      avatar: 'https://picsum.photos/60/60?random=me'
    },
    content: commentText.value,
    time: Date.now(),
    likes: 0,
    isLiked: false
  }

  commentList.value.unshift(newComment)
  noteDetail.value.comments += 1
  
  hideCommentInput()
  uni.showToast({ title: '评论成功', icon: 'success' })
}

const toggleCommentLike = (comment: Comment) => {
  comment.isLiked = !comment.isLiked
  comment.likes += comment.isLiked ? 1 : -1
}

const replyComment = (comment: Comment) => {
  // 这里可以实现回复功能
  uni.showToast({ title: '回复功能待实现', icon: 'none' })
}

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
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
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`
  } else {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }
}

const loadNoteDetail = () => {
  // 模拟加载笔记详情
  noteDetail.value = {
    id: 'note_123',
    title: '分享一个超棒的化妆技巧 ✨',
    content: '今天要和大家分享一个我最近学会的化妆技巧，真的超级实用！这个方法让我的妆容持久度提升了很多，而且看起来更自然。步骤很简单，新手也能轻松掌握。记得点赞收藏哦～',
    images: [
      'https://picsum.photos/750/1000?random=detail1',
      'https://picsum.photos/750/1000?random=detail2',
      'https://picsum.photos/750/1000?random=detail3'
    ],
    publishTime: Date.now() - 2 * 60 * 60 * 1000,
    location: '上海·静安区',
    topics: ['化妆技巧', '美妆分享', '新手必看'],
    author: {
      id: 'author_123',
      name: '美妆达人小美',
      avatar: 'https://picsum.photos/80/80?random=author',
      description: '专业美妆博主 | 分享实用技巧',
      isFollowed: false
    },
    likes: 2341,
    collections: 1205,
    comments: 89,
    isLiked: false,
    isCollected: false
  }

  // 模拟评论数据
  commentList.value = [
    {
      id: 'comment_1',
      user: {
        id: 'user_1',
        name: '小仙女',
        avatar: 'https://picsum.photos/60/60?random=user1'
      },
      content: '哇，这个技巧真的太实用了！马上去试试',
      time: Date.now() - 30 * 60 * 1000,
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 'reply_1',
          user: {
            id: 'author_123',
            name: '美妆达人小美',
            avatar: 'https://picsum.photos/60/60?random=author'
          },
          content: '谢谢支持！记得分享效果哦',
          replyTo: {
            id: 'user_1',
            name: '小仙女',
            avatar: ''
          }
        }
      ]
    },
    {
      id: 'comment_2',
      user: {
        id: 'user_2',
        name: '爱美的猪猪',
        avatar: 'https://picsum.photos/60/60?random=user2'
      },
      content: '学会了！终于找到适合我的方法了',
      time: Date.now() - 60 * 60 * 1000,
      likes: 8,
      isLiked: true
    }
  ]
}

onMounted(() => {
  loadNoteDetail()
})
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: #000;
  position: relative;

  .nav-icon {
    font-size: 40rpx;
    color: #ffffff;
    margin-left: 32rpx;
    
    &:first-child {
      margin-left: 0;
    }
  }

  .image-swiper-container {
    height: 100vh;
    position: relative;

    .image-swiper {
      height: 100%;

      .swiper-image {
        width: 100%;
        height: 100%;
      }
    }

    .image-count {
      position: absolute;
      top: 120rpx;
      right: 24rpx;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 8rpx 16rpx;
      border-radius: 20rpx;
      font-size: 24rpx;
    }
  }

  .content-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 32rpx 32rpx 0 0;
    max-height: 60vh;
    overflow-y: auto;
    padding-bottom: 120rpx;

    .note-info {
      padding: 32rpx 24rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .note-header {
        margin-bottom: 16rpx;

        .note-title {
          display: block;
          font-size: 36rpx;
          font-weight: 600;
          color: #333;
          line-height: 1.4;
          margin-bottom: 12rpx;
        }

        .note-meta {
          display: flex;
          align-items: center;
          gap: 24rpx;

          .note-time {
            font-size: 24rpx;
            color: #999;
          }

          .note-location {
            font-size: 24rpx;
            color: #999;
            display: flex;
            align-items: center;

            .iconfont {
              margin-right: 4rpx;
            }
          }
        }
      }

      .note-content {
        font-size: 28rpx;
        color: #333;
        line-height: 1.6;
        margin-bottom: 16rpx;
      }

      .note-topics {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;

        .topic-tag {
          background: #f0f8ff;
          color: #1890ff;
          font-size: 24rpx;
          padding: 8rpx 16rpx;
          border-radius: 20rpx;
        }
      }
    }

    .author-info {
      display: flex;
      align-items: center;
      padding: 24rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .author-avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }

      .author-details {
        flex: 1;

        .author-name {
          display: block;
          font-size: 28rpx;
          font-weight: 600;
          color: #333;
          margin-bottom: 4rpx;
        }

        .author-desc {
          font-size: 24rpx;
          color: #666;
        }
      }

      .follow-btn {
        background: #ff2442;
        color: #fff;
        padding: 16rpx 32rpx;
        border-radius: 40rpx;
        font-size: 24rpx;

        &.followed {
          background: #f5f5f5;
          color: #666;
        }
      }
    }

    .interaction-stats {
      padding: 16rpx 24rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .stats-text {
        font-size: 24rpx;
        color: #999;
      }
    }

    .comments-section {
      padding: 24rpx;

      .section-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 24rpx;
      }

      .comments-list {
        .comment-item {
          display: flex;
          margin-bottom: 32rpx;

          .comment-avatar {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            margin-right: 16rpx;
            flex-shrink: 0;
          }

          .comment-content {
            flex: 1;

            .comment-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 8rpx;

              .comment-user {
                font-size: 26rpx;
                font-weight: 600;
                color: #333;
              }

              .comment-time {
                font-size: 22rpx;
                color: #999;
              }
            }

            .comment-text {
              font-size: 26rpx;
              color: #333;
              line-height: 1.5;
              margin-bottom: 12rpx;
            }

            .comment-actions {
              display: flex;
              align-items: center;
              gap: 32rpx;

              .comment-like {
                display: flex;
                align-items: center;
                gap: 6rpx;
                font-size: 22rpx;
                color: #999;

                &.liked {
                  color: #ff2442;
                }

                .iconfont {
                  font-size: 24rpx;
                }
              }

              .comment-reply {
                font-size: 22rpx;
                color: #999;
              }
            }

            .replies-list {
              margin-top: 16rpx;
              padding-left: 16rpx;
              border-left: 2rpx solid #f0f0f0;

              .reply-item {
                margin-bottom: 8rpx;

                .reply-user {
                  font-size: 24rpx;
                  color: #1890ff;
                }

                .reply-target {
                  font-size: 24rpx;
                  color: #999;
                }

                .reply-content {
                  font-size: 24rpx;
                  color: #333;
                }
              }
            }
          }
        }
      }

      .empty-comments {
        text-align: center;
        padding: 60rpx 0;

        .empty-text {
          font-size: 26rpx;
          color: #999;
        }
      }
    }
  }

  .bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 16rpx 24rpx;
    border-top: 1rpx solid #f0f0f0;
    safe-area-inset-bottom;

    .comment-input {
      flex: 1;
      height: 64rpx;
      background: #f5f5f5;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      padding: 0 24rpx;
      margin-right: 16rpx;

      .input-placeholder {
        font-size: 26rpx;
        color: #999;
      }
    }

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 32rpx;

      .action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rpx;

        .iconfont {
          font-size: 40rpx;
          color: #666;
        }

        .btn-text {
          font-size: 20rpx;
          color: #666;
        }

        &.active {
          .iconfont {
            color: #ff2442;
          }

          .btn-text {
            color: #ff2442;
          }
        }
      }
    }
  }

  .comment-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    z-index: 1000;

    .comment-input-container {
      width: 100%;
      background: #fff;
      border-radius: 24rpx 24rpx 0 0;
      padding: 32rpx 24rpx;
      safe-area-inset-bottom;

      .comment-textarea {
        width: 100%;
        min-height: 200rpx;
        font-size: 28rpx;
        line-height: 1.5;
        padding: 16rpx;
        border: 1rpx solid #f0f0f0;
        border-radius: 12rpx;
        margin-bottom: 24rpx;
      }

      .comment-actions {
        display: flex;
        justify-content: flex-end;
        gap: 24rpx;

        .cancel-btn {
          font-size: 28rpx;
          color: #999;
          padding: 16rpx 32rpx;
        }

        .submit-btn {
          font-size: 28rpx;
          color: #fff;
          background: #ff2442;
          padding: 16rpx 32rpx;
          border-radius: 40rpx;
        }
      }
    }
  }
}
</style>