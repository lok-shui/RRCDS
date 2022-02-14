import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { packageList } from '@/config/package-const-config'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/resetPassword'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const winUrl = window.location.href
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.getters.userId) {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await store.dispatch('user/getMenus')
          await store.dispatch('user/getPermission')
          await store.dispatch('app/getInitState')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user-resetToken')

          Message.error(error)

          // next(`/login?redirect=${to.path}`)
          window.location.href = `${packageList.current.ibasUrl}/ibasu/view/base/loginpage.action?redirect=${winUrl}`
          NProgress.done()
        }
      } else if (!store.getters.menuList.length) {
        // 權限菜單為空
        // next(`/login?redirect=${to.path}`)
        window.location.href = `${packageList.current.ibasUrl}/ibasu/view/base/loginpage.action?redirect=${winUrl}`
        NProgress.done()
      } else {
        next()
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    // other pages that do not have permission to access are redirected to the login page
    store.commit('user/RESET_INFO')
    // next(`/login?redirect=${to.path}`)
    window.location.href = `${packageList.current.ibasUrl}/ibasu/view/loginpage.action?redirect=${winUrl}`
    NProgress.done() // 接受Progress
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
