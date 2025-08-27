import { CustomRequestOptions } from "@/interceptors/request"
import { useUserStore } from "@/store"

// 认证失败的错误码
const AUTH_FAILURE_CODES = ["202", "203", "401", "403"] as const

// 请求配置
const REQUEST_CONFIG = {
  timeout: 10000,
  dataType: "json" as const,
  // #ifndef MP-WEIXIN
  responseType: "json" as const,
  // #endif
} as const

// 错误消息配置
const ERROR_MESSAGES = {
  network: "网络连接失败，请检查网络设置",
  timeout: "请求超时，请稍后再试",
  server: "服务器错误，请稍后再试",
  unknown: "请求失败，请稍后再试",
  auth: "登录已过期，请重新登录",
} as const

/**
 * 处理认证失败
 */
const handleAuthFailure = () => {
  const userStore = useUserStore()
  userStore.clearUserInfo()
  uni.removeStorageSync("userInfo")
  setTimeout(() => {
    uni.navigateTo({ url: "/pages/login/index" })
  }, 100)
}

/**
 * 显示错误提示
 */
const showErrorToast = (message: string, duration = 3000) => {
  uni.showToast({
    icon: "none",
    title: message,
    duration,
  })
}

/**
 * 处理HTTP状态码
 */
const handleHttpStatus = <T>(
  statusCode: number,
  result: ApiResult<T>,
  options: CustomRequestOptions,
): ApiResult<T> => {
  if (statusCode >= 200 && statusCode < 300) {
    return result
  }

  if (statusCode === 401) {
    handleAuthFailure()
    throw new Error(ERROR_MESSAGES.auth)
  }

  if (statusCode >= 500) {
    throw new Error(ERROR_MESSAGES.server)
  }

  if (statusCode === 408 || statusCode === 504) {
    throw new Error(ERROR_MESSAGES.timeout)
  }

  throw new Error(result.msg || ERROR_MESSAGES.unknown)
}

/**
 * 处理业务逻辑错误
 */
const handleBusinessError = <T>(result: ApiResult<T>, options: CustomRequestOptions): never => {
  const errorMessage = result.msg || "请求错误"

  // 显示错误提示（除非明确隐藏）
  if (!options.hideErrorToast) {
    showErrorToast(errorMessage)
  }

  // 处理认证失败
  if (AUTH_FAILURE_CODES.includes(result.code as any)) {
    handleAuthFailure()
  }

  throw new Error(errorMessage)
}

/**
 * 通用请求方法
 * @param options 请求配置
 * @returns Promise<ApiResult<T>>
 */
export const request = async <T>(options: CustomRequestOptions): Promise<ApiResult<T>> => {
  const { url, method = "GET", timeout, ...restOptions } = options

  try {
    const res = await uni.request({
      url,
      method,
      timeout: timeout || REQUEST_CONFIG.timeout,
      dataType: REQUEST_CONFIG.dataType,
      // #ifndef MP-WEIXIN
      responseType: REQUEST_CONFIG.responseType,
      // #endif
      ...restOptions,
    })

    const { statusCode, data } = res

    if (!data) {
      throw new Error(ERROR_MESSAGES.unknown)
    }

    const result = data as ApiResult<T>

    // 处理HTTP状态码
    if (!result.success) {
      handleBusinessError(result, options)
    }

    return handleHttpStatus(statusCode, result, options)
  } catch (error) {
    console.error("请求失败:", {
      url,
      method,
      error: error instanceof Error ? error.message : error,
    })

    // 处理不同类型的错误
    let errorMessage: string = ERROR_MESSAGES.unknown

    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        errorMessage = ERROR_MESSAGES.timeout
      } else if (error.message.includes("network")) {
        errorMessage = ERROR_MESSAGES.network
      } else if (error.message.includes("登录已过期")) {
        errorMessage = ERROR_MESSAGES.auth
      } else {
        errorMessage = error.message
      }
    }

    // 显示错误提示
    if (!options.hideErrorToast) {
      showErrorToast(errorMessage)
    }

    throw error
  }
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 */
export const requestGet = <T>(url: string, query?: Record<string, any>) => {
  return request<T>({
    url,
    query,
    method: "GET",
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数
 */
export const requestPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return request<T>({
    url,
    query,
    data,
    method: "POST",
  })
}

request.get = requestGet
request.post = requestPost
