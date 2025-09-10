<template>
  <view class="page-container bg-white min-h-screen">
    <!-- 使用配置化方式渲染Hooks列表 -->
    <view v-for="(category, index) in hookCategories" :key="index" class="mt-3 bg-white">
      <view class="text-sm text-[#060b2d] px-4 py-2">{{ category.title }}</view>
      <view class="divide-y divide-gray-100">
        <view
          v-for="(item, itemIndex) in category.items"
          :key="itemIndex"
          @click="callHookDemo(item.action)"
          class="flex items-center justify-between px-4 py-3 active:bg-gray-50"
        >
          <view class="flex items-center flex-1">
            <view class="w-5 h-5 mr-3 flex items-center justify-center">
              <text :class="item.icon"></text>
            </view>
            <text class="text-[#060b2d]">{{ item.name }}</text>
          </view>
          <view class="text-gray-400">
            <text class="i-ri-arrow-right-s-line inline-block"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- useModal 弹窗 -->
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

    <!-- useCountdown 弹窗 -->
    <view
      v-if="countdownVisible"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <view class="bg-white rounded-lg w-4/5 p-5">
        <view class="text-lg font-medium mb-3 text-[#060b2d]">useCountdown 示例</view>

        <!-- 倒计时显示 -->
        <view class="flex justify-center items-center my-6">
          <view class="text-3xl font-bold text-[#06f]">
            {{ countdown?.formattedTime || "00:00" }}
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="flex justify-center space-x-3 mb-4">
          <view
            class="px-4 py-2 bg-[#06f] text-white rounded-lg active:opacity-80 text-sm"
            @click="handleAddTime"
          >
            +10秒
          </view>
          <view
            class="px-4 py-2 bg-[#06f] text-white rounded-lg active:opacity-80 text-sm"
            @click="handleSubtractTime"
          >
            -5秒
          </view>
          <view
            class="px-4 py-2 bg-[#06f] text-white rounded-lg active:opacity-80 text-sm"
            @click="handlePauseResume"
          >
            暂停/继续
          </view>
        </view>

        <view class="flex justify-end">
          <view
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg active:opacity-80 text-sm"
            @click="closeCountdown"
          >
            关闭
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import {
  useModal,
  useStorage,
  useRequest,
  useLocation,
  useCamera,
  useShare,
  useSystem,
  useCountdown,
} from "@/hooks"
import { useInputDataLimit } from "@/hooks/useInputLimit"

// Hooks分类配置
const hookCategories = ref([
  {
    title: "UI 交互",
    items: [{ name: "useModal", icon: "i-ri-window-line", action: "demoModal" }],
  },
  {
    title: "数据处理",
    items: [
      { name: "useStorage", icon: "i-ri-database-2-line", action: "demoStorage" },
      { name: "useRequest", icon: "i-ri-cloud-line", action: "demoRequest" },
      { name: "useInputLimit", icon: "i-ri-input-method-line", action: "demoInputLimit" },
    ],
  },
  {
    title: "设备能力",
    items: [
      { name: "useLocation", icon: "i-ri-map-pin-line", action: "demoLocation" },
      { name: "useCamera", icon: "i-ri-camera-line", action: "demoCamera" },
      { name: "useSystem", icon: "i-ri-smartphone-line", action: "demoSystem" },
    ],
  },
  {
    title: "其他功能",
    items: [
      { name: "useShare", icon: "i-ri-share-line", action: "demoShare" },
      { name: "useValidation", icon: "i-ri-checkbox-line", action: "demoValidation" },
    ],
  },
  {
    title: "性能优化",
    items: [{ name: "useCountdown", icon: "i-ri-time-line", action: "demoCountdown" }],
  },
])

onMounted(() => {
  uni.setNavigationBarTitle({
    title: "Hooks 使用示例",
  })
})

// 调用Hook演示函数
const callHookDemo = (actionName: string) => {
  // 使用函数映射对象代替eval
  const functionMap: Record<string, () => void> = {
    demoModal,
    demoStorage,
    demoRequest,
    demoInputLimit,
    demoLocation,
    demoCamera,
    demoSystem,
    demoShare,
    demoValidation,
    demoCountdown,
  }

  // 安全地调用函数
  if (typeof functionMap[actionName] === "function") {
    functionMap[actionName]()
  }
}

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
const demoValidation = () => {
  // 简单的验证示例，不使用复杂的API
  const modal = useModal()

  // 手机号验证正则
  const phoneRegex = /^1[3-9]\d{9}$/
  const phone = "13800138000"
  const isValidPhone = phoneRegex.test(phone)

  // 密码验证正则 (包含大小写字母和数字)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
  const password = "Password123"
  const isValidPassword = passwordRegex.test(password)

  modal.showToast(`
    验证结果:
    手机号: ${isValidPhone ? "有效" : "无效"}
    密码: ${isValidPassword ? "有效" : "无效"}
  `)
}

// Demo: useCountdown - 使用改进的hook
const countdownVisible = ref(false)
const countdown = ref<any>(null)

// 倒计时演示
const demoCountdown = () => {
  countdownVisible.value = true

  // 创建倒计时实例
  countdown.value = useCountdown({
    totalSeconds: 60,
    autoStart: true,
    interval: 1000,
    onFinish: () => {
      const modal = useModal()
      modal.showToast("倒计时结束！")
    },
    onTick: (seconds, formatted) => {
      console.log("倒计时更新:", formatted, seconds)
    },
  })
}

// 增加时间
const handleAddTime = () => {
  if (!countdown.value) return

  countdown.value.addTime(10)

  const modal = useModal()
  modal.showToast("已增加10秒")
}

// 减少时间
const handleSubtractTime = () => {
  if (!countdown.value) return

  countdown.value.subtractTime(5)

  const modal = useModal()
  modal.showToast("已减少5秒")
}

// 暂停/继续
const handlePauseResume = () => {
  if (!countdown.value) return

  if (countdown.value.isRunning.value) {
    countdown.value.pause()
  } else {
    countdown.value.start()
  }
}

// 关闭倒计时
const closeCountdown = () => {
  countdownVisible.value = false

  if (countdown.value) {
    countdown.value.stop()
    countdown.value = null
  }
}
</script>
