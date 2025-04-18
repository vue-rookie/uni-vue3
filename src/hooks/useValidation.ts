import { ref, reactive, computed } from "vue"

// 验证规则
interface ValidationRule {
  // 必填
  required?: boolean
  // 最小长度
  minLength?: number
  // 最大长度
  maxLength?: number
  // 正则表达式
  pattern?: RegExp
  // 枚举值
  enum?: any[]
  // 自定义验证函数
  validator?: (value: any) => boolean | Promise<boolean>
  // 错误提示
  message?: string
  // 触发方式
  trigger?: "blur" | "change" | "submit" | ("blur" | "change" | "submit")[]
}

// 字段规则
interface FieldRules {
  [field: string]: ValidationRule | ValidationRule[]
}

// 验证状态
interface ValidationState {
  valid: boolean
  message: string
  dirty: boolean
  touched: boolean
  validated: boolean
}

// 字段状态
interface FieldsState {
  [field: string]: ValidationState
}

// 验证结果
interface ValidationResult {
  valid: boolean
  invalidFields: Record<string, ValidationState>
}

// 内置正则表达式
const patterns = {
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  mobile: /^1[3-9]\d{9}$/,
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  number: /^\d+$/,
  integer: /^-?\d+$/,
  decimal: /^-?\d+\.\d+$/,
  alpha: /^[a-zA-Z]+$/,
  alphaNum: /^[a-zA-Z0-9]+$/,
  chinese: /^[\u4e00-\u9fa5]+$/,
}

/**
 * 表单验证hooks，提供表单验证功能
 * - 自定义验证规则
 * - 字段验证
 * - 表单验证
 * - 错误提示
 */
export const useValidation = () => {
  // 表单数据
  const formData = reactive<Record<string, any>>({})

  // 验证规则
  const rules = reactive<FieldRules>({})

  // 字段验证状态
  const fieldsState = reactive<FieldsState>({})

  // 表单是否有效
  const isValid = computed(() => {
    return Object.values(fieldsState).every((state) => state.valid)
  })

  // 表单是否被修改过
  const isDirty = computed(() => {
    return Object.values(fieldsState).some((state) => state.dirty)
  })

  // 表单是否被触摸过
  const isTouched = computed(() => {
    return Object.values(fieldsState).some((state) => state.touched)
  })

  /**
   * 设置表单数据
   * @param data 表单数据
   */
  const setFormData = (data: Record<string, any>) => {
    Object.assign(formData, data)

    // 初始化字段状态
    for (const field in data) {
      if (!fieldsState[field]) {
        fieldsState[field] = {
          valid: true,
          message: "",
          dirty: false,
          touched: false,
          validated: false,
        }
      }
    }
  }

  /**
   * 设置验证规则
   * @param newRules 验证规则
   */
  const setRules = (newRules: FieldRules) => {
    Object.assign(rules, newRules)

    // 初始化字段状态
    for (const field in newRules) {
      if (!fieldsState[field]) {
        fieldsState[field] = {
          valid: true,
          message: "",
          dirty: false,
          touched: false,
          validated: false,
        }
      }
    }
  }

  /**
   * 重置表单
   * @param newData 重置后的数据，默认为空对象
   */
  const resetForm = (newData: Record<string, any> = {}) => {
    // 清空表单数据
    for (const key in formData) {
      delete formData[key]
    }

    // 设置新数据
    Object.assign(formData, newData)

    // 重置字段状态
    for (const field in fieldsState) {
      fieldsState[field] = {
        valid: true,
        message: "",
        dirty: false,
        touched: false,
        validated: false,
      }
    }
  }

  /**
   * 验证单个字段
   * @param field 字段名
   * @param trigger 触发方式
   */
  const validateField = async (
    field: string,
    trigger: string = "change",
  ): Promise<ValidationState> => {
    const value = formData[field]
    const fieldRules = rules[field]

    if (!fieldRules) {
      return {
        valid: true,
        message: "",
        dirty: fieldsState[field]?.dirty || false,
        touched: fieldsState[field]?.touched || false,
        validated: true,
      }
    }

    // 字段有规则，准备验证
    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]

    // 强制检查必填规则（如果触发类型是submit）
    const triggerRules = rulesArray.filter((rule) => {
      if (!rule.trigger) return trigger === "submit" // 没有设置触发方式，则只在提交时验证
      const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
      return triggers.includes(trigger as any)
    })

    // 如果是提交验证，确保必填规则始终被验证
    if (trigger === "submit") {
      // 找出所有必填规则
      const requiredRules = rulesArray.filter((rule) => rule.required)
      // 将必填规则添加到triggerRules中（如果不存在）
      requiredRules.forEach((requiredRule) => {
        if (!triggerRules.includes(requiredRule)) {
          triggerRules.push(requiredRule)
        }
      })
    }

    // 如果没有需要验证的规则，则返回当前状态
    if (triggerRules.length === 0) {
      return (
        fieldsState[field] || {
          valid: true,
          message: "",
          dirty: false,
          touched: false,
          validated: false,
        }
      )
    }

    // 开始验证
    for (const rule of triggerRules) {
      // 必填验证
      if (rule.required && (value === undefined || value === null || value === "")) {
        fieldsState[field] = {
          valid: false,
          message: rule.message || "该字段不能为空",
          dirty: true,
          touched: true,
          validated: true,
        }
        return fieldsState[field]
      }

      // 非空值才进行后续验证
      if (value !== undefined && value !== null && value !== "") {
        // 最小长度
        if (rule.minLength !== undefined && String(value).length < rule.minLength) {
          fieldsState[field] = {
            valid: false,
            message: rule.message || `长度不能小于${rule.minLength}个字符`,
            dirty: true,
            touched: true,
            validated: true,
          }
          return fieldsState[field]
        }

        // 最大长度
        if (rule.maxLength !== undefined && String(value).length > rule.maxLength) {
          fieldsState[field] = {
            valid: false,
            message: rule.message || `长度不能超过${rule.maxLength}个字符`,
            dirty: true,
            touched: true,
            validated: true,
          }
          return fieldsState[field]
        }

        // 枚举验证
        if (rule.enum && !rule.enum.includes(value)) {
          fieldsState[field] = {
            valid: false,
            message: rule.message || `值必须是 ${rule.enum.join(", ")} 之一`,
            dirty: true,
            touched: true,
            validated: true,
          }
          return fieldsState[field]
        }

        // 正则验证
        if (rule.pattern && !rule.pattern.test(String(value))) {
          fieldsState[field] = {
            valid: false,
            message: rule.message || "格式不正确",
            dirty: true,
            touched: true,
            validated: true,
          }
          return fieldsState[field]
        }

        // 自定义验证
        if (rule.validator) {
          try {
            const result = rule.validator(value)

            // 处理异步验证器
            if (result instanceof Promise) {
              const valid = await result

              if (!valid) {
                fieldsState[field] = {
                  valid: false,
                  message: rule.message || "验证未通过",
                  dirty: true,
                  touched: true,
                  validated: true,
                }
                return fieldsState[field]
              }
            } else if (!result) {
              // 处理同步验证器
              fieldsState[field] = {
                valid: false,
                message: rule.message || "验证未通过",
                dirty: true,
                touched: true,
                validated: true,
              }
              return fieldsState[field]
            }
          } catch (error) {
            fieldsState[field] = {
              valid: false,
              message: rule.message || String(error),
              dirty: true,
              touched: true,
              validated: true,
            }
            return fieldsState[field]
          }
        }
      }
    }

    // 所有规则都通过
    fieldsState[field] = {
      valid: true,
      message: "",
      dirty: true,
      touched: true,
      validated: true,
    }

    return fieldsState[field]
  }

  /**
   * 验证整个表单
   * @param validateAll 是否验证所有字段，默认为 true
   */
  const validateForm = async (validateAll: boolean = true): Promise<ValidationResult> => {
    console.log("开始验证表单，validateAll:", validateAll)

    const invalidFields: Record<string, ValidationState> = {}
    const fieldNames = validateAll
      ? Object.keys(rules)
      : Object.keys(fieldsState).filter((field) => fieldsState[field].dirty)

    console.log("要验证的字段:", fieldNames)

    if (fieldNames.length === 0) {
      console.log("没有需要验证的字段")
      return {
        valid: true,
        invalidFields: {},
      }
    }

    // 验证所有字段
    await Promise.all(
      fieldNames.map(async (field) => {
        console.log("验证字段:", field)
        const state = await validateField(field, "submit")
        console.log("字段验证结果:", field, state.valid, state.message)
        if (!state.valid) {
          invalidFields[field] = state
        }
      }),
    )

    const valid = Object.keys(invalidFields).length === 0
    console.log("表单验证结果:", valid, "无效字段:", Object.keys(invalidFields))

    return {
      valid,
      invalidFields,
    }
  }

  /**
   * 获取字段状态
   * @param field 字段名
   */
  const getFieldState = (field: string) => {
    return (
      fieldsState[field] || {
        valid: true,
        message: "",
        dirty: false,
        touched: false,
        validated: false,
      }
    )
  }

  /**
   * 标记字段为已修改
   * @param field 字段名
   */
  const markFieldAsDirty = (field: string) => {
    if (fieldsState[field]) {
      fieldsState[field].dirty = true
    } else {
      fieldsState[field] = {
        valid: true,
        message: "",
        dirty: true,
        touched: false,
        validated: false,
      }
    }
  }

  /**
   * 标记字段为已触摸
   * @param field 字段名
   */
  const markFieldAsTouched = (field: string) => {
    if (fieldsState[field]) {
      fieldsState[field].touched = true
    } else {
      fieldsState[field] = {
        valid: true,
        message: "",
        dirty: false,
        touched: true,
        validated: false,
      }
    }
  }

  /**
   * 获取常用验证规则
   */
  const createRules = {
    /**
     * 创建必填规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    required: (
      message: string = "该字段不能为空",
      trigger: ValidationRule["trigger"] = ["blur", "change"],
    ) => ({
      required: true,
      message,
      trigger,
    }),

    /**
     * 创建最小长度规则
     * @param length 最小长度
     * @param message 错误提示
     * @param trigger 触发方式
     */
    minLength: (
      length: number,
      message: string = `长度不能小于${length}个字符`,
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      minLength: length,
      message,
      trigger,
    }),

    /**
     * 创建最大长度规则
     * @param length 最大长度
     * @param message 错误提示
     * @param trigger 触发方式
     */
    maxLength: (
      length: number,
      message: string = `长度不能超过${length}个字符`,
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      maxLength: length,
      message,
      trigger,
    }),

    /**
     * 创建范围长度规则
     * @param min 最小长度
     * @param max 最大长度
     * @param message 错误提示
     * @param trigger 触发方式
     */
    rangeLength: (
      min: number,
      max: number,
      message: string = `长度必须在${min}-${max}个字符之间`,
      trigger: ValidationRule["trigger"] = "blur",
    ) => [
      {
        minLength: min,
        message,
        trigger,
      },
      {
        maxLength: max,
        message,
        trigger,
      },
    ],

    /**
     * 创建正则表达式规则
     * @param pattern 正则表达式
     * @param message 错误提示
     * @param trigger 触发方式
     */
    pattern: (
      pattern: RegExp,
      message: string = "格式不正确",
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      pattern,
      message,
      trigger,
    }),

    /**
     * 创建邮箱验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    email: (
      message: string = "请输入有效的邮箱地址",
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      pattern: patterns.email,
      message,
      trigger,
    }),

    /**
     * 创建手机号验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    mobile: (
      message: string = "请输入有效的手机号码",
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      pattern: patterns.mobile,
      message,
      trigger,
    }),

    /**
     * 创建URL验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    url: (
      message: string = "请输入有效的URL地址",
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      pattern: patterns.url,
      message,
      trigger,
    }),

    /**
     * 创建身份证号验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    idCard: (
      message: string = "请输入有效的身份证号码",
      trigger: ValidationRule["trigger"] = "blur",
    ) => ({
      pattern: patterns.idCard,
      message,
      trigger,
    }),

    /**
     * 创建数字验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    number: (message: string = "请输入数字", trigger: ValidationRule["trigger"] = "blur") => ({
      pattern: patterns.number,
      message,
      trigger,
    }),

    /**
     * 创建整数验证规则
     * @param message 错误提示
     * @param trigger 触发方式
     */
    integer: (message: string = "请输入整数", trigger: ValidationRule["trigger"] = "blur") => ({
      pattern: patterns.integer,
      message,
      trigger,
    }),
  }

  return {
    // 状态
    formData,
    rules,
    fieldsState,
    isValid,
    isDirty,
    isTouched,
    patterns,

    // 方法
    setFormData,
    setRules,
    resetForm,
    validateField,
    validateForm,
    getFieldState,
    markFieldAsDirty,
    markFieldAsTouched,
    createRules,
  }
}
