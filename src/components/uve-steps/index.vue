<template>
  <view class="w-full flex" :class="[direction === 'vertical' ? 'flex-col' : 'flex-row']">
    <view
      v-for="(step, index) in steps"
      :key="index"
      class="flex relative"
      :class="[
        direction === 'vertical' ? 'flex-row mb-4 last:mb-0' : 'flex-col',
        direction === 'horizontal' ? 'flex-1' : '',
      ]"
    >
      <!-- 步骤图标 -->
      <view
        class="flex relative items-center"
        :class="[direction === 'vertical' ? 'mr-3' : 'mb-2']"
      >
        <!-- 自定义图标插槽 -->
        <slot
          v-if="$slots[`icon-${index}`]"
          :name="`icon-${index}`"
          :index="index"
          :step="step"
          :active="active"
        ></slot>
        <view
          v-else
          class="w-6 h-6 rounded-full flex items-center justify-center z-1"
          :class="[
            getIconColorClass(index),
            // 预设颜色
            { 'bg-primary text-white': index === active && activeColor === 'primary' },
            { 'bg-success text-white': index === active && activeColor === 'success' },
            { 'bg-warning text-white': index === active && activeColor === 'warning' },
            { 'bg-danger text-white': index === active && activeColor === 'danger' },
            // 自定义颜色
            {
              [`bg-${customActiveColor} text-white`]:
                index === active &&
                customActiveColor &&
                !['primary', 'success', 'warning', 'danger'].includes(activeColor),
            },
            {
              [`bg-${customFinishedColor || customActiveColor || 'primary'} text-white`]:
                index < active && (customFinishedColor || customActiveColor),
            },
            // 默认颜色
            {
              'bg-primary text-white': index < active && !customFinishedColor && !customActiveColor,
            },
            { 'bg-gray-100 text-gray-500': index > active },
          ]"
          :style="getCustomColorStyle(index)"
        >
          <slot v-if="$slots.icon" name="icon" :index="index" :step="step" :active="active"></slot>
          <text v-else-if="index < active && showCheckIcon" class="i-ri-check-line"></text>
          <text v-else class="text-sm">{{ index + 1 }}</text>
        </view>

        <!-- 连接线 -->
        <view
          v-if="index < steps.length - 1"
          class="absolute"
          :class="[
            direction === 'vertical'
              ? 'w-px top-6 bottom-0 left-1/2 transform -translate-x-1/2'
              : 'h-px top-1/2 left-6 right-0 transform -translate-y-1/2',
            // 预设和自定义颜色
            {
              [`bg-${customActiveColor || activeColor}`]:
                index < active && (customActiveColor || activeColor !== 'primary'),
            },
            { 'bg-primary': index < active && !customActiveColor && activeColor === 'primary' },
            { 'bg-gray-200': index >= active },
          ]"
          :style="index < active ? getLineColorStyle() : ''"
        ></view>
      </view>

      <!-- 步骤内容 -->
      <view class="flex-1">
        <!-- 自定义内容插槽 -->
        <slot
          v-if="$slots[`content-${index}`]"
          :name="`content-${index}`"
          :index="index"
          :step="step"
          :active="active"
        ></slot>
        <template v-else>
          <!-- 标题插槽 -->
          <slot
            v-if="$slots.title"
            name="title"
            :index="index"
            :step="step"
            :active="active"
          ></slot>
          <view
            v-else
            class="text-sm font-medium mb-1"
            :class="[
              // 预设颜色
              {
                [`text-${activeColor}`]:
                  index === active &&
                  ['primary', 'success', 'warning', 'danger'].includes(activeColor),
              },
              // 自定义颜色
              {
                [`text-${customActiveColor}`]:
                  index === active &&
                  customActiveColor &&
                  !['primary', 'success', 'warning', 'danger'].includes(activeColor),
              },
              { 'text-gray-800': index < active },
              { 'text-gray-500': index > active },
            ]"
            :style="index === active ? getTitleColorStyle() : ''"
          >
            {{ step.title }}
          </view>

          <!-- 描述插槽 -->
          <slot
            v-if="$slots.description && step.description"
            name="description"
            :index="index"
            :step="step"
            :active="active"
          ></slot>
          <view
            v-else-if="step.description"
            class="text-xs"
            :class="[index > active ? 'text-gray-400' : 'text-gray-500']"
          >
            {{ step.description }}
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  // 步骤数据
  steps: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 当前激活步骤的索引
  active: {
    type: Number,
    default: 0,
  },
  // 方向：horizontal 或 vertical
  direction: {
    type: String,
    default: "horizontal",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
  // 是否显示完成步骤的对勾图标
  showCheckIcon: {
    type: Boolean,
    default: true,
  },
  // 主题颜色 - 预设颜色
  activeColor: {
    type: String,
    default: "primary",
  },
  // 自定义激活状态颜色 - 支持UnoCSS颜色或自定义颜色
  customActiveColor: {
    type: String,
    default: "",
  },
  // 自定义完成状态颜色 - 支持UnoCSS颜色或自定义颜色
  customFinishedColor: {
    type: String,
    default: "",
  },
  // 自定义激活状态颜色值 - 直接使用CSS颜色值 (如 #ff0000, rgb(255,0,0))
  activeColorValue: {
    type: String,
    default: "",
  },
  // 自定义完成状态颜色值 - 直接使用CSS颜色值
  finishedColorValue: {
    type: String,
    default: "",
  },
})

// 获取图标颜色类
const getIconColorClass = (index) => {
  if (index === props.active) {
    return ``
  }
  return ""
}

// 获取自定义颜色样式
const getCustomColorStyle = (index) => {
  // 如果提供了直接的颜色值
  if (index === props.active && props.activeColorValue) {
    return { backgroundColor: props.activeColorValue, color: "#ffffff" }
  } else if (index < props.active && props.finishedColorValue) {
    return { backgroundColor: props.finishedColorValue, color: "#ffffff" }
  }
  return {}
}

// 获取连接线颜色样式
const getLineColorStyle = () => {
  if (props.finishedColorValue) {
    return { backgroundColor: props.finishedColorValue }
  } else if (props.activeColorValue) {
    return { backgroundColor: props.activeColorValue }
  }
  return {}
}

// 获取标题颜色样式
const getTitleColorStyle = () => {
  if (props.activeColorValue) {
    return { color: props.activeColorValue }
  }
  return {}
}
</script>
