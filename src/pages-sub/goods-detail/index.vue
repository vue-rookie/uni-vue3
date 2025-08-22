<template>
  <view class="min-h-screen bg-gray-100">
    <view class="bg-white">
      <uve-swiper :list="spu.pictures || []" height="360" v-if="spu" />
    </view>

    <view class="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm" v-if="spu">
      <view class="text-base text-gray-900 ellipsis-2 leading-7">{{ spu.title }}</view>
      <view class="text-sm text-gray-500 mt-1" v-if="spu.subTitle">{{ spu.subTitle }}</view>
      <view class="flex items-baseline mt-2">
        <text class="text-[#ff4d4f] text-2xl font-semibold">¥{{ spu.price }}</text>
      </view>
    </view>

    <view class="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm" v-if="skus.length">
      <view class="text-gray-900 mb-3">选择规格</view>
      <view class="flex flex-wrap">
        <view
          v-for="s in skus"
          :key="s.skuId"
          class="px-3 py-1 rounded-full mr-2 mb-2 border"
          :class="
            s.skuId === selectedSkuId
              ? 'border-[#06f] text-[#06f] bg-[#f0f6ff]'
              : 'border-gray-200 text-gray-700'
          "
          @click="selectedSkuId = s.skuId"
        >
          {{ s.attrsText || s.title }}
        </view>
      </view>
    </view>

    <view class="h-20"></view>
    <view
      class="fixed left-0 right-0 bottom-0 bg-white border-t border-gray-100 p-3 flex items-center"
    >
      <uve-button class="mr-2" @click="goCart">购物车</uve-button>
      <uve-button type="primary" class="flex-1" @click="add">加入购物车</uve-button>
      <uve-button type="primary" class="ml-2" @click="buy">立即购买</uve-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getGoodsDetailApi } from "@/api/goods"
import { useCartStore } from "@/store/cart"

const cart = useCartStore()
const spu = ref<any>(null)
const skus = ref<any[]>([])
const selectedSkuId = ref<string>("")

const load = async () => {
  const pages = getCurrentPages()
  const curr = pages[pages.length - 1] as any
  const { spuId } = curr.options || {}
  if (!spuId) return
  const res = await getGoodsDetailApi(spuId)
  const data = (res as any).data || {}
  spu.value = data.spu
  skus.value = data.skus || []
  selectedSkuId.value = skus.value[0]?.skuId || ""
}

const add = () => {
  const s = skus.value.find((i) => i.skuId === selectedSkuId.value)
  if (!s) return
  cart.addToCart({
    skuId: s.skuId,
    spuId: s.spuId,
    title: spu.value.title,
    picture: spu.value.pictures?.[0] || "",
    price: s.price ?? spu.value.price,
    quantity: 1,
    selected: true,
    attrsText: s.attrsText,
  })
  uni.showToast({ title: "已加入购物车", icon: "success" })
}

const goCart = () => uni.navigateTo({ url: "/pages-sub/cart/index" })
const buy = () => {
  add()
  uni.navigateTo({ url: "/pages-sub/checkout/index" })
}

onMounted(load)
</script>
