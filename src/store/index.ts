import { createPinia } from "pinia"
// 加入数据持久化
import { createPersistedState } from "pinia-plugin-persistedstate"

const store = createPinia()
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
)

export default store
export * from "./user"
