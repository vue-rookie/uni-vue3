import { ref, reactive } from "vue"

// 自定义请求选项
interface RequestOptions<T = any> {
  url?: string
  // 通用请求参数
  method?: UniApp.RequestOptions["method"]
  data?: UniApp.RequestOptions["data"]
  header?: UniApp.RequestOptions["header"]
  timeout?: UniApp.RequestOptions["timeout"]
  dataType?: UniApp.RequestOptions["dataType"]
  responseType?: UniApp.RequestOptions["responseType"]
  sslVerify?: UniApp.RequestOptions["sslVerify"]
  withCredentials?: UniApp.RequestOptions["withCredentials"]
  firstIpv4?: UniApp.RequestOptions["firstIpv4"]
  success?: UniApp.RequestOptions["success"]
  fail?: UniApp.RequestOptions["fail"]
  complete?: UniApp.RequestOptions["complete"]
  // 扩展选项
  autoHandleError?: boolean
  autoLoading?: boolean
  loadingText?: string
  isSuccess?: (data: T) => boolean
  showError?: (message: string) => void
}

interface RequestState<T = any> {
  // 是否加载中
  loading: boolean
  // 是否已完成请求
  done: boolean
  // 错误信息
  error: Error | null
  // 响应数据
  data: T | null
}

/**
 * 请求hooks，提供网络请求相关功能
 * - 加载状态管理
 * - 错误处理
 * - 自动显示loading
 * - 请求缓存
 */
export const useRequest = <T = any>(defaultOptions: RequestOptions = {}) => {
  // 默认配置
  const defaultRequestOptions: RequestOptions = {
    autoHandleError: true,
    autoLoading: true,
    loadingText: "加载中...",
    isSuccess: (response: any) => {
      // 默认判断条件，可根据实际业务调整
      return response && response.code === 0
    },
    showError: (message: string) => {
      uni.showToast({
        title: message || "请求失败",
        icon: "none",
      })
    },
  }

  // 合并默认配置
  const mergedOptions = { ...defaultRequestOptions, ...defaultOptions }

  // 请求状态
  const state = reactive<RequestState<T>>({
    loading: false,
    done: false,
    error: null,
    data: null,
  })

  // 发送请求
  const request = async (options: RequestOptions = {}) => {
    // 合并选项
    const requestOptions = { ...mergedOptions, ...options }

    // 自动显示加载
    if (requestOptions.autoLoading) {
      uni.showLoading({
        title: requestOptions.loadingText || "加载中...",
        mask: true,
      })
    }

    // 更新状态
    state.loading = true
    state.error = null

    try {
      return new Promise<T>((resolve, reject) => {
        // 将我们的自定义选项传递给uni.request，但排除非标准属性
        const {
          autoHandleError,
          autoLoading,
          loadingText,
          isSuccess,
          showError,
          ...uniRequestOptions
        } = requestOptions

        uni.request({
          ...(uniRequestOptions as UniApp.RequestOptions),
          success: (res: UniApp.RequestSuccessCallbackResult) => {
            // 处理响应
            const response = res.data as any

            // 判断请求是否成功
            const isSuccessful = requestOptions.isSuccess
              ? requestOptions.isSuccess(response)
              : true

            if (isSuccessful) {
              // 更新状态
              state.data = response as any
              state.done = true

              // 调用原始成功回调
              if (requestOptions.success) {
                requestOptions.success(res)
              }

              resolve(response)
            } else {
              // 请求虽然成功，但业务处理失败的情况
              const errorMessage = (response as any)?.message || "请求失败"
              const error = new Error(errorMessage)

              // 更新状态
              state.error = error
              state.done = true

              // 自动处理错误
              if (requestOptions.autoHandleError && requestOptions.showError) {
                requestOptions.showError(errorMessage)
              }

              // 调用原始失败回调
              if (requestOptions.fail) {
                requestOptions.fail({
                  errMsg: errorMessage,
                } as UniApp.GeneralCallbackResult)
              }

              reject(error)
            }
          },
          fail: (err: UniApp.GeneralCallbackResult) => {
            // 更新状态
            const error = new Error(err.errMsg)
            state.error = error
            state.done = true

            // 自动处理错误
            if (requestOptions.autoHandleError && requestOptions.showError) {
              requestOptions.showError(err.errMsg)
            }

            // 调用原始失败回调
            if (requestOptions.fail) {
              requestOptions.fail(err)
            }

            reject(error)
          },
          complete: (res: UniApp.GeneralCallbackResult) => {
            // 更新状态
            state.loading = false

            // 关闭加载
            if (requestOptions.autoLoading) {
              uni.hideLoading()
            }

            // 调用原始完成回调
            if (requestOptions.complete) {
              requestOptions.complete(res)
            }
          },
        })
      })
    } catch (error) {
      // 捕获请求过程中的异常
      state.loading = false
      state.error = error as Error
      state.done = true

      // 自动处理错误
      if (requestOptions.autoHandleError && requestOptions.showError) {
        requestOptions.showError((error as Error).message)
      }

      // 关闭加载
      if (requestOptions.autoLoading) {
        uni.hideLoading()
      }

      throw error
    }
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 请求选项
   */
  const get = <R = T>(url: string, data?: any, options: RequestOptions = {}) => {
    return request({
      url,
      data,
      method: "GET",
      ...options,
    }) as unknown as Promise<R>
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 请求选项
   */
  const post = <R = T>(url: string, data?: any, options: RequestOptions = {}) => {
    return request({
      url,
      data,
      method: "POST",
      ...options,
    }) as unknown as Promise<R>
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 请求选项
   */
  const put = <R = T>(url: string, data?: any, options: RequestOptions = {}) => {
    return request({
      url,
      data,
      method: "PUT",
      ...options,
    }) as unknown as Promise<R>
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 请求选项
   */
  const del = <R = T>(url: string, data?: any, options: RequestOptions = {}) => {
    return request({
      url,
      data,
      method: "DELETE",
      ...options,
    }) as unknown as Promise<R>
  }

  /**
   * 上传文件
   * @param options 上传选项
   */
  const upload = <R = any>(options: UniApp.UploadFileOption) => {
    return new Promise<R>((resolve, reject) => {
      const task = uni.uploadFile({
        ...options,
        success: (res) => {
          let data: R
          try {
            data = JSON.parse(res.data) as R
          } catch (e) {
            data = res.data as unknown as R
          }

          if (options.success) {
            options.success(res)
          }
          resolve(data)
        },
        fail: (err) => {
          if (options.fail) {
            options.fail(err)
          }
          reject(err)
        },
      })

      return task
    })
  }

  /**
   * 下载文件
   * @param options 下载选项
   */
  const download = (options: UniApp.DownloadFileOption) => {
    return new Promise<UniApp.DownloadSuccessData>((resolve, reject) => {
      const task = uni.downloadFile({
        ...options,
        success: (res) => {
          if (options.success) {
            options.success(res)
          }
          resolve(res)
        },
        fail: (err) => {
          if (options.fail) {
            options.fail(err)
          }
          reject(err)
        },
      })

      return task
    })
  }

  return {
    state,
    request,
    get,
    post,
    put,
    del,
    upload,
    download,
  }
}
