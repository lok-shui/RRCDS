import { Loading } from 'element-ui'

let needLoadingCount = 0;
let loading;
function startLoading(targetEle) {
  loading = Loading.service({
    target: document.querySelector(targetEle),
    lock: true,
    text: '拼命加载中',
    background: 'rgba(255, 255, 255, .5)',
    spinner: 'el-icon-loading'
  })
}

function endLoading(){
  loading && loading.close()
}

export function showLoading(targetEle) {
  if( needLoadingCount == 0) {
    startLoading(targetEle)
  }
  needLoadingCount++
}

export function hideLoading() {
  if(needLoadingCount < 1) return
  needLoadingCount --
  if(needLoadingCount == 0) {
    endLoading()
  }
}

// 可参考此网址：
// https://blog.csdn.net/qq_41662119/article/details/84968328?locationNum=12&fps=1