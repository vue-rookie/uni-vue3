<template>
  <view class="uve-swiper" :style="{ height: height, width: width }">
    <swiper
      :indicator-dots="showIndicator"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :current="currentIndex"
      class="w-full h-full"
      @change="handleChange"
    >
      <swiper-item v-for="(item, index) in normalizedItems" :key="index" class="w-full h-full">
        <view
          class="swiper-item w-full h-full flex items-center justify-center"
          :class="[mode === 'card' ? 'card-mode' : '', mode === 'stack' ? 'stack-mode' : '']"
          :style="itemStyle(index)"
        >
          <view
            v-if="getImageSrc(index, item)"
            class="w-full h-full"
            @click="handleItemClick(item, index)"
          >
            <image
              :src="getImageSrc(index, item)"
              :mode="imageMode"
              class="swiper-image w-full h-full"
              :class="[
                mode === 'card' ? 'rounded-lg' : '',
                mode === 'stack' ? 'rounded-lg shadow-md' : '',
              ]"
              :style="imageStyle"
              @error="markBroken(index)"
            />

            <!-- 轮播图标题 -->
            <view
              v-if="item.title && showTitle"
              class="swiper-title absolute left-0 right-0 bottom-0 bg-black bg-opacity-40 text-white px-4 py-2"
            >
              {{ item.title }}
            </view>
          </view>

          <!-- 自定义内容 -->
          <slot v-if="$slots.default" :item="item" :index="index" :current="currentIndex"></slot>
        </view>
      </swiper-item>
    </swiper>

    <!-- 自定义指示器 -->
    <view
      v-if="showIndicator && customIndicator"
      class="custom-indicator absolute bottom-3 left-0 right-0 flex justify-center"
    >
      <view
        v-for="(_, index) in normalizedItems"
        :key="index"
        class="indicator-dot mx-1"
        :class="{ active: index === currentIndex }"
        :style="{
          backgroundColor: index === currentIndex ? indicatorActiveColor : indicatorColor,
          width: index === currentIndex ? '20rpx' : '12rpx',
        }"
        @click="handleIndicatorClick(index)"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"

// 轮播图项目接口
interface SwiperItem {
  id?: string | number
  image?: string
  title?: string
  url?: string
  [key: string]: any
}

const props = defineProps({
  // 轮播图数据（对象数组）
  items: {
    type: Array as () => SwiperItem[],
    default: () => [],
  },
  // 兼容：直接传字符串数组或对象数组
  list: {
    type: Array as () => (string | SwiperItem)[],
    default: () => [],
  },
  // 回退占位图
  fallback: {
    type: String,
    default: "/static/log.jpg",
  },
  // 轮播图高度
  height: {
    type: String,
    default: "320rpx",
  },
  // 轮播图宽度
  width: {
    type: String,
    default: "100%",
  },
  // 是否显示指示点
  showIndicator: {
    type: Boolean,
    default: true,
  },
  // 指示点颜色
  indicatorColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.4)",
  },
  // 当前选中的指示点颜色
  indicatorActiveColor: {
    type: String,
    default: "#ffffff",
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: true,
  },
  // 自动播放间隔时间（ms）
  interval: {
    type: Number,
    default: 3000,
  },
  // 滑动动画时长（ms）
  duration: {
    type: Number,
    default: 500,
  },
  // 是否无限滚动
  circular: {
    type: Boolean,
    default: true,
  },
  // 是否为纵向滑动
  vertical: {
    type: Boolean,
    default: false,
  },
  // 前边距
  previousMargin: {
    type: String,
    default: "0px",
  },
  // 后边距
  nextMargin: {
    type: String,
    default: "0px",
  },
  // 图片裁剪、缩放的模式
  imageMode: {
    type: String,
    default: "aspectFill",
  },
  // 是否显示标题
  showTitle: {
    type: Boolean,
    default: false,
  },
  // 当前选中项
  current: {
    type: Number,
    default: 0,
  },
  // 轮播图模式：normal-普通模式，card-卡片模式，stack-堆叠模式
  mode: {
    type: String,
    default: "normal",
    validator: (val: string) => ["normal", "card", "stack"].includes(val),
  },
  // 是否使用自定义指示器
  customIndicator: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["change", "click"])

// 当前索引
const currentIndex = ref(props.current)

// 监听current属性变化
watch(
  () => props.current,
  (newVal) => {
    currentIndex.value = newVal
  },
)

// 图片失败标记
const brokenSet = ref<Set<number>>(new Set())

// 归一化数据：优先使用 list，其次 items；字符串转为 { image }
const normalizedItems = computed<SwiperItem[]>(() => {
  const source = (props.list && props.list.length ? props.list : props.items) as (
    | string
    | SwiperItem
  )[]
  return source.map((it: any) => (typeof it === "string" ? { image: it } : it))
})

const getImageSrc = (index: number, item: SwiperItem) => {
  if (brokenSet.value.has(index)) return props.fallback
  return item.image || props.fallback
}

const markBroken = (index: number) => {
  brokenSet.value.add(index)
}

// 图片样式
const imageStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.mode === "card" || props.mode === "stack") {
    style.width = "90%"
    style.height = "90%"
    style.objectFit = "cover"
  }

  return style
})

// 根据索引计算每个轮播项的样式
const itemStyle = (index: number) => {
  if (props.mode === "normal") return {}

  const style: Record<string, string> = {}

  if (props.mode === "card") {
    const scale = index === currentIndex.value ? 1 : 0.85
    style.transform = `scale(${scale})`
    style.transition = "all 0.3s"
  } else if (props.mode === "stack") {
    const diff = Math.abs(index - currentIndex.value)
    const scale = 1 - diff * 0.1
    const translateX = diff * 10

    if (index < currentIndex.value) {
      style.transform = `scale(${scale}) translateX(-${translateX}px)`
    } else if (index > currentIndex.value) {
      style.transform = `scale(${scale}) translateX(${translateX}px)`
    } else {
      style.transform = "scale(1)"
    }

    style.transition = "all 0.3s"
    style.zIndex = `${(normalizedItems.value?.length || 0) - diff}`
  }

  return style
}

// 处理轮播图切换事件
const handleChange = (e: any) => {
  const { current } = e.detail
  currentIndex.value = current
  emits("change", { current, item: normalizedItems.value[current] })
}

// 处理轮播图点击事件
const handleItemClick = (item: SwiperItem, index: number) => {
  emits("click", { item, index })

  // 如果有URL，则进行页面跳转
  if (item.url) {
    uni.navigateTo({
      url: item.url,
      fail: () => {
        console.error("页面跳转失败:", item.url)
      },
    })
  }
}

// 处理指示器点击
const handleIndicatorClick = (index: number) => {
  currentIndex.value = index
}
</script>

<style>
.uve-swiper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.swiper-item {
  position: relative;
  box-sizing: border-box;
}

.swiper-image {
  display: block;
}

.card-mode,
.stack-mode {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 自定义指示器样式 */
.custom-indicator {
  display: flex;
  justify-content: center;
  z-index: 10;
}

.indicator-dot {
  height: 8rpx;
  width: 12rpx;
  border-radius: 4rpx;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  width: 20rpx;
}
</style>
