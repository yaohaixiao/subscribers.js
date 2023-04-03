import _subscribers from './_subscribers'
import hasSubscribers from './hasSubscribers'
import hasDirectSubscribersFor from './hasDirectSubscribersFor'

/**
 * 发布订阅主题信息
 * ========================================================================
 * @method publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 * @returns {Boolean}
 */
const publish = (topic, data) => {
  const deliver = (topic) => {
    if (!hasDirectSubscribersFor(topic)) {
      return false
    }

    _subscribers[topic].forEach((observer) => {
      observer.callback(data)
    })
  }
  let subscriber = topic
  let position = topic.lastIndexOf('.')

  if (!hasSubscribers(topic)) {
    return false
  }

  while (position !== -1) {
    subscriber = subscriber.substring(0, position)
    position = subscriber.lastIndexOf('.')

    deliver(subscriber)
  }

  deliver(topic)
}

export default publish
