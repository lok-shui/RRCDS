// 原生axios
import axios from 'axios'

let baseURL = '/rcds'

// 實際項目中用獨立的文件分類出來
const apiRequest = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  withCredentials: true,
  proxy: {
    host: 'http://44.39.12.163:6061',
    prot: 8058
  }
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.default.headers.withCredentials = true

// 實際項目中用獨立的文件分類出來
const api = {
  rcds: '/rcds/exin/iein/ininfo/page'
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "-1",
  language: "en",
  "Content-Type": 'application/json;charset=UTF-8'
}

// 實際項目中用獨立的文件封裝
function postPage(parameter) {
  return apiRequest({
    method: "post",
    url: api.rcds,
    data: parameter,
    headers: headers
  })
}

export default {
  postPage
}