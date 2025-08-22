<template>
  <view class="min-h-screen bg-gray-100">
    <view class="px-4 py-3 space-y-3">
      <view v-for="item in items" :key="item.skuId" class="bg-white rounded-2xl p-4 shadow-sm">
        <view class="flex items-start">
          <uve-checkbox :model-value="item.selected" @change="toggle(item.skuId)" class="mt-1" />
          <image
            :src="srcFor(item)"
            class="w-20 h-20 rounded-xl ml-3"
            mode="aspectFill"
            @error="onImgError(item.skuId)"
          />
          <view class="ml-3 flex-1">
            <view class="text-gray-800 text-sm ellipsis-2 leading-5 min-h-10">
              {{ item.title }}
            </view>
            <view class="text-xs text-gray-400 mt-1">{{ item.attrsText }}</view>
            <view class="flex justify-between items-center mt-3">
              <text class="text-[#ff4d4f] font-semibold">¥{{ item.price }}</text>
              <view class="flex items-center bg-gray-50 rounded-full">
                <text
                  class="w-8 h-8 flex items-center justify-center text-gray-600"
                  @click="decr(item.skuId)"
                >
                  -
                </text>
                <text class="w-10 h-8 flex items-center justify-center text-gray-800 font-medium">
                  {{ item.quantity }}
                </text>
                <text
                  class="w-8 h-8 flex items-center justify-center text-gray-600"
                  @click="incr(item.skuId)"
                >
                  +
                </text>
              </view>
            </view>
          </view>
          <text class="text-red-500 ml-3 text-sm" @click="remove(item.skuId)">删除</text>
        </view>
      </view>
    </view>

    <view v-if="!items.length" class="text-center text-gray-400 py-10">购物车空空如也</view>

    <view class="h-20"></view>
    <view
      class="fixed left-0 right-0 bottom-0 bg-white border-t border-gray-100 p-4 flex items-center"
    >
      <uve-checkbox :model-value="isAllSelected" @change="toggleAll" class="mr-3">
        全选
      </uve-checkbox>
      <view class="text-gray-600 flex-1">
        合计：
        <text class="text-[#ff4d4f] font-semibold text-lg">¥{{ totalSelectedAmount }}</text>
      </view>
      <uve-button type="primary" @click="toCheckout">结算({{ totalSelectedQuantity }})</uve-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCartStore } from "@/store/cart"

const cart = useCartStore()
const { items, totalSelectedAmount, totalSelectedQuantity, isAllSelected } = storeToRefs(cart)
const fallback = "/static/log.jpg"
const broken: Record<string, boolean> = {}

const srcFor = (item: any) => {
  if (broken[item.skuId]) return fallback
  return item.picture || fallback
}
const onImgError = (skuId: string) => () => {
  broken[skuId] = true
}

const toggle = (skuId: string) => cart.toggleSelect(skuId)
const toggleAll = (val: boolean) => cart.toggleSelectAll(Boolean(val))
const remove = (skuId: string) => cart.removeFromCart(skuId)
const incr = (skuId: string) => {
  const found = items.value.find((i) => i.skuId === skuId)
  if (!found) return
  cart.updateQuantity(skuId, found.quantity + 1)
}
const decr = (skuId: string) => {
  const found = items.value.find((i) => i.skuId === skuId)
  if (!found) return
  cart.updateQuantity(skuId, Math.max(1, found.quantity - 1))
}

const toCheckout = () => {
  if (!totalSelectedQuantity.value) {
    uni.showToast({ title: "请选择商品", icon: "none" })
    return
  }
  uni.navigateTo({ url: "/pages-sub/checkout/index" })
}
</script>
