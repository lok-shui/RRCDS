import fetch from "@/api/fetch/index";
import { packageList } from '@/config/package-const-config'

let BASE = packageList.current.serverUrl ? `${packageList.current.serverUrl}/rcds` : '/rcds';

// 下載報文
const getDownload = (params) => fetch.post(`${BASE}/download/msglod/get`, params)
// 導出
const msgExport = (params) => fetch.post(`${BASE}/msg/msgOut/export`, params)

export default {
  getDownload,
  msgExport,
}