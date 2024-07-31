import dayjs from "dayjs"
export const TASK_LIST = [
  {
    taskId: 1,
    chargeUnit: 1,
    cargoName: "焦煤",
    loadsPlaceShort: "沁新煤炭销售有限公司",
    unloadPlaceShort: "新禹煤有限责任公司",
    endTime: dayjs(Date.now() + 15 * 24 * 60 * 60 * 1000).format("YYYY-MM-DD"),
    carrierDistance: "125公里",
    carrierName: "山西省孝义市新禹煤有限责任公司",
    remainExecuteWeight: "980",
    dispatchType: 1,
    dispatchStatus: 1,
  },
]
