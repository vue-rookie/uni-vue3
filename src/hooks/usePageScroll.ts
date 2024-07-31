import { ref } from "vue"
import { getSafeAreaInsertInfo } from "@/utils/tools"
// 获取安全区域高度
const safeAreaInsertInfo: GetSafeAreaInsertInfoRes = getSafeAreaInsertInfo()
const navHeight = safeAreaInsertInfo.navHeight
const scrollTop = ref<number>(0)
const isShowBg = ref<boolean>(false)
const opacity = ref<number>(0)
export const usePageScroll = () => {
  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
    if (e.scrollTop <= navHeight / 2) {
      opacity.value = e.scrollTop / (navHeight / 2)
    } else {
      opacity.value = 1
    }
    isShowBg.value = scrollTop.value >= navHeight / 2
  })
  return {
    onPageScroll,
    scrollRef: ref(null),
    scrollTop,
    isShowBg,
    navHeight,
    opacity,
  }
}
