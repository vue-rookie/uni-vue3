import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface CartSkuItem {
  skuId: string
  spuId: string
  title: string
  picture: string
  price: number
  quantity: number
  selected: boolean
  attrsText?: string
}

export interface CartState {
  items: CartSkuItem[]
}

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<CartSkuItem[]>([])

    const totalQuantity = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
    const totalSelectedQuantity = computed(() =>
      items.value.filter((i) => i.selected).reduce((sum, i) => sum + i.quantity, 0),
    )
    const totalSelectedAmount = computed(() =>
      items.value
        .filter((i) => i.selected)
        .reduce((sum, i) => sum + i.quantity * i.price, 0)
        .toFixed(2),
    )
    const isAllSelected = computed(
      () => items.value.length > 0 && items.value.every((i) => i.selected),
    )

    const findIndexBySku = (skuId: string) => items.value.findIndex((i) => i.skuId === skuId)

    const addToCart = (payload: CartSkuItem) => {
      const idx = findIndexBySku(payload.skuId)
      if (idx > -1) {
        items.value[idx].quantity += payload.quantity
      } else {
        items.value.unshift({ ...payload, selected: true })
      }
    }

    const updateQuantity = (skuId: string, quantity: number) => {
      const idx = findIndexBySku(skuId)
      if (idx > -1) {
        items.value[idx].quantity = Math.max(1, quantity)
      }
    }

    const removeFromCart = (skuId: string) => {
      items.value = items.value.filter((i) => i.skuId !== skuId)
    }

    const toggleSelect = (skuId: string) => {
      const idx = findIndexBySku(skuId)
      if (idx > -1) items.value[idx].selected = !items.value[idx].selected
    }

    const toggleSelectAll = (val: boolean) => {
      items.value = items.value.map((i) => ({ ...i, selected: val }))
    }

    const clear = () => {
      items.value = []
    }

    return {
      items,
      totalQuantity,
      totalSelectedQuantity,
      totalSelectedAmount,
      isAllSelected,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleSelect,
      toggleSelectAll,
      clear,
    }
  },
  {
    persist: true,
  },
)


