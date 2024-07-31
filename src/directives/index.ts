// src/directives/v-click-prevent.ts
import { DirectiveBinding } from "vue"

const vClickPrevent = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const delay = binding.value || 2000
    let lastClick = 0

    el.addEventListener("click", (event) => {
      const now = Date.now()
      if (now - lastClick < delay) {
        event.stopImmediatePropagation()
        event.preventDefault()
      } else {
        lastClick = now
        el.setAttribute("disabled", "true") // 禁用按钮
        setTimeout(() => {
          el.removeAttribute("disabled") // 重新启用按钮
        }, delay)
      }
    })
  },
}

export default vClickPrevent
