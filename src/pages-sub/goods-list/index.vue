<template>
  <view class="min-h-screen bg-gray-100">
    <view class="grid grid-cols-2 gap-4 p-4">
      <view
        v-for="g in list"
        :key="g.spuId"
        class="bg-white rounded-2xl overflow-hidden shadow-sm"
        @click="openDetail(g.spuId)"
      >
        <image
          :src="srcFor(g)"
          class="w-full h-44"
          mode="aspectFill"
          @error="onImgError(g.spuId)"
        />
        <view class="p-3">
          <view class="text-gray-800 text-sm ellipsis-2 leading-6 min-h-12">{{ g.title }}</view>
          <view class="flex items-baseline mt-1">
            <text class="text-[#ff4d4f] text-lg font-semibold">¥{{ g.price }}</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="!list.length" class="text-center text-gray-400 py-10">暂无商品</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getCategoryGoodsApi } from "@/api/goods"

const list = ref<any[]>([])
const fallback = "/static/log.jpg"
const broken = ref<Record<string, boolean>>({})

const srcFor = (g: any) => {
  if (broken.value[g.spuId]) return fallback
  return g.pictures?.[0] || fallback
}
const onImgError = (id: string) => () => {
  broken.value[id] = true
}

onMounted(async () => {
  const pages = getCurrentPages()
  const curr = pages[pages.length - 1] as any
  const { categoryId } = curr.options || {}
  const res = await getCategoryGoodsApi(categoryId, { page: 1, pageSize: 20 })
  list.value = (res as any).data?.list || []
})

const openDetail = (spuId: string) => {
  uni.navigateTo({ url: `/pages-sub/goods-detail/index?spuId=${spuId}` })
}
</script>
