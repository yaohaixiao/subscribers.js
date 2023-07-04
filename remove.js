import _removeSubscriber from './_removeSubscriber'
import _removeSubscribers from './_removeSubscribers'
import isArray from './utils/isArray'
import isString from './utils/isString'

/**
 * 删除特定 topic 主题的订阅者信息。
 * ========================================================================
 * methods
 * @param {String|Array} topic
 */
const remove = (topic) => {
  if (isArray(topic)) {
    _removeSubscribers(topic)
  } else {
    if (isString(topic)) {
      _removeSubscriber(topic)
    }
  }
}

export default remove
