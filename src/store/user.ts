import { defineStore } from "pinia"
import { ref } from "vue"
import { loginByWechatApi } from "@/api/login"
import { getTenantListApi } from "@/api/common"
const initState = {}
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const systemCode = "APPLET-DRIVE"
    const accountInfo = uni.getAccountInfoSync()
    const tenantList = ref<any[]>([]) || uni.getStorageSync("tenantList")
    const appid = accountInfo.miniProgram.appId
    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }
    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    const setTenantList = (val) => {
      tenantList.value = val
      uni.setStorageSync("tenantList", val)
    }
    // 一般没有reset需求，不需要的可以删除
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
              systemCode,
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
    const getTenantList = async () => {
      const res = await getTenantListApi()
      if (res.success) {
        setTenantList(res.data)
      }
    }
    return {
      userInfo,
      tenantList,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      appid,
      systemCode,
    }
  },
  {
    persist: true,
  },
)
