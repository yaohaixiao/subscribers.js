import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

/**
 * 获取全部或者包含 topic 主题的订阅者信息
 * ========================================================================
 * @method getSubscribers
 * @param {String} [topic] - （可选）主题名称
 *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
 *                            不传递 topic 参数，返回全部订阅者信息
 * @returns {*[]}
 */
const getSubscribers = (topic) => {
  const subscribers = []

  Object.keys(_subscribers).forEach((subscriber) => {
    const observer = {}

    if(!topic) {
      observer[subscriber] = _subscribers[subscriber]
      subscribers.push(observer)
    } else {
      if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
        observer[subscriber] = _subscribers[subscriber]
        subscribers.push(observer)
      }
    }
  })

  return subscribers
}

export default getSubscribers
