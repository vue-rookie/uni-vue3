import { reactive } from "vue"
import { http } from "@/utils/http"

import type { ApiItem } from "./types"

const dataListMap = reactive<Record<string, any>>({})

export const useApi = () => {
  /**
   * 获取到接口列表
   * @param list 页面配置列表
   * @returns
   */
  const getApis = (
    list: Array<{ api: string; componentType: string; dataField: string; paramsField: string }>,
  ): ApiItem[] => {
    return list.map((item) => {
      return {
        api: item.api ? (data) => http.post(item.api, data) : null,
        componentType: item.componentType,
        dataField: item.dataField,
        paramsField: item.paramsField,
      }
    })
  }

  /**
   * 请求接口数据
   */
  const getDataS = async (
    list: Array<{ api: string; componentType: string; dataField: string; paramsField: string }>,
    apiParamsOption?: any,
  ) => {
    const apis = getApis(list)
    for (const item of apis) {
      if (!item.api) continue
      try {
        const data = item?.paramsField ? apiParamsOption[item.paramsField] : item.paramsField
        const res: ApiResult<any> = await item.api(data)
        // 接口需要遵守返回规范,成功标志必须含有success:true或者code:200
        if (res.success || res.code === 200) {
          dataListMap[item.dataField] = res.data
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }

  return { getApis, getDataS, dataListMap }
}
