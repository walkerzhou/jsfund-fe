import Vue from 'vue'
import ajax from './ajax'
import Grid from '@components/Grid'
import Modals from '../components/Modals'
import VueECharts from 'vue-echarts'
// import ShowImageInfo from '../views/creative/ShowImageInfo'

function install () {
  Vue.use(ajax)
  Vue.component('Grid', Grid)
  Vue.component('Modals', Modals)
  Vue.component('echart', VueECharts)
}

export default {
  install
}
