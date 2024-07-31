import { http } from "@/utils/http"
import { IMiniWxLoginParams, IMiniWxLoginRes } from "@/pages/login/types"
export interface LoginParams {
  systemCode: string
  appid: string
  loginCode: string
  telephoneCode: string
}
/** 微信授权登录 */
export const loginByWechatApi = (data?: IMiniWxLoginParams) => {
  return http.post<IMiniWxLoginRes>("/api/pms/sso/mini/wxLogin", data)
}
