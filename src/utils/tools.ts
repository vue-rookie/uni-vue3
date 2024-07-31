import page from '../pages.json'

let safeAreaInsertInfo = {
  scaleFactor: 0,
  windowHeight: 0,
  windowWidth: 0,
  windowContentHeight: 0,
  statusBarHeight: 0,
  menuButtonHeight: 0,
  menuButtonWidth: 0,
  menuButtonTop: 0,
  menuButtonRight: 0,
  menuButtonBottom: 0,
  menuButtonLeft: 0,
  navHeight: 0,
} as GetSafeAreaInsertInfoRes

export const getSafeAreaInsertInfo = (): GetSafeAreaInsertInfoRes => {
  return safeAreaInsertInfo
}

export const initSafeAreaInsert = () => {
  let navHeight = 0

  let menuButtonHeight = 0
  let menuButtonWidth = 0
  let menuButtonTop = 0
  let menuButtonRight = 0
  let menuButtonBottom = 0
  let menuButtonLeft = 0
  /** **************** 所有平台共有的系统信息 ********************/
  // 设备系统信息
  const systemInfo: UniApp.GetSystemInfoResult = uni.getSystemInfoSync()
  // 机型适配比例系数
  const scaleFactor: number = 750 / systemInfo.windowWidth
  // 当前机型-屏幕高度
  const windowHeight: number = systemInfo.windowHeight * scaleFactor
  // 当前机型-屏幕宽度
  const windowWidth: number = systemInfo.windowWidth * scaleFactor
  // 状态栏高度
  const statusBarHeight: number = systemInfo.statusBarHeight || 1 * scaleFactor

  /** **************** 微信小程序头部胶囊信息 ********************/
  // #ifdef MP-WEIXIN
  const safeAreaInserts: UniApp.GetMenuButtonBoundingClientRectRes =
    uni.getMenuButtonBoundingClientRect()
  // 胶囊高度
  menuButtonHeight = safeAreaInserts.height * scaleFactor
  // 胶囊宽度
  menuButtonWidth = safeAreaInserts.width * scaleFactor
  // 胶囊上边界的坐标
  menuButtonTop = safeAreaInserts.top * scaleFactor
  // 胶囊右边界的坐标
  menuButtonRight = safeAreaInserts.right * scaleFactor
  // 胶囊下边界的坐标
  menuButtonBottom = safeAreaInserts.bottom * scaleFactor
  // 胶囊左边界的坐标
  menuButtonLeft = safeAreaInserts.left * scaleFactor

  // 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  // ** 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度
  navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2
  // #endif

  /** **************** 通用平台 ********************/
  // #ifndef MP-WEIXIN
  navHeight = systemInfo.statusBarHeight
  // #endif

  // 除去headerBar内容的高度
  const windowContentHeight: number = windowHeight - navHeight

  safeAreaInsertInfo = {
    scaleFactor,
    windowHeight,
    windowWidth,
    windowContentHeight,
    statusBarHeight,
    menuButtonHeight,
    menuButtonWidth,
    menuButtonTop,
    menuButtonRight,
    menuButtonBottom,
    menuButtonLeft,
    navHeight,
  }
}
initSafeAreaInsert()

export const isTabBarUrl = (url: string): boolean => {
  if (!url) return false

  const tabBarList = page.tabBar.list

  let pageUrl = url || ''

  if (pageUrl[0] === '/') {
    pageUrl = url.substring(1)
  }

  const index = tabBarList.findIndex((tabBar) => tabBar.pagePath === pageUrl)

  return index >= 0
}

export const navigationTo = (
  options: UniNamespace.NavigateToOptions,
  jumpFun: 'navigateTo' | 'redirectTo' | 'reLaunch' = 'navigateTo',
) => {
  const url = options.url as string

  if (isTabBarUrl(url)) {
    uni.switchTab(options)
    return
  }

  uni[jumpFun](options)
}

export const getUrlParams = (url: string): any => {
  const pattern = /(\w+)=(\w+)/gi
  const params = {} as any

  url.replace(pattern, (row: string, key: string, value: string) => {
    params[key] = value
    return params
  })

  return params
}
