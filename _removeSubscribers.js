import _subscribers from './_subscribers'
import hasOwn from './utils/hasOwn'
import has from './has'

/**
 * 删除包含 topic 主题的订阅者信息
 * ========================================================================
 * @method _removeSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const _removeSubscribers = (topic) => {
  const keys = Object.keys

  if (!has(topic) || keys.length < 1) {
    return false
  }

  keys(_subscribers).forEach((subject) => {
    if (hasOwn(_subscribers, subject) && subject.startsWith(topic)) {
      delete _subscribers[subject]
    }
  })
}

export default _removeSubscribers
