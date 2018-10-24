import qs from 'qs'
import http from 'axios'
import { BASE_URL } from '../util/constant'

http.defaults.timeout = 30000
http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

const baseURL = BASE_URL
const escapeJsonContentType = 'application/x-www-form-urlencoded'
const methods = ['get', 'delete', 'head', 'jsonp', 'download', 'post', 'put', 'patch']
const methodsWidthBody = ['post', 'put', 'patch', 'delete']

function install (Vue, options) {
  let ajax = {}
  methods.forEach(method => {
    ajax[method] = getRequest(method)
  })

  // ajax封装
  function getRequest (method) {
    return function (url, data = {}, options = {baseURL, json: true, hasFile: false, headers: {}}) {
      Object.assign(options, {url, method})

      if (!options['headers']) {
        options['headers'] = {}
      }

      if (!options['baseURL']) {
        options['baseURL'] = baseURL
      }

      options['headers']['Content-Type'] = 'application/json'
      if (options['hasFile']) {
        options['headers']['Content-Type'] = 'multipart/form-data'
        let formData = new FormData()
        for (var key in data) {
          formData.append(key, data[key])
        }
        data = formData
      } else if (!options['json']) {
        // x-www-form格式处理
        options['headers']['Content-Type'] = escapeJsonContentType
        data = qs.stringify(data)
        console.log(data)
      }

      if (methodsWidthBody.includes(method)) {
        options['data'] = data
      } else {
        options['params'] = data
      }
      // console.log('ajax配置', options)
      return http['request'](options).then(doResponse).catch(doError)
    }
  }

  // 响应处理
  function doResponse (res) {
    const {status, statusText, data = {}} = res
    if (status !== 200) {
      return Promise.reject(new Error(`[${status}]HTTP 请求失败: ${statusText}`))
    }
    if (data.status !== 200) {
      const {error_code: code = data.status, error_msg: msg = data.statusText} = data
      return Promise.reject(new Error(`[${code}]:${msg}`))
    }
    return data
  }

  // 异常处理
  function doError (error) {
    const {message = '发生未知异常'} = error || {}
    Vue.prototype.$Message.error(message)
    return Promise.reject(new Error(message))
  }

  Vue.$ajax = Vue.prototype.$ajax = ajax
}

export default {
  install
}
