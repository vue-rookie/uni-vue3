/**
 * 输入框数据限制hooks
 * @returns
 */

export const useInputDataLimit = () => {
  /**
   * 限制只输入两位小数
   * @param value
   */
  const limitToPositiveTwoDecimals = (value: string) => {
    let result = value
    result =
      result
        .replace(/[^\d^.]+/g, "")
        .replace(/^0+(\d)/, "$1")
        .replace(/^\./, "0.")
        .match(/^\d*(\.?\d{0,2})/g)[0] || ""
    return limitSixNumber(result)
  }
  /**
   * 整数位数限制6位整数
   * @param value
   * @returns
   */
  const limitSixNumber = (value) => {
    let result = value
    const parts = result.split(".")
    let integerPart = parts[0]
    const decimalPart = parts[1] ? parts[1].substring(0, 2) : ""
    if (integerPart.length > 6) {
      integerPart = integerPart.substring(0, 6)
      if (decimalPart && decimalPart.length > 0) {
        result = integerPart + "." + decimalPart
      } else {
        result = integerPart + decimalPart
      }
    }
    return result
  }

  /**
   * 限制只输入三位小数
   * @param value
   */
  const limitToPositiveThreeDecimals = (value: string) => {
    let result = value
    result =
      result
        .replace(/[^\d^.]+/g, "")
        .replace(/^0+(\d)/, "$1")
        .replace(/^\./, "0.")
        .match(/^\d*(\.?\d{0,3})/g)[0] || ""
    return limitSixNumber(result)
  }

  /**
   * 限制不能输入中文
   * @param value
   */
  const limitNoChinese = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[\u4e00-\u9fa5]/g, "")
    }
    return result
  }
  /**
   * 限制只能输入数字和字母
   */
  const limitNumberAndLetter = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[^\w]/g, "")
    }
    return result
  }
  /**
   * 限制只能输入数字
   */
  const limitNumber = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[^\d]/g, "")
    }
    return result
  }
  /**
   * 限制只能输入字母
   */
  const limitLetter = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[^A-Za-z]/g, "")
    }
    return result
  }
  /**
   * 限制只能输入中文
   */
  const limitChinese = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[^\u4e00-\u9fa5]/g, "")
    }
    return result
  }
  /**
   * 限制只能输入数字、字母和中划线,（场景：编号输入）
   */
  const limitNumberAndLetterAndHyphen = (value: string) => {
    let result = value
    if (value) {
      result = value.replace(/[^\w-]/g, "")
    }
    return result
  }
  return {
    limitToPositiveTwoDecimals,
    limitToPositiveThreeDecimals,
    limitNoChinese,
    limitNumberAndLetter,
    limitNumber,
    limitLetter,
    limitChinese,
    limitNumberAndLetterAndHyphen,
  }
}
