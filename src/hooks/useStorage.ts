import { ref, watch } from "vue"

/**
 * 存储hooks，提供本地存储相关功能
 * - 数据持久化
 * - 同步读写
 * - 失效时间
 * - 自动JSON转换
 */
export const useStorage = () => {
  /**
   * 设置本地存储
   * @param key 存储键名
   * @param data 存储数据
   * @param expires 过期时间（毫秒），可选
   */
  const setStorage = <T>(key: string, data: T, expires?: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 构建存储对象
      const storageData: any = {
        data,
        // 记录当前时间戳
        createTime: Date.now(),
      }

      // 如果设置了过期时间，则添加过期时间戳
      if (expires) {
        storageData.expires = Date.now() + expires
      }

      try {
        // 转换为JSON字符串
        const dataString = JSON.stringify(storageData)

        // 存储数据
        uni.setStorage({
          key,
          data: dataString,
          success: () => resolve(),
          fail: (err) => reject(err),
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 获取本地存储
   * @param key 存储键名
   * @param defaultValue 默认值，如果存储不存在或已过期，则返回默认值
   */
  const getStorage = <T>(key: string, defaultValue?: T): Promise<T | undefined> => {
    return new Promise((resolve) => {
      uni.getStorage({
        key,
        success: (res) => {
          try {
            // 解析JSON数据
            const storageData = JSON.parse(res.data as string)

            // 检查是否设置了过期时间且已过期
            if (storageData.expires && Date.now() > storageData.expires) {
              // 已过期，移除存储并返回默认值
              removeStorage(key)
              resolve(defaultValue)
            } else {
              // 返回数据
              resolve(storageData.data as T)
            }
          } catch (error) {
            // 解析错误，返回原始数据
            resolve(res.data as unknown as T)
          }
        },
        fail: () => {
          // 获取失败，返回默认值
          resolve(defaultValue)
        },
      })
    })
  }

  /**
   * 同步获取本地存储（不推荐，但某些场景可能需要）
   * @param key 存储键名
   * @param defaultValue 默认值，如果存储不存在或已过期，则返回默认值
   */
  const getStorageSync = <T>(key: string, defaultValue?: T): T | undefined => {
    try {
      const data = uni.getStorageSync(key)
      if (!data) return defaultValue

      try {
        // 解析JSON数据
        const storageData = JSON.parse(data as string)

        // 检查是否设置了过期时间且已过期
        if (storageData.expires && Date.now() > storageData.expires) {
          // 已过期，移除存储并返回默认值
          removeStorageSync(key)
          return defaultValue
        } else {
          // 返回数据
          return storageData.data as T
        }
      } catch (error) {
        // 解析错误，返回原始数据
        return data as unknown as T
      }
    } catch (error) {
      return defaultValue
    }
  }

  /**
   * 移除本地存储
   * @param key 存储键名
   */
  const removeStorage = (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key,
        success: () => resolve(),
        fail: (err) => reject(err),
      })
    })
  }

  /**
   * 同步移除本地存储
   * @param key 存储键名
   */
  const removeStorageSync = (key: string): void => {
    try {
      uni.removeStorageSync(key)
    } catch (error) {
      console.error(`移除存储失败: ${key}`, error)
    }
  }

  /**
   * 清空所有本地存储
   */
  const clearStorage = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        uni.clearStorage()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 同步清空所有本地存储
   */
  const clearStorageSync = (): void => {
    try {
      uni.clearStorageSync()
    } catch (error) {
      console.error("清空存储失败", error)
    }
  }

  /**
   * 获取本地存储信息
   */
  const getStorageInfo = (): Promise<UniApp.GetStorageInfoSuccess> => {
    return new Promise((resolve, reject) => {
      uni.getStorageInfo({
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      })
    })
  }

  /**
   * 创建响应式存储
   * @param key 存储键名
   * @param initialValue 初始值
   * @param expires 过期时间（毫秒），可选
   */
  const createReactiveStorage = <T>(key: string, initialValue: T, expires?: number) => {
    // 创建响应式数据
    const storedValue = ref<T>(initialValue)

    // 初始化时从存储中加载数据
    getStorage<T>(key, initialValue).then((value) => {
      if (value !== undefined) {
        storedValue.value = value as any
      }
    })

    // 监听值变化，自动同步到存储
    watch(
      storedValue,
      (newValue) => {
        setStorage(key, newValue, expires)
      },
      { deep: true },
    )

    return storedValue
  }

  return {
    setStorage,
    getStorage,
    getStorageSync,
    removeStorage,
    removeStorageSync,
    clearStorage,
    clearStorageSync,
    getStorageInfo,
    createReactiveStorage,
  }
}
