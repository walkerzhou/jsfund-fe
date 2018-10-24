import _ from 'underscore'

/**
 * @description
 * @param object
 * @returns {*}
 */
export function isFunction (object) {
  return _.isFunction(object)
}

/**
 * @description 获取cookie
 * @param name
 * @returns {string}
 */
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
