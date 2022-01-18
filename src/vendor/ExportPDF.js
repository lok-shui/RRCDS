import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
function downPDF(ele, pdfName, Margin) {
  window.scroll(0,0)
  var standards // 橫屏或竪屏
  var eleW = ele.offsetWidth
  var eleH = ele.offsetHeight
  var eleOffsetTop = ele.eleOffsetTop
  var eleOfffsetLeft = ele.eleOfffsetLeft
  var canvas = document.createElement('canvas')
  var abs = 0
  var win_in = document.documentElement.clientWidth || document.body.clientWidth // 可視區域width
  var win_out = window.innerWidth // 可視區域width(包括滾動條)

  if(win_out > win_in) {
    abs = (win_out - win_in) / 2
  }

  canvas.width = eleW * 2;
  canvas.height = eleH * 2;

  var context = canvas.getContext('2d')
  context.scale(2, 2)
  context.translate(-eleOfffsetLeft - abs, -eleOffsetTop)

  // 克隆ele元素
  var div = ele.cloneNode(true)
  div.style.position = 'absolute'
  div.style.top = '0px'
  div.style.zIndex = '-100'
  div.width = ele.width
  div.parentNode.style.background = 'white'
  div.parentNode.appendChild(div)
  // 因爲svgIcon是通過symbol引入的svg圖標，html2canvas對svgIcon中的use不識別，故將克隆后元素的svgIcon中use裏的svg提取出來替換svgIcon
  // http://www.w3.org/2000/svg
  var arr = div.getElementByTagName('svg')
  
  for(var i = 0; i < arr.length; i++) {
    var parent = arr[i]
    if(arr[i].getElementByTagName('use')){
      console.log('pdfpdf')
    }
  }


}