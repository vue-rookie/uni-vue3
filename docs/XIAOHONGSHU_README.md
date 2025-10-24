# 小红书 App 原型

这是一个使用 UniApp + Vue 3 + TypeScript 构建的小红书风格应用原型。

## 功能特性

### 1. 首页（瀑布流）
- ✅ 双列瀑布流布局展示笔记
- ✅ 顶部搜索栏（自适应状态栏高度）
- ✅ 下拉刷新和上拉加载更多
- ✅ 笔记卡片展示（封面图、标题、作者、点赞数）
- ✅ 浮动发布按钮（右下角）
- ✅ 点击卡片跳转到详情页

### 2. 笔记详情页
- ✅ 图片轮播展示（支持多图）
- ✅ 作者信息展示（头像、昵称、发布时间）
- ✅ 笔记标题和正文内容
- ✅ 话题标签展示
- ✅ 点赞、收藏、分享功能
- ✅ 底部评论输入框
- ✅ 关注作者功能
- ✅ 互动数据展示（点赞数、收藏数、评论数）

### 3. 发布页面
- ✅ 图片选择和上传（最多9张）
- ✅ 标题输入（最多100字符）
- ✅ 正文输入（最多1000字符）
- ✅ 话题标签选择（最多5个）
- ✅ 地点添加功能
- ✅ 图片删除功能
- ✅ 字数统计显示
- ✅ 底部弹窗选择器

### 4. 个人中心
- ✅ 用户信息展示（头像、昵称、个性签名）
- ✅ 数据统计（关注数、粉丝数、获赞与收藏）
- ✅ Tab 切换（笔记、赞过、收藏）
- ✅ 笔记网格展示（3列）
- ✅ 编辑资料按钮
- ✅ 空状态展示

## 技术实现

### 组件结构
```
src/
├── pages/xiaohongshu/
│   ├── index.vue       # 首页瀑布流
│   ├── detail.vue      # 笔记详情
│   ├── publish.vue     # 发布笔记
│   └── profile.vue     # 个人中心
├── components/
│   ├── uve-waterfall/  # 瀑布流组件
│   └── uve-note-card/  # 笔记卡片组件
├── api/
│   └── xiaohongshu.ts  # API 接口
└── types/
    └── xiaohongshu.ts  # 类型定义
```

### 核心特性

#### 1. 瀑布流布局
使用 CSS Grid 和双列布局实现，通过计算将数据分配到左右两列，实现瀑布流效果。

#### 2. 自适应导航栏
使用 `uni.getSystemInfoSync()` 获取状态栏高度，使用 `uni.getMenuButtonBoundingClientRect()` 获取胶囊按钮位置，实现自适应布局。

#### 3. 图片懒加载
使用 `mode="widthFix"` 和 `mode="aspectFill"` 实现图片自适应显示。

#### 4. 数据模拟
使用 Promise + setTimeout 模拟异步请求，使用 Picsum 提供的占位图服务生成随机图片。

#### 5. 状态管理
使用 Vue 3 的 Composition API 进行状态管理，使用 ref 和 computed 实现响应式数据。

## 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/pages/xiaohongshu/index` | 瀑布流展示笔记列表 |
| 详情页 | `/pages/xiaohongshu/detail` | 显示笔记详细内容 |
| 发布页 | `/pages/xiaohongshu/publish` | 发布新笔记 |
| 个人中心 | `/pages/xiaohongshu/profile` | 用户个人信息和笔记 |

## TabBar 配置

应用包含三个 Tab：
1. 首页 - 小红书瀑布流
2. 我 - 个人中心
3. 组件 - 原有组件展示页面

## UI 设计

### 颜色规范
- 主题色：`#ff2442`（小红书红）
- 辅助色：`#ffc107`（收藏黄）
- 文字色：`#333`（主要文字）、`#666`（次要文字）、`#999`（辅助文字）
- 背景色：`#fff`（白色）、`#f8f8f8`（浅灰）、`#f5f5f5`（灰色）

### 间距规范
- 页面边距：16px
- 卡片间距：8px
- 内容间距：12px
- 小间距：4px

### 圆角规范
- 按钮圆角：16-20px
- 卡片圆角：8px
- 头像圆角：50%（圆形）
- 标签圆角：12px

## 数据结构

### NoteItem（笔记）
```typescript
interface NoteItem {
  id: string              // 笔记ID
  title: string           // 标题
  cover: string           // 封面图
  author: {               // 作者信息
    id: string
    name: string
    avatar: string
  }
  likes: number           // 点赞数
  images: string[]        // 图片列表
  tags: string[]          // 标签列表
  content: string         // 正文内容
  createTime: string      // 发布时间
  isLiked?: boolean       // 是否点赞
  isCollected?: boolean   // 是否收藏
}
```

### UserProfile（用户）
```typescript
interface UserProfile {
  id: string              // 用户ID
  name: string            // 昵称
  avatar: string          // 头像
  signature: string       // 个性签名
  follows: number         // 关注数
  fans: number            // 粉丝数
  likes: number           // 获赞数
  notes: NoteItem[]       // 笔记列表
}
```

## 使用说明

1. 启动项目后，默认进入小红书首页
2. 在首页可以浏览笔记，点击卡片查看详情
3. 点击右下角的「+」按钮发布新笔记
4. 在详情页可以点赞、收藏、分享笔记
5. 切换到「我」Tab 查看个人信息

## 待完善功能

- [ ] 真实的后端 API 对接
- [ ] 用户登录和认证
- [ ] 评论功能实现
- [ ] 搜索功能实现
- [ ] 图片上传到服务器
- [ ] 视频笔记支持
- [ ] 直播功能
- [ ] 购物功能
- [ ] 消息通知

## 开发建议

1. 这是一个原型项目，展示了小红书的核心功能和界面
2. 可以根据实际需求对接真实的后端 API
3. 建议使用 Pinia 进行全局状态管理
4. 可以添加更多的交互动画提升用户体验
5. 建议添加图片压缩和上传进度提示

## 许可证

MIT License
