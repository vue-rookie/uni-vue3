import {
  type Preset,
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

import { presetApplet, presetRemRpx, transformerAttributify } from "unocss-applet"
import transformerAttributifyJsx from "@unocss/transformer-attributify-jsx"
const isMp = process.env?.UNI_PLATFORM?.startsWith("mp") ?? false

const presets: Preset[] = []
if (isMp) {
  /**
   * 小程序端使用presetApplet
   */
  presets.push(presetApplet(), presetRemRpx())
} else {
  presets.push(presetUno(), presetAttributify())
}
export default defineConfig({
  presets: [
    ...presets,
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  /**
   * unocss类名缩写
   */
  shortcuts: [
    /**
     * 水平居中
     */
    ["flex-center", "flex justify-center items-center"],
    /**
     * 图片容器
     */
    ["img-container", "relative w-full h-0 pb-[100%] overflow-hidden"],
    /**
     * 标题
     */
    ["heading", "text-3xl font-bold mb-4"],
    /**
     * 卡片通用
     */
    ["card", "rounded-lg shadow-md bg-white p-4 m-2"],
    // 常用样式简写
    { "flex-between": "flex items-center justify-between" },
    { "text-ellipsis": "whitespace-nowrap overflow-hidden text-ellipsis" },
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerAttributify({
      // 属性化转换
      prefix: "u",
    }),
    transformerAttributifyJsx(),
  ],
  rules: [
    // 自定义规则
    [/^fs-(\d+)$/, ([, d]) => ({ "font-size": `${d}rpx` })],
    [/^lh-(\d+)$/, ([, d]) => ({ "line-height": `${d}rpx` })],
  ],
  safelist: [
    // 安全列表，确保这些类始终可用
    "text-primary",
    "text-success",
    "text-warning",
    "text-error",
    "bg-primary",
    "bg-success",
    "bg-warning",
    "bg-error",
  ],
})
