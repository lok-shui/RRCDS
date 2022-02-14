import axios from 'axios'
import { Message } from 'element-ui'
import axiosConfig  from './config'

const fetch = axios.create({
  ...axiosConfig
})
fetch.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    let msg
    if (error.response) {
      if (error.response.status >= 500) {
        if (error.response.data.error !== undefined) {
          msg = error.response.data.error
        } else {
          msg = error.response.data
        }
      } else if (error.response.status === 404) {
        msg = error.response.data.error
      }
    }
    console.log('error.response', error.response)
    Message.error(msg)
    return Promise.reject(error)
  }
)

export default fetch;