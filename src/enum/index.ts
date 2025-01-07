/**
 * 这里存放业务中的一些枚举类型
 */
export interface ICommonConstant<T = number> {
  label: string
  value: T
  display?: string
  type?: "info" | "primary" | "warning" | "success" | "danger"
  description?: string
}

export enum SexMap {
  MAN = 1,
  WOMAN = 2,
}

export const SEX_ENUM: ICommonConstant[] = [
  {
    label: "男",
    value: SexMap.MAN,
  },
  {
    label: "女",
    value: SexMap.WOMAN,
  },
]
