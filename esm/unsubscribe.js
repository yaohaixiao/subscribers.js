import _subscribers from './_subscribers'
import isFunction from './isFunction'
import hasSubscribers from './hasSubscribers'
import deleteSubscriber from './deleteSubscriber'

/**
 * 取消订阅主题
 * ========================================================================
 * @method unsubscribe
 * @param {String} topic - （必须）订阅的主题
 * @param {Function|String} [token] - （可选）订阅主题的处理器函数或者唯一 Id 值
 */
const unsubscribe = (topic, token) => {
  let index = -1
  let subscriber = []

  if (!hasSubscribers(topic)) {
    return false
  }

  subscriber = _subscribers[topic]

  if (token) {
    subscriber.forEach((observer, i) => {
      if (observer.callback === token && isFunction(token)) {
        index = i
      } else {
        if (observer.token === token && typeof token === 'string') {
          index = i
        }
      }
    })

    if (index > -1) {
      subscriber.splice(index, 1)

      /* istanbul ignore else */
      if (subscriber.length < 1) {
        deleteSubscriber(topic)
      }
    }
  } else {
    deleteSubscriber(topic)
  }
}

export default unsubscribe
