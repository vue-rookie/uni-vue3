import { ref } from "vue"

// 相机拍照配置选项
interface CameraOptions {
  quality?: number
  sizeType?: ("original" | "compressed")[]
  sourceType?: ("album" | "camera")[]
  crop?: {
    quality?: number
    width?: number
    height?: number
    resize?: boolean
  }
  success?: (res: { tempFilePaths: string[]; tempFiles: any[] }) => void
  fail?: (err: any) => void
  complete?: () => void
}

// 图片预览配置
interface PreviewOptions {
  urls: string[]
  current?: number | string
  indicator?: "default" | "number" | "none"
  loop?: boolean
  longPressActions?: {
    itemList: string[]
    success?: (data: any) => void
    fail?: (err: any) => void
  }
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: () => void
}

/**
 * 相机hooks，提供拍照和图片处理功能
 * - 拍照
 * - 从相册选择
 * - 图片预览
 * - 图片上传
 * - 图片压缩
 */
export const useCamera = () => {
  // 当前选择的图片列表
  const imageList = ref<string[]>([])

  // 上传状态
  const isUploading = ref(false)

  // 压缩状态
  const isCompressing = ref(false)

  // 预览状态
  const isPreviewing = ref(false)

  /**
   * 拍照或从相册选择图片
   * @param options 拍照选项
   */
  const chooseImage = (options: CameraOptions = {}) => {
    const defaultOptions: CameraOptions = {
      quality: 80,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }

    const finalOptions = { ...defaultOptions, ...options }

    return new Promise<string[]>((resolve, reject) => {
      uni.chooseImage({
        count: 9,
        sizeType: finalOptions.sizeType,
        sourceType: finalOptions.sourceType,
        success: (res) => {
          // 更新图片列表
          const paths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
          imageList.value = [...imageList.value, ...paths]

          // 如果需要裁剪
          if (finalOptions.crop && paths.length > 0) {
            cropImage(paths[0], finalOptions.crop)
              .then((cropRes) => {
                finalOptions.success &&
                  finalOptions.success({
                    tempFilePaths: [cropRes],
                    tempFiles: [{ path: cropRes, size: 0 }],
                  })
                resolve([cropRes])
              })
              .catch((err) => {
                finalOptions.fail && finalOptions.fail(err)
                reject(err)
              })
          } else {
            finalOptions.success &&
              finalOptions.success({
                tempFilePaths: paths,
                tempFiles: paths.map((path) => ({ path, size: 0 })),
              })
            resolve(paths)
          }
        },
        fail: (err) => {
          finalOptions.fail && finalOptions.fail(err)
          reject(err)
        },
        complete: finalOptions.complete,
      })
    })
  }

  /**
   * 拍照
   * @param options 拍照选项
   */
  const takePhoto = (options: CameraOptions = {}) => {
    return chooseImage({
      ...options,
      sourceType: ["camera"],
    })
  }

  /**
   * 从相册选择
   * @param options 选择选项
   */
  const chooseFromAlbum = (options: CameraOptions = {}) => {
    return chooseImage({
      ...options,
      sourceType: ["album"],
    })
  }

  /**
   * 图片裁剪
   * @param imagePath 图片路径
   * @param options 裁剪选项
   */
  const cropImage = (imagePath: string, options: CameraOptions["crop"] = {}) => {
    // #ifdef APP-PLUS
    return new Promise<string>((resolve, reject) => {
      // 应用平台可以使用plus进行裁剪
      // 这里只是示例，实际实现可能需要根据实际情况调整
      uni.showLoading({ title: "裁剪中..." })

      try {
        // 实际上这里需要调用原生API进行裁剪
        // 这里简化处理，直接返回原图
        setTimeout(() => {
          uni.hideLoading()
          resolve(imagePath)
        }, 1000)
      } catch (error) {
        uni.hideLoading()
        reject(error)
      }
    })
  }

  /**
   * 预览图片
   * @param options 预览选项
   */
  const previewImage = (options: PreviewOptions) => {
    isPreviewing.value = true

    return new Promise<void>((resolve, reject) => {
      uni.previewImage({
        ...options,
        success: (res) => {
          options.success && options.success(res)
          resolve()
        },
        fail: (err) => {
          options.fail && options.fail(err)
          reject(err)
        },
        complete: () => {
          isPreviewing.value = false
          options.complete && options.complete()
        },
      })
    })
  }

  /**
   * 保存图片到相册
   * @param filePath 图片路径
   */
  const saveImageToAlbum = (filePath: string) => {
    return new Promise<void>((resolve, reject) => {
      uni.saveImageToPhotosAlbum({
        filePath,
        success: () => {
          uni.showToast({
            title: "保存成功",
            icon: "success",
          })
          resolve()
        },
        fail: (err) => {
          // 如果是用户拒绝授权
          if (err.errMsg.includes("auth")) {
            uni.showModal({
              title: "提示",
              content: "保存图片需要授权访问相册",
              confirmText: "去授权",
              success: (res) => {
                if (res.confirm) {
                  uni.openSetting({
                    success: (settingRes) => {
                      if (settingRes.authSetting["scope.writePhotosAlbum"]) {
                        // 用户已授权，重新保存
                        saveImageToAlbum(filePath).then(resolve).catch(reject)
                      } else {
                        reject(new Error("用户拒绝授权"))
                      }
                    },
                  })
                } else {
                  reject(new Error("用户取消授权"))
                }
              },
            })
          } else {
            uni.showToast({
              title: "保存失败",
              icon: "none",
            })
            reject(err)
          }
        },
      })
    })
  }

  /**
   * 压缩图片
   * @param filePath 图片路径
   * @param quality 压缩质量 0-100
   */
  const compressImage = (filePath: string, quality: number = 80) => {
    isCompressing.value = true

    return new Promise<string>((resolve, reject) => {
      uni.compressImage({
        src: filePath,
        quality,
        success: (res) => {
          resolve(res.tempFilePath)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
          isCompressing.value = false
        },
      })
    })
  }

  /**
   * 上传图片
   * @param filePath 图片路径
   * @param url 上传地址
   * @param formData 附加表单数据
   * @param name 文件字段名
   */
  const uploadImage = (
    filePath: string,
    url: string,
    formData: Record<string, any> = {},
    name: string = "file",
  ) => {
    isUploading.value = true

    return new Promise<any>((resolve, reject) => {
      uni.uploadFile({
        url,
        filePath,
        name,
        formData,
        success: (res) => {
          let data
          try {
            data = JSON.parse(res.data)
          } catch (e) {
            data = res.data
          }
          resolve(data)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
          isUploading.value = false
        },
      })
    })
  }

  /**
   * 批量上传图片
   * @param filePaths 图片路径数组
   * @param url 上传地址
   * @param formData 附加表单数据
   * @param name 文件字段名
   */
  const uploadImages = (
    filePaths: string[],
    url: string,
    formData: Record<string, any> = {},
    name: string = "file",
  ) => {
    isUploading.value = true

    const promises = filePaths.map((filePath) =>
      uploadImage(filePath, url, formData, name).catch((err) => {
        console.error(`上传失败: ${filePath}`, err)
        return { error: err, filePath }
      }),
    )

    return Promise.all(promises).finally(() => {
      isUploading.value = false
    })
  }

  /**
   * 获取图片信息
   * @param filePath 图片路径
   */
  const getImageInfo = (filePath: string) => {
    return new Promise<UniApp.GetImageInfoSuccessData>((resolve, reject) => {
      uni.getImageInfo({
        src: filePath,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  /**
   * 删除图片
   * @param index 要删除的图片索引
   */
  const removeImage = (index: number) => {
    if (index >= 0 && index < imageList.value.length) {
      imageList.value.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * 清空图片列表
   */
  const clearImages = () => {
    imageList.value = []
  }

  return {
    // 状态
    imageList,
    isUploading,
    isCompressing,
    isPreviewing,

    // 方法
    takePhoto,
    chooseImage,
    chooseFromAlbum,
    previewImage,
    saveImageToAlbum,
    compressImage,
    uploadImage,
    uploadImages,
    getImageInfo,
    removeImage,
    clearImages,
  }
}
