<template>
  <view class="video-player relative w-full h-full" @click="togglePlayPause">
    <!-- 视频元素 -->
    <video
      :id="videoId"
      class="w-full h-full object-cover"
      :src="src"
      :poster="poster"
      :loop="loop"
      :controls="false"
      :show-center-play-btn="false"
      :enable-progress-gesture="false"
      :show-progress="false"
      :autoplay="isActive && autoplay"
      :muted="muted"
      :style="{ objectFit: objectFit }"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @error="handleError"
      @timeupdate="handleTimeUpdate"
    ></video>

    <!-- 播放/暂停按钮 -->
    <view
      v-if="showPlayBtn && !isPlaying"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-black bg-opacity-40"
    >
      <text class="text-white text-4xl i-ri-play-large-fill"></text>
    </view>

    <!-- 加载指示器 -->
    <view v-if="loading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <view
        class="loading-spinner w-12 h-12 border-4 border-white border-opacity-30 rounded-full border-t-white"
      ></view>
    </view>

    <!-- 进度条 -->
    <view v-if="showProgress" class="absolute bottom-0 left-0 w-full h-1 bg-gray-800 bg-opacity-40">
      <view class="h-full bg-white" :style="{ width: `${progressPercent}%` }"></view>
    </view>

    <!-- 视频信息层 -->
    <view class="absolute bottom-15 left-0 w-full p-4">
      <slot name="info"></slot>
    </view>

    <!-- 右侧操作按钮层 -->
    <view class="absolute right-2 bottom-20 flex flex-col items-center space-y-6">
      <slot name="actions"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue"

interface Props {
  src: string
  poster?: string
  videoId?: string
  loop?: boolean
  autoplay?: boolean
  muted?: boolean
  objectFit?: "contain" | "fill" | "cover"
  showPlayBtn?: boolean
  showProgress?: boolean
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  poster: "",
  videoId: "video-player",
  loop: true,
  autoplay: true,
  muted: false,
  objectFit: "cover",
  showPlayBtn: true,
  showProgress: false,
  isActive: false,
})

const emit = defineEmits<{
  (e: "play"): void
  (e: "pause"): void
  (e: "ended"): void
  (e: "error", error: any): void
  (e: "timeupdate", currentTime: number, duration: number): void
}>()

// 状态
const isPlaying = ref(false)
const loading = ref(true)
const currentTime = ref(0)
const duration = ref(0)
const videoContext = ref<any>(null)

// 计算进度百分比
const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 监听是否活跃状态
watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      play()
    } else {
      pause()
    }
  },
)

// 初始化视频上下文
onMounted(() => {
  videoContext.value = uni.createVideoContext(props.videoId)

  // 如果是活跃状态，自动播放
  if (props.isActive && props.autoplay) {
    setTimeout(() => {
      play()
    }, 100)
  }
})

// 播放视频
const play = () => {
  if (!videoContext.value) return
  videoContext.value.play()
  isPlaying.value = true
}

// 暂停视频
const pause = () => {
  if (!videoContext.value) return
  videoContext.value.pause()
  isPlaying.value = false
}

// 切换播放/暂停
const togglePlayPause = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

// 事件处理
const handlePlay = () => {
  isPlaying.value = true
  loading.value = false
  emit("play")
}

const handlePause = () => {
  isPlaying.value = false
  emit("pause")
}

const handleEnded = () => {
  isPlaying.value = false
  emit("ended")

  // 如果设置了循环播放，则重新开始
  if (props.loop) {
    play()
  }
}

const handleError = (e: any) => {
  loading.value = false
  isPlaying.value = false
  emit("error", e)
}

const handleTimeUpdate = (e: any) => {
  const { currentTime: time, duration: totalTime } = e.detail
  currentTime.value = time
  if (totalTime && totalTime > 0) {
    duration.value = totalTime
  }
  emit("timeupdate", time, duration.value)
}

// 暴露方法
defineExpose({
  play,
  pause,
  togglePlayPause,
})
</script>

<style>
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
