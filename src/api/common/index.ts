import { http } from "@/utils/http"
interface IUploadParam {
  businessCode: string
  file: File
  objectId: string
  objectType: string
}
export const uploadApi = (data?: IUploadParam) => {
  return http.post<any>("/api/upload", data)
}
