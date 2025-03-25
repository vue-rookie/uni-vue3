import { onMounted, onUnmounted } from "vue"

// 定义事件回调类型
type EventCallback = (result: any) => void

/**
 * 事件处理hooks
 * - 监听事件
 * - 移除事件
 * - 触发事件
 */
export const useEvent = () => {
  // 存储事件处理函数
  const listeners: Record<string, EventCallback[]> = {}

  /**
   * 监听事件
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  const on = (eventName: string, callback: EventCallback) => {
    if (!listeners[eventName]) {
      listeners[eventName] = []
    }

    listeners[eventName].push(callback)
    uni.$on(eventName, callback)
  }

  /**
   * 移除事件监听
   * @param eventName 事件名称
   * @param callback 可选，回调函数。如果不提供，则移除该事件的所有监听
   */
  const off = (eventName: string, callback?: EventCallback) => {
    // 如果没有提供回调，移除该事件的所有监听
    if (!callback) {
      const callbacks = listeners[eventName] || []
      callbacks.forEach((cb) => {
        uni.$off(eventName, cb)
      })

      listeners[eventName] = []
      return
    }

    // 移除特定回调
    uni.$off(eventName, callback)

    // 从存储中移除
    if (listeners[eventName]) {
      const index = listeners[eventName].indexOf(callback)
      if (index !== -1) {
        listeners[eventName].splice(index, 1)
      }
    }
  }

  /**
   * 触发一次事件监听后自动移除
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  const once = (eventName: string, callback: EventCallback) => {
    const onceCallback: EventCallback = (result) => {
      callback(result)
      off(eventName, onceCallback)
    }

    on(eventName, onceCallback)
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 参数
   */
  const emit = (eventName: string, ...args: any[]) => {
    uni.$emit(eventName, ...args)
  }

  /**
   * 监听小程序页面显示事件
   * @param callback 回调函数
   */
  const onPageShow = (callback: EventCallback) => {
    on("onShow", callback)
  }

  /**
   * 监听小程序页面隐藏事件
   * @param callback 回调函数
   */
  const onPageHide = (callback: EventCallback) => {
    on("onHide", callback)
  }

  /**
   * 监听网络状态变化
   * @param callback 回调函数
   */
  const onNetworkStatusChange = (callback: (res: UniApp.OnNetworkStatusChangeSuccess) => void) => {
    uni.onNetworkStatusChange(callback)

    // 返回一个函数用于取消监听
    return () => uni.offNetworkStatusChange(callback)
  }

  /**
   * 监听加速度数据
   * @param callback 回调函数
   * @param options 选项
   */
  const onAccelerometerChange = (
    callback: (res: UniApp.OnAccelerometerChangeSuccess) => void,
    options: UniApp.StartAccelerometerOptions = { interval: "normal" },
  ) => {
    // 开始监听
    uni.startAccelerometer(options)
    uni.onAccelerometerChange(callback)

    // 返回一个函数用于取消监听
    return () => {
      uni.offAccelerometerChange(callback)
      uni.stopAccelerometer()
    }
  }

  /**
   * 监听罗盘数据
   * @param callback 回调函数
   */
  const onCompassChange = (callback: (res: UniApp.OnCompassChangeSuccess) => void) => {
    // 开始监听
    uni.startCompass()
    uni.onCompassChange(callback)

    // 返回一个函数用于取消监听
    return () => {
      uni.offCompassChange(callback)
      uni.stopCompass()
    }
  }

  // 组件卸载时自动清理事件
  onUnmounted(() => {
    // 清理所有注册的事件
    Object.keys(listeners).forEach((eventName) => {
      listeners[eventName].forEach((callback) => {
        uni.$off(eventName, callback)
      })
    })
  })

  return {
    on,
    off,
    once,
    emit,
    onPageShow,
    onPageHide,
    onNetworkStatusChange,
    onAccelerometerChange,
    onCompassChange,
  }
}
