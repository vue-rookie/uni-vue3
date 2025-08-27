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
          <!-- 取消按钮 -->
          <view v-if="showCancel" @tap="closePicker" class="flex items-center">
            <slot name="cancel">
              <text class="text-gray-500 text-base">
                {{ cancelText || "取消" }}
              </text>
            </slot>
          </view>
          <view v-else class="w-16"></view>

          <!-- 标题 -->
          <text class="text-base font-medium">{{ title || placeholder }}</text>

          <!-- 确定按钮 -->
          <view v-if="showConfirm" @tap="confirmSelection" class="flex items-center">
            <slot name="confirm">
              <text class="text-primary text-base font-medium">
                {{ confirmText || "确定" }}
              </text>
            </slot>
          </view>
          <view v-else class="w-16"></view>
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
  // 自定义取消按钮文案
  cancelText: {
    type: String,
    default: "",
  },
  // 自定义确定按钮文案
  confirmText: {
    type: String,
    default: "",
  },
  // 是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true,
  },
  // 是否显示确定按钮
  showConfirm: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["update:modelValue", "change"])

// 控制选择器显示
const isOpen = ref(false)

// 获取第一个可用项的索引
const getFirstEnabledIndex = (column) => {
  const index = column.findIndex((item) => !item.disabled)
  return index >= 0 ? index : 0
}

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

// 初始化 pickerValue - 确保不会选中禁用项
const initPickerValue = () => {
  if (!props.modelValue) {
    // 默认选中每列的第一个非禁用项
    pickerValue.value = normalizedColumns.value.map(getFirstEnabledIndex)
    return
  }

  // 如果是多列选择器
  if (Array.isArray(props.modelValue) && normalizedColumns.value.length > 1) {
    pickerValue.value = props.modelValue.map((value, colIndex) => {
      if (colIndex < normalizedColumns.value.length) {
        const index = normalizedColumns.value[colIndex].findIndex((item) => item.value === value)
        // 如果找到的项是禁用的，选择第一个可用项
        if (
          index !== -1 &&
          normalizedColumns.value[colIndex][index] &&
          !normalizedColumns.value[colIndex][index].disabled
        ) {
          return index
        } else {
          return getFirstEnabledIndex(normalizedColumns.value[colIndex])
        }
      }
      return 0
    })
  }
  // 单列选择器
  else {
    const value = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
    const index = normalizedColumns.value[0].findIndex((item) => item.value === value)
    // 如果找到的项是禁用的，选择第一个可用项
    if (
      index !== -1 &&
      normalizedColumns.value[0][index] &&
      !normalizedColumns.value[0][index].disabled
    ) {
      pickerValue.value = [index]
    } else {
      pickerValue.value = [getFirstEnabledIndex(normalizedColumns.value[0])]
    }
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

// 处理选择器变化 - 检查禁用项并自动跳转到可用项
const onPickerChange = (e) => {
  const newValues = e.detail.value
  let hasChanged = false
  const adjustedValues = [...newValues]

  // 检查并调整每个列的选中项
  newValues.forEach((index, colIndex) => {
    const column = normalizedColumns.value[colIndex]
    if (column && column[index] && column[index].disabled) {
      // 找到下一个可用的选项
      let nextIndex = index + 1
      while (nextIndex < column.length && column[nextIndex] && column[nextIndex].disabled) {
        nextIndex++
      }

      // 如果向后找不到，向前找
      if (nextIndex >= column.length) {
        nextIndex = index - 1
        while (nextIndex >= 0 && column[nextIndex] && column[nextIndex].disabled) {
          nextIndex--
        }
      }

      // 如果找到了可用项，更新索引
      if (nextIndex >= 0 && nextIndex < column.length && !column[nextIndex].disabled) {
        adjustedValues[colIndex] = nextIndex
        hasChanged = true

        // uni.showToast({
        //   title: "该选项不可用，已自动选择其他选项",
        //   icon: "none",
        //   duration: 1500,
        // })
      }
    }
  })

  // 如果有调整，更新选择器值
  if (hasChanged) {
    pickerValue.value = adjustedValues
  } else {
    pickerValue.value = newValues
  }
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
