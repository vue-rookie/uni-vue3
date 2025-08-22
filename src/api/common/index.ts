import { requestGet, requestPost } from "@/utils/request"

// 通用字典、上传等示例
export const getBannersApi = () => requestGet<any>("/api/banners")
export const getCategoriesApi = () => requestGet<any>("/api/categories")
export const uploadImageApi = (data: any) => requestPost<any>("/api/upload", data)

import { request } from "@/utils/request"
interface IUploadParam {
  businessCode: string
  file: File
  objectId: string
  objectType: string
}
export const uploadApi = (data?: IUploadParam) => {
  return request.post<any>("/api/upload", data)
}
