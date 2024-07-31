import { useUserStore } from "@/store/user"
export const PMS_BASE_URL = import.meta.env.VITE_SERVER_BASEURL_PMS
export const TMS_BASE_URL = import.meta.env.VITE_SERVER_BASEURL_TMS

const userStore = useUserStore()
export const getDomainPath = (tenantId: number) => {
  const tenantList = uni.getStorageSync("tenantList")
  const curSelectTenant = tenantList?.find((item: any) => item.id === tenantId)
  const baseUrl = curSelectTenant?.domain || TMS_BASE_URL
  return baseUrl
}

// 我的相关页面入口/api/tms需要的域名
export const getCommonDomainPath = () => {
  const { tenantId } = userStore.userInfo as unknown as IUserInfo
  const tenantList = uni.getStorageSync("tenantList")
  let baseUrl = ""
  if (tenantList && tenantId) {
    const curSelectTenant = tenantList?.find((item: any) => item.id === tenantId)
    baseUrl = curSelectTenant?.domain || TMS_BASE_URL
  } else {
    baseUrl = TMS_BASE_URL
  }
  return baseUrl
}
