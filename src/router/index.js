import Vue from 'vue'
import Router from 'vue-router'
import enhanceFilter from './router_filter'

import Home from './home'

Vue.use(Router)

let router = new Router({
  routes: [
    ...Home
  ]
})

// router.routes = Array.concat(
//   Home,
//   NotFound,
//   TestList
// )

enhanceFilter(router)

export default router
