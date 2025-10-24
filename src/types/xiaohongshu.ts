export interface NoteItem {
  id: string
  title: string
  cover: string
  author: {
    id: string
    name: string
    avatar: string
  }
  likes: number
  images: string[]
  tags: string[]
  content: string
  createTime: string
  isLiked?: boolean
  isCollected?: boolean
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  signature: string
  follows: number
  fans: number
  likes: number
  notes: NoteItem[]
}
