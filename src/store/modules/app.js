import Cookies from 'js-cookie'
import { getPreference, setPerference } from '@/api/user'

function setCookies(name, value, day) {
  if (day !== 0) {
    var expires = day * 24 * 60 * 60 * 1000
    var date = new Date(+new Date() + expires)
    document.cookie = name + '=' + encodeURI(value) + ';expires=' + date.toUTCString()
  } else {
    document.cookie = name + '=' + encodeURI(value)
  }
}

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'small',
  themeValue: Cookies.get('themeValue') || 'defaults'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    let str = document.body.className
    let sizeNum
    if (size === 'medium') {
      sizeNum = 'fontSize18'
    } else if (size === 'small') {
      sizeNum = 'fontSize15'
    } else {
      sizeNum = 'fontSize12'
    }
    if (str.indexOf('fontSize') !== -1) {
      str = str.replace(/\s*fontSize1[2|5|8]\s*/g, sizeNum)
    } else {
      str = str + sizeNum
    }
    document.body.className = str
    Cookies.set('size', size)
  },
  SET_THEME_VALUE: (state, themeValue) => {
    state.themeValue = themeValue
    let str = document.body.className
    let themeValueNum
    if (themeValue === 'lightblue') {
      themeValueNum = 'themelightblue'
    } else if (themeValue === 'darkblue') {
      themeValueNum = 'themedarkblue'
    } else if (themeValue === 'lightgreen') {
      themeValueNum = 'themelightgreen'
    } else {
      themeValueNum = 'defaults'
    }
    if (str.indexOf('theme') !== -1) {
      if (themeValue === 'defaults') {
        str = str.replace(/themelightblue|themedarkblue|themelightgreen/g, '')
      } else {
        const themeValueStr = themeValueNum.replace(/^\s+|\s+$/, '')
        if (str.indexOf(themeValueStr) === -1) {
          str = str.replace(/themelightblue|themedarkblue|themelightgreen/g, themeValueNum)
        }
      }
    } else {
      if (themeValue !== 'defaults') {
        const themeValueStr = themeValueNum.replace(/^\s+|\s+$/, '')
        if (str.indexOf(themeValueStr) === -1) {
          str = themeValueNum + ' ' + str
        }
      }
    }
    document.body.className = str
    setCookies('themeValue', themeValue, 30)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    return new Promise(resolve => {
      setPerference({ themeValue: state.themeValue, size }).then(response => {
        if (response.code === 20000) {
          const { size, themeValue } = response.data
          commit('SET_SIZE', size)
          commit('SET_THEME_VALUE', themeValue)
        }
        resolve(response.data)
      })
    })
  },
  setThemeValue({ commit }, themeValue) {
    return new Promise(resolve => {
      setPerference({ themeValue, size: state.size }).then(response => {
        if (response.code === 20000) {
          const { size, themeValue } = response.data
          commit('SET_SIZE', size)
          commit('SET_THEME_VALUE', themeValue)
        }
        resolve(response.data)
      })
    })
  },
  getInitState({ commit }, themeValue) {
    return new Promise(resolve => {
      getPreference().then(response => {
        const { size, themeValue } = response.data
        commit('SET_SIZE', size)
        commit('SET_THEME_VALUE', themeValue)
        resolve(response.data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
