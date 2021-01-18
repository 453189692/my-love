const webpack = require('webpack')

module.exports = {
  lintOnSave:false,
  // pages: {
  //   view: { entry: "src/main.js" }
  // },
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  //生产环境不生成.map文件
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      //禁用SplitChunks插件，以避免生成桌面端、移动端公共的vendor文件
      //对单页面应用来说，其实是没必要的
      splitChunks: false
    }
  },
};
