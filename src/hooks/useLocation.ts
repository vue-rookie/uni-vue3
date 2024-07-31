/**
 * 小程序获取定位
 * @returns
 */
export const useLocation = () => {
  const authIsPass = async (authValue: string | string[]) => {
    try {
      const res = await new Promise((resolve, reject) => {
        uni.getSetting({
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          },
        })
      })
      const { authSetting }: any = res
      if (typeof authValue === "string") {
        if (authSetting[authValue]) {
          return true
        } else {
          return false
        }
      }
      if (Array.isArray(authValue)) {
        const noPassList: string[] = authValue.filter((key: string) => !authSetting[key])
        if (noPassList.length > 0) {
          return noPassList
        } else {
          return []
        }
      }
    } catch (err) {
      return false
    }
  }

  /**
   *  引导去开启定位
   * @param message //弹窗
   */

  const setLocationAuth = async (message) => {
    uni.authorize({
      scope: "scope.userLocation",
      fail: async (res) => {
        const locationAuth = await authIsPass("scope.userLocation")
        if (!locationAuth) {
          message
            .confirm({
              title: "使用该功能必须允许位置服务，是否去开启?",
            })
            .then(async () => {
              uni.openSetting({})
            })
        }
      },
    })
  }
  return {
    setLocationAuth,
  }
}
