<template>
  <view class="p-4">
    <view
      class="flex justify-between items-center border-gray-300 border-b border-[1px] mb-4"
      v-for="(item, index) in dataListMap.cardDetailData?.detailData"
      :key="index"
    >
      <view class="min-w-100rpx text-[#5A6B8F]" v-if="item.key?.show">{{ item.key?.name }}</view>
      <view class="flex-1 ml-4 text-[#060B2D]" v-if="item.value?.type !== 'img'">
        {{ getValues(item.value?.value, item.value.options) }}
      </view>
      <view class="flex" v-else>
        <image :src="getValues(item.value?.value, item.value.options)" class="w-20 h-20" />
      </view>
    </view>
  </view>
</template>

<script setup>
import pageConfig from "@/config/style.config"
import { useApi } from "@/hooks/useApi"
const { body } = pageConfig.layoutEnum?.cardDetailPage || {}
const { sendBatchRequest, dataListMap } = useApi()
onLoad(async (option) => {
  await sendBatchRequest(body.bodyList, {
    cardParams: { id: option.id },
  })
})
const getValues = computed(() => {
  return (value, options) => {
    if (options) {
      return options.find((item) => item.value === value).label
    }
    return value
  }
})
</script>

<style lang="scss" scoped></style>
