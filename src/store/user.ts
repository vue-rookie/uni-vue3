import { defineStore } from "pinia"
import { ref } from "vue"
import { loginByWechatApi } from "@/api/login"
const initState = {}
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const appid = "XXXXX" // 你的appid
    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }
    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    /**
     * 微信登录
     */
    const loginByWechat = (phoneCode: string) => {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: async (res) => {
            const loginRes = await loginByWechatApi({
              appid,
              loginCode: res.code,
              telephoneCode: phoneCode,
            })
            if (loginRes.success) {
              resolve(loginRes)
            } else {
              reject(loginRes)
            }
          },
          error: (error) => {
            reject(error)
          },
        })
      })
    }
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      appid,
      loginByWechat,
    }
  },
  {
    persist: true,
  },
)
