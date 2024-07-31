import { CustomRequestOptions } from "@/interceptors/request"
import { useUserStore } from "@/store"
export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<ZJResult<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: "json",
      // #ifndef MP-WEIXIN
      responseType: "json",
      // #endif
      // 响应成功
      success(res) {
        const userStore = useUserStore()
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if ((res.data as ZJResult<T>).success) {
            // 2.1 提取核心数据 res.data
            resolve(res.data as ZJResult<T>)
          } else {
            uni.showToast({
              icon: "none",
              title: (res.data as ZJResult<T>).msg || "请求错误",
              duration: 5000,
            })
            const loginAuthCode = ["000100202", "000100203"]
            if (loginAuthCode.includes((res.data as ZJResult<T>).code)) {
              userStore.clearUserInfo()
              uni.setStorageSync("driverInfo", {})
              setTimeout(() => {
                uni.navigateTo({ url: "/pages/login/index" })
              }, 2000)
            }
            reject(res.data)
          }
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          userStore.clearUserInfo()
          uni.setStorageSync("driverInfo", {})
          uni.navigateTo({ url: "/pages/login/index" })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast &&
            uni.showToast({
              icon: "none",
              title: (res.data as ZJResult<T>).msg || "请求错误",
              duration: 5000,
            })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误，换个网络试试",
          duration: 5000,
        })
        reject(err)
        console.error("出参：", err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: "GET",
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: "POST",
  })
}

http.get = httpGet
http.post = httpPost
