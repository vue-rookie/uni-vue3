import { requestGet, requestPost } from "@/utils/request"
import type { PageParams, PageResult } from "@/api/types"

export interface CreateOrderParams {
  addressId: string
  items: Array<{ skuId: string; quantity: number }>
  couponId?: string
  remark?: string
}

export interface OrderItemDTO {
  orderId: string
  amount: number
  status: string
  createdAt: string
}

export const createOrderApi = (data: CreateOrderParams) =>
  requestPost<{ orderId: string }>("/api/order", data)

export const getOrderListApi = (params: Partial<PageParams> & { status?: string }) =>
  requestGet<PageResult<OrderItemDTO>>("/api/order/list", params)

export const getOrderDetailApi = (orderId: string) => requestGet<any>(`/api/order/${orderId}`)


