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
