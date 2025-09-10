import { ref, computed, onUnmounted, watch, Ref, ComputedRef } from "vue"

export interface CountdownOptions {
  /** 倒计时总秒数 */
  totalSeconds?: number
  /** 是否自动开始 */
  autoStart?: boolean
  /** 更新间隔 (毫秒) */
  interval?: number
  /** 倒计时结束回调 */
  onFinish?: () => void
  /** 倒计时更新回调 */
  onTick?: (remainingSeconds: number, formattedTime: string) => void
}

export interface CountdownResult {
  /** 剩余秒数 */
  remainingSeconds: Ref<number>
  /** 格式化后的时间字符串 (MM:SS) */
  formattedTime: ComputedRef<string>
  /** 是否正在运行 */
  isRunning: Ref<boolean>
  /** 是否已结束 */
  isFinished: Ref<boolean>
  /** 开始倒计时 */
  start: () => void
  /** 停止倒计时 */
  stop: () => void
  /** 暂停倒计时 */
  pause: () => void
  /** 重置倒计时 */
  reset: (newTotalSeconds?: number) => void
  /** 增加时间 */
  addTime: (seconds: number) => void
  /** 减少时间 */
  subtractTime: (seconds: number) => void
}

/**
 * 倒计时Hook - 修复版
 * 提供可靠的倒计时功能，确保在UI中正确更新
 */
export function useCountdown(options: CountdownOptions = {}): CountdownResult {
  const { totalSeconds = 60, autoStart = false, interval = 1000, onFinish, onTick } = options

  // 响应式状态
  const remainingSeconds = ref(totalSeconds)
  const isRunning = ref(false)
  const isFinished = ref(false)
  const timerId = ref<number | null>(null)

  // 格式化时间
  const formattedTime = computed(() => {
    const minutes = Math.floor(remainingSeconds.value / 60)
    const seconds = remainingSeconds.value % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  })

  // 开始倒计时
  const start = () => {
    if (isRunning.value || remainingSeconds.value <= 0) return

    isRunning.value = true
    isFinished.value = false

    // 清除可能存在的定时器
    if (timerId.value !== null) {
      clearInterval(timerId.value)
    }

    // 创建新的定时器
    timerId.value = setInterval(() => {
      if (remainingSeconds.value <= 0) {
        stop()
        isFinished.value = true
        onFinish?.()
        return
      }

      // 减少1秒
      remainingSeconds.value--

      // 调用更新回调
      onTick?.(remainingSeconds.value, formattedTime.value)
    }, interval) as unknown as number
  }

  // 停止倒计时
  const stop = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
    isRunning.value = false
  }

  // 暂停倒计时
  const pause = () => {
    stop()
  }

  // 重置倒计时
  const reset = (newTotalSeconds?: number) => {
    stop()
    isFinished.value = false
    remainingSeconds.value = newTotalSeconds ?? totalSeconds
  }

  // 增加时间
  const addTime = (seconds: number) => {
    remainingSeconds.value += seconds
    if (isFinished.value && remainingSeconds.value > 0) {
      isFinished.value = false
      if (isRunning.value) {
        start() // 如果之前在运行，则重新开始
      }
    }
  }

  // 减少时间
  const subtractTime = (seconds: number) => {
    remainingSeconds.value = Math.max(0, remainingSeconds.value - seconds)
    if (remainingSeconds.value <= 0 && isRunning.value) {
      stop()
      isFinished.value = true
      onFinish?.()
    }
  }

  // 组件卸载时清理
  onUnmounted(() => {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  })

  // 自动开始
  if (autoStart) {
    start()
  }

  return {
    remainingSeconds,
    formattedTime,
    isRunning,
    isFinished,
    start,
    stop,
    pause,
    reset,
    addTime,
    subtractTime,
  }
}

/**
 * 创建一个自动开始的倒计时
 */
export function createCountdown(
  seconds: number,
  options?: Omit<CountdownOptions, "totalSeconds" | "autoStart">,
) {
  return useCountdownFixed({
    totalSeconds: seconds,
    autoStart: true,
    ...options,
  })
}
