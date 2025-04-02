# UniApp Vue3 企业级开发模板

> 基于 Vue3 + Vite5 + TypeScript + Pinia + UnoCSS 的现代化跨端开发解决方案

## 🚀 技术栈

- **核心框架**：Vue 3.4
- **构建工具**：Vite 5.0
- **开发语言**：TypeScript 5.0
- **状态管理**：Pinia 2.0
- **样式方案**：UnoCSS
- **跨端框架**：UniApp 3.0

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
│   ├── static             # 静态资源
│   ├── types              # 类型定义
│   ├── utils              # 工具函数
│   └── uni-module         # 全局组件
├── vite.config.ts         # Vite 配置
└── package.json           # 项目配置
```

## 🤝 技术支持

- 技术咨询：+v qq8181227
- 项目定制：承接各类前端项目开发
- 问题反馈：欢迎提交 Issue

## 📄 开源协议

本项目采用 MIT 协议开源，详情请查看 [LICENSE](LICENSE) 文件。
