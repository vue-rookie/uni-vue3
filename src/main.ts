import { createSSRApp } from "vue"
import App from "./App.vue"
import store from "./store"
import uviewPlus from "uview-plus"
import { routeInterceptor, requestInterceptor, prototypeInterceptor } from "./interceptors"
import "virtual:uno.css"
import "@/style/index.scss"
import "@/static/fonts/style.css"
import "uview-plus/index.scss"
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  // 使用uviewPlus组件库
  app.use(uviewPlus)
  return {
    app,
  }
}
