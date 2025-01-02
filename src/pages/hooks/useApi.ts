import { reactive } from "vue"
import { http } from "@/utils/http"
const dataListMap = reactive({})
export const useApi = () => {
  /**
   * 获取到接口列表
   * @param list 页面配置列表
   * @returns
   */
  const getApis = (list) => {
    return list.map((item) => {
      return {
        api: item.api ? (data) => http.post(item.api, data) : null,
        componentType: item.componentType,
        dataField: item.dataField,
      }
    })
  }
  /**
   * 请求接口数据
   */
  const getDataS = (list) => {
    getApis(list).forEach(async (item) => {
      if (!item.api) return
      try {
        const res = await item.api()
        // 接口需要遵守返回规范
        if (res.success || res.code === 200) {
          console.log(item.dataField)

          dataListMap[item.dataField] = res.data
        }
      } catch (error) {}
    })
  }
  return { getApis, getDataS, dataListMap }
}
