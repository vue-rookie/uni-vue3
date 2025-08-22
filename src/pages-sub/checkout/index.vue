<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 收货地址 -->
    <view class="bg-white p-4 flex items-center" @click="chooseAddress">
      <view class="flex-1">
        <view v-if="address" class="text-gray-800 font-medium">
          {{ address.receiver }} {{ address.phone }}
        </view>
        <view v-if="address" class="text-gray-600 text-sm mt-1 leading-5">
          {{ address.province }}{{ address.city }}{{ address.district }} {{ address.detail }}
        </view>
        <view v-else class="text-gray-400">请选择收货地址</view>
      </view>
      <text class="i-ri-arrow-right-s-line text-gray-400"></text>
    </view>

    <!-- 商品列表 -->
    <view class="mt-3 px-4">
      <view class="bg-white rounded-2xl shadow-sm">
        <view v-for="item in selectedItems" :key="item.skuId" class="p-4 flex items-center">
          <image :src="item.picture" class="w-16 h-16 rounded-xl" mode="aspectFill" />
          <view class="ml-3 flex-1">
            <view class="text-gray-800 text-sm ellipsis-2 leading-5">{{ item.title }}</view>
            <view class="text-xs text-gray-400 mt-1">{{ item.attrsText }}</view>
          </view>
          <view class="text-right">
            <view class="text-[#ff4d4f] font-semibold">¥{{ item.price }}</view>
            <view class="text-gray-400 text-xs">x{{ item.quantity }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="h-20"></view>
    <view
      class="fixed left-0 right-0 bottom-0 bg-white border-t border-gray-100 p-4 flex items-center"
    >
      <view class="text-gray-600 flex-1">
        应付：
        <text class="text-[#ff4d4f] font-semibold text-lg">¥{{ totalSelectedAmount }}</text>
      </view>
      <uve-button type="primary" @click="submit">提交订单</uve-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/store/cart"
import { getAddressListApi, type AddressDTO } from "@/api/address"
import { createOrderApi } from "@/api/order"

const cart = useCartStore()
const { items, totalSelectedAmount } = storeToRefs(cart)
const selectedItems = computed(() => items.value.filter((i) => i.selected))

const address = ref<AddressDTO | null>(null)

const chooseAddress = () => {
  uni.navigateTo({ url: "/pages-sub/address/index" })
}

const loadDefaultAddress = async () => {
  const res = await getAddressListApi()
  const list = (res as any).data ?? []
  address.value = list.find((i: AddressDTO) => i.isDefault) ?? list[0] ?? null
}

const submit = async () => {
  if (!address.value) {
    uni.showToast({ title: "请选择地址", icon: "none" })
    return
  }
  const itemsPayload = selectedItems.value.map((i) => ({ skuId: i.skuId, quantity: i.quantity }))
  const res = await createOrderApi({ addressId: address.value.id, items: itemsPayload })
  const orderId = (res as any).data?.orderId
  if (orderId) {
    uni.showToast({ title: "下单成功", icon: "success" })
    cart.clear()
    setTimeout(() => {
      uni.navigateTo({ url: `/pages-sub/order/index` })
    }, 600)
  }
}

onMounted(loadDefaultAddress)
</script>
