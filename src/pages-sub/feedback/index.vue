<template>
  <view class="min-h-screen bg-white p-4">
    <uve-form :model="form">
      <uve-form-item label="类型">
        <uve-radio-group v-model="form.type">
          <uve-radio label="功能建议" value="suggest" />
          <uve-radio label="体验问题" value="issue" />
        </uve-radio-group>
      </uve-form-item>
      <uve-form-item label="内容">
        <uve-input v-model="form.content" type="textarea" placeholder="请描述您的问题或建议" />
      </uve-form-item>
      <uve-form-item label="联系方式">
        <uve-input v-model="form.contact" placeholder="选填，便于我们与您联系" />
      </uve-form-item>
    </uve-form>
    <view class="mt-6">
      <uve-button type="primary" block @click="submit">提交</uve-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const form = reactive({ type: "suggest", content: "", contact: "" })

const submit = () => {
  uni.showToast({ title: "已提交，感谢反馈", icon: "success" })
  setTimeout(() => uni.navigateBack(), 800)
}
</script>


