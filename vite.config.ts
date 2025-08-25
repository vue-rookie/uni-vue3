import path from "node:path"
import dayjs from "dayjs"
import { defineConfig, loadEnv } from "vite"
import Uni from "@dcloudio/vite-plugin-uni"
import UniLayouts from "@uni-helper/vite-plugin-uni-layouts"
import UniPlatform from "@uni-helper/vite-plugin-uni-platform"
import UniManifest from "@uni-helper/vite-plugin-uni-manifest"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import { visualizer } from "rollup-plugin-visualizer"
import ViteRestart from "vite-plugin-restart"
import viteImagemin from "vite-plugin-imagemin"
import { printBuildInfo } from "./src/utils/logger"

export default ({ command, mode }) => {
  // 设置环境变量来抑制 Sass 警告
  process.env.SASS_SILENCE_DEPRECATION_WARNINGS = "true"

  const UNI_PLATFORM = process.env.UNI_PLATFORM || "h5"

  const env = loadEnv(mode, path.resolve(process.cwd(), "env"))
  const { VITE_APP_PROXY } = env

  // 打印构建环境信息
  printBuildInfo(command, mode, UNI_PLATFORM, env)

  return defineConfig({
    envDir: "./env", // 自定义env目录

    plugins: [
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      Uni(),
      {
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue")
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false
          }
        },
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"], // 自动导入 hooks
        eslintrc: { enabled: true },
        vueTemplate: true, // default false
      }),

      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"],
      }),
      // 图片压缩插件 (仅生产环境启用)
      mode === "production" &&
        viteImagemin({
          gifsicle: {
            optimizationLevel: 7,
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          mozjpeg: {
            quality: 80,
          },
          pngquant: {
            quality: [0.8, 0.9],
            speed: 4,
          },
          svgo: {
            plugins: [
              {
                name: "removeViewBox",
              },
              {
                name: "removeEmptyAttrs",
                active: false,
              },
            ],
          },
        }),
      // h5环境增加编译时间
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_DATE%", dayjs().format("YYYY-MM-DD HH:mm:ss"))
        },
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" &&
        mode === "production" &&
        visualizer({
          filename: "./node_modules/.cache/visualizer/stats.html",
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY),
    },
    css: {
      postcss: {
        plugins: [],
      },
      preprocessorOptions: {
        scss: {
          // https://github.com/vitejs/vite/issues/1547
          quietDeps: true,
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  })
}
