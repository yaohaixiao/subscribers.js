import _subscribers from './_subscribers'
import isToken from './utils/isToken'
import isString from './utils/isString'
import _getAllSubscribers from './_getAllSubscribers'
import _getSubscribers from './_getSubscribers'
import _getSubscriberByToken from './_getSubscriberByToken'

/**
 * 获取全部或者包含 topic 主题或者订阅 token 的订阅者信息
 * ========================================================================
 * @method get
 * @param {String} [topic] - （可选）主题名称或者订阅 token 值
 *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
 *                            不传递 topic 参数，返回全部订阅者信息
 * @returns {Array|Object}
 */
const get = (topic) => {
  const keys = Object.keys(_subscribers)

  if (keys.length < 1) {
    return []
  }

  if (!topic) {
    return _getAllSubscribers()
  } else {
    if (isToken(topic)) {
      return _getSubscriberByToken(topic)
    } else if (isString(topic)) {
      return _getSubscribers(topic)
    }
  }
}

export default get
