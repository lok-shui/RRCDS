import { configServer } from '../utils/index'

let curServer = configServer()
let baseUrl = curServer.serverUrl ? `${curServer.serverUrl}/rcds/` : '/rcds/';

const apiUrl = {
  common: {
    createget: baseUrl + 'cm/cmoublng/bank', // bank接口
  },
  page2135: {
    find: baseUrl + 'excap/excapcisbpinfo/find',
    inser: baseUrl + 'excap/excapcisbpinfo/insert',
  },

}

export {
  apiUrl
}