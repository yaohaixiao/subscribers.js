import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

/**
 * 判断是否存在特定 topic 指定的订阅者信息
 * ========================================================================
 * @method hasDirectSubscribersFor
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

export default hasDirectSubscribersFor
