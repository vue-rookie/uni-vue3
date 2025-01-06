<template>
  <view>
    <view v-for="(layout, layoutId) in body.bodyList" :key="layoutId" :class="body.classNames">
      <view :class="layout.classNames">
        <up-swiper
          :list="dataListMap[layout.dataField]"
          indicator
          indicatorMode="dot"
          v-if="layout.componentType === 'UpSwiper'"
        ></up-swiper>
      </view>
      <view :class="layout.classNames" v-if="layout.componentType === 'UpCard'">
        <up-card
          :title="card.title"
          v-for="(card, cardId) in dataListMap[layout.dataField]"
          :key="cardId"
        >
          <template #body>
            <view class="" @click.stop="handleClick(card)">
              <view class="flex justify-between items-center" v-if="card.content">
                <view :class="layout.contentClassNames">
                  {{ card.content }}
                </view>
                <image
                  src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
                  mode="aspectFill"
                  class="w-15 h-15"
                ></image>
              </view>
              <view class="flex justify-between items-center" v-if="card.subContent">
                <view :class="layout.subContentClassName">
                  {{ card.subContent }}
                </view>
                <image
                  src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
                  mode="aspectFill"
                  class="w-10 h-10"
                ></image>
              </view>
            </view>
          </template>
          <template #foot v-if="card.btns?.length">
            <view class="flex justify-end">
              <up-button
                type="primary"
                @click.stop="handleClick(btn, card)"
                v-for="(btn, btnId) in card.btn"
                :key="btnId"
              >
                {{ btn.name }}
              </up-button>
            </view>
          </template>
        </up-card>
      </view>
      <view v-if="layout.componentType === 'UpList'">
        <up-list>
          <up-list-item v-for="(list, listId) in dataListMap[layout.dataField]" :key="listId">
            <up-cell :title="`列表长度-${listId + 1}`">
              <template #icon>
                <up-avatar
                  shape="square"
                  size="35"
                  :src="list.url"
                  customStyle="margin: -3px 5px -3px 0"
                ></up-avatar>
              </template>
            </up-cell>
          </up-list-item>
        </up-list>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import pageConfig from "@/config/style.config"
import { useApi } from "@/hooks/useApi"
const { body } = pageConfig.layoutEnum?.indexPage || {}
const { sendBatchRequest, dataListMap, sendSpecifyRequest } = useApi()
onLoad(async (option) => {
  const params = option
  console.log(params)
  await sendBatchRequest(body.bodyList)
})
const handleClick = (btn, card) => {
  switch (btn.type) {
    case "view":
      uni.navigateTo({
        url: `/pages-sub/cardDetail/index?id=${card.id}`,
      })
      break
    case "submit":
      try {
        sendSpecifyRequest(card.id, card.body)
        uni.showToast({
          title: "提交成功",
          icon: "none",
        })
      } catch (error) {
        uni.showToast({
          title: error.msg,
          icon: "none",
        })
      }
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped></style>
