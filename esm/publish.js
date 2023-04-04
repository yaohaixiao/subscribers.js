import _subscribers from './_subscribers'
import hasSubscribers from './hasSubscribers'
import hasDirectSubscribersFor from './hasDirectSubscribersFor'

/**
 * 发布订阅主题信息
 * ========================================================================
 * 主题默认是异步发布的。确保在消费者处理主题时，主题的发起者不会被阻止。
 * ========================================================================
 * @method publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 * @param {Boolean} async - (可选) 是否异步发布
 */
const publish = (topic, data, async = true) => {
  const execute = (topic) => {
    if (!hasDirectSubscribersFor(topic)) {
      return false
    }

    _subscribers[topic].forEach((subscriber) => {
      subscriber.callback(data)
    })
  }
  const deliver = () => {
    let subscriber = topic
    let position = topic.lastIndexOf('.')

    while (position !== -1) {
      subscriber = subscriber.substring(0, position)
      position = subscriber.lastIndexOf('.')

      execute(subscriber)
    }

    execute(topic)
  }

  if (!hasSubscribers(topic)) {
    return false
  }

  if (async) {
    setTimeout(deliver, 4)
  } else {
    deliver()
  }
}

export default publish
