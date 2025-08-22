/**
 * 维护一些ts类型
 */

export interface IMiniWxLoginParams {
  /* 小程序appid */
  appid: string

  /* 临时登录code */
  loginCode: string

  /* 获取手机号code */
  telephoneCode: string
}

export interface IMiniWxLoginRes {
  /* */
  secretKey: string

  /* */
  telephone: string

  /* */
  token: string

  /* 设备标识 */
  userDeviceIdentify: string

  /* */
  userId: number
}

// 电商通用
export interface PageParams {
  page: number
  pageSize: number
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface SkuItemDTO {
  skuId: string
  spuId: string
  title: string
  picture: string
  price: number
  stock: number
  attrsText?: string
}

export interface SpuItemDTO {
  spuId: string
  title: string
  subTitle?: string
  pictures: string[]
  price: number
  originPrice?: number
  sales?: number
  tags?: string[]
}
