/**
 * 检测测试数据是否为 Array 类型
 * ========================================================================
 * @method isArray
 * @param {*} val - 要检测的数据
 * @returns {Boolean} - 'val' 是 Array 则返回 true，否则返回 false
 */
const isArray = (val) => {
  const toString = Object.prototype.toString
  return Array.isArray
    ? Array.isArray(val)
    : toString.apply(val) === '[object Array]'
}

export default isArray
