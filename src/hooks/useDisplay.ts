import { emptyDisplay } from "@/config"
import { getFileInfoByKeyApi } from "@/api/common"
/**
 * 所有通用展示类的方法
 * @returns
 */
export const useDisplay = () => {
  /**
   *
   * @param originData 数据源
   * @param key 取值key
   * @param unit 单位等其他信息拼接
   * @returns
   */
  const getDisPlay = (originData, key, unit = "") => {
    return originData && originData[key] !== null && originData[key] !== undefined
      ? originData[key] + unit
      : emptyDisplay
  }
  /**
   * 连接符展示的方法
   * @param originData 数据源
   * @param leftkey 左侧值
   * @param rightkey 右侧值
   * @param concatTag 连接符
   */
  const getConcatDisplay = (
    originData,
    leftKey: string,
    rightKey: string,
    concatTag: string = "-",
  ) => {
    const leftValue = (originData && originData[leftKey]) || ""
    const rightValue = (originData && originData[rightKey]) || ""
    if (!leftValue || !rightValue) {
      return `${leftValue}${rightValue}`
    }
    return `${leftValue}${concatTag}${rightValue}`
  }
  /**
   * 获取枚举值展示
   * @param originData //数据源
   * @param key //枚举key
   * @param enumMap //前端维护的枚举列表
   * @returns
   */
  const getEnumDisplay = (originData, key, enumMap) => {
    const value = originData && originData[key]
    const enumSelect = enumMap.find((item) => item.value === value)
    return enumSelect ? enumSelect.label : emptyDisplay
  }
  /**
   * 获取枚举值展示类型。比如success、warning、danger
   * @param originData //数据源
   * @param key //枚举key
   * @param enumMap //前端维护的枚举列表
   * @returns
   */
  const getEnumDisplayType = (originData, key, enumMap) => {
    const value = Number(originData && originData[key])
    const enumSelect = enumMap.find((item) => item.value === value)
    return enumSelect ? enumSelect.type : emptyDisplay
  }
  /**
   * 文件key
   * @param key,key可以是字符串，可以数组
   */
  const getFileDiaplay = async (fileKey: string | string[], otherData?: any) => {
    if (typeof fileKey === "string") {
      const res = await getFileInfoByKeyApi({ fileKey, ...otherData })
      if (res.success) {
        return res.data.url
      }
    } else if (Array.isArray(fileKey)) {
      const urls = []
      const promises = fileKey.map(async (key) => {
        const res = await getFileInfoByKeyApi({
          fileKey: key,
          ...otherData,
        })
        if (res.success) {
          urls.push(res.data.url)
        }
      })
      await Promise.all(promises)
      return urls
    }
  }
  return {
    getDisPlay,
    getConcatDisplay,
    getEnumDisplay,
    getEnumDisplayType,
    getFileDiaplay,
  }
}
