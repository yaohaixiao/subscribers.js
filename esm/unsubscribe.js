import _subscribers from './_subscribers'
import isFunction from './isFunction'
import hasSubscribers from './hasSubscribers'
import deleteSubscriber from './deleteSubscriber'

/**
 * 取消订阅主题
 * ========================================================================
 * @method unsubscribe
 * @param {String} topic - （必须）订阅的主题
 * @param {Function} [handler] - （可选）订阅主题的处理器函数
 */
const unsubscribe = (topic, handler) => {
  let index = -1
  let subscription = []

  if (!hasSubscribers(topic)) {
    return false
  }

  subscription = _subscribers[topic]

  if (isFunction(handler)) {
    subscription.forEach((fn, i) => {
      if (fn === handler) {
        index = i
      }
    })

    if (index > -1) {
      subscription.splice(index, 1)

      /* istanbul ignore else */
      if (subscription.length < 1) {
        deleteSubscriber(topic)
      }
    }
  } else {
    deleteSubscriber(topic)
  }
}

export default unsubscribe
