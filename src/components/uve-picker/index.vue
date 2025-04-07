<template>
  <view class="relative w-full">
    <!-- 选择器头部 - 用于显示当前选中的值 -->
    <view
      @tap="togglePicker"
      class="flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md cursor-pointer"
      :class="{ 'opacity-50': disabled }"
    >
      <text v-if="selectedLabels.length > 0" class="text-gray-700">
        {{ selectedLabels.join(" / ") }}
      </text>
      <text v-else class="text-gray-400">{{ placeholder }}</text>
      <text class="text-gray-400 ml-2" :class="{ 'transform rotate-180': isOpen }">
        <text class="i-ri-arrow-down-s-line"></text>
      </text>
    </view>

    <!-- 选择器弹出层 -->
    <view v-if="isOpen && !disabled" class="fixed bottom-0 left-0 w-full z-50">
      <!-- 遮罩层 -->
      <view class="fixed inset-0 bg-black bg-opacity-50" @tap="closePicker"></view>

      <!-- 选择器内容 -->
      <view class="bg-white w-full relative z-10">
        <!-- 顶部操作栏 -->
        <view class="flex justify-between items-center border-b border-gray-200 p-3">
          <text @tap="closePicker" class="text-gray-500">
            <text class="i-ri-close-line text-lg"></text>
          </text>
          <text class="text-base font-medium">{{ title || placeholder }}</text>
          <text @tap="confirmSelection" class="text-primary">
            <text class="i-ri-check-line text-lg"></text>
          </text>
        </view>

        <!-- 选择器主体 - 使用immediate-change属性提高响应速度 -->
        <picker-view
          :value="pickerValue"
          class="w-full h-60"
          @change="onPickerChange"
          :immediate-change="true"
          indicator-class="h-12 border-t border-b border-gray-100"
          mask-class="bg-gradient-to-b from-white via-transparent to-white"
        >
          <!-- 单列或多列选择器 -->
          <picker-view-column
            v-for="(column, colIndex) in normalizedColumns"
            :key="colIndex"
            class="text-center"
          >
            <view
              v-for="(item, index) in column"
              :key="index"
              class="flex items-center justify-center h-12"
              :class="{
                'text-gray-300': item.disabled,
                'text-primary font-medium': pickerValue[colIndex] === index && !item.disabled,
                'text-gray-700': pickerValue[colIndex] !== index && !item.disabled,
              }"
            >
              {{ item.label }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue"

const props = defineProps({
  // 可以是单列数组 [{ label, value, disabled }]
  // 或多列数组 [[{ label, value, disabled }], [...]]
  columns: {
    type: Array,
    required: true,
  },
  // 默认选中值，单列为单值，多列为数组
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  title: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue", "change"])

// 控制选择器显示
const isOpen = ref(false)

// 用于 picker-view 的索引数组
const pickerValue = ref([])

// 将 columns 标准化为二维数组格式 - 使用缓存优化性能
const normalizedColumns = computed(() => {
  if (!props.columns || props.columns.length === 0) return [[]]

  // 如果第一项是数组，说明是多列选择器
  if (Array.isArray(props.columns[0])) {
    return props.columns
  }

  // 否则是单列选择器，将其转换为二维数组格式
  return [props.columns]
})

// 初始化 pickerValue - 优化性能
const initPickerValue = () => {
  if (!props.modelValue) {
    // 默认选中每列的第一个非禁用项
    pickerValue.value = normalizedColumns.value.map((column) => {
      const firstEnabledIndex = column.findIndex((item) => !item.disabled)
      return firstEnabledIndex >= 0 ? firstEnabledIndex : 0
    })
    return
  }

  // 如果是多列选择器
  if (Array.isArray(props.modelValue) && normalizedColumns.value.length > 1) {
    pickerValue.value = props.modelValue.map((value, colIndex) => {
      if (colIndex < normalizedColumns.value.length) {
        const index = normalizedColumns.value[colIndex].findIndex((item) => item.value === value)
        return index !== -1 ? index : 0
      }
      return 0
    })
  }
  // 单列选择器
  else {
    const value = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
    const index = normalizedColumns.value[0].findIndex((item) => item.value === value)
    pickerValue.value = [index !== -1 ? index : 0]
  }
}

// 计算当前选中的标签 - 使用缓存优化性能
const selectedLabels = computed(() => {
  const result = []

  normalizedColumns.value.forEach((column, colIndex) => {
    const index = pickerValue.value[colIndex]
    if (index !== undefined && column[index]) {
      result.push(column[index].label)
    }
  })

  return result
})

// 计算当前选中的值 - 使用缓存优化性能
const selectedValues = computed(() => {
  // 多列选择器返回数组
  if (normalizedColumns.value.length > 1) {
    return pickerValue.value.map((index, colIndex) => {
      const column = normalizedColumns.value[colIndex]
      return column && column[index] ? column[index].value : null
    })
  }
  // 单列选择器返回单个值
  else if (normalizedColumns.value[0] && pickerValue.value[0] !== undefined) {
    return normalizedColumns.value[0][pickerValue.value[0]]?.value
  }

  return null
})

// 打开选择器
const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

// 关闭选择器
const closePicker = () => {
  isOpen.value = false
}

// 确认选择
const confirmSelection = () => {
  // 使用nextTick确保状态更新后再触发事件
  nextTick(() => {
    const value = selectedValues.value
    emit("update:modelValue", value)
    emit("change", value)
    closePicker()
  })
}

// 处理选择器变化 - 优化性能，减少不必要的计算
const onPickerChange = (e) => {
  pickerValue.value = e.detail.value
  // 如果需要实时更新值，可以取消下面的注释
  // const value = selectedValues.value
  // emit("update:modelValue", value)
}

// 监听 modelValue 变化 - 添加防抖，避免频繁更新
const debouncedInitPickerValue = (val) => {
  setTimeout(() => {
    if (val === props.modelValue) {
      initPickerValue()
    }
  }, 10)
}

watch(
  () => props.modelValue,
  (val) => {
    debouncedInitPickerValue(val)
  },
  { immediate: true },
)

// 监听 columns 变化
watch(
  () => props.columns,
  () => {
    initPickerValue()
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    initPickerValue()
  })
})
</script>
