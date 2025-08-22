import { requestGet, requestPost } from "@/utils/request"

export interface CouponDTO {
  id: string
  title: string
  desc?: string
  thresholdAmount?: number
  discountAmount?: number
  status?: string
}

export const getCouponsApi = () => requestGet<CouponDTO[]>("/api/coupon/list")
export const receiveCouponApi = (id: string) => requestPost<boolean>("/api/coupon/receive", { id })


