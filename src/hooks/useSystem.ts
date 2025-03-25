import { ref, onMounted, onUnmounted } from "vue"

interface SystemInfo extends UniApp.GetSystemInfoResult {
  // 扩展其他可能的系统信息
  [key: string]: any
}

interface BatteryInfo {
  level: number
  isCharging: boolean
}

/**
 * 系统hooks，提供系统相关API和状态
 * - 获取系统信息
 * - 监听网络状态
 * - 设备方向
 * - 电池状态
 * - 剪贴板
 */
export const useSystem = () => {
  // 系统信息
  const systemInfo = ref<SystemInfo | null>(null)

  // 网络状态
  const networkType = ref<string>("")
  const isConnected = ref<boolean>(true)

  // 设备方向
  const deviceOrientation = ref<"portrait" | "landscape">("portrait")

  // 电池信息
  const batteryInfo = ref<BatteryInfo | null>(null)

  // 剪贴板内容
  const clipboardData = ref<string>("")

  /**
   * 获取系统信息
   */
  const getSystemInfo = () => {
    try {
      const info = uni.getSystemInfoSync()
      systemInfo.value = info
      return info
    } catch (error) {
      console.error("获取系统信息失败", error)
      return null
    }
  }

  /**
   * 获取设备方向
   */
  const getDeviceOrientation = () => {
    // #ifdef H5
    if (window.screen && window.screen.orientation) {
      const angle = window.screen.orientation.angle
      deviceOrientation.value = angle === 0 || angle === 180 ? "portrait" : "landscape"
    } else if (window.orientation !== undefined) {
      const angle = window.orientation as number
      deviceOrientation.value = angle === 0 || angle === 180 ? "portrait" : "landscape"
    }
    // #endif

    // #ifndef H5
    // 对于非H5平台，从系统信息推断
    const info = systemInfo.value || getSystemInfo()
    if (info) {
      deviceOrientation.value = info.windowWidth > info.windowHeight ? "landscape" : "portrait"
    }
    // #endif

    return deviceOrientation.value
  }

  /**
   * 获取电池信息
   */
  const getBatteryInfo = () => {
    return new Promise<BatteryInfo>((resolve, reject) => {
      uni.getBatteryInfo({
        success: (res) => {
          batteryInfo.value = res
          resolve(res)
        },
        fail: (err) => {
          console.error("获取电池信息失败", err)
          reject(err)
        },
      })
    })
  }

  /**
   * 获取网络类型
   */
  const getNetworkType = () => {
    return new Promise<string>((resolve, reject) => {
      uni.getNetworkType({
        success: (res) => {
          networkType.value = res.networkType
          isConnected.value = res.networkType !== "none"
          resolve(res.networkType)
        },
        fail: (err) => {
          console.error("获取网络类型失败", err)
          reject(err)
        },
      })
    })
  }

  /**
   * 获取剪贴板内容
   */
  const getClipboardData = () => {
    return new Promise<string>((resolve, reject) => {
      uni.getClipboardData({
        success: (res) => {
          clipboardData.value = res.data
          resolve(res.data)
        },
        fail: (err) => {
          console.error("获取剪贴板内容失败", err)
          reject(err)
        },
      })
    })
  }

  /**
   * 设置剪贴板内容
   * @param data 要设置的内容
   */
  const setClipboardData = (data: string) => {
    return new Promise<void>((resolve, reject) => {
      uni.setClipboardData({
        data,
        success: () => {
          clipboardData.value = data
          resolve()
        },
        fail: (err) => {
          console.error("设置剪贴板内容失败", err)
          reject(err)
        },
      })
    })
  }

  /**
   * 监听网络状态变化
   * @param callback 网络状态变化回调
   */
  const onNetworkStatusChange = (callback?: (res: UniApp.OnNetworkStatusChangeSuccess) => void) => {
    const handler = (res: UniApp.OnNetworkStatusChangeSuccess) => {
      networkType.value = res.networkType
      isConnected.value = res.isConnected
      callback && callback(res)
    }

    uni.onNetworkStatusChange(handler)

    // 返回清理函数
    return () => {
      uni.offNetworkStatusChange(handler)
    }
  }

  /**
   * 振动设备
   * @param options 振动选项
   */
  const vibrate = (options: { long?: boolean } = {}) => {
    const { long = false } = options

    return new Promise<void>((resolve, reject) => {
      if (long) {
        uni.vibrateLong({
          success: () => resolve(),
          fail: (err) => {
            console.error("长振动失败", err)
            reject(err)
          },
        })
      } else {
        uni.vibrateShort({
          success: () => resolve(),
          fail: (err) => {
            console.error("短振动失败", err)
            reject(err)
          },
        })
      }
    })
  }

  /**
   * 获取屏幕亮度
   */
  const getScreenBrightness = () => {
    return new Promise<number>((resolve, reject) => {
      uni.getScreenBrightness({
        success: (res) => resolve(res.value),
        fail: (err) => {
          console.error("获取屏幕亮度失败", err)
          reject(err)
        },
      })
    })
  }

  /**
   * 设置屏幕亮度
   * @param value 亮度值 0-1
   */
  const setScreenBrightness = (value: number) => {
    if (value < 0 || value > 1) {
      console.warn("亮度值必须在0-1之间")
      value = Math.max(0, Math.min(1, value))
    }

    return new Promise<void>((resolve, reject) => {
      uni.setScreenBrightness({
        value,
        success: () => resolve(),
        fail: (err) => {
          console.error("设置屏幕亮度失败", err)
          reject(err)
        },
      })
    })
  }

  // 组件挂载时初始化
  onMounted(() => {
    // 获取初始系统信息
    getSystemInfo()

    // 获取网络状态
    getNetworkType().catch(() => {})

    // 监听网络状态变化
    const cleanupNetwork = onNetworkStatusChange()

    // 注册清理函数
    onUnmounted(() => {
      // 清理网络状态监听
      cleanupNetwork && cleanupNetwork()
    })
  })

  // 返回暴露的方法和状态
  return {
    // 状态
    systemInfo,
    networkType,
    isConnected,
    deviceOrientation,
    batteryInfo,
    clipboardData,

    // 方法
    getSystemInfo,
    getDeviceOrientation,
    getBatteryInfo,
    getNetworkType,
    getClipboardData,
    setClipboardData,
    onNetworkStatusChange,
    vibrate,
    getScreenBrightness,
    setScreenBrightness,
  }
}
