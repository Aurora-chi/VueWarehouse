const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 定义 resolve 函数
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "admin",
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
})