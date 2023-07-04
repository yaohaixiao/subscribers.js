import _subscribers from './_subscribers'
import hasOwn from './utils/hasOwn'

/**
 * 判断是否存在特定 topic 指定的订阅者信息
 * ========================================================================
 * @method _hasDirectSubscribersFor
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const _hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

export default _hasDirectSubscribersFor
