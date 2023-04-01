import _subscribers from './_subscribers'
import hasOwn from './hasOwn'
import hasSubscribers from './hasSubscribers'

/**
 * 删除包含 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const deleteSubscribers = (topic) => {
  if (!hasSubscribers(topic)) {
    return false
  }

  Object.keys(_subscribers).forEach((subscriber) => {
    if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
      delete _subscribers[subscriber]
    }
  })
}

export default deleteSubscribers
