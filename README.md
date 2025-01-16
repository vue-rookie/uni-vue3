# 2025 最新 uni-app 开发模板
uni-app Vue3 + Vite5 + TypeScript + Pinia + Unocss +  uview-plus
使用最新 uni-app vue-cli 模板， vue3、vite 最新版本搭建，通过命令方式运行和打包构建，加入了 unocss 原子化开发方式，极大的提升您的开发效率。

## 技术架构

基于 vue3+vite+uniapp+typescript+unocss+uview-plus

1. 环境要求

node>18.0.0
pnpm>7.0.0

2. 快速开始

```
   pnpm install
   pnpm i
   pnpm dev:mp

```

pnpm dev:mp-weixin

3. 调试

- 微信平台：然后打开微信开发者工具，导入上面`pnpm dev:mp-weixin` 生成的本地 dist 文件夹，选择本项目的`dist/dev/mp-weixin` 文件。

4. 发布

- 微信平台：`pnpm build:mp-weixin`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。

## 注意

- 如果不想在pages页面中单独引入组件，全局组件可以放到uni-module模块下，这也是符合uni-app easycom的规范
- 业务ts类型放到对应的pages对应文件type.ts中

## 未来要做什么？

- 完全低代码配置模式，无需做任何开发，，包括后端接口联调也只需要配置
- 后端接口返回格式只需按照框架约定的规则返回。秉持的原则始终是约定>配置
- 有兴趣的小伙伴一起加入研发
- 在config 分支开发，如果没用后端接口，需要先执行server.js模拟后端接口数据，
```
   node mock.server.js

```
-如果有后端接口，修改config/style.config.ts中对应的api地址为你的接口地址，同时修改环境变量中的VITE_SERVER_BASEURL
-注意：接口返回值需要遵循返回规范

```
// 通用返回值
type ApiResult<T> = {
  success: boolean
  code: number | string
  msg: string
  err: string
  data: T
  timestamp: number
}
// 分页返回值
type ApiPageResult<T> = {
  list: T[]
  pageNo: number
  pageSize: number
  total: number
  totalPages: number
  totalAmount: number
  totalOrderCount: number
}

```

## 联系我

- +v：qq8181227

