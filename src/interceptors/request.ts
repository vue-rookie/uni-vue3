/* eslint-disable no-param-reassign */
import qs from "qs"
import { useUserStore } from "@/store"
import { platform } from "@/utils/platform"
import { setAuthHeaders } from "@/utils/auth"
export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  hideErrorToast?: boolean
} & IUniUploadFileOptions

const baseUrl = import.meta.env.VITE_SERVER_BASEURL
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (options.url.includes("?")) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }
    }

    // 非 http 开头需拼接地址
    if (!options.url.startsWith("http")) {
      // #ifdef H5
      if (JSON.parse(__VITE_APP_PROXY__)) {
        options.url = import.meta.env.VITE_APP_PROXY_PREFIX + options.url
      }
      // #endif
      // #ifndef H5
      options.url = baseUrl + options.url
      // #endif
    }
    // 1. 请求超时
    options.timeout = 10000 // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      platform, // 可选，与 uniapp 定义的平台一致，告诉后台来源
      ...options.header,
    }
    const userStore = useUserStore()
    const { token } = userStore.userInfo as unknown as IUserInfo
    if (token) {
      options.header = {
        ...options.header,
        ...setAuthHeaders(),
      }
    }
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor("request", httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor("uploadFile", httpInterceptor)
  },
}
