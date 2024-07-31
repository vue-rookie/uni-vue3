const mapTools = (function () {
  const x_pi = (Math.PI * 3000.0) / 180.0

  let pi = Math.PI
  let a = 6378245.0
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  let ee = 0.00669342162296594323

  let LLBAND = [75, 60, 45, 30, 15, 0]
  let LL2MC = [
    [
      -0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880,
      -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5,
    ],
    [
      0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316,
      10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472,
      913311935.9512032, 67.5,
    ],
    [
      0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455,
      -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5,
    ],
    [
      0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013,
      -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5,
    ],
    [
      -0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394,
      6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726,
      22.5,
    ],
    [
      -0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718,
      0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424,
      7.45,
    ],
  ]
  let MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]
  let MC2LL = [
    [
      1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796,
      -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653,
      17337981.2,
    ],
    [
      -7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846,
      -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887,
      2.28786674699375, 10260144.86,
    ],
    [
      -3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277,
      7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475,
      6856817.37,
    ],
    [
      -1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744,
      0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561,
      4482777.06,
    ],
    [
      3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901,
      -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332,
      2555164.4,
    ],
    [
      2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032,
      -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364,
      826088.5,
    ],
  ]

  function getRange(cC, cB, T) {
    if (cB != null) {
      cC = Math.max(cC, cB)
    }
    if (T != null) {
      cC = Math.min(cC, T)
    }
    return cC
  }
  function getLoop(cC, cB, T) {
    while (cC > T) {
      cC -= T - cB
    }
    while (cC < cB) {
      cC += T - cB
    }
    return cC
  }
  function convertor(cC, cD) {
    if (!cC || !cD) {
      return null
    }
    let T = cD[0] + cD[1] * Math.abs(cC.x)
    const cB = Math.abs(cC.y) / cD[9]
    let cE =
      cD[2] +
      cD[3] * cB +
      cD[4] * cB * cB +
      cD[5] * cB * cB * cB +
      cD[6] * cB * cB * cB * cB +
      cD[7] * cB * cB * cB * cB * cB +
      cD[8] * cB * cB * cB * cB * cB * cB
    T *= cC.x < 0 ? -1 : 1
    cE *= cC.y < 0 ? -1 : 1
    return [T, cE]
  }

  /**
   * 百度墨卡托坐标转百度经纬度坐标：
   * @param {*} cB
   * @returns
   */
  function convertBdMC2LL(lnglat) {
    const cB = {
      x: lnglat.lng,
      y: lnglat.lat,
    }
    const cC = {
      x: Math.abs(cB.x),
      y: Math.abs(cB.y),
    }
    let cE
    for (let cD = 0, len = MCBAND.length; cD < len; cD++) {
      if (cC.y >= MCBAND[cD]) {
        cE = MC2LL[cD]
        break
      }
    }
    const T = convertor(cB, cE)
    return T
  }

  /**
   * 百度BD09经纬度坐标转百度墨卡托坐标：
   * @param {*} T
   * @returns
   */
  function convertBdLL2MC(lnglat) {
    const T = {
      x: lnglat.lng,
      y: lnglat.lat,
    }
    let cD, cC, len
    T.x = getLoop(T.x, -180, 180)
    T.y = getRange(T.y, -74, 74)
    const cB = T
    for (cC = 0, len = LLBAND.length; cC < len; cC++) {
      if (cB.y >= LLBAND[cC]) {
        cD = LL2MC[cC]
        break
      }
    }
    if (!cD) {
      for (cC = LLBAND.length - 1; cC >= 0; cC--) {
        if (cB.y <= -LLBAND[cC]) {
          cD = LL2MC[cC]
          break
        }
      }
    }
    const cE = convertor(T, cD)
    // return cE;
    return {
      lng: cE[0],
      lat: cE[1],
    }
  }

  /*判断是否在国内，不在国内则不做偏移*/
  function outOfChina(lon, lat) {
    if ((lon < 72.004 || lon > 137.8347) && (lat < 0.8293 || lat > 55.8271)) {
      return true
    } else {
      return false
    }
  }
  function transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0
    ret += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0
    return ret
  }

  function transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0
    ret += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) / 3.0
    return ret
  }
  function delta(lat, lon) {
    let a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    let ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
    let dLat = transformLat(lon - 105.0, lat - 35.0)
    let dLon = transformLon(lon - 105.0, lat - 35.0)
    let radLat = (lat / 180.0) * pi
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    let sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi)
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi)
    return {
      lat: dLat,
      lon: dLon,
    }
  }

  // 地球坐标系(WGS-84)转火星坐标系(GCJ)：
  function transformWGS2GCJ(lnglat) {
    const wgLat = lnglat.lat
    const wgLon = lnglat.lng
    let mars_point = {}
    if (outOfChina(wgLon, wgLat)) {
      mars_point.lat = wgLat
      mars_point.lon = wgLon
      return
    }
    let dLat = transformLat(wgLon - 105.0, wgLat - 35.0)
    let dLon = transformLon(wgLon - 105.0, wgLat - 35.0)
    let radLat = (wgLat / 180.0) * pi
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    let sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi)
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi)
    mars_point.lat = wgLat + dLat
    mars_point.lng = wgLon + dLon
    return mars_point
  }

  // 火星坐标系GCJ02转地球坐标系WGS84：
  function transformGCJ2WGS(lnglat) {
    const gcjLat = lnglat.lat
    const gcjLon = lnglat.lng
    let d = delta(gcjLat, gcjLon)
    return {
      lat: gcjLat - d.lat,
      lng: gcjLon - d.lon,
    }
  }

  /**
   * 百度坐标转火星坐标：
   * @param {*} baidu_point
   * @returns
   */
  function baiduTomars(baidu_point) {
    let mars_point = { lng: 0, lat: 0 }
    let x = baidu_point.lng - 0.0065
    let y = baidu_point.lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    mars_point.lng = z * Math.cos(theta)
    mars_point.lat = z * Math.sin(theta)
    return mars_point
  }

  /**
   * 火星坐标转百度坐标：
   * @param {*} mars_point
   * @returns
   */
  function marsTobaidu(mars_point) {
    let baidu_point = { lng: 0, lat: 0 }
    let x = mars_point.lng
    let y = mars_point.lat
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
    baidu_point.lng = z * Math.cos(theta) + 0.0065
    baidu_point.lat = z * Math.sin(theta) + 0.006
    return baidu_point
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // 地球平均半径，单位为公里
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    // 距离，单位为公里
    return R * c
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function distanceToZoomLevel(maxDistance) {
    const zoomLevels = [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]
    const scaleDistances = [
      20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000,
      1000000, 2000000, 5000000, 10000000,
    ]
    const getZoomLevelForDistance = (distance) => {
      for (let i = 0; i < scaleDistances.length; i++) {
        if (distance <= scaleDistances[i]) {
          const shallIndex = i - 1 > 0 ? i - 1 : i
          return zoomLevels[shallIndex]
        }
      }
      // 如果距离小于最小的标尺距离，返回最高的缩放级别
      return zoomLevels[zoomLevels.length - 1]
    }
    return getZoomLevelForDistance(maxDistance)
  }

  function calculateMiddlePoint(points = []) {
    let maxLng = null
    let minLng = null
    let maxLat = null
    let minLat = null
    points.map((point) => {
      if (maxLng === null || +point.lng > maxLng) {
        maxLng = +point.lng
      }
      if (minLng === null || +point.lng < minLng) {
        minLng = +point.lng
      }
      if (maxLat === null || +point.lat > maxLat) {
        maxLat = +point.lat
      }
      if (minLat === null || +point.lat < minLat) {
        minLat = +point.lat
      }
    })
    const center = {
      lng: (maxLng - minLng) / 2 + minLng,
      lat: (maxLat - minLat) / 2 + minLat,
    }
    return {
      center,
      maxLat,
      maxLng,
      minLat,
      minLng,
    }
  }

  // 计算两点间距离
  function calculationDistance(point1, point2) {
    // point1[0]此处的字段要与自己定义的一致，如果是对象，可以如下操作；如果是json数据按照 point1.latitude 的形式操作
    const x1 = point1.lng
    const y1 = point1.lat
    const x2 = point2.lng
    const y2 = point2.lat
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }

  // 计算点pX到点pA和pB所确定的直线的距离
  function distToSegment(start, end, center) {
    const a = Math.abs(calculationDistance(start, end))
    const b = Math.abs(calculationDistance(start, center))
    const c = Math.abs(calculationDistance(end, center))
    const p = (a + b + c) / 2.0
    const s = Math.sqrt(Math.abs(p * (p - a) * (p - b) * (p - c)))
    return (s * 2.0) / a
  }

  // 递归方式压缩轨迹
  function compressLine(coordinate, result, start, end, dMax) {
    if (start < end) {
      let maxDist = 0
      let currentIndex = 0
      const startPoint = coordinate[start]
      const endPoint = coordinate[end]

      for (let i = start + 1; i < end; i++) {
        const currentDist = distToSegment(startPoint, endPoint, coordinate[i])
        if (currentDist > maxDist) {
          maxDist = currentDist
          currentIndex = i
        }
      }

      if (maxDist >= dMax) {
        // 将当前点加入到过滤数组中
        // console.warn('maxDist'+maxDist);
        result.push(coordinate[currentIndex])
        // 将原来的线段以当前点为中心拆成两段，分别进行递归处理
        compressLine(coordinate, result, start, currentIndex, dMax)
        compressLine(coordinate, result, currentIndex, end, dMax)
      }
    }
    return result
  }

  // 供调用的抽稀入口函数
  /**
   * coordinate  原始轨迹Array<{latitude,longitude}>
   * dMax  允许的最大误差距离；默认为10，同时此值需参考 currentDist 值进行设置，例如 currentDist = 0.00000134724232，则 dMax 设置为 0.000001 比较合适
   * resultLatLng  抽稀后的数据
   */

  function douglasPeucker(coordinate, dMax = 10) {
    if (!coordinate || !(coordinate.length > 2)) {
      return null
    }
    if (dMax === 0) {
      return coordinate
    }
    coordinate.forEach((item, index) => {
      item.id = index
    })

    const result = compressLine(coordinate, [], 0, coordinate.length - 1, dMax)
    result.push(coordinate[0])
    result.push(coordinate[coordinate.length - 1])
    const resultLatLng = result.sort((a, b) => {
      if (a.id < b.id) {
        return -1
      } else if (a.id > b.id) return 1
      return 0
    })
    resultLatLng.forEach((item) => {
      item.id = 0
    })
    return resultLatLng
  }

  return {
    convertBdMC2LL, // 百度墨卡托坐标转百度经纬度坐标：
    convertBdLL2MC, // 百度BD09经纬度坐标转百度墨卡托坐标：
    transformWGS2GCJ, // 地球坐标系(WGS-84)转火星坐标系(GCJ)：
    transformGCJ2WGS, // 火星坐标系GCJ02转地球坐标系WGS84：
    baiduTomars, // 百度坐标转火星坐标：
    marsTobaidu, // 火星坐标转百度坐标：
    calculateDistance, //经纬度计算两点距离（公里）
    distanceToZoomLevel, // 根据距离选择合适的百度缩放等级
    calculateMiddlePoint, // 根据传入的一系列点，计算地图中心点位置
    douglasPeucker, // Douglas-Peuker抽稀算法
  }
})()

export default mapTools
