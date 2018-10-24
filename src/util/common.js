import moment from 'moment'
import Vue from 'vue'

moment.locale('zh-cn')

Vue.filter('currency', (value, currency, decimals) => {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head + _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + _float
})

let util = {
  getMoment () {
    return moment()
  },
  getCurrentDate () {
    return moment().format('YYYY年MM月DD日 HH点mm分')
  },
  getDateFormat (date, format = 'YYYY-MM-DD') {
    return moment(date).format(format)
  },
  getTimeFormat (date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format)
  },
  formatNumber (value, currency, decimals) {
    return Vue.filter('currency')(value, currency, decimals)
  }
}

export default util
