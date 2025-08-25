<template>
  <view class="page-container bg-white min-h-screen p-4">
    <view class="text-xl font-bold mb-6">uve-button 按钮</view>

    <view class="text-sm text-gray-500 mb-4">按钮组件，用于触发操作，支持多种类型和状态。</view>

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
        <view class="flex flex-wrap gap-3 items-center mb-3">
          <uve-button type="primary" prefix-icon="icon-add">添加</uve-button>
          <uve-button type="success" prefix-icon="icon-check">确认</uve-button>
          <uve-button type="danger" prefix-icon="icon-delete">删除</uve-button>
          <uve-button type="info" suffix-icon="icon-arrow-right">下一步</uve-button>
        </view>
        <view class="flex flex-wrap gap-3 items-center">
          <uve-button type="primary" circle prefix-icon="icon-add" size="large"></uve-button>
          <uve-button type="success" circle prefix-icon="icon-check"></uve-button>
          <uve-button type="danger" circle prefix-icon="icon-delete" size="small"></uve-button>
          <uve-button type="warning" circle prefix-icon="icon-edit" size="mini"></uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">prefix-icon</text>
        和
        <text class="font-mono">suffix-icon</text>
        属性添加图标
      </view>
    </view>

    <!-- 动画效果 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">动画效果</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="flex flex-wrap gap-3">
          <uve-button type="primary" animation="bounce">弹跳效果</uve-button>
          <uve-button type="success" animation="rotate">旋转效果</uve-button>
          <uve-button type="warning" animation="skew">倾斜效果</uve-button>
          <uve-button type="danger" ripple>波纹效果</uve-button>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">animation</text>
        和
        <text class="font-mono">ripple</text>
        属性添加动画效果
      </view>
    </view>

    <!-- 按钮组 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">按钮组</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">水平按钮组</view>
          <uve-button-group>
            <uve-button type="primary">左侧</uve-button>
            <uve-button type="primary">中间</uve-button>
            <uve-button type="primary">右侧</uve-button>
          </uve-button-group>
        </view>
        <view class="mb-4">
          <view class="text-sm text-gray-600 mb-2">垂直按钮组</view>
          <uve-button-group direction="vertical">
            <uve-button type="success">选项一</uve-button>
            <uve-button type="success">选项二</uve-button>
            <uve-button type="success">选项三</uve-button>
          </uve-button-group>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        使用
        <text class="font-mono">uve-button-group</text>
        组件包裹按钮可以创建按钮组
      </view>
    </view>

    <!-- 按钮点击事件 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">点击事件</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <uve-button type="primary" @click="handleClick">点击我</uve-button>
        <view v-if="clickCount > 0" class="mt-3 text-sm text-primary">
          按钮被点击了 {{ clickCount }} 次
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过
        <text class="font-mono">@click</text>
        监听按钮的点击事件
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}
</script>
