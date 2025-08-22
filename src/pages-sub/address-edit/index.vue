<template>
  <view class="min-h-screen bg-white p-4">
    <uve-form :model="form" ref="formRef">
      <uve-form-item label="收货人">
        <uve-input v-model="form.receiver" placeholder="请输入收货人" />
      </uve-form-item>
      <uve-form-item label="手机号">
        <uve-input v-model="form.phone" type="number" placeholder="请输入手机号" />
      </uve-form-item>
      <uve-form-item label="省市区">
        <uve-input v-model="area" placeholder="请选择省市区" readonly @click="pickArea" />
      </uve-form-item>
      <uve-form-item label="详细地址">
        <uve-input v-model="form.detail" type="textarea" placeholder="街道楼栋门牌" />
      </uve-form-item>
      <uve-form-item>
        <view class="flex items-center">
          <uve-checkbox v-model="form.isDefault">设为默认</uve-checkbox>
        </view>
      </uve-form-item>
    </uve-form>
    <view class="mt-6">
      <uve-button type="primary" block @click="save">保存</uve-button>
    </view>
    <uve-picker ref="pickerRef" :columns="columns" @confirm="onPick" />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { saveAddressApi, getAddressListApi, type AddressDTO } from "@/api/address"

const formRef = ref()
const pickerRef = ref()
const area = ref("")
const form = reactive<Partial<AddressDTO>>({})

const columns = ref<string[][]>([
  ["省A", "省B"],
  ["市A", "市B"],
  ["区A", "区B"],
])

const pickArea = () => {
  pickerRef.value?.open()
}
const onPick = ({ selectedValues }) => {
  const [p, c, d] = selectedValues
  area.value = `${p}${c}${d}`
  form.province = p
  form.city = c
  form.district = d
}

const save = async () => {
  await saveAddressApi(form)
  uni.showToast({ title: "已保存", icon: "success" })
  setTimeout(() => uni.navigateBack(), 800)
}

onMounted(async () => {
  const pages = getCurrentPages()
  const curr = pages[pages.length - 1] as any
  const id = curr.options?.id
  if (id) {
    const list = (await getAddressListApi()).data as AddressDTO[]
    const found = list.find((i) => i.id === id)
    if (found) {
      Object.assign(form, found)
      area.value = `${found.province}${found.city}${found.district}`
    }
  }
})
</script>
