import { createApp, h } from "vue"
import Message from "./index.vue"

// 创建全局方法
let messageInstance = null

const defaultOptions = {
  message: "",
  type: "default",
  duration: 3000,
  showIcon: true,
  position: "top",
  closable: false,
  customClass: "",
  onClose: () => {},
}

// 创建消息实例
const createMessage = (options) => {
  // 合并选项
  const mergedOptions = {
    ...defaultOptions,
    ...(typeof options === "string" ? { message: options } : options),
  }

  // 清除已有实例
  if (messageInstance) {
    document.body.removeChild(messageInstance)
    messageInstance = null
  }

  // 创建容器
  const container = document.createElement("div")
  container.className = "uve-message-container"
  document.body.appendChild(container)

  // 创建Vue实例
  const app = createApp({
    render() {
      return h(Message, {
        ...mergedOptions,
        onClose: () => {
          mergedOptions.onClose()
          app.unmount()
          document.body.removeChild(container)
          messageInstance = null
        },
      })
    },
  })

  // 挂载
  app.mount(container)
  messageInstance = container

  // 返回关闭方法
  return {
    close: () => {
      if (messageInstance) {
        const messageComponent = app._instance.subTree.component.exposed
        messageComponent.hide()
      }
    },
  }
}

// 解析选项
function resolveOptions(options) {
  return typeof options === "string" ? { message: options } : options
}

// 便捷方法
const MessageAPI = {
  // 统一调用方法
  show(options) {
    return createMessage(options)
  },
  // 不同类型的快捷方法
  info(options) {
    return createMessage({ type: "info", ...resolveOptions(options) })
  },
  success(options) {
    return createMessage({ type: "success", ...resolveOptions(options) })
  },
  warning(options) {
    return createMessage({ type: "warning", ...resolveOptions(options) })
  },
  danger(options) {
    return createMessage({ type: "danger", ...resolveOptions(options) })
  },
  error(options) {
    return createMessage({ type: "danger", ...resolveOptions(options) })
  },
}

// 全局安装
MessageAPI.install = (app) => {
  app.config.globalProperties.$message = MessageAPI
}

// 导出API
export { MessageAPI as Message }
