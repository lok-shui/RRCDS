import { packageList } from '../config/package-const-config'

/**
 * 20210908 时间格式转化为时间戳
 * @param {*} date
 * @param {*} sign
 * date[string](需要转化为时间戳的日期)
 * sign[number](是否加一天： 0-不加 1-加)
 */
export function getTimestamp (date, sign) {
  if (date) {
    const pattern = /(\d{4})(\d{2})(\d{2})/
    let hms = sign === 1 ? '23:59:59' : '00:00:00'
    date = date.replace(pattern, '$1-$2-$3') + hms
    date = new Date(Date.parse(date)).getTime() + ''
    let str = ''
    let len = 13 - date.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        str = str + '0'
      }
    }
    return str + date
  }
  return ''
}

export function standardTime (timestamp) {
  if (timestamp) {
    // 时区东八区
    const timeZone = 8
    // getTimezoneOffset计算本地与 GMT 时间时差，单位分秒
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000
    // 转换为东八区时间
    const standarDate = new Date(timestamp + localOffset + timeZone * 60 * 60 * 1000)
    return standarDate
  }
  return 0
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = standardTime(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return timeStr
}

// 防抖
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 距上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate === true，因为开始边界已经调用过了，此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

// 獲取url參數
export function getUrlParams (param) {
  let url = window.location.href
  if (url.indexOf('?') > -1) {
    let query = url.split('?')[1]
    let params = query.split('&')
    if (params.length > 1) {
      for (let i = 0; i < params.length; i++) {
        let pair = params[i].split('=')
        if (pair[0] === param) {
          return param[1]
        }
        return false
      }
    } else {
      params = params[0].split('=')
      return params[0] === param ? params[1] : false
    }
  } else {
    return false
  }
}

// 根據url上下文根，獲取對應服務（後端服務+登錄地址）
export function configServer () {
  let url = window.location.href
  if (url.indexOf('/rcds-dev/') > -1) {
    packageList.current.ibasUrl = packageList.dev.ibasUrl
    packageList.current.serverUrl = packageList.dev.serverUrl
  } else if (url.indexOf('/rcds-test/') > -1) {
    packageList.current.ibasUrl = packageList.test.ibasUrl
    packageList.current.serverUrl = packageList.test.serverUrl
  } else if (url.indexOf('/rcds-preprod/') > -1) {
    packageList.current.ibasUrl = packageList.preprod.ibasUrl
    packageList.current.serverUrl = packageList.preprod.serverUrl
  } else if (url.indexOf('/rcds-web/') > -1) {
    packageList.current.ibasUrl = packageList.production.ibasUrl
    packageList.current.serverUrl = packageList.production.serverUrl
  }
  return {
    ibasUrl: packageList.current.ibasUrl,
    serverUrl: packageList.current.serverUrl
  }
}
