<template>
  <template>
    <up-search placeholder="日照香炉生紫烟" v-model="keyword"></up-search>
    <view class="mt-4">
      <up-tabs :list="list1" @click="click"></up-tabs>
    </view>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 响应式数据
const keyword = ref("遥看瀑布挂前川")
// 创建响应式数据
const list1 = reactive([
  { name: "关注" },
  { name: "推荐" },
  { name: "电影" },
  { name: "科技" },
  { name: "音乐" },
  { name: "美食" },
  { name: "文化" },
  { name: "财经" },
  { name: "手工" },
])

// 定义方法
function click(item) {
  console.log("item", item)
}
</script>

<style scoped lang="scss"></style>
