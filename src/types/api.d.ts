type ApiResult<T = any> = {
  success: boolean
  code: number
  msg: string
  err: string
  data: T
  timestamp: number
}
