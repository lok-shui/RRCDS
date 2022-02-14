import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/layout'
import baseRouter from './modules/base'
import businessSubmitRouter from './modules/businessSubmit'
import singleRouter from './modules/single'

/**
 * detail see https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 */
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404err'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401err'),
    hidden: true
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  baseRouter,
  singleRouter,
  businessSubmitRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const staticRoutes = transRoutes(constantRoutes) // 將靜態路由轉換成2級靜態路由

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 將靜態路由轉換成2級靜態路由，使高級路由（3級以上路由）可以進行緩存
function transRoutes (routes) {
  const secondaryTransResult = [] // 轉換后的2級路由
  filterRouter(secondaryTransResult, routes)
  return secondaryTransResult
}
/**
 * 將所有靜態路由轉換成2級路由
 * @param transResult 轉換後的2級路由
 * @param routes 所有靜態路由
 */
function filterRouter (transResult, routes) {
  routes.forEach(item => {
    const menuItem = {}
    menuItem.path = item.path
    menuItem.name = item.name || ''
    menuItem.hidden = item.hidden || false
    menuItem.isDynamic = item.isDynamic || false
    menuItem.redirect = item.redirect || ''
    menuItem.meta = item.meta || {}
    menuItem.meta.title = menuItem.meta.title || item.path
    menuItem.meta.noCache = menuItem.meta.noCache || false
    if (menuItem.meta.icon && typeof menuItem.meta.icon === 'string') {
      const icon = menuItem.meta.icon
      menuItem.meta.icon = {}
      menuItem.meta.icon.type = 'svg'
      menuItem.meta.icon.template = icon
    }
    menuItem.component = Layout
    if (item.children && item.children.length > 0) {
      menuItem.children = []
      trans(menuItem.children, item.children, '')
    }
    transResult.push(menuItem)
  })
}

/**
 * 循環遍歷後臺返回的動態路由表，將高級路由中的/轉換成-
 * @param resultRoute 空children
 * @param child 父級的children對象
 * @param parentPath 父級path
 */
function trans (resultRoute, child, parentPath) {
  child.forEach(item => {
    if (parentPath === '') {
      var parentPath1 = ''
      if (item.children && item.children.length > 0) {
        parentPath1 = parentPath + item.path
        trans(resultRoute, item.children, parentPath1)
      } else {
        resultRoute.push(item)
      }
    } else {
      var parentPath2 = ''
      if (item.children && item.children.length > 0) {
        parentPath2 = parentPath + '-' + item.path
        trans(resultRoute, item.children, parentPath2)
      } else {
        parentPath2 = parentPath + '-' + item.path
        const abd = {
          path: parentPath2
        }
        const item2 = {}
        Object.assign(item2, item, abd) // 此處使用assign()解決轉換過程中會改變原始動態路由的問題
        resultRoute.push(item2)
      }
    }
  })
}

export default router
