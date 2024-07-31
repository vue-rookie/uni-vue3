import { useUserStore } from "@/store"
import { encryptSign } from "./encryptSign"
const buildRequestHeaders = (headers: { key: string; value: string }[]): Record<string, string> => {
  return headers.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
}
const generateRandomDigitNumber = (len: number) => {
  const max = Math.pow(10, len) - 1
  return Math.floor(Math.random() * max + 1)
}
export const setAuthHeaders = () => {
  const userStore = useUserStore()
  const { token, userDeviceIdentify, secretKey } = userStore.userInfo as unknown as IUserInfo
  // 登录成功才会设置header sign
  if (!token) {
    return {}
  }
  const key = secretKey?.slice(0, 16)
  const iv = secretKey?.slice(16, 32)
  // let key = 'sjkcFTJbWpvgKiaA';
  // let iv = "7wIb0uXKJHHJ69jz";
  // let content = "PMS_ac256d8a-c4fd-4606-96d1-3376ec375bd8PMS34ea7f92-05cd-4804-b199-87e4916ac59f17140367420202572297913088"
  const timestamp = Date.now() + ""
  const nonce = generateRandomDigitNumber(13) + ""
  const content = "" + userDeviceIdentify + userStore.systemCode + token + timestamp + nonce
  const configHeaders = [
    { key: "userDeviceIdentify", value: userDeviceIdentify },
    { key: "systemCode", value: userStore.systemCode },
    { key: "token", value: token },
    { key: "timeStamp", value: timestamp },
    { key: "nonce", value: nonce },
    {
      key: "sign",
      value: encryptSign({
        key,
        iv,
        content,
      }),
    },
  ]
  return buildRequestHeaders(configHeaders)
}
