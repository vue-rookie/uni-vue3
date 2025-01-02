<template>
  <view>
    <view v-for="(layout, index) in body.bodyList" :key="index" :class="body.classNames">
      <view :class="layout.classNames">
        <up-swiper
          :list="dataListMap[layout.dataField]"
          indicator
          indicatorMode="dot"
          v-if="layout.componentType === 'UpSwiper'"
        ></up-swiper>
      </view>
      <view :class="layout.classNames" v-if="layout.componentType === 'UpCard'">
        <up-card title="card标题">
          <template #body>
            <view class="">
              <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
                <view class="u-body-item-title u-line-2">
                  瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半
                </view>
                <image
                  src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
                  mode="aspectFill"
                ></image>
              </view>
              <view class="u-body-item u-flex u-row-between u-p-b-0">
                <view class="u-body-item-title u-line-2">
                  釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放
                </view>
                <image
                  src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
                  mode="aspectFill"
                ></image>
              </view>
            </view>
          </template>
          <template #foot>
            <view>
              <up-icon name="chat-fill" size="34" color="" label="30评论"></up-icon>
            </view>
          </template>
        </up-card>
      </view>
      <view v-if="layout.componentType === 'UpList'">
        <up-list>
          <up-list-item v-for="(item, index) in dataListMap[layout.dataField]" :key="index">
            <up-cell :title="`列表长度-${index + 1}`">
              <template #icon>
                <up-avatar
                  shape="square"
                  size="35"
                  :src="item.url"
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
import pageConfig from "@/config/style.config.json"
import { useApi } from "../hooks/useApi"
const { body } = pageConfig.layoutEnum?.indexPage || {}
const { getDataS, dataListMap } = useApi()
onLoad(async () => {
  await getDataS(body.bodyList)
  console.log(dataListMap)
})
</script>

<style lang="scss" scoped>
.u-body-item {
  padding: 20rpx 10rpx;
  font-size: 32rpx;
  color: #333;
}

.u-body-item image {
  flex: 0 0 120rpx;
  width: 120rpx;
  height: 120rpx;
  margin-left: 12rpx;
  border-radius: 8rpx;
}
</style>
