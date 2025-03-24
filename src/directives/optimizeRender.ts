/**
 * 优化页面渲染的自定义指令
 * 包括懒加载、虚拟滚动等功能
 */

// 定义简单的 App 接口代替 Vue 的导入
import { lazyLoadImage } from "../style/mixins"

interface App {
  directive: (name: string, options: any) => void
}

export default {
  install(app: App) {
    // 图片懒加载指令
    app.directive("lazy", {
      mounted(el, binding) {
        if (el.tagName === "IMG") {
          // 初始设置占位图
          const placeholderSrc = binding.arg || ""
          if (placeholderSrc) {
            el.src = placeholderSrc
          }

          // 设置实际图片为懒加载
          lazyLoadImage(el, binding.value)
        }
      },
      updated(el, binding) {
        if (el.tagName === "IMG" && binding.value !== binding.oldValue) {
          lazyLoadImage(el, binding.value)
        }
      },
    })

    // 条件渲染优化指令 (减少不必要的渲染)
    app.directive("if-visible", {
      mounted(el, binding) {
        const observer = new IntersectionObserver(
          (entries) => {
            const isVisible = entries[0].isIntersecting
            // 仅在可见时渲染内容
            if (isVisible && typeof binding.value === "function") {
              binding.value(true)
            } else if (!isVisible && typeof binding.value === "function") {
              binding.value(false)
            }
          },
          { threshold: 0 },
        )

        el._observer = observer
        observer.observe(el)
      },
      unmounted(el: any) {
        if (el._observer) {
          el._observer.disconnect()
          delete el._observer
        }
      },
    })

    // 简单的虚拟滚动指令
    app.directive("virtual-scroll", {
      mounted(el, binding) {
        const options = binding.value || {}
        const itemHeight = options.itemHeight || 50
        const items = options.items || []
        const bufferSize = options.buffer || 5

        // 初始化虚拟滚动
        el.style.overflowY = "auto"
        el.style.position = "relative"

        const contentDiv = document.createElement("div")
        contentDiv.style.height = `${items.length * itemHeight}px`
        contentDiv.style.position = "relative"
        el.appendChild(contentDiv)

        const renderItems = () => {
          const scrollTop = el.scrollTop
          const viewportHeight = el.clientHeight

          // 计算哪些项目应该被渲染
          const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize)
          const endIndex = Math.min(
            items.length - 1,
            Math.ceil((scrollTop + viewportHeight) / itemHeight) + bufferSize,
          )

          // 清除旧内容
          contentDiv.innerHTML = ""

          // 渲染可见项目
          for (let i = startIndex; i <= endIndex; i++) {
            const itemDiv = document.createElement("div")
            itemDiv.style.position = "absolute"
            itemDiv.style.top = `${i * itemHeight}px`
            itemDiv.style.width = "100%"
            itemDiv.style.height = `${itemHeight}px`

            // 如果有render函数则使用它，否则直接显示项目内容
            if (options.renderItem) {
              itemDiv.innerHTML = options.renderItem(items[i], i)
            } else {
              itemDiv.textContent =
                typeof items[i] === "object" ? JSON.stringify(items[i]) : String(items[i])
            }

            contentDiv.appendChild(itemDiv)
          }
        }

        // 初始渲染
        renderItems()

        // 滚动时更新
        el.addEventListener("scroll", renderItems)
        el._virtualScrollCleanup = () => {
          el.removeEventListener("scroll", renderItems)
        }
      },
      updated(el, binding) {
        // 当数据更新时，重新初始化
        if (el._virtualScrollCleanup) {
          el._virtualScrollCleanup()
        }
        // 重新执行mounted逻辑
        this.mounted(el, binding)
      },
      unmounted(el: any) {
        if (el._virtualScrollCleanup) {
          el._virtualScrollCleanup()
          delete el._virtualScrollCleanup
        }
      },
    })
  },
}
