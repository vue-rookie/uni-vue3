<template>
  <view class="min-h-screen bg-white">
    <!-- 自定义导航栏 -->
    <uve-navbar
      :title="'发现'"
      :fixed="true"
      :border="false"
      :show-back="false"
      title-color="text-gray-800"
    >
      <template #right>
        <view class="flex items-center pr-4">
          <text class="i-ri-search-line text-gray-800 text-xl"></text>
        </view>
      </template>
    </uve-navbar>

    <!-- 顶部城市选择 -->
    <view class="flex items-center px-4 py-2 bg-white border-b border-gray-100">
      <view class="flex items-center">
        <text class="text-gray-800 font-medium mr-1">太原</text>
        <text class="i-ri-arrow-down-s-line text-gray-500"></text>
      </view>
      <view class="flex-1 flex justify-center">
        <view class="flex items-center space-x-12">
          <text class="text-gray-800 font-medium">推荐</text>
          <text class="text-gray-500">团购</text>
          <text class="text-gray-500">直播</text>
          <text class="text-gray-500">商城</text>
          <text class="text-gray-500">关注</text>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="h-[calc(100vh-180px)]">
      <!-- 轮播图 -->
      <uve-swiper
        :items="banners"
        height="320rpx"
        :show-indicator="true"
        :custom-indicator="true"
        :autoplay="true"
        :interval="3000"
        :circular="true"
      ></uve-swiper>

      <!-- 城市热门话题 -->
      <view class="p-4 border-b border-gray-100">
        <view class="flex items-center justify-between mb-4">
          <text class="text-lg font-medium text-gray-800">热门话题</text>
          <view class="flex items-center">
            <text class="text-sm text-gray-500">更多</text>
            <text class="i-ri-arrow-right-s-line text-gray-500"></text>
          </view>
        </view>

        <view class="grid grid-cols-2 gap-4">
          <view
            v-for="(topic, index) in hotTopics"
            :key="index"
            class="bg-gray-50 rounded-lg p-3"
            @click="navigateToTopic(topic)"
          >
            <view class="flex items-start">
              <image :src="topic.image" class="w-16 h-16 rounded-lg mr-3" mode="aspectFill"></image>
              <view class="flex-1">
                <text class="text-gray-800 font-medium mb-1 line-clamp-2">{{ topic.title }}</text>
                <text class="text-gray-500 text-xs">{{ topic.views }}次浏览</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 推荐视频 -->
      <view class="p-4">
        <view class="flex items-center justify-between mb-4">
          <text class="text-lg font-medium text-gray-800">推荐视频</text>
          <view class="flex items-center">
            <text class="text-sm text-gray-500">更多</text>
            <text class="i-ri-arrow-right-s-line text-gray-500"></text>
          </view>
        </view>

        <view class="grid grid-cols-2 gap-3">
          <view
            v-for="(video, index) in recommendVideos"
            :key="index"
            class="mb-4"
            @click="openVideoDetail(video)"
          >
            <view class="relative rounded-lg overflow-hidden mb-2">
              <image
                :src="video.cover"
                class="w-full aspect-video object-cover"
                mode="aspectFill"
              ></image>
              <view class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1 py-0.5">
                <text class="text-white text-xs">{{ formatDuration(video.duration) }}</text>
              </view>
            </view>
            <text class="text-gray-800 text-sm line-clamp-2 mb-1">{{ video.title }}</text>
            <view class="flex items-center">
              <image
                :src="video.authorAvatar"
                class="w-5 h-5 rounded-full mr-1"
                mode="aspectFill"
              ></image>
              <text class="text-gray-500 text-xs">{{ video.author }}</text>
              <text class="text-gray-400 text-xs mx-1">·</text>
              <text class="text-gray-500 text-xs">{{ formatCount(video.views) }}次观看</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 附近商家 -->
      <view class="p-4 border-t border-gray-100">
        <view class="flex items-center justify-between mb-4">
          <text class="text-lg font-medium text-gray-800">附近商家</text>
          <view class="flex items-center">
            <text class="text-sm text-gray-500">查看全部</text>
            <text class="i-ri-arrow-right-s-line text-gray-500"></text>
          </view>
        </view>

        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="inline-flex space-x-4">
            <view
              v-for="(shop, index) in nearbyShops"
              :key="index"
              class="w-40"
              @click="navigateToShop(shop)"
            >
              <image :src="shop.image" class="w-40 h-24 rounded-lg mb-2" mode="aspectFill"></image>
              <text class="text-gray-800 text-sm font-medium line-clamp-1">{{ shop.name }}</text>
              <view class="flex items-center">
                <text class="text-yellow-500 text-xs mr-1">{{ shop.rating }}分</text>
                <text class="text-gray-500 text-xs">{{ shop.category }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 本地活动 -->
      <view class="p-4 border-t border-gray-100">
        <view class="flex items-center justify-between mb-4">
          <text class="text-lg font-medium text-gray-800">本地活动</text>
          <view class="flex items-center">
            <text class="text-sm text-gray-500">更多</text>
            <text class="i-ri-arrow-right-s-line text-gray-500"></text>
          </view>
        </view>

        <view class="space-y-4">
          <view
            v-for="(event, index) in localEvents"
            :key="index"
            class="flex"
            @click="navigateToEvent(event)"
          >
            <image :src="event.image" class="w-24 h-16 rounded-lg mr-3" mode="aspectFill"></image>
            <view class="flex-1">
              <text class="text-gray-800 font-medium mb-1 line-clamp-2">{{ event.title }}</text>
              <view class="flex items-center">
                <text class="text-gray-500 text-xs">{{ event.time }}</text>
                <text class="text-gray-400 text-xs mx-1">·</text>
                <text class="text-gray-500 text-xs">{{ event.location }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 自定义底部导航栏 -->
  <uve-tabbar :current="1" :tab-list="tabList" @change="handleTabbarChange" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import UveTabbar from "@/components/uve-tabbar/index.vue"
import { defaultTabList, type TabItem } from "@/config/tabbar.config"

// 底部导航栏数据
const tabList = ref<TabItem[]>(defaultTabList)

// 轮播图数据
const banners = ref([
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2019/12/11/21/18/landscape-4689328_1280.jpg",
    title: "探索太原美食",
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2020/07/22/08/39/market-5428999_1280.jpg",
    title: "本地特色市场",
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2018/01/01/01/56/yoga-3053488_1280.jpg",
    title: "周末健身活动",
  },
])

// 热门话题
const hotTopics = ref([
  {
    id: 101,
    title: "太原美食探店指南，本地人都推荐这几家店",
    image: "https://cdn.pixabay.com/photo/2017/12/10/14/47/piza-3010062_1280.jpg",
    views: 1253000,
  },
  {
    id: 102,
    title: "太原周末好去处，这些地方你去过几个？",
    image: "https://cdn.pixabay.com/photo/2016/01/19/17/57/car-1149997_1280.jpg",
    views: 890000,
  },
  {
    id: 103,
    title: "太原最美夜景打卡地，拍照绝美",
    image: "https://cdn.pixabay.com/photo/2017/08/24/03/41/night-scene-2675753_1280.jpg",
    views: 765000,
  },
  {
    id: 104,
    title: "太原本地人带你玩转古城，深度体验晋商文化",
    image: "https://cdn.pixabay.com/photo/2019/06/25/04/01/architecture-4297419_1280.jpg",
    views: 543000,
  },
])

// 推荐视频
const recommendVideos = ref([
  {
    id: 201,
    title: "太原美食探店 | 这家小店的臊子面太好吃了，本地人都排队",
    cover: "https://cdn.pixabay.com/photo/2020/03/21/11/17/burger-4953465_1280.jpg",
    duration: 180,
    author: "美食达人",
    authorAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    views: 125000,
  },
  {
    id: 202,
    title: "太原周边游 | 这个小众景点太美了，人少景美还免费",
    cover: "https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_1280.jpg",
    duration: 240,
    author: "旅行日记",
    authorAvatar: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
    views: 89000,
  },
  {
    id: 203,
    title: "太原最新网红打卡地，拍照超好看",
    cover: "https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014619_1280.jpg",
    duration: 165,
    author: "城市探索",
    authorAvatar: "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
    views: 76000,
  },
  {
    id: 204,
    title: "太原夜生活指南，这些地方太适合周末放松了",
    cover: "https://cdn.pixabay.com/photo/2015/05/15/14/22/concert-768722_1280.jpg",
    duration: 210,
    author: "夜太原",
    authorAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    views: 54000,
  },
])

// 附近商家
const nearbyShops = ref([
  {
    id: 301,
    name: "老马家臊子面",
    image: "https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_1280.jpg",
    rating: 4.8,
    category: "面食",
  },
  {
    id: 302,
    name: "山西老醋坊",
    image: "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg",
    rating: 4.7,
    category: "特产",
  },
  {
    id: 303,
    name: "太原小吃汇",
    image: "https://cdn.pixabay.com/photo/2019/01/29/18/05/burger-3962996_1280.jpg",
    rating: 4.9,
    category: "小吃",
  },
  {
    id: 304,
    name: "晋味餐厅",
    image: "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-rice-690526_1280.jpg",
    rating: 4.6,
    category: "晋菜",
  },
])

// 本地活动
const localEvents = ref([
  {
    id: 401,
    title: "太原市第三届美食文化节",
    image: "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg",
    time: "本周六 09:00-18:00",
    location: "太原市迎泽公园",
  },
  {
    id: 402,
    title: "2023太原夏季音乐节",
    image: "https://cdn.pixabay.com/photo/2016/11/22/19/15/audience-1850119_1280.jpg",
    time: "6月15日-6月17日",
    location: "太原体育中心",
  },
  {
    id: 403,
    title: "太原古城文化体验活动",
    image: "https://cdn.pixabay.com/photo/2019/06/25/04/01/architecture-4297419_1280.jpg",
    time: "每周末 10:00-16:00",
    location: "太原古城墙遗址公园",
  },
])

// 格式化数字
const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 10000) return (count / 1000).toFixed(1) + "k"
  return (count / 10000).toFixed(1) + "w"
}

// 格式化视频时长
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

// 导航到话题页面
const navigateToTopic = (topic: any) => {
  uni.navigateTo({
    url: `/pages-sub/topic-detail/index?id=${topic.id}`,
  })
}

// 打开视频详情
const openVideoDetail = (video: any) => {
  uni.navigateTo({
    url: `/pages-sub/video-detail/index?id=${video.id}`,
  })
}

// 导航到商家页面
const navigateToShop = (shop: any) => {
  uni.navigateTo({
    url: `/pages-sub/shop-detail/index?id=${shop.id}`,
  })
}

// 导航到活动页面
const navigateToEvent = (event: any) => {
  uni.navigateTo({
    url: `/pages-sub/event-detail/index?id=${event.id}`,
  })
}

// 处理底部导航栏切换
const handleTabbarChange = (index: number, item: any) => {
  console.log("切换到:", item.text, item.path)
}
</script>
