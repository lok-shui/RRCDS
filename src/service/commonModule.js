import API from '@/api/apis/common'

async function getDownload(params) {
  try{
    const response = await API.getDownload(params)
    if (response.data) {
      const res = response.data;
      return res;
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
async function msgExport(params) {
  try{
    const response = await API.msgExport(params)
    if (response.data) {
      const res = response.data;
      return res;
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  getDownload,
  msgExport,
}
