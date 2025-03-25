<template>
  <Tabs :items="items" />
  <Button type="primary" customClass="w-full fixed bottom-0 left-0">提交按钮</Button>
</template>

<script setup lang="ts">
import Button from "@/components/Button/index.vue"
import Tabs from "@/components/Tabs/index.vue"

const items = ref([
  {
    name: "首页",
  },
  {
    name: "我的",
  },
  {
    name: "设置",
  },
])
</script>
