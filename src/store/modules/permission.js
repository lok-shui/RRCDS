import { constantRoutes } from '@/router'
import Layout from '@/layout'

const pMenus = [];

function getPermissionMenus(routesData) {
  routesData.forEach(item => {
    if (item.menuId && item.items.length) {
      getPermissionMenus(item.items)
    }
  })
}

/**
 * 判斷用戶是否擁有此菜單
 * @param menus
 * @param route
 */
function hasPermission(route) {
  if(route.menuId) {
    /**
     * 如果這個路由有menuId屬性，就需要判斷用戶是否擁有此menuId權限
     */
    return pMenus.indexOf(route.menuId) > -1
  } else {
    return true
  }
}

/**
 * 遞歸過濾異步路由表，返回符合用戶菜單權限的路由表
 * @param routerMap
 * @param menus
 */
function filterAsyncRouter (routerMap) {
  const accessedRouters = routerMap.filter(route => {
    if(hasPermission(route)) {
      if(route.children && route.children.length) {
        // 如果這個路由下面還有下一級的話，就遞歸調用
        route.children = filterAsyncRouter(route.children)
        // 如果過濾一圈后沒有子元素了，這個父級菜單就也不顯示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 將api請求回來的數據轉化為路由格式
 * @param routers 轉化後的動態路由
 * @param data api請求回來的數據
 * @param isRoot 是否根路由
 * @param parentPath 父菜單path
 */
function defaultTrans(routers, data, isRoot, parentPath) {
  data.forEach(item => {
    if (isRoot && !item.hidden && item.children && item.children.length === 1 && !item.alwaysShow) {
      let path
      if (/^(https?:|mailto|tel:|\/)/.test(item.children[0].path)) {
        path = item.children[0].path
      } else {
        path = `${item.path}/${item.children[0].path}`
      }
      item = item.children[0]
      item.path = path
    }

    const menuItem = {}
    menuItem.path = parentPath ? `${parentPath}/${item.path}` : item.path
    menuItem.name = item.name
    menuItem.hidden = item.hidden || false
    menuItem.isDynamic = item.isDynamic || false
    item.menuId && (menuItem.menuId = item.menuId)
    if (item.redirect) {
      menuItem.redirect = item.redirect || ''
    }
    menuItem.meta = item.meta || {}
    menuItem.meta.title = menuItem.meta.title || item.path
    if (menuItem.meta.tabMode === 'iframe') {
      menuItem.meta.iframeUrl = item.iframeUrl
    } else {
      menuItem.meta.iframeUrl = null
    }
    if (isRoot === 'root') {
      menuItem.component = Layout
    } else {
      menuItem.component = item.component
    }
    if (item.children) {
      menuItem.children = []
      defaultTrans(menuItem.children, item.children, false, menuItem.path)
    }
    routers.push(menuItem)
  })
}

/**
 * 將請求的縂的後臺動態路由轉換成二級路由
 * @param transResult 轉換後的二級路由結果
 * @param routes 縂的動態路由
 */
function filterRouter(transResult, routes) {
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
function trans(resultRoute, child, parentPath) {
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

const state = {
  routers: [], // 本用戶所有的路由 轉化後的二級路由
  menuList: [], // 側邊欄菜單數據 轉化前用戶權限路由
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.routers = routers
  },
  SET_MENU: (state, menulist) => {
    state.menulist = menulist
  }
}
const actions = {
  GenerateRoutes({commit}, userPermission) {
    // 生成路由
    return new Promise(resolve => {
      getPermissionMenus(userPermission);
      // 前端全部路由
      let routes = []
      defaultTrans(routes, constantRoutes, 'root', '')
      // 聲明該角色可用的路由
      let accessedRouters = []
      // 篩選出本角色可用的路由
      accessedRouters = filterAsyncRouter(routes)
      const secondaryTransResult = [] // 由縂的動態路由轉換的二級路由
      filterRouter(secondaryTransResult, accessedRouters) // 將縂的動態路由轉換成二級路由
      // 執行設置路由的方法
      commit('SET_ROUTERS', secondaryTransResult)
      commit('SET_MENU', accessedRouters)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}