import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

/**
 * 删除特定 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscriber
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const deleteSubscriber = (topic) => {
  if (!hasOwn(_subscribers, topic)) {
    return false
  }

  delete _subscribers[topic]
}

export default deleteSubscriber
