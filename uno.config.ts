import {
  type Preset,
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

import { presetApplet, presetRemRpx } from "unocss-applet"
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
  theme: {
    colors: {
      // 主题色
      primary: {
        DEFAULT: "#06f",
        50: "#f0f7ff",
        100: "#e0f0ff",
        200: "#bae0ff",
        300: "#7cc4ff",
        400: "#36a3ff",
        500: "#3c9cff",
        600: "#0d7eff",
        700: "#0066ff",
        800: "#0052cc",
        900: "#004299",
      },
      // 功能色
      success: {
        DEFAULT: "#5ac725",
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#5ac725",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      warning: {
        DEFAULT: "#f9ae3d",
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f9ae3d",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      danger: {
        DEFAULT: "#f56c6c",
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#f56c6c",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      info: {
        DEFAULT: "#909399",
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#909399",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      // 文字颜色
      text: {
        DEFAULT: "#333333",
        secondary: "#666666",
        disabled: "#c0c0c0",
        placeholder: "#999999",
      },
      // 背景色
      bg: {
        DEFAULT: "#ffffff",
        light: "#f8f8f8",
      },
      // 边框颜色
      border: {
        DEFAULT: "#e5e5e5",
      },
    },
    // 字体大小
    fontSize: {
      xs: ["10px", { "line-height": "1.5" }],
      sm: ["12px", { "line-height": "1.5" }],
      base: ["14px", { "line-height": "1.5" }],
      lg: ["16px", { "line-height": "1.5" }],
      xl: ["18px", { "line-height": "1.5" }],
    },
    // 圆角
    borderRadius: {
      sm: "2px",
      DEFAULT: "4px",
      lg: "8px",
      full: "9999px",
    },
    // 间距
    spacing: {
      sm: "5px",
      DEFAULT: "10px",
      lg: "15px",
      xl: "20px",
    },
    // 阴影
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 2px 4px 0 rgb(0 0 0 / 0.1)",
      lg: "0 4px 8px 0 rgb(0 0 0 / 0.2)",
    },
  },
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
    ["flex-between", "flex items-center justify-between"],
    ["text-ellipsis", "whitespace-nowrap overflow-hidden text-ellipsis"],
    // 常用组合类名
    [
      "btn",
      "relative inline-flex items-center justify-center px-4 text-sm text-center whitespace-nowrap cursor-pointer border border-transparent rounded outline-none transition-all duration-200",
    ],
    ["btn-primary", "text-white bg-primary border-primary hover:bg-primary-600"],
    ["btn-success", "text-white bg-success border-success hover:bg-success-600"],
    ["btn-warning", "text-white bg-warning border-warning hover:bg-warning-600"],
    ["btn-danger", "text-white bg-danger border-danger hover:bg-danger-600"],
    ["btn-info", "text-white bg-info border-info hover:bg-info-600"],
    ["btn-default", "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"],
    ["btn-plain", "bg-transparent"],
    ["btn-round", "rounded-full"],
    ["btn-block", "flex w-full"],
    ["btn-disabled", "cursor-not-allowed opacity-50"],
    [
      "btn-loading",
      "inline-block w-3.5 h-3.5 mr-1.5 border-2 border-current border-l-transparent rounded-full animate-spin",
    ],
  ],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerAttributifyJsx()],
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
