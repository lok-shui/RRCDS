import axios from 'axios'
import qs from 'qs'
/**
 * GET請求
 */
var _get = (url, params = {}) => {
  const service = axios.create({
    timeout: 15000,
    withCredentials: true, // 允許携帶cookie
  })
  // response攔截
  service.interceptors.response.use(
    async response => {
      return response
    },
    async error => {
      return Promise.reject(error)
    }
  )
  return service.get(url, {params}).then(res => res)
}
/**
 * POST請求
 */
var _post = (url, params = {}) => {
  const service = axios.create({
    timeout: 15000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  service.interceptors.response.use(
    async response =>{
      return response
    },
    async error => {
      return Promise.reject(error)
    }
  )
  return service.post(url, qs.stringify(params)).then(res => res);
}
/**
 * 封裝Post請求，dataType為JSON
*/
var _jsonPost = (url, params = {}, callback) => {
  const service = axios.create({
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  })
  service.interceptors.response.use(
    async ({data}) => {
      const response = data;
      if(response.success) {
        return response || '';
      }
      return Promise.reject(response)
    },
    async error => {
      return Promise.reject(error)
    }
  )
  return service.post(url, params).then( res => res);
}
/**
 *封裝文件上傳請求
 */
 var _upload = (url, params = {}) => {
  const service = axios.create({
    timeout: 15000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  service.interceptors.response.use(
    async response =>{
      return response
    },
    async error => {
      return Promise.reject(error)
    }
  )
  return service.post(url, params).then(res => res);
}

var Api = {
  get: _get,
  jsonPost: _jsonPost,
  post: _post,
  upload: _upload
}
export default Api;