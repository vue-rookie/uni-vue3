<template>
  <view class="page-container bg-white min-h-screen">
    <!-- UI 交互 Hooks -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-[#060b2d] px-4 py-2">UI 交互</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="demoModal"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-window-line"></text>
            </view>
            <text class="text-[#060b2d]">useModal</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoTheme"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-paint-brush-line"></text>
            </view>
            <text class="text-[#060b2d]">useTheme</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据处理 Hooks -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-[#060b2d] px-4 py-2">数据处理</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="demoStorage"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-database-2-line"></text>
            </view>
            <text class="text-[#060b2d]">useStorage</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoRequest"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-cloud-line"></text>
            </view>
            <text class="text-[#060b2d]">useRequest</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoInputLimit"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-input-method-line"></text>
            </view>
            <text class="text-[#060b2d]">useInputLimit</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 设备能力 Hooks -->
    <view class="mt-3 bg-white">
      <view class="text-sm text-[#060b2d] px-4 py-2">设备能力</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="demoLocation"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-map-pin-line"></text>
            </view>
            <text class="text-[#060b2d]">useLocation</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoCamera"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-camera-line"></text>
            </view>
            <text class="text-[#060b2d]">useCamera</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoSystem"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-smartphone-line"></text>
            </view>
            <text class="text-[#060b2d]">useSystem</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 其他 Hooks -->
    <view class="mt-3 mb-3 bg-white">
      <view class="text-sm text-[#060b2d] px-4 py-2">其他功能</view>
      <view class="divide-y divide-gray-100">
        <view
          @click="demoShare"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-share-line"></text>
            </view>
            <text class="text-[#060b2d]">useShare</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
        <view
          @click="demoValidation"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text class="i-ri-checkbox-line"></text>
            </view>
            <text class="text-[#060b2d]">useValidation</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 弹窗 -->
    <view
      v-if="modalVisible"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <view class="bg-white rounded-lg w-4/5 p-4">
        <view class="text-lg font-medium mb-2 text-[#060b2d]">useModal 示例</view>
        <view class="mb-4 text-sm text-gray-600">这是一个自定义的弹窗组件</view>
        <view class="flex justify-end">
          <view
            class="px-4 py-2 bg-[#06f] text-white rounded-lg active:opacity-80 text-sm"
            @click="hideCustomModal"
          >
            确定
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  useModal,
  useStorage,
  useRequest,
  useTheme,
  useLocation,
  useCamera,
  useSystem,
  useValidation,
  usePageScroll,
} from "@/hooks"
import { useShare } from "@/hooks/useShare"
import { useInputDataLimit } from "@/hooks/useInputLimit"

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "Hooks 使用示例",
  })
})

// Demo: useModal
const modalVisible = ref(false)

const demoModal = () => {
  const modal = useModal()

  // 显示确认对话框
  modal.showConfirm({
    title: "确认操作",
    content: "这是 useModal 的演示，您可以选择确认或取消",
    success: (res) => {
      if (res.confirm) {
        // 显示自定义弹窗
        modalVisible.value = true
      } else {
        modal.showToast("您取消了操作")
      }
    },
  })
}

const hideCustomModal = () => {
  modalVisible.value = false
  const modal = useModal()
  modal.showSuccess("操作成功")
}

// Demo: useStorage
const demoStorage = async () => {
  const storage = useStorage()

  // 存储数据
  await storage.setStorage("demo_key", { id: 1, name: "演示数据" })

  // 读取数据
  const data = await storage.getStorage("demo_key")

  const modal = useModal()
  modal.showToast(`存储的数据: ${JSON.stringify(data)}`)

  // 展示响应式存储
  const reactiveStorage = storage.createReactiveStorage("demo_count", 0)
  reactiveStorage.value++

  setTimeout(() => {
    modal.showToast(`响应式存储值已更新: ${reactiveStorage.value}`)
  }, 1000)
}

// Demo: useRequest
const demoRequest = () => {
  const request = useRequest({
    autoHandleError: true,
    loadingText: "请求中...",
  })

  // 模拟一个请求，实际项目中应使用真实API
  request
    .get("https://mock-api.com/users", { page: 1 })
    .then((response) => {
      console.log("请求成功", response)
    })
    .catch((error) => {
      console.error("请求失败", error)
    })

  const modal = useModal()
  modal.showToast("useRequest 示例: 发起网络请求，详情请看控制台")
}

// Demo: useTheme
const demoTheme = () => {
  const theme = useTheme()
  const modal = useModal()

  // 获取当前主题
  const currentTheme = theme.currentTheme.value

  // 切换主题
  theme.toggleTheme()

  modal.showToast(`主题已从 ${currentTheme} 切换为 ${theme.currentTheme.value}`)

  // 3秒后切换回原主题
  setTimeout(() => {
    theme.setTheme(currentTheme)
    modal.showToast(`已恢复原主题: ${currentTheme}`)
  }, 3000)
}

// Demo: useInputLimit
const demoInputLimit = () => {
  const inputLimit = useInputDataLimit()
  const modal = useModal()

  // 数字限制演示
  const numberInput = "abc123.456xyz"
  const numberResult = inputLimit.limitNumber(numberInput)

  // 两位小数限制演示
  const decimalInput = "1234.56789"
  const decimalResult = inputLimit.limitToPositiveTwoDecimals(decimalInput)

  modal.showToast(`
    输入限制示例:
    数字: ${numberInput} => ${numberResult}
    两位小数: ${decimalInput} => ${decimalResult}
  `)
}

// Demo: useLocation
const demoLocation = () => {
  const location = useLocation()
  const modal = useModal()

  modal.showToast("正在获取位置信息...")

  location
    .getLocation()
    .then((res) => {
      modal.showToast(`位置: 经度${res.longitude}, 纬度${res.latitude}`)
    })
    .catch(() => {
      modal.showToast("获取位置失败")
    })
}

// Demo: useCamera
const demoCamera = () => {
  const camera = useCamera()
  const modal = useModal()

  camera
    .takePhoto()
    .then((path) => {
      modal.showToast(`照片路径: ${path}`)
    })
    .catch(() => {
      modal.showToast("拍照取消或失败")
    })
}

// Demo: useSystem
const demoSystem = () => {
  const system = useSystem()
  const modal = useModal()

  const systemInfo = system.getSystemInfo()

  modal.showToast(`系统信息:
    平台: ${systemInfo.platform}
    系统: ${systemInfo.system}
    品牌: ${systemInfo.brand}
  `)
}

// Demo: useShare
const demoShare = () => {
  const share = useShare()
  const modal = useModal()

  share.shareWithSystem({
    title: "分享标题",
    summary: "分享内容摘要",
    href: "https://example.com",
  })

  modal.showToast("已调用系统分享")
}

// Demo: useValidation
const demoValidation = async () => {
  const validation = useValidation()
  const modal = useModal()

  // 手机号验证
  const phone = "13800138000"
  const phoneRules = [{ pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "submit" }]
  validation.setFormData({ phone })
  validation.setRules({ phone: phoneRules })
  const phoneState = await validation.validateField("phone", "submit")

  // 密码验证
  const password = "Password123"
  const passwordRules = [
    { minLength: 6, message: "密码至少6位", trigger: "submit" },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: "需包含大小写字母和数字", trigger: "submit" },
  ]
  validation.setFormData({ password })
  validation.setRules({ password: passwordRules })
  const passwordState = await validation.validateField("password", "submit")

  modal.showToast(`
    验证结果:
    手机号: ${phoneState.valid ? "有效" : "无效"}
    密码: ${passwordState.valid ? "有效" : "无效"}
  `)
}

// Demo: usePageScroll
const demoPageScroll = () => {
  const { scrollToTop } = usePageScroll()
  const modal = useModal()

  scrollToTop()

  modal.showToast("已滚动到页面顶部")
}
</script>
