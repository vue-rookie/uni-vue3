<template>
  <view
    class="fixed bottom-0 left-0 right-0 z-[1000]"
    :style="{
      backgroundColor: backgroundColor,
      borderTop: borderTop ? '1px solid #333333' : 'none',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }"
  >
    <view class="flex h-[50px] items-center justify-around">
      <view
        v-for="(item, index) in tabList"
        :key="index"
        class="flex flex-1 flex-col items-center justify-center h-full relative transition-all duration-300"
        :class="{ 'scale-105': currentIndex === index }"
        @click="handleTabClick(index, item)"
      >
        <view class="relative mb-0.5">
          <text
            :class="currentIndex === index ? item.selectedIcon : item.icon"
            class="text-[20px] transition-colors duration-300"
            :style="{ color: currentIndex === index ? selectedColor : color }"
          ></text>
          <!-- 红点提示 -->
          <view
            v-if="item.badge"
            class="absolute -top-2 left-2 bg-red-500 rounded-[10px] min-w-6 h-4 flex items-center justify-center px-1"
          >
            <text v-if="item.badge > 99" class="text-white text-[10px] font-bold leading-none">
              99+
            </text>
            <text v-else class="text-white text-[10px] font-bold leading-none">
              {{ item.badge }}
            </text>
          </view>
        </view>
        <text
          class="text-[14px] transition-colors duration-300 font-bold"
          :style="{ color: currentIndex === index ? selectedColor : color }"
        >
          {{ item.text }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

interface TabItem {
  text: string
  icon?: string
  selectedIcon?: string
  path: string
  badge?: number
}

interface Props {
  current?: number
  tabList: TabItem[]
  backgroundColor?: string
  color?: string
  selectedColor?: string
  borderTop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  current: 0,
  backgroundColor: "#000000",
  color: "#999999",
  selectedColor: "#FFFFFF",
  borderTop: false,
})

const emit = defineEmits<{
  (e: "change", index: number, item: TabItem): void
}>()

const currentIndex = ref(props.current)

// 处理标签点击
const handleTabClick = (index: number, item: TabItem) => {
  currentIndex.value = index
  emit("change", index, item)

  // 跳转页面
  if (item.path) {
    uni.switchTab({
      url: item.path,
      fail: () => {
        // 如果 switchTab 失败，尝试使用 navigateTo
        uni.navigateTo({
          url: item.path,
        })
      },
    })
  }
}

// 暴露方法给父组件
defineExpose({
  setCurrent: (index: number) => {
    currentIndex.value = index
  },
  getCurrent: () => currentIndex.value,
})
</script>
