import { ref, reactive } from "vue"

const defaultShareOptions = {
  title: "",
  path: "",
  imageUrl: "",
  desc: "",
  summary: "",
  href: "",
  content: "",
}

export const useShare = (globalOptions = {}) => {
  const shareOptions = reactive({ ...defaultShareOptions, ...globalOptions })
  const isSharing = ref(false)

  const updateShareOptions = (options) => Object.assign(shareOptions, options)
  const resetShareOptions = () => Object.assign(shareOptions, defaultShareOptions)

  const shareToWechat = (options = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true
    return new Promise((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        if (!plus || !plus.share) throw new Error("plus.share不存在")
        const shareService = plus.share.getServices((services) => {
          const wechatService = (services || []).find((s) => String(s?.id).includes("weixin"))
          if (!wechatService) {
            const error = new Error("未找到微信分享服务")
            finalOptions.fail && finalOptions.fail(error)
            return reject(error)
          }
          wechatService.send(
            {
              title: finalOptions.title,
              content: finalOptions.desc || finalOptions.content,
              href: finalOptions.href,
              pictures: [finalOptions.imageUrl],
              thumbs: [finalOptions.imageUrl],
              extra: { scene: "WXSceneSession" },
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

  const shareToTimeline = (options = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true
    return new Promise((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        if (!plus || !plus.share) throw new Error("plus.share不存在")
        const shareService = plus.share.getServices((services) => {
          const wechatService = (services || []).find((s) => String(s?.id).includes("weixin"))
          if (!wechatService) {
            const error = new Error("未找到微信分享服务")
            finalOptions.fail && finalOptions.fail(error)
            return reject(error)
          }
          wechatService.send(
            {
              title: finalOptions.title,
              content: finalOptions.desc || finalOptions.content,
              href: finalOptions.href,
              pictures: [finalOptions.imageUrl],
              thumbs: [finalOptions.imageUrl],
              extra: { scene: "WXSceneTimeline" },
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

  const shareWithSystem = (options = {}) => {
    const finalOptions = { ...shareOptions, ...options }
    isSharing.value = true
    return new Promise((resolve, reject) => {
      // #ifdef APP-PLUS
      try {
        ;(uni).share({
          provider: "system",
          type: 0,
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

  const copyLink = (content) => {
    const textToCopy = content || shareOptions.href
    if (!textToCopy) return Promise.reject(new Error("没有可复制的链接"))
    return new Promise((resolve, reject) => {
      uni.setClipboardData({
        data: textToCopy,
        success: () => {
          uni.showToast({ title: "链接已复制", icon: "success" })
          resolve()
        },
        fail: (err) => reject(err),
      })
    })
  }

  const getShareInfo = () => ({
    title: shareOptions.title,
    path: shareOptions.path,
    imageUrl: shareOptions.imageUrl,
  })

  return {
    shareOptions,
    isSharing,
    updateShareOptions,
    resetShareOptions,
    shareToWechat,
    shareToTimeline,
    shareWithSystem,
    copyLink,
    getShareInfo,
  }
}