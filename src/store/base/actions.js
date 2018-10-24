import types from './mutation-types'

const actions = {
  // 设置用户名
  setUsername: ({ commit }, payload) => {
    commit(types.USERNAME, payload)
  },
  // 根据路由对象更新面包屑状态
  updateBreadCrumb: ({ commit }, payload) => {
    commit(types.BREADCRUMB, payload)
  }
}

export default actions
