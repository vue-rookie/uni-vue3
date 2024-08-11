import { useUserStore } from "@/store"

const buildRequestHeaders = (headers: { key: string; value: string }[]): Record<string, string> => {
  return headers.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
}
export const setAuthHeaders = () => {
  const userStore = useUserStore()
  const { token, userDeviceIdentify } = userStore.userInfo as unknown as IUserInfo
  // 登录成功才会设置header sign
  if (!token) {
    return {}
  }
  // 如有需要，我们可以设置一些自定义请求头
  const configHeaders = [
    { key: "userDeviceIdentify", value: userDeviceIdentify },
    { key: "token", value: token },
    { key: "otherKey", value: "xxx" },
  ]
  return buildRequestHeaders(configHeaders)
}
