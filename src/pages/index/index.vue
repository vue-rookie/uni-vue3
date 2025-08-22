<template>
  <view class="page-container bg-gray-100 min-h-screen">
    <!-- 商城Banner & 分类 & 推荐商品 -->
    <view class="bg-white">
      <uve-swiper :list="banners" height="180" />
    </view>
    <view class="grid grid-cols-4 gap-4 p-4 bg-white mt-2">
      <view v-for="c in categories" :key="c.id" class="text-center" @click="openCategory(c.id)">
        <image :src="c.icon" class="w-14 h-14 rounded-xl mx-auto mb-1" mode="aspectFill" />
        <text class="text-xs text-gray-700 ellipsis">{{ c.name }}</text>
      </view>
    </view>
    <view class="mt-3 bg-white">
      <view class="text-sm text-gray-500 px-4 py-2">为你推荐</view>
      <view class="grid grid-cols-2 gap-4 p-4">
        <view
          v-for="g in goods"
          :key="g.spuId"
          class="bg-white rounded-2xl overflow-hidden shadow-sm"
          @click="openDetail(g.spuId)"
        >
          <image :src="g.pictures?.[0]" class="w-full h-40" mode="aspectFill" />
          <view class="p-3">
            <view class="text-gray-800 text-sm ellipsis-2 leading-6 min-h-12">{{ g.title }}</view>
            <view class="flex items-baseline mt-1">
              <text class="text-[#ff4d4f] text-lg font-semibold">¥{{ g.price }}</text>
              <text v-if="g.originPrice" class="text-gray-400 text-xs ml-2 line-through">
                ¥{{ g.originPrice }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getBannersApi, getCategoriesApi } from "@/api/common"
import { getRecommendGoodsApi } from "@/api/goods"

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "",
  })
  init()
})

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
    fail: (err) => {
      console.error("页面跳转失败:", err)
    },
  })
}

const openURL = (url: string) => {
  // 在条件编译中打开URL
  // #ifdef H5
  window.open(url)
  // #endif

  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif

  // #ifdef MP
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({
        title: "链接已复制",
        icon: "none",
      })
    },
  })
  // #endif
}

const banners = ref<string[]>([])
const categories = ref<any[]>([])
const goods = ref<any[]>([])

const init = async () => {
  const [bRes, cRes, gRes] = await Promise.all([
    getBannersApi(),
    getCategoriesApi(),
    getRecommendGoodsApi({ page: 1, pageSize: 10 }),
  ])
  banners.value = (bRes as any).data || []
  categories.value = (cRes as any).data || []
  goods.value = (gRes as any).data?.list || []
}

const openCategory = (id: string) => {
  uni.navigateTo({ url: `/pages-sub/goods-list/index?categoryId=${id}` })
}
const openDetail = (spuId: string) => {
  uni.navigateTo({ url: `/pages-sub/goods-detail/index?spuId=${spuId}` })
}
</script>
