export function standardTime(timestamp) {
  if(timestamp) {
    const timeZone = 8;
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000
    const standarDate = new Date(timestamp + localOffset + timeZone * 60 * 60 * 1000)
    return standarDate
  }
  return 0
}
export function getTimestamp (date, sign) {
  if(date) {
    const pattern = /(\d{4})(\d{2})(\d{2})/;
    let hms = sign == 1 ? '23:59:59' : '00:00:00';
    date = date.replace(pattern,'$1-$2-$3') + hms;
    date = new Date(date).getTime() + '';
    let str = '';
    let len = 13 - date.length;
    if(len > 0){
      for( let i = 0; i < len; i++){
        str = str + '0'
      }
    }
    return str + date
  }
  return ''
}
export function parseTime(time, cFormat) {
  if(arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if( typeof time === 'object') {
    date = time
  } else {
    if((typeof time ==='string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if((typeof time === 'number') && (time.toString().length === 10)) {
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if(key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六' ][value]
    }
    if(result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return time_str
}