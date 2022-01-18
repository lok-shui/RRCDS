export function validUsername(str) {
  return str.trim().length > 0
}

// unicode字符的判断
const unicodeValid = (rule, value, callback, start, end) => {
  let reg = new RegExp('^[ a-zA-Z0-9\.,-\\\\\\\\\(\)/=‘’\+\?!“”%\*<>;@#(cr)(lf)(space)—\u4e00-\u9fa5]{' + start + ',' + end + '}$')
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error(`請輸入${start}至${end}位GBString字符`))
  } else {
    callback();
  }
}

export {
  unicodeValid
}