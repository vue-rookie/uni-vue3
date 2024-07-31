export const useDate = () => {
  const convertTimestampToDate = (timestamp: number, dateFormat: string): string => {
    /**
     * 将时间戳按照指定格式转换为日期字符串。
     *
     * @param timestamp 时间戳，单位为秒。
     * @param dateFormat 日期时间格式字符串，使用特定占位符：
     *                  YYYY - 四位数年份
     *                  MM - 两位数月份
     *                  DD - 两位数日期
     *                  HH - 两位数小时
     *                  mm - 两位数分钟
     *                  ss - 两位数秒
     * @returns 按照指定格式转换后的日期字符串。
     */
    const date = new Date(timestamp)
    const year = String(date.getFullYear())
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return dateFormat
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds)
  }
  return {
    convertTimestampToDate,
  }
}
