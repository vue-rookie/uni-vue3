import { requestGet, requestPost } from "@/utils/request"

export interface AddressDTO {
  id: string
  receiver: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault?: boolean
}

export const getAddressListApi = () => requestGet<AddressDTO[]>("/api/address/list")
export const saveAddressApi = (data: Partial<AddressDTO>) =>
  requestPost<string>("/api/address/save", data)
export const deleteAddressApi = (id: string) => requestPost<boolean>("/api/address/delete", { id })


