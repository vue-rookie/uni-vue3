import { UnwrapRef } from "vue"

type IUseRequestOptions<T> = {
  /** 是否立即执行，如果是则在onLoad执行 */
  immediate?: boolean
  /** 初始化数据 */
  initialData?: T
}

/**
 * useRequest是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param func 一个执行异步请求的函数，返回一个包含响应数据的Promise。
 * @param options 包含请求选项的对象 {immediate, initialData}。
 * @param options.immediate 是否立即执行请求，默认为true。
 * @param options.initialData 初始化数据，默认为undefined。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useRequest<T>(
  func: () => Promise<ZJResult<T>>,
  options: IUseRequestOptions<T> = { immediate: true },
) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>(options.initialData)
  const run = async () => {
    loading.value = true
    func()
      .then((res) => {
        if (res.success) {
          data.value = res.data as UnwrapRef<T>
          error.value = false
        } else {
          error.value = true
        }
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  onLoad(() => {
    options.immediate && run()
  })
  return { loading, error, data, run }
}
