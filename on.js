import _subscribers from './_subscribers'
import isFunction from './utils/isFunction'
import guid from './utils/guid'

/**
 * 订阅主题，并给出处理器函数
 * ========================================================================
 * @method on
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 * @return {String|Boolean} - 唯一的 token 字符串，例如：'guid-1'。
 */
const on = (topic, handler) => {
  const token = guid()

  if (!isFunction(handler)) {
    return false
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = []
  }

  _subscribers[topic].push({
    topic,
    callback: handler,
    token
  })

  return token
}

export default on
