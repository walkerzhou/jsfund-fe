import iView from 'iview'

// 全局前置守卫
function beforeFilter (router) {
  router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    next()
  })
}
// 全局后置钩子
function afterFilter (router) {
  router.afterEach((to, from) => {
    iView.LoadingBar.finish()
  })
}

// 挂载filter
function enhanceFilter (router) {
  beforeFilter(router)
  afterFilter(router)
}

export default enhanceFilter
