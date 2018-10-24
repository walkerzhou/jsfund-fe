// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'

import App from './App'
import router from './router'
import store from './store/index'
import plugin from './plugin'

import 'iview/dist/styles/iview.css'
// 全局CSS
import '@assets/css/index.scss'

Vue.use(VueRouter)
Vue.use(iView)

// 安装插件
plugin.install()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
