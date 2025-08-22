<template>
  <view class="min-h-screen bg-gray-100">
    <view class="p-4">
      <uve-button type="primary" class="w-full" @click="toEdit()">新增地址</uve-button>
    </view>
    <view class="px-4 space-y-3">
      <view class="bg-white rounded-2xl shadow-sm" v-for="item in list" :key="item.id">
        <view class="p-4">
          <view class="flex justify-between items-start mb-2">
            <view class="flex-1">
              <view class="flex items-center mb-1">
                <text class="text-gray-800 font-medium">{{ item.receiver }}</text>
                <text class="text-gray-600 ml-3">{{ item.phone }}</text>
              </view>
              <view class="text-gray-600 text-sm leading-5">
                {{ item.province }}{{ item.city }}{{ item.district }} {{ item.detail }}
              </view>
            </view>
            <view v-if="item.isDefault" class="ml-2">
              <text class="text-xs bg-[#06f] text-white px-2 py-1 rounded-full">默认</text>
            </view>
          </view>
        </view>
        <view class="flex justify-end px-4 pb-4 border-t border-gray-50">
          <text class="text-[#06f] mr-6" @click="toEdit(item.id)">编辑</text>
          <text class="text-red-500" @click="remove(item.id)">删除</text>
        </view>
      </view>
    </view>
    <view v-if="!list.length" class="text-center text-gray-400 py-10">暂无地址</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getAddressListApi, deleteAddressApi, type AddressDTO } from "@/api/address"

const list = ref<AddressDTO[]>([])

const load = async () => {
  const res = await getAddressListApi()
  list.value = (res as any).data ?? []
}

const toEdit = (id?: string) => {
  const query = id ? `?id=${id}` : ""
  uni.navigateTo({ url: `/pages-sub/address-edit/index${query}` })
}

const remove = async (id: string) => {
  await deleteAddressApi(id)
  uni.showToast({ title: "已删除", icon: "none" })
  load()
}

onMounted(load)
</script>
