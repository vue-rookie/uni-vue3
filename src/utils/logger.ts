/**
 * 控制台日志美化工具
 */

// 控制台颜色函数
export const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m",
  },

  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m",
  },
}

/**
 * 打印带颜色的分隔线
 */
export const printSeparator = () => {
  console.log(
    `${colors.bright}${colors.fg.cyan}═════════════════════════════════════════════════════════${colors.reset}`,
  )
}

/**
 * 打印带颜色的标签行
 * @param label 标签名称
 * @param value 值
 */
export const printLabelValue = (label: string, value: string | number) => {
  console.log(
    `${colors.bright}${colors.fg.green}• ${label}:${colors.reset} ${colors.fg.yellow}${value}${colors.reset}`,
  )
}

/**
 * 打印构建环境信息
 * @param command 命令类型
 * @param mode 环境模式
 * @param platform 目标平台
 * @param env 环境变量
 */
export const printBuildInfo = (
  command: string,
  mode: string,
  platform: string,
  env: Record<string, string>,
) => {
  const { VITE_APP_TITLE, VITE_APP_PORT, VITE_SERVER_BASEURL } = env

  printSeparator()
  printLabelValue("构建模式", `${command} ${mode}`)
  printLabelValue("目标平台", platform)
  printLabelValue("应用标题", VITE_APP_TITLE)

  // 仅在H5平台时显示端口信息
  if (platform === "h5") {
    printLabelValue("服务端口", VITE_APP_PORT)
  }

  printLabelValue("API地址", VITE_SERVER_BASEURL)
  printSeparator()
}
