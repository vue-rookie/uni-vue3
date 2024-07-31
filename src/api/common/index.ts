import { http } from "@/utils/http"
import { ItenantListRes } from "../types"
export const getTenantListApi = () => {
  return http.get<ItenantListRes[]>("/api/pms/mini/tenant/list")
}
interface IUploadParam {
  businessCode: string
  file: File
  objectId: string
  objectType: string
}
export const uploadApi = (data?: IUploadParam) => {
  return http.post<any>("/api/fms/support/upload", data)
}

export const getFileInfoByKeyApi = (data?: { fileKey: string }) => {
  return http.post<any>("/api/fms/support/getFileInfoByKeyOfMini", data)
}
