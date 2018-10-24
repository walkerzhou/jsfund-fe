import types from './mutation-types'

const mutations = {
  [types.USERNAME] (state, username) {
    if (username) {
      state.username = username
    }
  },
  [types.BREADCRUMB] (state, route) {
    if (!route.matched) return
    let breads = []
    let param = Object.assign({}, route.params, route.query)
    route.matched.forEach(e => {
      let breadName = e.meta.breadName
      breadName = typeof breadName === 'function' ? breadName(param) : breadName
      breads.push({
        breadName: breadName,
        breadIcon: e.meta.breadIcon,
        routeName: e.name,
        path: e.path
      })
    })
    state.breadCrumb = breads
  }
}
export default mutations
