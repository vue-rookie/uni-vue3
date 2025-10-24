# 小红书原型快速开始指南

## 目录结构

```
src/
├── pages/xiaohongshu/          # 小红书页面
│   ├── index.vue               # 首页 - 瀑布流展示
│   ├── detail.vue              # 详情页
│   ├── publish.vue             # 发布页
│   └── profile.vue             # 个人中心
├── components/
│   ├── uve-waterfall/          # 瀑布流容器组件
│   │   └── index.vue
│   └── uve-note-card/          # 笔记卡片组件
│       └── index.vue
├── api/
│   └── xiaohongshu.ts          # 小红书相关 API
└── types/
    └── xiaohongshu.ts          # TypeScript 类型定义
```

## 启动应用

### H5 开发模式

```bash
pnpm dev:h5
```

### 微信小程序开发模式

```bash
pnpm dev:mp-weixin
```

启动后，应用会默认打开小红书首页（瀑布流）。

## 主要功能

### 1. 首页瀑布流 (`/pages/xiaohongshu/index`)

- 双列瀑布流布局
- 顶部搜索栏（自适应状态栏）
- 上拉加载更多
- 右下角浮动发布按钮
- 点击卡片跳转详情

### 2. 笔记详情 (`/pages/xiaohongshu/detail`)

- 图片轮播（支持多图）
- 作者信息和关注按钮
- 点赞、收藏、分享功能
- 评论输入框

### 3. 发布笔记 (`/pages/xiaohongshu/publish`)

- 图片选择（最多9张）
- 标题和内容输入
- 话题标签选择（最多5个）
- 地点添加

### 4. 个人中心 (`/pages/xiaohongshu/profile`)

- 用户信息展示
- 数据统计（关注、粉丝、获赞）
- 笔记网格展示
- Tab 切换（笔记/赞过/收藏）

## 路由导航

### TabBar 配置

应用包含3个底部 Tab：

1. **首页** - 小红书瀑布流 (`pages/xiaohongshu/index`)
2. **我** - 个人中心 (`pages/xiaohongshu/profile`)
3. **组件** - 原组件库展示 (`pages/index/index`)

### 页面跳转示例

```typescript
// 跳转到详情页
uni.navigateTo({
  url: "/pages/xiaohongshu/detail?id=1",
})

// 跳转到发布页
uni.navigateTo({
  url: "/pages/xiaohongshu/publish",
})

// 切换 Tab
uni.switchTab({
  url: "/pages/xiaohongshu/index",
})
```

## 数据模拟

当前使用 Mock 数据，位于 `src/api/xiaohongshu.ts`：

- `getNoteList()` - 获取笔记列表
- `getNoteDetail()` - 获取笔记详情
- `getUserProfile()` - 获取用户信息
- `likeNote()` - 点赞笔记
- `collectNote()` - 收藏笔记

图片使用 Picsum 提供的随机占位图。

## 自定义组件使用

### uve-waterfall 瀑布流组件

```vue
<template>
  <uve-waterfall>
    <template #left>
      <!-- 左列内容 -->
    </template>
    <template #right>
      <!-- 右列内容 -->
    </template>
  </uve-waterfall>
</template>
```

### uve-note-card 笔记卡片

```vue
<template>
  <uve-note-card :note="noteItem" :show-tag="true" @click="handleClick" />
</template>

<script setup lang="ts">
import type { NoteItem } from "@/types/xiaohongshu"

const noteItem: NoteItem = {
  id: "1",
  title: "标题",
  cover: "https://...",
  author: {
    id: "user1",
    name: "作者",
    avatar: "https://...",
  },
  likes: 1000,
  images: ["https://..."],
  tags: ["标签1", "标签2"],
  content: "内容",
  createTime: "2024-01-20",
}

const handleClick = (note: NoteItem) => {
  console.log("点击了笔记", note)
}
</script>
```

## 主题配色

小红书品牌色：

- 主色：`#ff2442`
- 渐变：`linear-gradient(135deg, #ff2442 0%, #ff6b6b 100%)`
- 收藏黄：`#ffc107`

## 接入真实 API

要接入真实的后端 API，修改 `src/api/xiaohongshu.ts`：

```typescript
import { http } from "@/utils/request"

export const getNoteList = (page = 1, pageSize = 10) => {
  return http.get("/api/notes", { page, pageSize })
}

export const getNoteDetail = (id: string) => {
  return http.get(`/api/notes/${id}`)
}

// ... 其他 API
```

## 开发建议

1. **状态管理**: 对于复杂的状态，建议使用 Pinia 进行全局管理
2. **图片优化**: 生产环境建议添加图片压缩和 CDN
3. **分页优化**: 实现虚拟列表提升大数据量性能
4. **缓存策略**: 使用 `uni.setStorage` 缓存常用数据
5. **错误处理**: 完善网络错误和异常处理逻辑

## 常见问题

### Q: 图片加载失败？

A: 确保网络连接正常，Picsum 服务可用。可以替换为自己的图片服务。

### Q: 瀑布流高度不一致？

A: 这是正常的，瀑布流会根据图片实际比例自动计算高度。

### Q: 发布页图片选择器不工作？

A: 小程序环境需要在 manifest.json 中配置相应权限。

## 下一步

- [ ] 接入真实后端 API
- [ ] 添加用户登录认证
- [ ] 实现评论功能
- [ ] 添加搜索功能
- [ ] 优化加载性能
- [ ] 添加动画效果

## 相关文档

- [完整功能文档](./XIAOHONGSHU_README.md)
- [UniApp 官方文档](https://uniapp.dcloud.io/)
- [Vue 3 文档](https://vuejs.org/)
