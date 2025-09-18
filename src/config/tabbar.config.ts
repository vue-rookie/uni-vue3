export interface TabItem {
  text: string
  icon?: string
  selectedIcon?: string
  path: string
  badge?: number
}

export const defaultTabList: TabItem[] = [
  {
    text: "首页",
    icon: "",
    selectedIcon: "",
    path: "/pages/index/index",
  },
  {
    text: "朋友",
    icon: "e",
    selectedIcon: "",
    path: "/pages/discover/index",
  },
  {
    text: "",
    icon: "i-ri-add-circle-line",
    selectedIcon: "i-ri-add-circle-fill",
    path: "/pages/publish/index",
  },
  {
    text: "消息",
    icon: "",
    selectedIcon: "",
    path: "/pages/message/index",
    badge: 3,
  },
  {
    text: "我",
    icon: "",
    selectedIcon: "",
    path: "/pages/profile/index",
  },
]
