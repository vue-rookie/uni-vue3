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
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify({
      prefixedOnly: true,
      prefix: "u",
    }),
  ],
})
