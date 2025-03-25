import { ref, watch, onMounted, onUnmounted } from "vue"

interface ThemeOptions {
  // 默认主题
  defaultTheme?: string
  // 主题列表
  themes?: Record<string, Record<string, string>>
  // 主题存储键名
  storageKey?: string
  // 系统主题变量前缀
  cssVariablePrefix?: string
}

/**
 * 主题hooks，提供主题切换和管理功能
 * - 主题切换
 * - 响应式主题
 * - 主题持久化
 * - 系统深色模式同步
 */
export const useTheme = (options: ThemeOptions = {}) => {
  // 默认配置
  const defaultOptions = {
    defaultTheme: "light",
    themes: {
      light: {
        "--background-color": "#ffffff",
        "--text-color": "#333333",
        "--primary-color": "#007aff",
        "--border-color": "#eeeeee",
      },
      dark: {
        "--background-color": "#1a1a1a",
        "--text-color": "#f5f5f5",
        "--primary-color": "#0a84ff",
        "--border-color": "#333333",
      },
    },
    storageKey: "app_theme",
    cssVariablePrefix: "",
  }

  // 合并配置
  const opts = { ...defaultOptions, ...options }

  // 当前主题
  const currentTheme = ref(opts.defaultTheme)

  /**
   * 设置主题
   * @param themeName 主题名称
   */
  const setTheme = (themeName: string) => {
    if (!opts.themes[themeName]) {
      console.warn(`主题 "${themeName}" 不存在`)
      return
    }

    // 设置主题变量
    const themeVars = opts.themes[themeName]
    applyTheme(themeVars)

    // 更新当前主题
    currentTheme.value = themeName

    // 保存主题设置
    try {
      uni.setStorageSync(opts.storageKey, themeName)
    } catch (error) {
      console.error("保存主题设置失败", error)
    }
  }

  /**
   * 应用主题变量到CSS
   * @param themeVars 主题变量对象
   */
  const applyTheme = (themeVars: Record<string, string>) => {
    for (const key in themeVars) {
      // 设置CSS变量
      const cssVarName = key.startsWith("--") ? key : `--${key}`
      const fullVarName = opts.cssVariablePrefix
        ? `${opts.cssVariablePrefix}${cssVarName}`
        : cssVarName
      document.documentElement.style.setProperty(fullVarName, themeVars[key])
    }
  }

  /**
   * 获取当前系统主题模式（亮色/暗色）
   */
  const getSystemTheme = (): "light" | "dark" => {
    try {
      // 尝试获取系统主题
      return (uni.getSystemInfoSync().theme as "light" | "dark") || "light"
    } catch (error) {
      // 默认返回亮色主题
      return "light"
    }
  }

  /**
   * 切换到系统主题
   */
  const followSystemTheme = () => {
    const systemTheme = getSystemTheme()

    // 如果系统主题在主题列表中存在，则切换到对应主题
    if (opts.themes[systemTheme]) {
      setTheme(systemTheme)
    } else {
      // 否则切换到默认主题
      setTheme(opts.defaultTheme)
    }
  }

  /**
   * 切换主题（在亮色/暗色之间切换）
   */
  const toggleTheme = () => {
    const targetTheme = currentTheme.value === "light" ? "dark" : "light"
    setTheme(targetTheme)
  }

  /**
   * 判断当前是否为暗色主题
   */
  const isDarkTheme = () => {
    return currentTheme.value === "dark"
  }

  /**
   * 添加新主题
   * @param themeName 主题名称
   * @param themeVars 主题变量
   */
  const addTheme = (themeName: string, themeVars: Record<string, string>) => {
    // 添加或更新主题
    opts.themes[themeName] = { ...themeVars }
  }

  // 监听系统主题变化
  const listenToSystemThemeChange = () => {
    // #ifdef H5
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light"
      setTheme(newTheme)
    }

    mediaQuery.addEventListener("change", handleChange)

    // 组件卸载时取消监听
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
    // #endif
  }

  // 组件挂载时初始化主题
  onMounted(() => {
    // 从本地存储读取主题
    try {
      const savedTheme = uni.getStorageSync(opts.storageKey)
      if (savedTheme && opts.themes[savedTheme]) {
        setTheme(savedTheme)
      } else {
        // 如果没有保存的主题或主题无效，则使用系统主题或默认主题
        followSystemTheme()
      }
    } catch (error) {
      // 出错时使用默认主题
      setTheme(opts.defaultTheme)
    }

    // 监听系统主题变化
    const cleanup = listenToSystemThemeChange()

    // 组件卸载时清理
    if (typeof cleanup === "function") {
      // 注册清理函数，组件卸载时会自动执行
      onUnmounted(() => cleanup())
    }
  })

  // 返回暴露的方法和属性
  return {
    currentTheme,
    setTheme,
    toggleTheme,
    isDarkTheme,
    followSystemTheme,
    addTheme,
    getSystemTheme,
  }
}
