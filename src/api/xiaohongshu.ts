import type { NoteItem, UserProfile } from "@/types/xiaohongshu"

const mockNotes: NoteItem[] = [
  {
    id: "1",
    title: "夏日穿搭分享 ☀️ 清新少女风",
    cover: "https://picsum.photos/400/500?random=1",
    author: {
      id: "user1",
      name: "时尚小姐姐",
      avatar: "https://picsum.photos/100/100?random=101",
    },
    likes: 1234,
    images: ["https://picsum.photos/800/1000?random=1", "https://picsum.photos/800/1000?random=2"],
    tags: ["穿搭", "夏日", "少女风"],
    content:
      "分享一组超适合夏天的穿搭～\n\n这套搭配非常清新，白色T恤搭配蓝色阔腿裤，简约又时尚。配上一双小白鞋，整体look非常舒适自然。\n\n推荐给大家试试看！",
    createTime: "2024-01-20",
    isLiked: false,
    isCollected: false,
  },
  {
    id: "2",
    title: "探店｜成都必打卡咖啡店 ☕️",
    cover: "https://picsum.photos/400/600?random=3",
    author: {
      id: "user2",
      name: "咖啡爱好者",
      avatar: "https://picsum.photos/100/100?random=102",
    },
    likes: 3456,
    images: [
      "https://picsum.photos/800/1000?random=3",
      "https://picsum.photos/800/1000?random=4",
      "https://picsum.photos/800/1000?random=5",
    ],
    tags: ["探店", "咖啡", "成都"],
    content:
      "今天分享一家超级出片的咖啡店！\n\n📍地址：春熙路xxx\n⏰营业时间：10:00-22:00\n💰人均：50-80\n\n店里的装修风格超级ins风，每个角落都很适合拍照。咖啡的品质也很不错，推荐他们家的手冲！",
    createTime: "2024-01-19",
    isLiked: true,
    isCollected: false,
  },
  {
    id: "3",
    title: "护肤分享 | 我的晚间护肤步骤",
    cover: "https://picsum.photos/400/550?random=6",
    author: {
      id: "user3",
      name: "护肤达人",
      avatar: "https://picsum.photos/100/100?random=103",
    },
    likes: 2345,
    images: ["https://picsum.photos/800/1000?random=6"],
    tags: ["护肤", "美妆", "干货"],
    content:
      "分享一下我的晚间护肤步骤～\n\n1️⃣ 卸妆：使用卸妆膏彻底清洁\n2️⃣ 清洁：温和洁面乳\n3️⃣ 水：爽肤水二次清洁\n4️⃣ 精华：按摩至吸收\n5️⃣ 乳液/面霜：锁水保湿\n\n坚持下来皮肤状态真的会越来越好！",
    createTime: "2024-01-18",
    isLiked: false,
    isCollected: true,
  },
  {
    id: "4",
    title: "旅行VLOG | 去云南感受浪漫风情 🌸",
    cover: "https://picsum.photos/400/650?random=7",
    author: {
      id: "user4",
      name: "旅行日记",
      avatar: "https://picsum.photos/100/100?random=104",
    },
    likes: 5678,
    images: [
      "https://picsum.photos/800/1000?random=7",
      "https://picsum.photos/800/1000?random=8",
      "https://picsum.photos/800/1000?random=9",
      "https://picsum.photos/800/1000?random=10",
    ],
    tags: ["旅行", "云南", "风景"],
    content:
      "终于去了心心念念的云南！\n\n大理、丽江、泸沽湖...每一个地方都让人流连忘返。\n\n🌟推荐景点：\n- 洱海：拍照绝佳地\n- 丽江古城：慢悠悠逛吃\n- 泸沽湖：绝美日落\n\n下次还想再去！",
    createTime: "2024-01-17",
    isLiked: false,
    isCollected: false,
  },
  {
    id: "5",
    title: "美食分享 | 在家也能做的简单料理 🍳",
    cover: "https://picsum.photos/400/500?random=11",
    author: {
      id: "user5",
      name: "厨房小白",
      avatar: "https://picsum.photos/100/100?random=105",
    },
    likes: 987,
    images: [
      "https://picsum.photos/800/1000?random=11",
      "https://picsum.photos/800/1000?random=12",
    ],
    tags: ["美食", "料理", "教程"],
    content:
      "超简单的快手早餐！\n\n食材：鸡蛋、吐司、培根\n做法：煎蛋+烤吐司+煎培根\n\n10分钟搞定，营养又美味～",
    createTime: "2024-01-16",
    isLiked: false,
    isCollected: false,
  },
  {
    id: "6",
    title: "健身打卡 💪 坚持才会有效果",
    cover: "https://picsum.photos/400/600?random=13",
    author: {
      id: "user6",
      name: "健身博主",
      avatar: "https://picsum.photos/100/100?random=106",
    },
    likes: 4321,
    images: ["https://picsum.photos/800/1000?random=13"],
    tags: ["健身", "运动", "打卡"],
    content:
      "今天的训练内容：\n\n✅ 深蹲 4组x15\n✅ 卧推 4组x12\n✅ 硬拉 3组x10\n✅ 有氧30分钟\n\n坚持运动，身材会越来越好！",
    createTime: "2024-01-15",
    isLiked: true,
    isCollected: true,
  },
]

const mockUser: UserProfile = {
  id: "current_user",
  name: "我的昵称",
  avatar: "https://picsum.photos/200/200?random=200",
  signature: "记录生活，分享美好 ✨",
  follows: 128,
  fans: 1024,
  likes: 5678,
  notes: [],
}

export const getNoteList = (page = 1, pageSize = 10): Promise<NoteItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      const notes = []
      for (let i = 0; i < pageSize; i++) {
        const index = (start + i) % mockNotes.length
        notes.push({ ...mockNotes[index], id: `${start + i + 1}` })
      }
      resolve(notes)
    }, 300)
  })
}

export const getNoteDetail = (id: string): Promise<NoteItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const note = mockNotes.find((n) => n.id === id) || mockNotes[0]
      resolve({ ...note })
    }, 200)
  })
}

export const getUserProfile = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockUser, notes: mockNotes.slice(0, 6) })
    }, 200)
  })
}

export const likeNote = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 100)
  })
}

export const collectNote = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 100)
  })
}
