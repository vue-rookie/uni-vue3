import { ref, reactive } from "vue"

// 分享配置接口
interface ShareOptions {
  title?: string
  path?: string
  imageUrl?: string
  desc?: string
  summary?: string
  href?: string
  content?: string
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: () => void
}

// 默认分享配置
const defaultShareOptions: ShareOptions = {
  title: "",
  path: "",
  imageUrl: "",
  desc: "",
  summary: "",
  href: "",
  content: "",
}

/**
 * 分享hooks，提供统一的分享功能
 * - 设置全局分享
 * - 分享到微信好友
 * - 分享到朋友圈
 * - 分享到微博
 * - 系统分享
 * - 复制链接
 */
export const useShare = (globalOptions: ShareOptions = {}) => {
  // 全局分享配置
  const shareOptions = reactive<ShareOptions>({ ...defaultShareOptions, ...globalOptions })

  // 分享状态
  const isSharing = ref(false)

  /**
   * 更新全局分享配置
   * @param options 分享配置
   */
  const updateShareOptions = (options: ShareOptions) => {
    Object.assign(shareOptions, options)
  }

  /**
   * 重置全局分享配置
   */
  const resetShareOptions = () => {
    Object.assign(shareOptions, defaultShareOptions)
  }

  /**
   * 分享到微信好友
   * @param options 分享配置，会覆盖全局配置
   */
  const shareToWechat = (options: ShareOptions = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true

    return new Promise<void>((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        if (!plus || !plus.share) {
          throw new Error("plus.share不存在")
        }

        const shareService = plus.share.getServices((services) => {
          const wechatService = services.find((s) => s.id === "weixin")

          if (!wechatService) {
            const error = new Error("未找到微信分享服务")
            finalOptions.fail && finalOptions.fail(error)
            reject(error)
            return
          }

          wechatService.send(
            {
              title: finalOptions.title,
              content: finalOptions.desc || finalOptions.content,
              href: finalOptions.href,
              pictures: [finalOptions.imageUrl],
              thumbs: [finalOptions.imageUrl],
              extra: { scene: "WXSceneSession" }, // 微信好友
            },
            () => {
              finalOptions.success && finalOptions.success({ errMsg: "shareToWechat:ok" })
              resolve()
            },
            (err) => {
              finalOptions.fail && finalOptions.fail(err)
              reject(err)
            },
          )
        })

        if (typeof shareService === "object") {
          // getServices 同步返回
          const error = new Error("获取分享服务失败")
          finalOptions.fail && finalOptions.fail(error)
          reject(error)
        }
      } catch (error) {
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } finally {
        isSharing.value = false
        finalOptions.complete && finalOptions.complete()
      }
      // #endif

      // #ifdef MP-WEIXIN
      // 小程序不需要主动调用分享，在页面的onShareAppMessage中处理
      finalOptions.success && finalOptions.success({ errMsg: "shareToWechat:ok" })
      resolve()
      // #endif

      // #ifdef H5
      try {
        const error = new Error("H5环境不支持直接调用微信分享，请使用微信JS-SDK")
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } catch (error) {
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } finally {
        isSharing.value = false
        finalOptions.complete && finalOptions.complete()
      }
      // #endif
    })
  }

  /**
   * 分享到朋友圈
   * @param options 分享配置，会覆盖全局配置
   */
  const shareToTimeline = (options: ShareOptions = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true

    return new Promise<void>((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        if (!plus || !plus.share) {
          throw new Error("plus.share不存在")
        }

        const shareService = plus.share.getServices((services) => {
          const wechatService = services.find((s) => s.id === "weixin")

          if (!wechatService) {
            const error = new Error("未找到微信分享服务")
            finalOptions.fail && finalOptions.fail(error)
            reject(error)
            return
          }

          wechatService.send(
            {
              title: finalOptions.title,
              content: finalOptions.desc || finalOptions.content,
              href: finalOptions.href,
              pictures: [finalOptions.imageUrl],
              thumbs: [finalOptions.imageUrl],
              extra: { scene: "WXSceneTimeline" }, // 朋友圈
            },
            () => {
              finalOptions.success && finalOptions.success({ errMsg: "shareToTimeline:ok" })
              resolve()
            },
            (err) => {
              finalOptions.fail && finalOptions.fail(err)
              reject(err)
            },
          )
        })

        if (typeof shareService === "object") {
          // getServices 同步返回
          const error = new Error("获取分享服务失败")
          finalOptions.fail && finalOptions.fail(error)
          reject(error)
        }
      } catch (error) {
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } finally {
        isSharing.value = false
        finalOptions.complete && finalOptions.complete()
      }
      // #endif

      // #ifdef MP-WEIXIN
      // 小程序不支持直接分享到朋友圈
      const error = new Error("小程序环境不支持直接分享到朋友圈")
      finalOptions.fail && finalOptions.fail(error)
      reject(error)
      // #endif

      // #ifdef H5
      try {
        const error = new Error("H5环境不支持直接调用微信分享，请使用微信JS-SDK")
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } catch (error) {
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } finally {
        isSharing.value = false
        finalOptions.complete && finalOptions.complete()
      }
      // #endif
    })
  }

  /**
   * 系统分享
   * @param options 分享配置，会覆盖全局配置
   */
  const shareWithSystem = (options: ShareOptions = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true

    return new Promise<void>((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        uni.share({
          provider: "system",
          type: 0, // 图文
          title: finalOptions.title,
          scene: "WXSceneSession",
          summary: finalOptions.desc || finalOptions.summary,
          imageUrl: finalOptions.imageUrl,
          href: finalOptions.href,
          success: (res) => {
            finalOptions.success && finalOptions.success(res)
            resolve()
          },
          fail: (err) => {
            finalOptions.fail && finalOptions.fail(err)
            reject(err)
          },
          complete: () => {
            isSharing.value = false
            finalOptions.complete && finalOptions.complete()
          },
        })
      } catch (error) {
        isSharing.value = false
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      }
      // #endif

      // #ifndef APP-PLUS
      try {
        const error = new Error("当前平台不支持系统分享")
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } catch (error) {
        finalOptions.fail && finalOptions.fail(error)
        reject(error)
      } finally {
        isSharing.value = false
        finalOptions.complete && finalOptions.complete()
      }
      // #endif
    })
  }

  /**
   * 复制链接
   * @param content 要复制的内容，默认使用全局配置的href
   */
  const copyLink = (content?: string) => {
    const textToCopy = content || shareOptions.href

    if (!textToCopy) {
      return Promise.reject(new Error("没有可复制的链接"))
    }

    return new Promise<void>((resolve, reject) => {
      uni.setClipboardData({
        data: textToCopy,
        success: () => {
          uni.showToast({
            title: "链接已复制",
            icon: "success",
          })
          resolve()
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  /**
   * 设置全局分享参数（用于小程序全局分享）
   * @returns 返回全局分享配置对象，可在页面的onShareAppMessage中使用
   */
  const getShareInfo = () => {
    return {
      title: shareOptions.title,
      path: shareOptions.path,
      imageUrl: shareOptions.imageUrl,
    }
  }

  return {
    // 状态
    shareOptions,
    isSharing,

    // 方法
    updateShareOptions,
    resetShareOptions,
    shareToWechat,
    shareToTimeline,
    shareWithSystem,
    copyLink,
    getShareInfo,
  }
}
