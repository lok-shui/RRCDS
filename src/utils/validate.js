export function validUsername (str) {
  return str.trim().length > 0
}

const finrate = (rule, value, callback) => {
  // let reg = /^0\.\d{1,7}$/  // 这是小于1的
  // let reg = /(^0(\.[0-9]{1,7}){0,1}$)|(^1(\.0{1,7}){0,1}$)/;  // 0<value<1, 不支持负数
  // let reg  = /(^([\.\-\d]{1,7})$)|(^1(\.0{1,7}){0,1}$)/; // （负数 负小数 大于1 ，包含符号位一共7位） 如：reg.test('-89')
  let reg = /(^0(\.[0-9]{1,7}){0,1}$)|(^1(\.0{1,7}){0,1}$)|(^[-](\d+(\.\d{1,7})?)$)/ // 负数 负小数 小于等于1 小数位1至7位
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error("请输入小于等于1的数字，小数位1至7位"))
  } else {
    callback()
  }
}

// unicode字符的判断
const unicodeValid = (rule, value, callback, start, end) => {
  let reg = new RegExp('^[ a-zA-Z0-9\.,-\\\\\\\\\(\)/=‘’\+\?!“”%\*<>;@#(cr)(lf)(space)—\u4e00-\u9fa5]{' + start + ',' + end + '}$')
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error(`請輸入${start}至${end}位GBString字符`))
  } else {
    callback()
  }
}

export {
  unicodeValid,
  finrate,
}