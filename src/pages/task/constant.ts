export interface ICommonConstant<T = number> {
  key?: string
  value: T
  label?: string
}
export enum ChargeUnit {
  Ton = 1,
  Side = 2,
  Unit = 3,
  Truck = 4,
}
/**
 * 总量key值
 */
export const TOTAL_KEY: ICommonConstant[] = [
  {
    key: "totalVolume",
    value: ChargeUnit.Side,
  },
  {
    key: "totalWeight",
    value: ChargeUnit.Ton,
  },
  {
    key: "totalPackage",
    value: ChargeUnit.Unit,
  },
  {
    key: "totalVehicle",
    value: ChargeUnit.Truck,
  },
]

/**
 * 剩余量key值
 */
export const RESIDUE_KEY: ICommonConstant[] = [
  {
    key: "remainExecuteVolume",
    value: ChargeUnit.Side,
  },
  {
    key: "remainExecuteWeight",
    value: ChargeUnit.Ton,
  },
  {
    key: "remainExecutePackage",
    value: ChargeUnit.Unit,
  },
  {
    key: "remainExecuteVehicle",
    value: ChargeUnit.Truck,
  },
]
/**
 * 已运量key值
 */
export const TRANSPORTED_KEY: ICommonConstant[] = [
  {
    key: "executeVolume",
    value: ChargeUnit.Side,
  },
  {
    key: "executeWeight",
    value: ChargeUnit.Ton,
  },
  {
    key: "executePackage",
    value: ChargeUnit.Unit,
  },
  {
    key: "executeVehicle",
    value: ChargeUnit.Truck,
  },
]
export const CHARGEUNI_LABEL: ICommonConstant[] = [
  {
    label: "吨",
    value: ChargeUnit.Ton,
  },
  {
    label: "方",
    value: ChargeUnit.Side,
  },
  {
    label: "件",
    value: ChargeUnit.Unit,
  },
  {
    label: "车",
    value: ChargeUnit.Truck,
  },
]
