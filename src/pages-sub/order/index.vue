<template>
  <view class="min-h-screen bg-gray-100">
    <view class="bg-white">
      <uve-tabs :list="tabs" v-model="active" />
    </view>
    <view class="px-4 py-3 space-y-3">
      <view v-for="item in list" :key="item.orderId" class="bg-white rounded-2xl p-4 shadow-sm">
        <view class="flex justify-between items-start mb-3">
          <text class="text-gray-800 font-medium">订单号：{{ item.orderId }}</text>
          <view class="flex items-center">
            <text class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(item.status)">
              {{ getStatusText(item.status) }}
            </text>
          </view>
        </view>
        <view class="flex justify-between items-center">
          <view class="text-gray-600 text-sm">下单时间：{{ item.createdAt }}</view>
          <view class="text-right">
            <text class="text-[#ff4d4f] font-semibold text-lg">¥{{ item.amount }}</text>
          </view>
        </view>
      </view>
      <view v-if="!list.length" class="text-center text-gray-400 py-10">暂无订单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { getOrderListApi, type OrderItemDTO } from "@/api/order"

const tabs = [
  { name: "全部", value: "" },
  { name: "待支付", value: "UNPAID" },
  { name: "待发货", value: "PAID" },
  { name: "待收货", value: "SHIPPED" },
  { name: "已完成", value: "FINISHED" },
]
const active = ref(0)
const list = ref<OrderItemDTO[]>([])

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    UNPAID: "待支付",
    PAID: "待发货",
    SHIPPED: "待收货",
    FINISHED: "已完成",
  }
  return map[status] || status
}

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    UNPAID: "bg-orange-100 text-orange-600",
    PAID: "bg-blue-100 text-blue-600",
    SHIPPED: "bg-green-100 text-green-600",
    FINISHED: "bg-gray-100 text-gray-600",
  }
  return map[status] || "bg-gray-100 text-gray-600"
}

watchEffect(async () => {
  const status = tabs[active.value].value as string
  const { data } = await getOrderListApi({ page: 1, pageSize: 20, status })
  if ((data as any).success === false) return
  // data 已是 ApiResult
  list.value = (data as any).data?.list ?? []
})
</script>
