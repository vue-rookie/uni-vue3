# 广告：安利一个靠谱的AI模型中转站 [fast-code](http://api.timebackward.com)  
# uni-vue3  
> 专为 UniApp + Vue3 + UnoCSS 打造的 starter template

## 🚀 特性
- ✅ Vue3 + Composition API
- ✅ UnoCSS 原子化CSS
- ✅ TypeScript 支持
- ✅ Vite 构建工具

## 📦 快速开始

![小程序预览](https://qinqiang.oss-cn-beijing.aliyuncs.com/gh_0fb82a6dc9c4_344.jpg)

## 产品
建议手机模式预览  
[uni-vue3框架](https://timebackward.com/uni-vue3/#/)--------------------------------[代码：feature/main](https://github.com/vue-rookie/uni-vue3)  
[uni-vue3模仿抖音](https://timebackward.com/douyin/#/)---------------------------[代码：feature/douyin](https://github.com/vue-rookie/uni-vue3/tree/feature/douyin)  
[uni-vue3模仿小红书](https://timebackward.com/xiaohongshu/#/)------------------------[代码：feature/xiaohongshu](https://github.com/vue-rookie/uni-vue3/tree/feature/xiaohongshu) 

## 🚀 技术栈

- **核心框架**：Vue 3.4
- **构建工具**：Vite 5.0
- **开发语言**：TypeScript 5.0
- **状态管理**：Pinia 2.0
- **样式方案**：UnoCSS
- **跨端框架**：UniApp 3.0

## 自定义主题样式(超级自由简单的样式配置):

组件样式全部采用 tailwindcss 封装，您无需写任何 令人烦躁的 css 代码。

只需要修改对应 uno.config.ts 配置文件中的 theme 下的的色值号即可，其他无需任何更改

## 🪝 自定义 Hooks

项目中精心封装了丰富的自定义 Hooks，大幅提升开发效率和代码质量，所有 Hooks 支持 TypeScript 类型推导。

### UI 交互类

#### useModal - 对话框管理

提供统一的弹窗交互解决方案，包括确认框、消息提示、加载状态等。

```typescript
import { useModal } from "@/hooks"

// 在组件中使用
const {
  showToast,
  showSuccess,
  showError,
  showConfirm,
  showLoading,
  hideLoading,
  showActionSheet,
} = useModal()

// 显示确认对话框
await showConfirm({
  title: "操作确认",
  content: "确定要执行此操作吗？",
})

// 显示成功提示
showSuccess("操作成功")

// 显示加载状态
const loading = showLoading()
try {
  // 执行异步操作
} finally {
  loading.hide() // 隐藏加载
}

// 显示底部操作菜单
const selectedIndex = await showActionSheet({
  itemList: ["选项一", "选项二", "选项三"],
})
```

### 数据处理类

#### useStorage - 本地存储

增强版本地存储，支持过期时间、类型安全、自动序列化/反序列化、响应式存储。

```typescript
import { useStorage } from "@/hooks"

const { setStorage, getStorage, removeStorage, clearStorage, createReactiveStorage } = useStorage()

// 存储数据，30天过期
await setStorage("user-info", { id: 1, name: "Admin" }, 30 * 24 * 60 * 60 * 1000)

// 读取数据
const userInfo = await getStorage("user-info")

// 创建响应式存储
const count = createReactiveStorage("visit-count", 0)
count.value++ // 自动同步到存储
```

#### useRequest - 网络请求

强大的请求管理 Hook，自动处理加载状态、错误处理、请求缓存等。

```typescript
import { useRequest } from "@/hooks"

const request = useRequest({
  baseURL: "https://api.example.com",
  autoHandleError: true, // 自动处理错误
  autoLoading: true, // 自动显示加载状态
})

// GET 请求
const { data } = await request.get("/users", { page: 1 })

// POST 请求
await request.post("/articles", { title, content })

// 文件上传
await request.upload("/upload", {
  filePath: tempFilePath,
  name: "file",
  formData: { type: "avatar" },
})
```

#### useInputLimit - 输入限制

提供各类输入限制函数，轻松实现各种格式检查和输入控制。

```typescript
import { useInputDataLimit } from "@/hooks/useInputLimit"

const {
  limitNumber, // 仅限数字
  limitLetter, // 仅限字母
  limitNumberAndLetter, // 仅限数字和字母
  limitToPositiveTwoDecimals, // 仅限两位小数的正数
  limitNoChinese, // 不允许中文
} = useInputDataLimit()

// 在输入事件中使用
const handleInput = (e) => {
  const rawValue = e.detail.value
  const formattedValue = limitToPositiveTwoDecimals(rawValue)
  // 更新表单值
}
```

### 设备能力类

#### useLocation - 位置服务

封装位置获取、地址解析、坐标转换等功能，支持高精度定位和后台定位。

```typescript
import { useLocation } from "@/hooks"

const { getLocation, startLocationUpdate, stopLocationUpdate, chooseLocation, openLocation } =
  useLocation()

// 获取当前位置
const position = await getLocation({
  type: "gcj02", // 坐标系类型
  isHighAccuracy: true, // 高精度定位
})

// 打开地图选择位置
const location = await chooseLocation()

// 在地图上查看位置
await openLocation({
  latitude: 39.9087,
  longitude: 116.3975,
  name: "目的地",
  address: "详细地址信息",
  scale: 18,
})
```

#### useCamera - 相机功能

相机相关功能封装，包括拍照、录像、选择相册等功能。

```typescript
import { useCamera } from "@/hooks"

const { takePhoto, chooseImage, chooseVideo, previewImage, compressImage } = useCamera()

// 拍照或从相册选择
const filePath = await takePhoto({
  sourceType: ["camera", "album"],
})

// 选择多张图片
const images = await chooseImage({
  count: 9,
  sizeType: ["original", "compressed"],
})

// 压缩图片
const compressedPath = await compressImage(filePath, {
  quality: 80, // 压缩质量
})
```

#### useSystem - 系统信息

获取系统信息、设备信息、网络状态等功能。

```typescript
import { useSystem } from "@/hooks"

const { getSystemInfo, getNetworkType, onNetworkStatusChange, getDeviceInfo, vibrateShort } =
  useSystem()

// 获取系统信息
const systemInfo = getSystemInfo()
console.log(`运行平台: ${systemInfo.platform}, 系统: ${systemInfo.system}`)

// 获取网络状态
const networkType = await getNetworkType()

// 监听网络变化
onNetworkStatusChange((res) => {
  console.log(`网络变更: ${res.networkType}, 是否连接: ${res.isConnected}`)
})
```

### 其他实用 Hooks

#### useShare - 分享功能

统一的分享接口，支持小程序分享、系统分享、自定义分享等。

```typescript
import { useShare } from "@/hooks"

const { share, shareWithSystem, configMiniProgramShare } = useShare()

// 配置页面分享参数
configMiniProgramShare({
  title: "分享标题",
  path: "/pages/index/index",
  imageUrl: "/static/share.png",
  onShareSuccess: () => {
    console.log("分享成功")
  },
})

// 系统分享
shareWithSystem({
  title: "分享内容",
  summary: "内容摘要",
  href: "https://example.com",
  imageUrl: "/static/share.png",
})
```

#### useValidation - 表单验证

强大的表单验证系统，内置多种常用验证规则，支持自定义验证。

```typescript
import { useValidation } from "@/hooks"

const validation = useValidation()

// 创建表单数据和规则
const { formData, rules, validate, errors, resetValidation } = validation.createForm(
  {
    username: "",
    password: "",
    email: "",
    phone: "",
  },
  {
    username: [
      { required: true, message: "用户名不能为空" },
      { min: 3, max: 20, message: "长度在3到20个字符" },
    ],
    password: [
      { required: true, message: "密码不能为空" },
      { min: 6, message: "密码长度不能小于6位" },
      { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: "密码必须包含大小写字母和数字" },
    ],
    email: [{ type: "email", message: "请输入正确的邮箱格式" }],
    phone: [{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" }],
  },
)

// 提交表单
const handleSubmit = async () => {
  const valid = await validate()
  if (valid) {
    // 表单验证通过，提交数据
    console.log("表单数据:", formData)
  } else {
    // 表单验证失败
    console.log("验证错误:", errors.value)
  }
}
```

#### usePageScroll - 页面滚动

页面滚动相关功能，包括滚动到指定位置、监听滚动事件等。

```typescript
import { usePageScroll } from "@/hooks"

const { scrollTo, scrollToTop, scrollToSelector, onPageScroll, getScrollPosition } = usePageScroll()

// 滚动到顶部
scrollToTop()

// 滚动到指定位置
scrollTo(0, 200, true) // 带动画效果滚动到 200px 位置

// 滚动到指定元素
scrollToSelector(".news-item-5", {
  offset: -20, // 偏移量
  duration: 300, // 动画时长
})

// 监听页面滚动
onPageScroll((scrollTop) => {
  if (scrollTop > 100) {
    // 显示返回顶部按钮
  }
})
```

## 📋 环境要求

- Node.js >= 18.0.0
- pnpm >= 7.0.0
- 微信开发者工具（开发小程序时使用）

## 🛠️ 快速开始

```bash
# 安装依赖
pnpm install

# 开发环境运行
pnpm dev:mp-weixin

# 生产环境构建
pnpm build:mp-weixin
```

## 📱 开发指南

### 微信小程序开发

1. **开发环境配置**
   - 运行 `pnpm dev:mp-weixin` 生成开发环境代码
   - 使用微信开发者工具导入 `dist/dev/mp-weixin` 目录
   - 开启"不校验合法域名"选项（开发环境）

2. **生产环境发布**
   - 执行 `pnpm build:mp-weixin` 生成生产环境代码
   - 使用微信开发者工具导入 `dist/build/mp-weixin` 目录
   - 点击"上传"按钮发布小程序

### 项目规范

1. **组件开发规范**
   - 全局组件统一放置在 `uni-module` 目录下
   - 遵循 UniApp 的 easycom 组件规范
   - 组件命名采用 PascalCase 命名法

2. **类型定义规范**
   - 业务类型定义统一放在对应页面的 `type.ts` 文件中
   - 公共类型定义放在 `types` 目录下
   - 类型命名采用 PascalCase 命名法

3. **Hooks 使用规范**
   - 公共 hooks 统一放在 `hooks` 目录下
   - 业务相关 hooks 放在对应页面目录
   - hooks 命名采用 camelCase 命名法，以 `use` 开头

## 🚀 性能优化

### 构建优化

1. **代码分割**
   - 使用 `manualChunks` 实现代码分割
   - 第三方依赖独立打包，提高缓存效率
   - 路由组件按需加载

2. **资源优化**
   - 图片资源自动压缩
   - CSS 代码压缩和优化
   - 静态资源 CDN 加速

3. **编译优化**
   - 使用 `lightningcss` 进行 CSS 处理
   - 配置合理的 `assetsInlineLimit`
   - 优化 Sass 编译配置

### 运行时优化

1. **渲染优化**
   - 图片懒加载
   - 虚拟列表
   - 条件渲染优化

2. **性能监控**
   - 页面加载性能监控
   - 组件渲染性能分析
   - 内存使用监控

## 📦 项目结构

```
├── src
│   ├── pages              # 页面文件
│   ├── pages-sub          # 子页面
│   ├── hooks              # 自定义hooks
│   ├── static             # 静态资源
│   ├── types              # 类型定义
│   ├── utils              # 工具函数
│   └── uni-module         # 全局组件
├── vite.config.ts         # Vite 配置
└── package.json           # 项目配置
```

## 源码

[![stars](https://img.shields.io/github/stars/vue-rookie/uni-vue3?style=social)](https://github.com/vue-rookie/uni-vue3)
[![forks](https://img.shields.io/github/forks/vue-rookie/uni-vue3?style=social)](https://github.com/vue-rookie/uni-vue3)
[![watchers](https://img.shields.io/github/watchers/vue-rookie/uni-vue3?style=social)](https://github.com/vue-rookie/uni-vue3)
[![license](https://img.shields.io/github/license/vue-rookie/uni-vue3?style=social)](https://github.com/vue-rookie/uni-vue3)

## 📄 开源协议

本项目采用 MIT 协议开源，详情请查看 [LICENSE](LICENSE) 文件。

## 致谢

感谢 [DCloud](https://www.dcloud.io/) 官方，旗下出品的 [uni-app](https://uniapp.dcloud.net.cn/) 、[uni-app-x](https://uniapp.dcloud.net.cn/uni-app-x/) 、[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/)、[uni-app 小程序](https://nativesupport.dcloud.net.cn/README) 等多平台、多元化的技术体系。
