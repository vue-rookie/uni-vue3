/**
 * 优化页面渲染的自定义指令
 * 针对小程序环境优化，避免使用DOM API
 */

// 定义简单的 App 接口代替 Vue 的导入
interface App {
  directive: (name: string, options: any) => void
}

// 适配小程序的图片懒加载函数
function lazyLoadImage(el: any, src: string) {
  // 小程序环境下直接设置图片源
  el.src = src
}

export default {
  install(app: App) {
    // 图片懒加载指令 - 小程序适配版
    app.directive("lazy", {
      mounted(el, binding) {
        if (el.tagName === "IMG") {
          // 初始设置占位图
          const placeholderSrc = binding.arg || ""
          if (placeholderSrc) {
            el.src = placeholderSrc
          }

          // 使用setTimeout模拟延迟加载
          setTimeout(() => {
            lazyLoadImage(el, binding.value)
          }, 500)
        }
      },
      updated(el, binding) {
        if (el.tagName === "IMG" && binding.value !== binding.oldValue) {
          lazyLoadImage(el, binding.value)
        }
      },
    })

    // 条件渲染优化指令 (简化版，避免使用IntersectionObserver)
    app.directive("if-visible", {
      mounted(el, binding) {
        // 小程序中总是将元素视为可见
        if (typeof binding.value === "function") {
          binding.value(true)
        }
      },
      unmounted(el: any) {
        // 无需特殊清理
      },
    })

    // 简化版虚拟滚动指令，避免DOM操作
    app.directive("virtual-scroll", {
      mounted(el, binding) {
        console.log("虚拟滚动在小程序环境中不支持DOM操作，请使用scroll-view组件")
        // 不执行任何DOM操作，避免错误
      },
      updated(el, binding) {
        // 不执行任何更新
      },
      unmounted(el: any) {
        // 无需特殊清理
      },
    })
  },
}
