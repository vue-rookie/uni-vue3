<template>
  <view class="search-wrap px-4">
    <view :style="{ paddingTop: navHeight + 24 + 'rpx' }">
      <template v-if="taskList.length">
        <view v-for="task in taskList" :key="task.taskId"></view>
      </template>
      <template v-else>
        <view>暂无数据</view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { usePageScroll } from "@/hooks/usePageScroll"
const { isShowBg, onPageScroll, navHeight, opacity } = usePageScroll()
const taskList = ref([])
</script>

<style scoped lang="scss"></style>
