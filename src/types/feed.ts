export type MediaType = "image" | "video"

export interface AuthorProfile {
  id: string
  nickname: string
  avatar: string
  verified?: boolean
  bio?: string
}

export interface MediaAsset {
  id: string
  type: MediaType
  url: string
  width: number
  height: number
  coverUrl?: string
  duration?: number
}

export interface PostItem {
  id: string
  title: string
  description?: string
  cover: MediaAsset
  images?: MediaAsset[]
  video?: MediaAsset
  tags?: string[]
  topic?: string
  author: AuthorProfile
  likesCount: number
  commentsCount: number
  favoritesCount: number
  liked: boolean
  favorited: boolean
  createdAt: string
}

export interface FeedListQuery {
  pageNo: number
  pageSize: number
  feedType?: "recommend" | "follow" | "nearby"
}