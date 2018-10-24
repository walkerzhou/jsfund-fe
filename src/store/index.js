import Vue from 'vue'
import Vuex from 'vuex'
import state from './base/state'
import actions from './base/actions'
import getters from './base/getters'
import mutations from './base/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  },
  plugins: []
})
