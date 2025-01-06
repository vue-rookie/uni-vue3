export interface ApiItem {
  api: (data?: any) => Promise<any>
  componentType: string
  dataField: string
}
