<template>
  <view class="min-h-screen bg-black">
    <!-- 自定义导航栏 -->
    <uve-navbar
      title="创建"
      :fixed="true"
      :border="false"
      :show-back="true"
      title-color="text-white"
      background-color="transparent"
    >
      <template #right>
        <view class="flex items-center pr-4">
          <text class="text-white text-base" @click="nextStep">下一步</text>
        </view>
      </template>
    </uve-navbar>

    <!-- 相机预览区域 -->
    <view class="camera-container h-[60vh] flex items-center justify-center">
      <!-- 相机组件 -->
      <view v-if="!previewUrl" class="w-full h-full relative">
        <camera
          v-if="cameraType === 'camera'"
          class="w-full h-full"
          :device-position="devicePosition"
          flash="off"
          @error="handleCameraError"
        ></camera>
        <live-pusher
          v-else
          id="livePusher"
          ref="livePusher"
          class="w-full h-full"
          :url="livePusherUrl"
          mode="FHD"
          :beauty="1"
          :whiteness="2"
          aspect="9:16"
          min-bitrate="1000"
          audio-quality="high"
          :waiting-image="waitingImage"
          :waiting-image-hash="waitingImageHash"
          :zoom="false"
          :device-position="devicePosition"
          :auto-focus="true"
          :beauty-style="'smooth'"
          @statechange="handleStateChange"
          @error="handleLiveError"
        ></live-pusher>

        <!-- 录制中指示器 -->
        <view v-if="isRecording" class="absolute top-4 left-4 flex items-center">
          <view class="w-3 h-3 rounded-full bg-red-500 mr-2"></view>
          <text class="text-white">{{ formatDuration(recordDuration) }}</text>
        </view>

        <!-- 顶部功能按钮 -->
        <view class="absolute top-4 right-4 flex items-center space-x-4">
          <view
            class="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
            @click="toggleFlash"
          >
            <text class="i-ri-flashlight-line text-white text-xl"></text>
          </view>
          <view
            class="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
            @click="toggleSpeed"
          >
            <text class="text-white text-sm font-medium">{{ speedText }}</text>
          </view>
          <view
            class="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
            @click="toggleBeauty"
          >
            <text class="i-ri-magic-line text-white text-xl"></text>
          </view>
          <view
            class="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
            @click="toggleFilter"
          >
            <text class="i-ri-filter-3-line text-white text-xl"></text>
          </view>
        </view>
      </view>

      <!-- 视频预览 -->
      <video
        v-if="previewUrl"
        :src="previewUrl"
        class="w-full h-full"
        :controls="false"
        :loop="true"
        :autoplay="true"
        object-fit="contain"
      ></video>
    </view>

    <!-- 底部控制区域 -->
    <view class="fixed bottom-0 left-0 right-0 pb-8 px-4">
      <!-- 音乐选择区 -->
      <view class="flex items-center justify-between mb-6">
        <view class="flex-1"></view>
        <view class="flex items-center" @click="selectMusic">
          <text class="i-ri-music-2-line text-white text-xl mr-2"></text>
          <text class="text-white">添加音乐</text>
        </view>
        <view class="flex-1"></view>
      </view>

      <!-- 拍摄类型选择 -->
      <view class="flex items-center justify-center space-x-8 mb-6">
        <view
          class="flex flex-col items-center"
          :class="{ 'opacity-100': cameraType === 'camera', 'opacity-50': cameraType !== 'camera' }"
          @click="setCameraType('camera')"
        >
          <text class="text-white text-base mb-1">相机</text>
          <view
            class="w-1 h-1 rounded-full"
            :class="{ 'bg-white': cameraType === 'camera' }"
          ></view>
        </view>
        <view
          class="flex flex-col items-center"
          :class="{ 'opacity-100': cameraType === 'live', 'opacity-50': cameraType !== 'live' }"
          @click="setCameraType('live')"
        >
          <text class="text-white text-base mb-1">直播</text>
          <view class="w-1 h-1 rounded-full" :class="{ 'bg-white': cameraType === 'live' }"></view>
        </view>
      </view>

      <!-- 拍摄控制区 -->
      <view class="flex items-center justify-between">
        <!-- 左侧 - 相册选择 -->
        <view class="w-16 h-16 rounded-lg overflow-hidden" @click="selectFromAlbum">
          <image
            v-if="albumCover"
            :src="albumCover"
            class="w-full h-full"
            mode="aspectFill"
          ></image>
          <view v-else class="w-full h-full bg-gray-700 flex items-center justify-center">
            <text class="i-ri-image-line text-white text-2xl"></text>
          </view>
        </view>

        <!-- 中间 - 拍摄按钮 -->
        <view class="relative">
          <view
            class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
            @touchstart="startRecording"
            @touchend="stopRecording"
          >
            <view
              class="w-16 h-16 rounded-full"
              :class="isRecording ? 'bg-red-500' : 'bg-white'"
            ></view>
          </view>
        </view>

        <!-- 右侧 - 翻转相机 -->
        <view class="w-16 h-16 flex items-center justify-center" @click="toggleCameraPosition">
          <text class="i-ri-camera-switch-line text-white text-3xl"></text>
        </view>
      </view>
    </view>

    <!-- 美颜面板 -->
    <view
      v-if="showBeautyPanel"
      class="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 rounded-t-lg"
    >
      <view class="flex justify-between items-center mb-4">
        <text class="text-white text-lg">美颜设置</text>
        <text class="i-ri-close-line text-white text-xl" @click="toggleBeauty"></text>
      </view>

      <view class="mb-4">
        <text class="text-white mb-2">美颜</text>
        <slider
          :value="beautyLevel * 10"
          min="0"
          max="10"
          show-value
          block-color="#ffffff"
          active-color="#ff4d4f"
          @change="onBeautyChange"
        />
      </view>

      <view class="mb-4">
        <text class="text-white mb-2">美白</text>
        <slider
          :value="whitenessLevel * 10"
          min="0"
          max="10"
          show-value
          block-color="#ffffff"
          active-color="#ff4d4f"
          @change="onWhitenessChange"
        />
      </view>
    </view>

    <!-- 滤镜面板 -->
    <view
      v-if="showFilterPanel"
      class="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 rounded-t-lg"
    >
      <view class="flex justify-between items-center mb-4">
        <text class="text-white text-lg">滤镜</text>
        <text class="i-ri-close-line text-white text-xl" @click="toggleFilter"></text>
      </view>

      <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
        <view class="inline-flex space-x-4 py-2">
          <view
            v-for="(filter, index) in filters"
            :key="index"
            class="flex flex-col items-center"
            @click="selectFilter(filter)"
          >
            <view
              class="w-16 h-16 rounded-lg mb-2 overflow-hidden"
              :class="{ 'border-2 border-red-500': currentFilter === filter.name }"
            >
              <image
                src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_1280.jpg"
                class="w-full h-full"
                :style="{ filter: filter.style }"
                mode="aspectFill"
              ></image>
            </view>
            <text class="text-white text-xs">{{ filter.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>

  <!-- 自定义底部导航栏 -->
  <uve-tabbar :current="2" :tab-list="tabList" @change="handleTabbarChange" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import UveTabbar from "@/components/uve-tabbar/index.vue"
import { defaultTabList, type TabItem } from "@/config/tabbar.config"

// 底部导航栏数据
const tabList = ref<TabItem[]>(defaultTabList)

// 相机类型：普通相机或直播推流
const cameraType = ref("camera")
// 相机朝向：前置或后置
const devicePosition = ref("back")
// 闪光灯状态
const flashOn = ref(false)
// 录制状态
const isRecording = ref(false)
// 录制时长（秒）
const recordDuration = ref(0)
// 录制计时器
const recordTimer = ref<number | null>(null)
// 视频预览URL
const previewUrl = ref("")
// 相册封面图
const albumCover = ref("")
// 直播推流地址
const livePusherUrl = ref("")
// 直播等待图片
const waitingImage = ref("")
const waitingImageHash = ref("")
// 美颜面板显示状态
const showBeautyPanel = ref(false)
// 滤镜面板显示状态
const showFilterPanel = ref(false)
// 美颜级别
const beautyLevel = ref(0.5)
// 美白级别
const whitenessLevel = ref(0.5)
// 当前滤镜
const currentFilter = ref("原始")
// 录制速度
const speedOptions = [0.5, 1, 2]
const currentSpeedIndex = ref(1)
const speedText = ref("1.0x")

// 滤镜列表
const filters = ref([
  { name: "原始", style: "none" },
  { name: "清新", style: "brightness(1.1) contrast(1.1) saturate(1.3)" },
  { name: "暖阳", style: "brightness(1.1) sepia(0.3)" },
  { name: "复古", style: "sepia(0.5) contrast(1.2)" },
  { name: "冷色", style: "brightness(1.1) saturate(1.1) hue-rotate(180deg)" },
  { name: "黑白", style: "grayscale(1)" },
])

// 设置相机类型
const setCameraType = (type: string) => {
  cameraType.value = type
}

// 切换相机前后置
const toggleCameraPosition = () => {
  devicePosition.value = devicePosition.value === "front" ? "back" : "front"
}

// 切换闪光灯
const toggleFlash = () => {
  flashOn.value = !flashOn.value
  // 实际控制闪光灯的代码，在真实设备上需要调用相机API
}

// 切换速度
const toggleSpeed = () => {
  currentSpeedIndex.value = (currentSpeedIndex.value + 1) % speedOptions.length
  const speed = speedOptions[currentSpeedIndex.value]
  speedText.value = `${speed.toFixed(1)}x`
}

// 切换美颜面板
const toggleBeauty = () => {
  showBeautyPanel.value = !showBeautyPanel.value
  if (showBeautyPanel.value) {
    showFilterPanel.value = false
  }
}

// 切换滤镜面板
const toggleFilter = () => {
  showFilterPanel.value = !showFilterPanel.value
  if (showFilterPanel.value) {
    showBeautyPanel.value = false
  }
}

// 选择滤镜
const selectFilter = (filter: any) => {
  currentFilter.value = filter.name
  // 实际应用滤镜的代码
}

// 美颜级别变化
const onBeautyChange = (e: any) => {
  beautyLevel.value = e.detail.value / 10
  // 实际应用美颜的代码
}

// 美白级别变化
const onWhitenessChange = (e: any) => {
  whitenessLevel.value = e.detail.value / 10
  // 实际应用美白的代码
}

// 开始录制
const startRecording = () => {
  if (isRecording.value) return

  isRecording.value = true
  recordDuration.value = 0

  // 开始计时
  recordTimer.value = setInterval(() => {
    recordDuration.value++

    // 最大录制时长限制（60秒）
    if (recordDuration.value >= 60) {
      stopRecording()
    }
  }, 1000) as unknown as number

  // 实际开始录制的代码
  // 在真实设备上需要调用相机API
}

// 停止录制
const stopRecording = () => {
  if (!isRecording.value) return

  isRecording.value = false

  // 停止计时
  if (recordTimer.value) {
    clearInterval(recordTimer.value)
    recordTimer.value = null
  }

  // 模拟生成预览URL
  setTimeout(() => {
    previewUrl.value =
      "https://cdn.pixabay.com/vimeo/328340526/38097-1.mp4?width=1280&hash=e2a1cc45a5f0e2c0f6e3d3d7c3f9d6e8b5b2b3b3"
  }, 500)

  // 实际停止录制的代码
  // 在真实设备上需要调用相机API
}

// 从相册选择
const selectFromAlbum = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ["video", "image"],
    sourceType: ["album"],
    maxDuration: 60,
    camera: "back",
    success: (res) => {
      const tempFile = res.tempFiles[0]

      // 如果是视频
      if (tempFile.fileType === "video") {
        previewUrl.value = tempFile.tempFilePath
        albumCover.value = tempFile.thumbTempFilePath || ""
      }
      // 如果是图片
      else if (tempFile.fileType === "image") {
        albumCover.value = tempFile.tempFilePath
      }
    },
  })
}

// 选择音乐
const selectMusic = () => {
  uni.navigateTo({
    url: "/pages-sub/music-select/index",
  })
}

// 下一步
const nextStep = () => {
  if (!previewUrl.value) {
    uni.showToast({
      title: "请先录制或选择视频",
      icon: "none",
    })
    return
  }

  uni.navigateTo({
    url: `/pages-sub/publish-edit/index?videoUrl=${encodeURIComponent(previewUrl.value)}`,
  })
}

// 格式化时长
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

// 相机错误处理
const handleCameraError = (e: any) => {
  console.error("相机错误:", e)
  uni.showToast({
    title: "相机启动失败，请检查权限设置",
    icon: "none",
  })
}

// 直播状态变化处理
const handleStateChange = (e: any) => {
  console.log("直播状态变化:", e.detail)
}

// 直播错误处理
const handleLiveError = (e: any) => {
  console.error("直播错误:", e)
  uni.showToast({
    title: "直播启动失败，请检查网络和权限设置",
    icon: "none",
  })
}

// 组件卸载时清理
onUnmounted(() => {
  if (recordTimer.value) {
    clearInterval(recordTimer.value)
    recordTimer.value = null
  }
})

// 处理底部导航栏切换
const handleTabbarChange = (index: number, item: any) => {
  console.log("切换到:", item.text, item.path)
}
</script>

<style>
.camera-container {
  background-color: #000;
}
</style>
