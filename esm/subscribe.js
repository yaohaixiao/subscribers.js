import _subscribers from './_subscribers'
import isFunction from './isFunction'
import guid from './guid'

/**
 * 订阅主题，并给出处理器函数
 * ========================================================================
 * @method subscribe
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 */
const subscribe = (topic, handler) => {
  const token = guid()

  if (!isFunction(handler)) {
    return false
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = []
  }

  _subscribers[topic].push({
    callback: handler,
    token
  })

  return token
}

export default subscribe
