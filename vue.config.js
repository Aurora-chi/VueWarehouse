const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 定义 resolve 函数
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    name: "admin",
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
})