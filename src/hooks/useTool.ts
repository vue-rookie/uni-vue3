export const useTool = () => {
  /**
   * 复制
   * @param value 复制内容
   */
  const copyCotent = (value) => {
    uni.setClipboardData({
      data: value,
      success: () => {
        uni.showToast({
          title: "复制成功",
          duration: 3000,
        })
      },
    })
  }
  /**
   * 计算两个经纬度的中心
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   * @returns
   */
  const calculateMidpoint = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): [number, number] => {
    // 将经纬度从度转换为弧度
    const radLat1 = (lat1 * Math.PI) / 180
    const radLon1 = (lon1 * Math.PI) / 180
    const radLat2 = (lat2 * Math.PI) / 180
    const radLon2 = (lon2 * Math.PI) / 180

    // 计算中间点的纬度和经度
    const midLat = (radLat1 + radLat2) / 2
    const midLon = (radLon1 + radLon2) / 2

    // 将弧度转换回度
    return [(midLat * 180) / Math.PI, (midLon * 180) / Math.PI]
  }
  return {
    copyCotent,
    calculateMidpoint,
  }
}
