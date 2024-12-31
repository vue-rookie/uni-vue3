import { http } from "@/utils/http"
import { IMiniWxLoginParams, IMiniWxLoginRes } from "@/pages/login/types"
export interface LoginParams {
  systemCode: string
  appid: string
  loginCode: string
  telephoneCode: string
}
/** 首页接口 */
export const getSwipersApi = (data?: IMiniWxLoginParams) => {
  return http.post<IMiniWxLoginRes>("/api/getSwipers", data)
}
