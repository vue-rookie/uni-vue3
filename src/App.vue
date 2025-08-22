<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('小红书App启动')
})

onShow(() => {
  console.log('小红书App展示')
})

onHide(() => {
  console.log('小红书App隐藏')
})
</script>

<style lang="scss">
// 引入全局样式
@import './style/index.scss';

// 小红书主题色彩变量
:root {
  --xhs-primary: #ff2442;
  --xhs-primary-light: #ff6b85;
  --xhs-primary-dark: #e60023;
  --xhs-background: #f8f8f8;
  --xhs-surface: #ffffff;
  --xhs-text-primary: #333333;
  --xhs-text-secondary: #666666;
  --xhs-text-tertiary: #999999;
  --xhs-border: #f0f0f0;
  --xhs-shadow: rgba(0, 0, 0, 0.05);
}

// 全局字体图标样式
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 全局基础样式
page {
  background-color: var(--xhs-background);
  color: var(--xhs-text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
  line-height: 1.4;
}

// 通用工具类
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: var(--xhs-primary);
}

.text-secondary {
  color: var(--xhs-text-secondary);
}

.text-tertiary {
  color: var(--xhs-text-tertiary);
}

.bg-primary {
  background-color: var(--xhs-primary);
}

.bg-surface {
  background-color: var(--xhs-surface);
}

.border-radius {
  border-radius: 16rpx;
}

.shadow {
  box-shadow: 0 2rpx 8rpx var(--xhs-shadow);
}

// 按钮样式
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 32rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.btn-primary {
    background-color: var(--xhs-primary);
    color: #ffffff;
  }
  
  &.btn-secondary {
    background-color: #f5f5f5;
    color: var(--xhs-text-primary);
  }
  
  &.btn-outline {
    border: 2rpx solid var(--xhs-primary);
    color: var(--xhs-primary);
    background-color: transparent;
  }
  
  &.btn-small {
    padding: 12rpx 24rpx;
    font-size: 24rpx;
  }
  
  &.btn-large {
    padding: 24rpx 48rpx;
    font-size: 32rpx;
  }
}

// 卡片样式
.card {
  background-color: var(--xhs-surface);
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx var(--xhs-shadow);
  overflow: hidden;
}

// 输入框样式
.input {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 24rpx;
  font-size: 28rpx;
  color: var(--xhs-text-primary);
  
  &::placeholder {
    color: var(--xhs-text-tertiary);
  }
}

// 标签样式
.tag {
  display: inline-block;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  background-color: #f0f8ff;
  color: #1890ff;
}

// 分割线样式
.divider {
  height: 1rpx;
  background-color: var(--xhs-border);
  margin: 24rpx 0;
}

// 加载动画
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  
  &::after {
    content: '';
    width: 40rpx;
    height: 40rpx;
    border: 4rpx solid #f3f3f3;
    border-top: 4rpx solid var(--xhs-primary);
    border-radius: 50%;
    animation: loading-spin 1s linear infinite;
  }
}

@keyframes loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 安全区域适配
.safe-area-inset-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.safe-area-inset-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

// 响应式断点
@media screen and (max-width: 750rpx) {
  .hide-mobile {
    display: none !important;
  }
}

@media screen and (min-width: 751rpx) {
  .hide-desktop {
    display: none !important;
  }
}

// 滚动条样式（H5）
/* #ifdef H5 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
/* #endif */

// 图片懒加载占位符
.image-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 2s infinite;
}

@keyframes loading-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

// 文本省略
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.text-ellipsis-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
