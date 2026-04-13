const originalConsoleWarn = console.warn;
console.warn = function (...args) {
  // 过滤 aria-hidden 相关的警告
  if (args.length && typeof args[0] === 'string') {
    const message = args[0];
    if (message.includes('aria-hidden') ||
      message.includes('Blocked aria-hidden') ||
      message.includes('focus must not be hidden')) {
      return; // 忽略这些警告
    }
  }
  originalConsoleWarn.apply(console, args);
};

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
