// 全局要用的类型放到这里

type ApiResult<T> = {
  success: boolean
  traceid: string
  code: string
  msg: string
  err: string
  data: T
  timestamp: number
}

type ApiPageResult<T> = {
  list: T[]
  pageNo: number
  pageSize: number
  total: number
  totalPages: number
  totalAmount?: number
  totalOrderCount?: number
}

type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
  userDeviceIdentify?: string
  secretKey?: string
  systemCode?: string
  username?: string
  tenantId?: number
  telephone?: number
  accountId?: number
  systemId?: number
  userId?: number
}

enum TestEnum {
  A = "a",
  B = "b",
}
interface GetSafeAreaInsertInfoRes {
  /**
   * 比例系数
   */
  scaleFactor: number
  /**
   * 当前设备的屏幕高度
   */
  windowHeight: number
  /**
   * 当前设备的屏幕宽度
   */
  windowWidth: number
  /**
   * 状态栏高度
   */
  statusBarHeight: number
  /**
   * 除导航栏内容高度
   */
  windowContentHeight: number
  /**
   * 微信胶囊高度
   */
  menuButtonHeight: number
  /**
   * 微信胶囊宽度
   */
  menuButtonWidth: number
  /**
   * 微信胶囊上边界的坐标
   */
  menuButtonTop: number
  /**
   * 微信胶囊右边界的坐标
   */
  menuButtonRight: number
  /**
   * 微信胶囊下边界的坐标
   */
  menuButtonBottom: number
  /**
   * 微信胶囊左边界的坐标
   */
  menuButtonLeft: number
  /**
   * 头部导航栏总高度
   */
  navHeight: number
}
