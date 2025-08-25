<template>
  <view class="page-container bg-white min-h-screen p-4">
    <!-- 页面头部 -->
    <view class="mb-8">
      <view class="text-2xl font-bold text-gray-800 mb-2">🎨 uve-button 按钮组件</view>
      <view class="text-sm text-gray-600 mb-4">
        功能丰富的按钮组件，支持多种样式、动画效果和交互状态
      </view>
      <view class="flex flex-wrap gap-2 text-xs">
        <view class="px-2 py-1 bg-blue-100 text-blue-600 rounded">✨ 动画效果</view>
        <view class="px-2 py-1 bg-green-100 text-green-600 rounded">🎯 图标支持</view>
        <view class="px-2 py-1 bg-purple-100 text-purple-600 rounded">🎨 多样式</view>
        <view class="px-2 py-1 bg-orange-100 text-orange-600 rounded">📱 响应式</view>
        <view class="px-2 py-1 bg-pink-100 text-pink-600 rounded">♿ 无障碍</view>
      </view>
    </view>

    <!-- 基础类型 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">基础类型</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3 mb-2">
          <uve-button>默认按钮</uve-button>
          <uve-button type="primary">主要按钮</uve-button>
          <uve-button type="success">成功按钮</uve-button>
        </view>
        <view class="flex flex-wrap gap-3">
          <uve-button type="warning">警告按钮</uve-button>
          <uve-button type="danger">危险按钮</uve-button>
          <uve-button type="info">信息按钮</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        <text class="font-mono">type</text>
        属性可设置为：default、primary、success、warning、danger、info
      </view>
    </view>

    <!-- 朴素按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">朴素按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button plain>朴素按钮</uve-button>
          <uve-button type="primary" plain>主要按钮</uve-button>
          <uve-button type="success" plain>成功按钮</uve-button>
          <uve-button type="warning" plain>警告按钮</uve-button>
          <uve-button type="danger" plain>危险按钮</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">plain</text>
        属性可以使按钮变为朴素按钮，背景色变为透明
      </view>
    </view>

    <!-- 按钮尺寸 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">按钮尺寸</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3 items-center">
          <uve-button type="primary" size="mini">迷你按钮</uve-button>
          <uve-button type="primary" size="small">小型按钮</uve-button>
          <uve-button type="primary">默认大小</uve-button>
          <uve-button type="primary" size="large">大号按钮</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        <text class="font-mono">size</text>
        属性可设置为：mini、small、normal(默认)、large
      </view>
    </view>

    <!-- 圆角按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">圆角按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button round>默认按钮</uve-button>
          <uve-button type="primary" round>主要按钮</uve-button>
          <uve-button type="success" round>成功按钮</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">round</text>
        属性可以使按钮变为圆角按钮
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">禁用状态</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button disabled>禁用按钮</uve-button>
          <uve-button type="primary" disabled>禁用按钮</uve-button>
          <uve-button type="primary" plain disabled>禁用按钮</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">disabled</text>
        属性可以禁用按钮，按钮会变为不可点击状态
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">加载状态</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button loading>加载中</uve-button>
          <uve-button type="primary" loading>加载中</uve-button>
          <uve-button type="success" loading>加载中</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">loading</text>
        属性即可让按钮处于加载状态，此时按钮不可点击
      </view>
    </view>

    <!-- 块级按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">块级按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-button type="primary" block>块级按钮</uve-button>
        <view class="h-2"></view>
        <uve-button type="success" block>块级按钮</uve-button>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">block</text>
        属性可以让按钮宽度为100%，常用于移动端底部操作按钮
      </view>
    </view>

    <!-- 幽灵按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">幽灵按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button ghost>幽灵按钮</uve-button>
          <uve-button type="primary" ghost>主要幽灵</uve-button>
          <uve-button type="success" ghost>成功幽灵</uve-button>
          <uve-button type="warning" ghost>警告幽灵</uve-button>
          <uve-button type="danger" ghost>危险幽灵</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">ghost</text>
        属性可以使按钮变为幽灵按钮，背景透明
      </view>
    </view>

    <!-- 边框按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">边框按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button outline>边框按钮</uve-button>
          <uve-button type="primary" outline>主要边框</uve-button>
          <uve-button type="success" outline>成功边框</uve-button>
          <uve-button type="warning" outline>警告边框</uve-button>
          <uve-button type="danger" outline>危险边框</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">outline</text>
        属性可以使按钮变为边框按钮
      </view>
    </view>

    <!-- 渐变按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">渐变按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button type="primary" gradient>主要渐变</uve-button>
          <uve-button type="success" gradient>成功渐变</uve-button>
          <uve-button type="warning" gradient>警告渐变</uve-button>
          <uve-button type="danger" gradient>危险渐变</uve-button>
          <uve-button type="info" gradient>信息渐变</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        设置
        <text class="font-mono">gradient</text>
        属性可以使按钮显示渐变背景效果
      </view>
    </view>

    <!-- 按钮形状 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">按钮形状</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3 items-center">
          <uve-button type="primary">默认</uve-button>
          <uve-button type="primary" round>圆角</uve-button>
          <uve-button type="primary" square>直角</uve-button>
          <uve-button type="primary" circle prefix-icon="icon-add">圆形</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">round</text>、
        <text class="font-mono">square</text>、
        <text class="font-mono">circle</text>
        属性控制按钮形状
      </view>
    </view>

    <!-- 图标按钮 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">图标按钮</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">前置和后置图标</view>
          <view class="flex flex-wrap gap-3 items-center">
            <uve-button type="primary" prefix-icon="icon-add">添加项目</uve-button>
            <uve-button type="success" prefix-icon="icon-check">确认提交</uve-button>
            <uve-button type="danger" prefix-icon="icon-delete">删除文件</uve-button>
            <uve-button type="info" suffix-icon="icon-arrow-right">下一步</uve-button>
            <uve-button type="warning" prefix-icon="icon-edit" suffix-icon="icon-save">编辑保存</uve-button>
          </view>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">纯图标按钮</view>
          <view class="flex flex-wrap gap-3 items-center">
            <uve-button type="primary" circle prefix-icon="icon-add" size="large" @click="showToast('添加')"></uve-button>
            <uve-button type="success" circle prefix-icon="icon-check" @click="showToast('确认')"></uve-button>
            <uve-button type="danger" circle prefix-icon="icon-delete" size="small" @click="showToast('删除')"></uve-button>
            <uve-button type="warning" circle prefix-icon="icon-edit" size="mini" @click="showToast('编辑')"></uve-button>
            <uve-button type="info" circle prefix-icon="icon-share" ghost @click="showToast('分享')"></uve-button>
          </view>
        </view>
        <view>
          <view class="text-sm text-gray-600 mb-2">不同样式的图标按钮</view>
          <view class="flex flex-wrap gap-3 items-center">
            <uve-button type="primary" prefix-icon="icon-download" plain>下载</uve-button>
            <uve-button type="success" prefix-icon="icon-upload" outline>上传</uve-button>
            <uve-button type="warning" prefix-icon="icon-refresh" ghost>刷新</uve-button>
            <uve-button type="danger" prefix-icon="icon-trash" gradient>清空</uve-button>
          </view>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">prefix-icon</text>
        和
        <text class="font-mono">suffix-icon</text>
        属性添加图标，支持多种组合方式
      </view>
    </view>

    <!-- 动画效果 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">动画效果</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">悬停动画效果</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="primary" animation="bounce" prefix-icon="icon-heart">弹跳效果</uve-button>
            <uve-button type="success" animation="rotate" prefix-icon="icon-refresh">旋转效果</uve-button>
            <uve-button type="warning" animation="skew" prefix-icon="icon-zap">倾斜效果</uve-button>
          </view>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">点击波纹效果</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="primary" ripple>基础波纹</uve-button>
            <uve-button type="success" ripple gradient>渐变波纹</uve-button>
            <uve-button type="danger" ripple circle prefix-icon="icon-play"></uve-button>
            <uve-button type="info" ripple outline>边框波纹</uve-button>
          </view>
        </view>
        <view>
          <view class="text-sm text-gray-600 mb-2">组合动画效果</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="primary" animation="bounce" ripple gradient>弹跳+波纹+渐变</uve-button>
            <uve-button type="warning" animation="rotate" ripple outline>旋转+波纹+边框</uve-button>
            <uve-button type="success" animation="skew" ripple ghost>倾斜+波纹+幽灵</uve-button>
          </view>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">animation</text>
        和
        <text class="font-mono">ripple</text>
        属性添加丰富的动画效果，支持多种组合
      </view>
    </view>

    <!-- 按钮组 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">按钮组</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">基础按钮组</view>
          <uve-button-group>
            <uve-button type="primary" @click="setActiveTab('tab1')" :class="{ 'opacity-50': activeTab !== 'tab1' }">首页</uve-button>
            <uve-button type="primary" @click="setActiveTab('tab2')" :class="{ 'opacity-50': activeTab !== 'tab2' }">产品</uve-button>
            <uve-button type="primary" @click="setActiveTab('tab3')" :class="{ 'opacity-50': activeTab !== 'tab3' }">关于</uve-button>
          </uve-button-group>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">带图标的按钮组</view>
          <uve-button-group>
            <uve-button type="success" prefix-icon="icon-edit">编辑</uve-button>
            <uve-button type="warning" prefix-icon="icon-copy">复制</uve-button>
            <uve-button type="danger" prefix-icon="icon-delete">删除</uve-button>
          </uve-button-group>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">垂直按钮组</view>
          <uve-button-group direction="vertical">
            <uve-button type="info" suffix-icon="icon-arrow-right">个人资料</uve-button>
            <uve-button type="info" suffix-icon="icon-arrow-right">账户设置</uve-button>
            <uve-button type="info" suffix-icon="icon-arrow-right">安全中心</uve-button>
            <uve-button type="danger" suffix-icon="icon-logout">退出登录</uve-button>
          </uve-button-group>
        </view>
        <view>
          <view class="text-sm text-gray-600 mb-2">不同样式的按钮组</view>
          <view class="mb-3">
            <uve-button-group>
              <uve-button outline prefix-icon="icon-bold">B</uve-button>
              <uve-button outline prefix-icon="icon-italic">I</uve-button>
              <uve-button outline prefix-icon="icon-underline">U</uve-button>
            </uve-button-group>
          </view>
          <uve-button-group>
            <uve-button ghost prefix-icon="icon-align-left"></uve-button>
            <uve-button ghost prefix-icon="icon-align-center"></uve-button>
            <uve-button ghost prefix-icon="icon-align-right"></uve-button>
          </uve-button-group>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        使用
        <text class="font-mono">uve-button-group</text>
        组件包裹按钮可以创建按钮组，支持水平和垂直布局
      </view>
    </view>

    <!-- 实际应用场景 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">实际应用场景</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">表单操作</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="primary" prefix-icon="icon-save" :loading="isSubmitting" @click="handleSubmit">
              {{ isSubmitting ? '提交中...' : '提交表单' }}
            </uve-button>
            <uve-button ghost @click="handleReset">重置</uve-button>
            <uve-button type="danger" outline prefix-icon="icon-delete" @click="handleDelete">删除</uve-button>
          </view>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">文件操作</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="success" prefix-icon="icon-upload" gradient>上传文件</uve-button>
            <uve-button type="info" prefix-icon="icon-download" plain>下载文件</uve-button>
            <uve-button type="warning" circle prefix-icon="icon-preview" @click="showToast('预览')"></uve-button>
            <uve-button type="danger" circle prefix-icon="icon-trash" @click="showToast('删除')"></uve-button>
          </view>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">社交互动</view>
          <view class="flex flex-wrap gap-3">
            <uve-button type="primary" prefix-icon="icon-heart" :class="{ 'bg-red-500': isLiked }" @click="toggleLike" ripple>
              {{ isLiked ? '已点赞' : '点赞' }} ({{ likeCount }})
            </uve-button>
            <uve-button type="info" prefix-icon="icon-share" ghost @click="showToast('分享')">分享</uve-button>
            <uve-button type="success" prefix-icon="icon-comment" outline @click="showToast('评论')">评论</uve-button>
          </view>
        </view>
        <view>
          <view class="text-sm text-gray-600 mb-2">状态切换</view>
          <view class="flex flex-wrap gap-3 items-center">
            <uve-button 
              :type="isFollowing ? 'danger' : 'primary'" 
              :prefix-icon="isFollowing ? 'icon-user-minus' : 'icon-user-plus'"
              @click="toggleFollow"
              animation="bounce"
            >
              {{ isFollowing ? '取消关注' : '关注' }}
            </uve-button>
            <uve-button 
              :type="isOnline ? 'success' : 'default'" 
              :prefix-icon="isOnline ? 'icon-wifi' : 'icon-wifi-off'"
              @click="toggleOnline"
              circle
            ></uve-button>
            <uve-button type="warning" prefix-icon="icon-bell" @click="handleNotification" :disabled="!hasNotification">
              通知 {{ notificationCount > 0 ? `(${notificationCount})` : '' }}
            </uve-button>
          </view>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        演示了按钮在实际应用中的各种使用场景和交互状态
      </view>
    </view>

    <!-- 交互计数器 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">交互计数器</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3 items-center mb-4">
          <uve-button type="primary" @click="handleClick" ripple animation="bounce">
            点击我 ({{ clickCount }})
          </uve-button>
          <uve-button type="success" prefix-icon="icon-plus" @click="increment" circle></uve-button>
          <uve-button type="danger" prefix-icon="icon-minus" @click="decrement" circle></uve-button>
          <uve-button ghost @click="reset">重置</uve-button>
        </view>
        <view v-if="clickCount > 0" class="text-sm text-gray-600">
          <view>总点击次数: {{ clickCount }}</view>
          <view>计数器值: {{ counter }}</view>
          <view v-if="lastAction" class="text-xs text-gray-500 mt-1">最后操作: {{ lastAction }}</view>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">@click</text>
        监听按钮的点击事件并处理相应的业务逻辑
      </view>
    </view>

    <!-- 消息提示 -->
    <view v-if="toastMessage" class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-50 transition-all duration-300">
      {{ toastMessage }}
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue"

// 基础计数器
const clickCount = ref(0)
const counter = ref(0)
const lastAction = ref('')

// 应用状态
const isSubmitting = ref(false)
const isLiked = ref(false)
const likeCount = ref(128)
const isFollowing = ref(false)
const isOnline = ref(true)
const hasNotification = ref(true)
const notificationCount = ref(3)
const activeTab = ref('tab1')

// 消息提示
const toastMessage = ref('')

// 基础点击事件
const handleClick = () => {
  clickCount.value++
  lastAction.value = '主按钮点击'
}

// 计数器操作
const increment = () => {
  counter.value++
  clickCount.value++
  lastAction.value = '增加计数'
}

const decrement = () => {
  counter.value--
  clickCount.value++
  lastAction.value = '减少计数'
}

const reset = () => {
  counter.value = 0
  clickCount.value = 0
  lastAction.value = '重置计数'
}

// 表单操作
const handleSubmit = async () => {
  isSubmitting.value = true
  showToast('提交中...')
  
  // 模拟异步操作
  setTimeout(() => {
    isSubmitting.value = false
    showToast('提交成功！')
  }, 2000)
}

const handleReset = () => {
  showToast('表单已重置')
}

const handleDelete = () => {
  showToast('确认删除吗？')
}

// 社交互动
const toggleLike = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
  showToast(isLiked.value ? '点赞成功！' : '取消点赞')
}

// 状态切换
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  showToast(isFollowing.value ? '关注成功！' : '取消关注')
}

const toggleOnline = () => {
  isOnline.value = !isOnline.value
  showToast(isOnline.value ? '已上线' : '已离线')
}

const handleNotification = () => {
  if (hasNotification.value) {
    notificationCount.value = 0
    hasNotification.value = false
    showToast('通知已清空')
  }
}

// 标签切换
const setActiveTab = (tab) => {
  activeTab.value = tab
  showToast(`切换到${tab}`)
}

// 消息提示
const showToast = (message) => {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = ''
  }, 2000)
}

// 组件挂载时设置初始状态
onMounted(() => {
  console.log('uve-button 演示页面已加载')
})
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 768px;
  margin: 0 auto;
  
  // 美化演示区域
  .bg-gray-50 {
    background: linear-gradient(145deg, #f8fafc, #f1f5f9);
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  
  // 代码样式
  .font-mono {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    color: #475569;
    font-weight: 500;
  }
  
  // 标签样式
  .px-2.py-1 {
    font-weight: 500;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  
  // 消息提示动画
  .fixed {
    animation: slideInDown 0.3s ease-out;
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  // 章节分隔
  .mb-8 {
    position: relative;
    
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, #e2e8f0, transparent);
    }
  }
  
  // 响应式优化
  @media (max-width: 640px) {
    .flex-wrap {
      gap: 0.5rem !important;
    }
    
    .text-2xl {
      font-size: 1.5rem;
    }
    
    .p-4 {
      padding: 0.75rem;
    }
  }
}

// 全局按钮增强
:deep(.uve-button) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  // 增强焦点样式
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    transform: scale(1.02);
  }
  
  // 增强禁用样式
  &:disabled,
  &.pointer-events-none {
    filter: grayscale(0.5);
    cursor: not-allowed;
  }
}

// 按钮组增强
:deep(.uve-button-group) {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  overflow: hidden;
  
  .uve-button {
    box-shadow: none;
  }
}
</style>
