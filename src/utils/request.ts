import { CustomRequestOptions } from "@/interceptors/request"
import { useUserStore } from "@/store"
import { mockRequest } from "@/utils/mock"

export const request = async <T>(options: CustomRequestOptions): Promise<ApiResult<T>> => {
  const userStore = useUserStore()

  const handleAuthFailure = () => {
    userStore.clearUserInfo()
    uni.removeStorageSync("userInfo")
    uni.navigateTo({ url: "/pages/login/index" })
  }

  try {
    // 开发环境 mock（命中则直接返回，否则走真实请求）
    const mock = await mockRequest<T>(options)
    const res = mock
      ? ({ statusCode: 200, data: mock } as any)
      : await uni.request({
          ...options,
          dataType: "json",
          // #ifndef MP-WEIXIN
          responseType: "json",
          // #endif
        })

    const { statusCode, data } = res
    const result = data as ApiResult<T>

    if (statusCode >= 200 && statusCode < 300) {
      if (result.success) {
        return result
      } else {
        uni.showToast({
          icon: "none",
          title: result.msg || "请求错误",
          duration: 5000,
        })

        const authFailureCodes = ["202", "203", "xxx"]
        if (authFailureCodes.includes(result.code)) {
          handleAuthFailure()
          setTimeout(() => {
            uni.navigateTo({ url: "/pages/login/index" })
          }, 2000)
        }
        throw result
      }
    } else if (statusCode === 401) {
      handleAuthFailure()
      throw res
    } else {
      if (!options.hideErrorToast) {
        uni.showToast({
          icon: "none",
          title: result.msg || "请求错误",
          duration: 5000,
        })
      }
      throw res
    }
  } catch (err) {
    console.error("请求失败:", err)
    uni.showToast({
      icon: "none",
      title: "请求失败，请稍后再试",
      duration: 5000,
    })
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
