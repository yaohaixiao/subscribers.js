import isString from './isString'

/**
 * 判断测试数据是否为订阅者的 token 字符串
 * ========================================================================
 * @method isToken
 * @param {String} str - 测试数据
 * @return {Boolean}
 */
const isToken = (str) => {
  const pattern = /^guid-\d+$/i
  return isString(str) && pattern.test(str)
}

export default isToken
