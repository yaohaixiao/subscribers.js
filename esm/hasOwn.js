/**
 * 检测对象自身属性中是否具有指定的属性。
 * ========================================================================
 * @method hasOwn
 * @param {Object} obj - 检测的目标对象
 * @param {String} prop - 属性名
 * @returns {Boolean}
 *
 * @example
 */
const hasOwn = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export default hasOwn
