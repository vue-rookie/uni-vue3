import { request } from "@/utils/request"
import { IMiniWxLoginParams, IMiniWxLoginRes } from "@/pages/login/types"
export interface LoginParams {
  systemCode: string
  appid: string
  loginCode: string
  telephoneCode: string
}
/** 微信授权登录 */
export const loginByWechatApi = (data?: IMiniWxLoginParams) => {
  return request.post<IMiniWxLoginRes>("/api/weChatlogin", data)
}
