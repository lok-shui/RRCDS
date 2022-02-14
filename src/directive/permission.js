import { hasPermission } from '@/utils/hasPermission'

export default {
  inserted: function (el, binding) {
    let { value, modifiers } = binding
    // 通過|分割開的權限，滿足任意一種即可，此處可以自己擴展&來處理[且]的關係
    // 更複雜的 &| 的關係可以 v-if="hasPerm('a:b') & .. | .."來實現
    let keys = value && value.trim() !== '' ? value.split('|') : Object.keys(modifiers)
    if (keys && keys.length) {
      let hasAuth = keys.some(key => hasPermission(key))
      !hasAuth && el.parentNode.removeChild(el)
    }
  }
}
