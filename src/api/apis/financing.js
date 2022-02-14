import fetch from "@/api/fetch/index";
import { packageList } from '@/config/package-const-config'

let BASE = packageList.current.serverUrl ? `${packageList.current.serverUrl}/rcds` : '/rcds';

const incomeFind = (params) => fetch.post(`${BASE}/iein/ininfo/find`, params)
// get方法：參數加{}
// const incomeFind = (params) => fetch.get(`${BASE}/iein/ininfo/find`, {params})



export default {
  incomeFind,
}