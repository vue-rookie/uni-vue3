export const platform = __UNI_PLATFORM__
export const isH5 = __UNI_PLATFORM__ === "h5"
export const isApp = __UNI_PLATFORM__ === "app"
export const isMp = __UNI_PLATFORM__.startsWith("mp-")
const PLATFORM = {
  platform,
  isH5,
  isApp,
  isMp,
}
export default PLATFORM
