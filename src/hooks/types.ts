export interface ApiItem {
  paramsField: any
  api: (data?: any) => Promise<any>
  componentType: string
  dataField: string
}
