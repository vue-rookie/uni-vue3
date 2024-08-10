# 2024 最新 uni-app 开发模板

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
