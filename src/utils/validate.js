export function validUsername (str) {
  return str.trim().length > 0
}

// 18位身份證的驗證
export function isIdCard (code) {
  code = String(code)
  let arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      proof = code.charAt(17).toUpperCase() == 'X' ? 10 : parseInt(code.charAt(17)),
      sum = 0
  for (let i = 0; i < arr.length; i++) {
    sun += code.charAt(i) * arr[i]
  }
  return (proof + sum -1) % 11 == 0
}

const charOrNum = (rule, value, callback, num) => {
  let reg = new RegExp('^[A-Za-z0-9]{'+num+'}$')
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error(`请输入${num}位字母或数字`))
  } else {
    callback()
  }
}
// 11位或12位
const pattCode = (rule, value, callback) => {
  let reg = /^[A-Za-z0-9]{11}$/, bankCode = /^[A-Za-z0-9]{12}$/
  if (value != '' && value != null && !(reg.test(value) || bankCode.test(value))) {
    callback(new Error('请输入11或12位字母或数字'))
  } else {
    callback()
  }
}

// 6位數字
const codeNum = (rule, value, callback, num) => {
  let reg = new RegExp('^[0-9]{'+num+'}$')
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error(`请输入${num}位数字`))
  } else {
    callback()
  }
}
// 32位以内
const lengthLimit = (rule, value, callback) => {
  let reg = /^[A-Za-z0-9]{1,32}$/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('请输入1至32位以内字母或数字'))
  } else {
    callback()
  }
}
// 2104字母数字和-
const phoneCode = (rule, value, callback) => {
  let reg = /^[A-Za-z0-9-]{1,32}$/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('请输入1至32位以内字符'))
  } else {
    callback()
  }
}
// 9-18位
const orgcodeLimit = (rule, value, callback) => {
  let reg = /^[A-Za-z0-9]{9,18}$/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('请输入9位或18位企业机构代码或18位统一社会信用代码'))
  } else {
    callback()
  }
}
//以大寫NRA開頭
const NRAorFIN = (rule, value, callback) => {
  if (value.startsWith('NRA')) {
    callback()
  } else {
    callback('请以大写NRA开头')
  }

  let reg = /^[A-Za-z0-9]{1,32}$/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('账号为32位以内'))
  } else {
    callback()
  }
}
// FTN或NRA或OSA开头
const startFIN = (rule, value, callback) => {
  if (value != '' && value != null && value.startsWith('FTN') || value.startsWith('NRA') || value.startsWith('OSA')) {
    callback()
  } else {
    callback('请以大写NRA开头')
  }
  let reg = /^[A-Za-z0-9]{1,32}$/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('账号为32位以内'))
  } else {
    callback()
  }
}
// 大於等於0的整數
const thenZero = (rule, value, callback) => {
  let reg = /^[0-9]{1}[0-9]*$/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入大于等于0的整数'))
  } else {
    callback()
  }
}

// 小於1且小數點后一至三位的非負小數
const decimal = (rule, value, callback) => {
  let reg = /^0\.\d{1,3}$/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入小于1且小数点后一至三的非负小数'))
  } else {
    callback()
  }
}
// 大於1小於99999
const lessThenThousand = (rule, value, callback) => {
  let reg = /^[1-9]\d{0,4}$/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入的值大于1小于99999'))
  } else {
    callback()
  }
}
// 大於1小於100
const less100 = (rule, value, callback) => {
  let reg = /^([1-9]\d?(\.\d{1,2})?|0.\d{1,2}|100)$/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入的值大于1小于100'))
  } else {
    callback()
  }
}

// Currency 表示金額，符號位可選，整數部分最長22位，小數部分0-2位，不能包含逗號等分隔符，如8979.05 
// sign: gt>0 lt<0 equal大於等於0
// (sign == 'equal' && Number(value) < 0 || ()
const currencyValid = (rule, value, callback, sign) => {
  let reg = /(^(\+|-){0,1}\d{1,22}\.\d{2}$)|(^(\+|-){1,22}\.\d{1}$)|(^(\+|-){0,1}\d{1,22}$)/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入整数部分最长22位，最多保留两位小数'))
  } else {
    let msg = sign && (sign == 'gt' ? '大于0' : (sign == 'lt' ? '小于0' : '大于等于0')) || ''
    if ((sign == 'gt' && (Number(value) < 0 || Number(value) == 0)) || (sign == 'equal' && Number(value) < 0) || (sign =='lt' && (Number(value) > 0 || Number(value) == 0))) {
      callback(new Error(`请输入整数部分最长22位以内${msg}的数字，最多保留两位小数`))
    } else {
      callback()
    }
  }
}

// Integer 表示整數，符號位可選，數值部分最長8位
const intergerValid = (rule, value, callback) => {
  let reg = /(^(\+|-){0,1}\d{1,8}$)/
  if (value !='' && value != null && !(reg.test(value))) {
    callback(new Error('请输入8位以内数字'))
  } else {
    callback()
  }
}
// Decimal(15,8)(11,7)(8,4)类型验证 totalLen: 整數部分  decLen:小數部分 sign: gt>0 lt<0 equal大於等於0
const decimalValid = (rule, value, callback, totalLen, decLen, sign) => {
  let reg = ''
  let numLen = ''
  if (totalLen && decLen && typeof(totalLen) == 'number' && typeof(decLen) == 'number') {
    numLen = totalLen - decLen - 1
    reg = new RegExp('(^(\\+|-){0,1}\\d{1,'+numLen+'}$|^(\\+|-){0,1}\\d{1,'+numLen+'}\\.{1}\\d{0,'+decLen+'}$)')
  }
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new RegExp(`请输入整数部分不超过${numLen}位的数字，最多保留${decLen}位小数`))
  } else {
    let msg = sign && (sign == 'gt' ? '大于0' : (sign == 'lt' ? '小于0' : '大于等于0')) || ''
    if ((sign == 'gt' && (Number(value) < 0 || Number(value) == 0)) || (sign == 'equal' && Number(value) < 0) || (sign == 'lt' && (Number(value) > 0 || Number(value) == 0))) {
      callback(new RegExp(`请输入整数部分不超过${numLen}位${msg}的数字，最多保留${decLen}位小数`))
    } else {
      callback()
    }
  }
}

// Decimal(4,2) 0<num<=1 表示实数，如Decimal(13,4),表示数据总长度最长13位(包括小数点)，整数部分最长8位，小数部分固定4位
const decimal42Valid = (rule, value, callback) => {
  let reg = /(^0(\.[0-9]{1,2}){0,1}$)|(^1(\.0{1,2}){0,1}$)/
  if (value != '' && value != null && !(reg.test(value)) || Number(value) == 0) {
    callback(new RegExp('请输入4位以内大于0小于等于1的数字，最多保留2位小数'))
  } else {
    callback()
  }
}
const enOrNum = (rule, value, callback, num) => {
  let reg = (num && typeof(num) == 'number') ? new RegExp('^[A-Za-z0-9]{1,'+num+'}$') : /^[A-Za-z0-9]{1,22}$/
  if (value != '' && value != null && !(reg.test(value)) || Number(value) == 0) {
    let msg = (num && typeof(num) == 'number' ? num: 22)
    callback(new RegExp(`请输入1至${msg}位字母或数字`))
  } else {
    callback()
  }
}

// 整數1-至4位，小數1-3位
const main4sub3 = (rule, value, callback) => {
  let reg = /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,3}$)/
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new RegExp('整数位1-4位，小数1-3位'))
  } else {
    callback()
  }
}

const finrate = (rule, value, callback) => {
  // let reg = /^0\.\d{1,7}$/  // 这是小于1的
  // let reg = /(^0(\.[0-9]{1,7}){0,1}$)|(^1(\.0{1,7}){0,1}$)/;  // 0<value<1, 不支持负数
  // let reg  = /(^([\.\-\d]{1,7})$)|(^1(\.0{1,7}){0,1}$)/; // （负数 负小数 大于1 ，包含符号位一共7位） 如：reg.test('-89')
  let reg = /(^0(\.[0-9]{1,7}){0,1}$)|(^1(\.0{1,7}){0,1}$)|(^[-](\d+(\.\d{1,7})?)$)/ // 负数 负小数 小于等于1 小数位1至7位
  if (value != '' && value != null && !(reg.test(value))) {
    callback(new Error('请输入小于等于1的数字，小数位1至7位'))
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