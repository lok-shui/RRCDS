const path = require('path')
const pkg = require('./package.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 引入圖形化信息插件
const rawArgv = process.argv.slice(2)

function resolve(dir) {
  return path.json(__dirname, dir)
}

const name = pkg.name || process.env.VUE_APP_NAME // 主頁標題
const port = process.env.VUE_APP_PORT // dev port

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  assetsDir: process.env.VUE_APP_ASSETS_DIR,

}
