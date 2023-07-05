import hasOwn from './utils/hasOwn'
import _subscribers from './_subscribers'

/**
 * 获取与指定 topic 相关的订阅者信息
 * ========================================================================
 * @method _getSubscribers
 * @param {String} topic - （必须）订阅主题字符串
 * @returns {Array} - 返回订阅者信息集合（数组）
 * @private
 */
const _getSubscribers = (topic) => {
  const keys = Object.keys(_subscribers)
  let subscribers = []

  if (keys.length < 1) {
    return subscribers
  }

  keys.forEach((subject) => {
    const subscriber = {}

    if (hasOwn(_subscribers, subject) && subject.startsWith(topic)) {
      subscriber[subject] = _subscribers[subject]
      subscribers.push(subscriber)
    }
  })

  return subscribers
}

export default _getSubscribers
