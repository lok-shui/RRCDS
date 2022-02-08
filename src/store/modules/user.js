import { login, logout, getInfo, getMenus, getUserPermission } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import store from '@/store'

const state = {
  token: getToken(),
  name: '',
  userId: '',
  bankName: '',
  departmentName: '',
  permissions: [],
  keyEditable: 1
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, userInfo) => {
    state.name = userInfo.name
    state.userId = userInfo.userId
    state.bankName = userInfo.bankName
    state.departmentName = userInfo.departmentName
  },
  RESET_INFO: (state) => {
    state.name = ''
    state.userId = ''
    state.bankName = ''
    state.departmentName = ''
  },
  SET_PERMISSIONS: (state, list) => {
    state.permissions = list
  },
  RESET_PERMISSIONS: (state) => {
    state.permissions = []
  },
  SET_KEYEDITABLE: (state, superior) => {
    state.keyEditable = (superior == 0 ? 0 : 1)
  },
  RESET_KEYEDITABLE: (state) => {
    state.keyEditable = 1
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    let token = getToken()
    return new Promise((resolve, reject) => {
      getInfo(token).then(response => {
        const { data } = response
        commit('SET_INFO', data)
        commit('SET_KEYEDITABLE', data.superior)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取菜单权限列表
  getMenus({ commit, state}) {
    let token = getToken()
    return new Promise((resolve, reject) => {
      getMenus(token).then( response => {
        const { data } = response
        // 生成路由
        store.dispatch('GenerateRoutes', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取按钮权限
  getPermission({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserPermission(state.userId).then(response => {
        const { data } = response
        commit('SET_PERMISSIONS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then( () => {
        commit('SET_TOKEN', '')
        commit('RESET_INFO')
        commit('RESET_PERMISSIONS')
        commit('RESET_KEYEDITABLE')
        removeToken()
        document.body.className = ''
        Cookies.remove('size')
        Cookies.remove('themeValue')
        resolve()
      }).catch( error => {
        reject(error)
      })
    })
  },
  // 清除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}