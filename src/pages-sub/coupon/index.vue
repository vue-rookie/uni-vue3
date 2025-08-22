<template>
  <view class="min-h-screen bg-gray-100 p-4 space-y-3">
    <view
      v-for="c in list"
      :key="c.id"
      class="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] rounded-2xl p-4 shadow-sm"
    >
      <view class="flex justify-between items-center">
        <view class="flex-1">
          <view class="text-white font-semibold text-lg">{{ c.title }}</view>
          <view class="text-white text-sm opacity-90 mt-1">{{ c.desc }}</view>
        </view>
        <uve-button
          type="primary"
          size="small"
          class="bg-white text-[#ff6b6b] border-white"
          @click="receive(c.id)"
        >
          领取
        </uve-button>
      </view>
    </view>
    <view v-if="!list.length" class="text-center text-gray-400 py-10">暂无优惠券</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getCouponsApi, receiveCouponApi, type CouponDTO } from "@/api/coupon"

const list = ref<CouponDTO[]>([])

const load = async () => {
  const res = await getCouponsApi()
  list.value = (res as any).data ?? []
}

const receive = async (id: string) => {
  await receiveCouponApi(id)
  uni.showToast({ title: "已领取", icon: "success" })
}

onMounted(load)
</script>
