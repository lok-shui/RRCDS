import API from '@/api/apis/financing'

async function incomeFind(params) {
  try{
    const response = await API.incomeFind(params)
    if (response.data) {
      const res = response.data;
      return res;
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  incomeFind,
}