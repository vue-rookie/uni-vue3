import { ref, onMounted, onUnmounted, reactive } from "vue"

/**
 * 页面滚动hooks
 * 提供页面滚动相关功能:
 * - 滚动位置监听
 * - 滚动到指定位置
 * - 滚动到顶部/底部
 * - 上拉加载更多
 * - 下拉刷新控制
 * - 滚动节流
 */
export const usePageScroll = (
  options: {
    threshold?: number
    throttleTime?: number
    onReachBottom?: (done: () => void) => void
  } = {},
) => {
  // 默认配置
  const defaultOptions = {
    // 触发上拉加载的距离，距离底部多少距离触发上拉加载
    threshold: 50,
    // 节流时间间隔，毫秒
    throttleTime: 100,
  }

  const opts = Object.assign({}, defaultOptions, options)

  // 滚动状态
  const scrollState = reactive({
    scrollTop: 0,
    scrollHeight: 0,
    windowHeight: 0,
    direction: "", // 'up' 或 'down'
    isReachBottom: false,
    isReachTop: true,
    isScrolling: false,
  })

  // 是否正在刷新或加载更多
  const isRefreshing = ref(false)
  const isLoadingMore = ref(false)

  // 上一次滚动位置
  let lastScrollTop = 0
  // 节流计时器
  let throttleTimer: ReturnType<typeof setTimeout> | null = null

  /**
   * 滚动事件处理
   */
  const handleScroll = (e: any) => {
    if (throttleTimer) return

    throttleTimer = setTimeout(() => {
      const oldScrollTop = scrollState.scrollTop
      const newScrollTop = e.scrollTop

      // 更新滚动状态
      scrollState.scrollTop = newScrollTop
      scrollState.scrollHeight = e.scrollHeight
      scrollState.windowHeight = e.windowHeight || uni.getWindowInfo().windowHeight
      scrollState.direction = newScrollTop > oldScrollTop ? "down" : "up"
      scrollState.isReachTop = newScrollTop <= 0
      scrollState.isScrolling = true

      // 检测是否滚动到底部
      const isBottom = newScrollTop + scrollState.windowHeight + opts.threshold >= e.scrollHeight
      scrollState.isReachBottom = isBottom

      // 触发上拉加载
      if (isBottom && !isLoadingMore.value) {
        _onReachBottom()
      }

      lastScrollTop = newScrollTop

      // 清除节流
      throttleTimer = null
    }, opts.throttleTime)
  }

  /**
   * 当滚动到底部时触发
   */
  const _onReachBottom = () => {
    if (isLoadingMore.value) return
    isLoadingMore.value = true

    if (typeof opts.onReachBottom === "function") {
      opts.onReachBottom(() => {
        isLoadingMore.value = false
      })
    } else {
      // 如果没有提供回调，1秒后自动重置状态
      setTimeout(() => {
        isLoadingMore.value = false
      }, 1000)
    }
  }

  /**
   * 滚动到指定位置
   */
  const scrollTo = (options = {}) => {
    return new Promise((resolve) => {
      scrollState.isScrolling = true
      uni.pageScrollTo({
        ...options,
        success: resolve,
        complete: () => {
          setTimeout(() => {
            scrollState.isScrolling = false
          }, 300)
        },
      })
    })
  }

  /**
   * 滚动到顶部
   */
  const scrollToTop = (duration = 300) => {
    return scrollTo({ scrollTop: 0, duration })
  }

  /**
   * 滚动到底部
   */
  const scrollToBottom = (duration = 300) => {
    return scrollTo({ scrollTop: scrollState.scrollHeight, duration })
  }

  /**
   * 模拟下拉刷新
   */
  const startPullDownRefresh = (callback?: (done: () => void) => void) => {
    if (isRefreshing.value) return

    isRefreshing.value = true
    uni.startPullDownRefresh()

    if (typeof callback === "function") {
      callback(() => {
        stopPullDownRefresh()
      })
    }
  }

  /**
   * 停止下拉刷新
   */
  const stopPullDownRefresh = () => {
    uni.stopPullDownRefresh()
    isRefreshing.value = false
  }

  /**
   * 获取元素的位置和大小信息，方便滚动到指定元素
   */
  const getElementPosition = (selector: string, callback?: (res: any) => void) => {
    const query = uni.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((res) => {
        callback && callback(res)
      })
      .exec()
  }

  /**
   * 滚动到指定元素位置
   */
  const scrollToElement = (selector: string, offset = 0, duration = 300) => {
    return new Promise((resolve) => {
      getElementPosition(selector, (res) => {
        if (res) {
          scrollTo({
            scrollTop: res.top + offset,
            duration,
            success: resolve,
          })
        } else {
          resolve(false)
        }
      })
    })
  }

  // 页面生命周期钩子
  onMounted(() => {
    // 监听页面滚动
    uni.$on("onPageScroll", handleScroll)

    // 获取初始页面高度
    const info = uni.getWindowInfo()
    scrollState.windowHeight = info.windowHeight
  })

  onUnmounted(() => {
    // 清理事件监听
    uni.$off("onPageScroll", handleScroll)

    // 清理定时器
    if (throttleTimer) {
      clearTimeout(throttleTimer)
      throttleTimer = null
    }
  })

  return {
    scrollState,
    isRefreshing,
    isLoadingMore,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    getElementPosition,
    startPullDownRefresh,
    stopPullDownRefresh,
  }
}
