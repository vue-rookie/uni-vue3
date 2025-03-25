import { ref } from "vue"

/**
 * 对话框hooks，提供常用的对话框操作
 * - 显示/隐藏/切换对话框
 * - 确认对话框
 * - 消息提示
 * - 加载提示
 */
export const useModal = () => {
  // 对话框显示状态
  const visible = ref(false)
  // 加载状态
  const loading = ref(false)

  /**
   * 显示对话框
   */
  const showModal = () => {
    visible.value = true
  }

  /**
   * 隐藏对话框
   */
  const hideModal = () => {
    visible.value = false
  }

  /**
   * 切换对话框显示状态
   */
  const toggleModal = () => {
    visible.value = !visible.value
  }

  /**
   * 显示确认对话框
   * @param options 配置选项
   */
  const showConfirm = (options: UniApp.ShowModalOptions) => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: "提示",
        content: "确认执行此操作？",
        confirmColor: "#007aff",
        cancelColor: "#999999",
        ...options,
        success: (res) => {
          if (res.confirm) {
            resolve(true)
          } else if (res.cancel) {
            resolve(false)
          }
          options.success && options.success(res)
        },
        fail: (err) => {
          reject(err)
          options.fail && options.fail(err)
        },
      })
    })
  }

  /**
   * 显示消息提示
   * @param options 配置选项
   */
  const showToast = (options: string | UniApp.ShowToastOptions) => {
    return new Promise((resolve) => {
      // 如果传入的是字符串，转换为对象
      const opts = typeof options === "string" ? { title: options } : options

      uni.showToast({
        icon: "none",
        duration: 2000,
        ...opts,
        success: (res) => {
          resolve(true)
          if (typeof opts === "object" && opts.success && typeof opts.success === "function") {
            opts.success(res)
          }
        },
      })
    })
  }

  /**
   * 显示成功提示
   * @param title 提示内容
   * @param duration 显示时长，默认2000ms
   */
  const showSuccess = (title: string, duration = 2000) => {
    return showToast({
      title,
      icon: "success",
      duration,
    })
  }

  /**
   * 显示错误提示
   * @param title 提示内容
   * @param duration 显示时长，默认2000ms
   */
  const showError = (title: string, duration = 2000) => {
    return showToast({
      title,
      icon: "error",
      duration,
    })
  }

  /**
   * 显示加载提示
   * @param title 提示内容，默认为"加载中..."
   * @param mask 是否显示透明蒙层，默认true
   */
  const showLoading = (title = "加载中...", mask = true) => {
    loading.value = true
    uni.showLoading({
      title,
      mask,
    })
    return {
      hide: hideLoading,
    }
  }

  /**
   * 隐藏加载提示
   */
  const hideLoading = () => {
    loading.value = false
    uni.hideLoading()
  }

  /**
   * 显示操作菜单
   * @param options 配置选项
   */
  const showActionSheet = (options: UniApp.ShowActionSheetOptions) => {
    return new Promise((resolve, reject) => {
      uni.showActionSheet({
        itemList: [],
        itemColor: "#000000",
        ...options,
        success: (res) => {
          resolve(res.tapIndex)
          options.success && options.success(res)
        },
        fail: (err) => {
          reject(err)
          options.fail && options.fail(err)
        },
      })
    })
  }

  return {
    visible,
    loading,
    showModal,
    hideModal,
    toggleModal,
    showConfirm,
    showToast,
    showSuccess,
    showError,
    showLoading,
    hideLoading,
    showActionSheet,
  }
}
