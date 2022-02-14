const axiosConfig = {
  timeout: 120000, // 超時2分鐘：60*2*1000
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "-1",
    language: "en"
  },
  withCredentials: true
}
export default axiosConfig;