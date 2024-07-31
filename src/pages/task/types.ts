/**
 * 任务列表请求参数
 */
export interface ITaskListParams {
  driverId?: number

  pltDriverId?: number

  /* 通用查询字段（运输任务号/装车简称/卸车简称） */
  generalFile?: string

  /* 抢单必传 - 角色id */
  limitRoleId?: number

  /* 抢单必传 - 限制角色类型, 1:FLEET-车队,可用值:FLEET */
  limitRoleType?: string

  /* 装车地址简称 */
  loadsPlaceShort?: string

  /* */
  pageNo?: number

  /* */
  pageSize?: number

  /* */
  sort?: {
    /* */
    orderBy?: Record<string, unknown>
  }

  /* 运输任务号 */
  taskNo?: string

  /* 卸车地址简称 */
  unloadPlaceShort?: string

  dispatchType?: number
}

export interface ITaskListDataRes {
  /* 货物编码 */
  cargoCode: string

  /* 货物名称 */
  cargoName: string

  /* 货物规格 */
  cargoSpec: string

  /* 导航距离 */
  carrierDistance: string

  /* 承运商id */
  carrierId: number

  /* 承运商名称 */
  carrierName: string

  /* 截止时间 */
  endTime: Record<string, unknown>

  /* 抢单业务主键id */
  grabId: number

  /* 装车地址 */
  loadsAddrShort: string

  /* 站台ID【有值且>0 需要提箱】 */
  stationId: number

  /* 运输任务id */
  taskId: number

  /* 运输任务号 */
  taskNo: string

  /* 租户ID */
  tenantId: number

  /* 卸车地址 */
  unloadAddrShort: string
}

/**
 * 任务列表返回参数
 */
export interface ITaskListRes {
  list: ITaskListDataRes[]

  /* */
  pageNo: number

  /* */
  pageSize: number

  /* */
  total: number

  /* */
  totalPages: number
}
