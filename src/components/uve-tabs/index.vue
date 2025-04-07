<template>
  <view class="w-full bg-white">
    <!-- 标签栏 -->
    <scroll-view
      scroll-x
      class="w-full whitespace-nowrap border-b border-gray-100"
      :show-scrollbar="false"
    >
      <view class="flex px-2">
        <view
          v-for="(item, index) in items"
          :key="index"
          class="relative flex flex-col items-center justify-center px-4 py-2 text-sm text-gray-500 transition-colors duration-300"
          :class="[activeIndex === index ? 'text-primary font-medium' : '', customItemClass]"
          @tap="handleTabClick(index)"
        >
          <text class="text-info">{{ item.name }}</text>
          <!-- 激活标签底部红线 -->
          <view
            v-if="activeIndex === index"
            class="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-sm bg-primary transition-all duration-300"
            :class="customLineClass"
          ></view>
        </view>
      </view>
    </scroll-view>

    <!-- 内容区域 -->
    <swiper
      :class="['w-full', customContentClass || 'h-[500rpx]']"
      :current="activeIndex"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(item, index) in items" :key="index">
        <slot :name="`content-${index}`">
          <view class="p-4 text-gray-800">{{ item.name }}的内容</view>
        </slot>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface TabItem {
  name: string
  [key: string]: any
}

interface Props {
  items: TabItem[]
  initialIndex?: number
  /** 自定义标签项类名 */
  customItemClass?: string
  /** 自定义指示器类名 */
  customLineClass?: string
  /** 自定义内容区域类名 */
  customContentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  initialIndex: 0,
  customItemClass: "",
  customLineClass: "",
  customContentClass: "",
})

const emit = defineEmits<{
  (e: "change", index: number, item: TabItem): void
}>()

const activeIndex = ref(props.initialIndex)

// 点击标签切换
const handleTabClick = (index: number) => {
  activeIndex.value = index
  emit("change", index, props.items[index])
}

// 滑动内容切换
const handleSwiperChange = (e: any) => {
  const index = e.detail.current
  activeIndex.value = index
  emit("change", index, props.items[index])
}
</script>
