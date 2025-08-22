import type { FeedListQuery, PostItem } from "@/types/feed"
import { request } from "@/utils/request"

const placeholderAvatars = [
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop",
]
const placeholderPhotos = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1514519106317-7498f34ea212?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1520975922203-bc1cf8f3d1c1?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&fit=crop",
]

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createMockPost(id: number): PostItem {
  const w = random(400, 800)
  const h = random(500, 1200)
  const coverUrl = `${placeholderPhotos[id % placeholderPhotos.length]}&w=${w}&h=${h}`
  const avatar = placeholderAvatars[id % placeholderAvatars.length]
  return {
    id: String(id),
    title: "今天的穿搭分享",
    description: "简约通勤风，外套和半裙都好百搭～",
    cover: { id: String(id), type: "image", url: coverUrl, width: w, height: h },
    images: [
      { id: `${id}-1`, type: "image", url: coverUrl, width: w, height: h },
      { id: `${id}-2`, type: "image", url: coverUrl, width: w, height: h },
    ],
    tags: ["通勤", "穿搭", "秋冬"],
    topic: "每日穿搭",
    author: {
      id: `user-${id % 5}`,
      nickname: `小红薯${id % 100}`,
      avatar,
      verified: id % 3 === 0,
    },
    likesCount: random(10, 5000),
    commentsCount: random(0, 500),
    favoritesCount: random(0, 800),
    liked: false,
    favorited: false,
    createdAt: new Date(Date.now() - random(0, 7) * 86400000).toISOString(),
  }
}

export const fetchFeedList = async (query: FeedListQuery) => {
  // 使用内置 request，方便未来切到真实接口
  const { pageNo, pageSize } = query
  const startId = (pageNo - 1) * pageSize
  const list = Array.from({ length: pageSize }).map((_, i) => createMockPost(startId + i + 1))
  const res: ApiResult<ApiPageResult<PostItem>> = {
    success: true,
    traceid: "mock-trace",
    code: "200",
    msg: "",
    err: "",
    data: {
      list,
      pageNo,
      pageSize,
      total: 5000,
      totalPages: Math.ceil(5000 / pageSize),
    },
    timestamp: Date.now(),
  }
  return res
}

export const fetchPostDetail = async (postId: string) => {
  const post = createMockPost(Number(postId) || 1)
  const res: ApiResult<PostItem> = {
    success: true,
    traceid: "mock-trace",
    code: "200",
    msg: "",
    err: "",
    data: post,
    timestamp: Date.now(),
  }
  return res
}

export const toggleLike = async (postId: string) => {
  const res: ApiResult<{ liked: boolean; likesCount: number }> = {
    success: true,
    traceid: "mock-trace",
    code: "200",
    msg: "",
    err: "",
    data: { liked: Math.random() > 0.5, likesCount: random(1, 9000) },
    timestamp: Date.now(),
  }
  return res
}

export const toggleFavorite = async (postId: string) => {
  const res: ApiResult<{ favorited: boolean; favoritesCount: number }> = {
    success: true,
    traceid: "mock-trace",
    code: "200",
    msg: "",
    err: "",
    data: { favorited: Math.random() > 0.5, favoritesCount: random(1, 3000) },
    timestamp: Date.now(),
  }
  return res
}