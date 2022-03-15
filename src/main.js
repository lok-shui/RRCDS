import Vue from 'vue'
import Cookies from 'js-cookie'
import 'babel-polyfill'// 兼容es6\
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'

// import '@/assets/custom-theme/themelightblue/index.css'
// import '@/assets/custom-theme/themedarkblue/index.css'
// import '@/assets/custom-theme/themelightgreen/index.css'
// import '@/styles/index.scss'
import mixin from '@/mixins/base.js'

import App from './App'
import store from './store'
import router from './router'
// import './icons'
import './permission' // permission control
import './antd-vue-components'
import { mockXHR } from '../mock'

// 引入bootsrap
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
import directives from '@/directive'
import { hasPermission } from '@/utils/hasPermission'
import { getUrlParams } from '@/utils/index.js'
import '@/directive/el-drag-dialog.js'
require('es6-promise').polyfill()

Element.Dialog.props.closeOnClickModal.default = false

// ibasu登錄跳轉過來，獲取token並存儲
let token = getUrlParams('ODF_JSESSIONID')
if (token) {
  Cookies.set('token', token)
}
// mock api github pages site build
if (process.env.NODE_ENV === 'production') { mockXHR }

Vue.use(Element, {
  size: Cookies.get('size') || 'size' // set element-ui default size
})
// 全局設置message組件的duration
Vue.prototype.$message = function (msg) {
  return Element.Message({
    message: msg,
    showClose: true,
    duration: 3000
  })
}
Vue.prototype.$message.success = function (msg) {
  return Element.Message.success({
    message: msg,
    showClose: true,
    duration: 3000
  })
}
Vue.prototype.$message.warning = function (msg) {
  return Element.Message.warning({
    message: msg,
    showClose: true,
    duration: 5000
  })
}
Vue.prototype.$message.error = function (msg) {
  return Element.Message.error({
    message: msg,
    showClose: true,
    duration: 8000
  })
}
// 全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.use(directives)

Vue.config.productionTip = false
Vue.mixin(mixin)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
