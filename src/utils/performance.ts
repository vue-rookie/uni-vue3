/**
 * 性能监控工具类
 * 用于监控和优化应用性能
 */

// 定义环境类型
declare const process: {
  env: {
    NODE_ENV?: string
  }
}

// 平台环境判断
const isDev = (): boolean => {
  try {
    // 在不同环境中可能有不同实现
    return process.env.NODE_ENV !== "production"
  } catch (e) {
    // 如果无法访问 process，则认为是生产环境
    return false
  }
}

// 监控渲染性能
export const monitorRenderPerformance = () => {
  if (isDev()) {
    try {
      // 仅在开发环境记录
      const marks: Record<string, number> = {}

      // 记录时间点
      const markTime = (name: string) => {
        marks[name] = Date.now()
        return marks[name]
      }

      // 测量两个时间点的差异
      const measureTime = (startMark: string, endMark: string) => {
        if (marks[startMark] && marks[endMark]) {
          const duration = marks[endMark] - marks[startMark]
          console.log(`[性能] ${startMark} 到 ${endMark} 耗时: ${duration}ms`)
          return duration
        }
        return -1
      }

      // 重置记录
      const resetMarks = () => {
        Object.keys(marks).forEach((key) => {
          delete marks[key]
        })
      }

      // 返回性能测量 API
      return {
        markTime,
        measureTime,
        resetMarks,
      }
    } catch (e) {
      console.error("[性能监控] 错误:", e)
      // 返回空函数防止错误
      return {
        markTime: () => 0,
        measureTime: () => -1,
        resetMarks: () => {},
      }
    }
  }

  // 生产环境返回空函数以避免开销
  return {
    markTime: () => 0,
    measureTime: () => -1,
    resetMarks: () => {},
  }
}

// 内存使用监控
export const monitorMemoryUsage = () => {
  // 扩展 Performance 接口定义
  interface ExtendedPerformance extends Performance {
    memory?: {
      jsHeapSizeLimit: number
      totalJSHeapSize: number
      usedJSHeapSize: number
    }
  }

  if (isDev() && typeof performance !== "undefined") {
    try {
      const extPerformance = performance as ExtendedPerformance
      const memory = extPerformance.memory

      if (memory) {
        console.log("[内存] 已分配内存限制:", Math.round(memory.jsHeapSizeLimit / 1048576), "MB")
        console.log("[内存] 已分配内存:", Math.round(memory.totalJSHeapSize / 1048576), "MB")
        console.log("[内存] 当前内存使用:", Math.round(memory.usedJSHeapSize / 1048576), "MB")
      }
    } catch (e) {
      console.error("[内存监控] 错误:", e)
    }
  }
}

// 组件重渲染检测 (Vue3)
export const detectRerender = (componentName: string) => {
  if (isDev()) {
    let renderCount = 0

    return () => {
      renderCount++
      if (renderCount > 5) {
        console.warn(
          `[优化警告] 组件 "${componentName}" 在短时间内重渲染了 ${renderCount} 次，可能需要优化。`,
        )
      }

      // 重置计数器
      setTimeout(() => {
        renderCount = 0
      }, 2000)
    }
  }

  return () => {} // 生产环境不执行任何操作
}

// 页面加载性能报告
export const reportPageLoadPerformance = () => {
  if (typeof window !== "undefined" && window.performance && window.performance.timing) {
    setTimeout(() => {
      try {
        const timing = window.performance.timing

        // 计算关键性能指标
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart
        const resourceLoadTime = timing.loadEventEnd - timing.domContentLoadedEventEnd
        const dnsTime = timing.domainLookupEnd - timing.domainLookupStart
        const tcpConnectTime = timing.connectEnd - timing.connectStart
        const requestTime = timing.responseEnd - timing.requestStart
        const domRenderTime = timing.domComplete - timing.domLoading

        // 在控制台输出性能报告
        console.log("%c📊 页面性能报告", "font-size:16px;font-weight:bold;color:#4CAF50;")
        console.log(`总加载时间: ${pageLoadTime}ms`)
        console.log(`DOM 准备时间: ${domReadyTime}ms`)
        console.log(`资源加载时间: ${resourceLoadTime}ms`)
        console.log(`DNS 解析时间: ${dnsTime}ms`)
        console.log(`TCP 连接时间: ${tcpConnectTime}ms`)
        console.log(`请求响应时间: ${requestTime}ms`)
        console.log(`DOM 渲染时间: ${domRenderTime}ms`)

        // 性能评分
        let performanceScore = 100

        if (pageLoadTime > 3000) performanceScore -= 20
        else if (pageLoadTime > 2000) performanceScore -= 10

        if (domReadyTime > 1500) performanceScore -= 15
        else if (domReadyTime > 1000) performanceScore -= 5

        if (requestTime > 1000) performanceScore -= 15
        else if (requestTime > 500) performanceScore -= 5

        const scoreColor =
          performanceScore > 80 ? "#4CAF50" : performanceScore > 60 ? "#FF9800" : "#F44336"
        console.log(`%c性能评分: ${performanceScore}/100`, `color:${scoreColor};font-weight:bold;`)

        // 提供优化建议
        if (dnsTime > 200) {
          console.log("💡 优化建议: DNS 解析时间过长，考虑使用 DNS 预取")
        }

        if (resourceLoadTime > 1500) {
          console.log("💡 优化建议: 资源加载时间过长，考虑减少资源大小或使用懒加载")
        }

        if (domRenderTime > 1000) {
          console.log("💡 优化建议: DOM 渲染时间过长，考虑减少 DOM 复杂度或优化组件渲染")
        }
      } catch (e) {
        console.error("性能报告生成失败:", e)
      }
    }, 1000)
  }
}
