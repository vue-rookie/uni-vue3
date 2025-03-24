// 高性能节流函数
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number = 500) {
  let timer: number | null = null
  let startTime = Date.now()

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      startTime = Date.now()
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        startTime = Date.now()
      }, remaining)
    }
  }
}

// 高性能防抖函数
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 500) {
  let timer: number | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// 懒加载图片
export function lazyLoadImage(el: any, src: string) {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = src
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
  } else {
    // 降级处理
    el.src = src
  }
}

// 简单的内存缓存
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}
