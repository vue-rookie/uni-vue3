<template>
  <view class="page-container bg-white min-h-screen p-4 demo-section">
    <view class="text-xl font-bold mb-6">uve-border 边框</view>

    <view class="text-sm text-gray-500 mb-4">边框样式展示，基于TailwindCSS的边框工具类实现。</view>

    <!-- 边框样式 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">边框样式</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-2 gap-4">
          <uve-border>
            <view class="p-4 flex items-center justify-center">
              <text>默认边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2">
            <view class="p-4 flex items-center justify-center">
              <text>粗边框 (border-2)</text>
            </view>
          </uve-border>
          <uve-border thickness="4">
            <view class="p-4 flex items-center justify-center">
              <text>更粗边框 (border-4)</text>
            </view>
          </uve-border>
          <uve-border thickness="8">
            <view class="p-4 flex items-center justify-center">
              <text>超粗边框 (border-8)</text>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 thickness 属性控制边框粗细，可选值：0、normal、2、4、8
      </view>
    </view>

    <!-- 边框颜色 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">边框颜色</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-2 gap-4">
          <uve-border thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>主色边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2" color="success">
            <view class="p-4 flex items-center justify-center">
              <text>成功色边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2" color="warning">
            <view class="p-4 flex items-center justify-center">
              <text>警告色边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2" color="danger">
            <view class="p-4 flex items-center justify-center">
              <text>危险色边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2" color="info">
            <view class="p-4 flex items-center justify-center">
              <text>信息色边框</text>
            </view>
          </uve-border>
          <uve-border thickness="2" color="gray-300">
            <view class="p-4 flex items-center justify-center">
              <text>灰色边框</text>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 color 属性控制边框颜色，支持多种预设颜色
      </view>
    </view>

    <!-- 圆角边框 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">圆角边框</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-2 gap-4">
          <uve-border thickness="2">
            <view class="p-4 flex items-center justify-center">
              <text>无圆角</text>
            </view>
          </uve-border>
          <uve-border thickness="2" rounded="sm">
            <view class="p-4 flex items-center justify-center">
              <text>小圆角 (rounded-sm)</text>
            </view>
          </uve-border>
          <uve-border thickness="2" rounded="normal">
            <view class="p-4 flex items-center justify-center">
              <text>默认圆角 (rounded)</text>
            </view>
          </uve-border>
          <uve-border thickness="2" rounded="lg">
            <view class="p-4 flex items-center justify-center">
              <text>大圆角 (rounded-lg)</text>
            </view>
          </uve-border>
          <uve-border thickness="2" rounded="xl">
            <view class="p-4 flex items-center justify-center">
              <text>超大圆角 (rounded-xl)</text>
            </view>
          </uve-border>
          <uve-border thickness="2" rounded="full">
            <view class="p-4 flex items-center justify-center">
              <text>全圆角 (rounded-full)</text>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 rounded 属性控制圆角大小，可选值：none、sm、normal、md、lg、xl、2xl、3xl、full
      </view>
    </view>

    <!-- 边框方向 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">边框方向</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-2 gap-4">
          <uve-border position="top" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>上边框 (border-t-2)</text>
            </view>
          </uve-border>
          <uve-border position="right" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>右边框 (border-r-2)</text>
            </view>
          </uve-border>
          <uve-border position="bottom" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>下边框 (border-b-2)</text>
            </view>
          </uve-border>
          <uve-border position="left" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>左边框 (border-l-2)</text>
            </view>
          </uve-border>
          <uve-border position="x" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>左右边框 (border-x-2)</text>
            </view>
          </uve-border>
          <uve-border position="y" thickness="2" color="primary">
            <view class="p-4 flex items-center justify-center">
              <text>上下边框 (border-y-2)</text>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 position 属性控制边框方向，可选值：all、top、right、bottom、left、x、y
      </view>
    </view>

    <!-- 边框样式 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">边框样式</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-2 gap-4">
          <uve-border borderStyle="solid" thickness="2" color="primary" rounded="normal">
            <view class="p-4 flex items-center justify-center">
              <text>实线边框 (border-solid)</text>
            </view>
          </uve-border>
          <uve-border borderStyle="dashed" thickness="2" color="primary" rounded="normal">
            <view class="p-4 flex items-center justify-center">
              <text>虚线边框 (border-dashed)</text>
            </view>
          </uve-border>
          <uve-border borderStyle="dotted" thickness="2" color="primary" rounded="normal">
            <view class="p-4 flex items-center justify-center">
              <text>点状边框 (border-dotted)</text>
            </view>
          </uve-border>
          <uve-border borderStyle="double" thickness="2" color="primary" rounded="normal">
            <view class="p-4 flex items-center justify-center">
              <text>双线边框 (border-double)</text>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        通过 borderStyle 属性控制边框样式，可选值：solid、dashed、dotted、double、hidden、none
      </view>
    </view>

    <!-- 组合应用 -->
    <view class="mb-8">
      <view class="text-base font-medium mb-2">组合应用</view>
      <view class="bg-gray-50 p-4 rounded-lg">
        <view class="grid grid-cols-1 gap-4">
          <uve-border thickness="2" color="primary" rounded="lg" customClass="shadow-md">
            <view class="p-6">
              <view class="text-center mb-2 font-medium">卡片示例</view>
              <uve-border position="top" color="gray-200" customClass="my-2"></uve-border>
              <view class="text-sm text-gray-600">
                这是一个组合了多种边框样式的卡片示例，包含了边框、分割线等元素。
              </view>
            </view>
          </uve-border>

          <uve-border color="gray-200" rounded="lg" customClass="overflow-hidden">
            <view class="bg-gray-50 p-3 border-b border-gray-200 font-medium">表单标题</view>
            <view class="p-4">
              <view class="mb-3 pb-3 border-b border-gray-100">
                <text class="text-sm">表单项目1</text>
              </view>
              <view class="mb-3 pb-3 border-b border-gray-100">
                <text class="text-sm">表单项目2</text>
              </view>
              <view>
                <text class="text-sm">表单项目3</text>
              </view>
            </view>
          </uve-border>
        </view>
      </view>
      <view class="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
        边框样式可以组合应用于各种UI组件
      </view>
    </view>
  </view>
</template>

<script setup>
import uveBorder from "@/components/uve-border/index.vue"
</script>
