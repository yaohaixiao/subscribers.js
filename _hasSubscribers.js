import _hasDirectSubscribersFor from './_hasDirectSubscribersFor'

/**
 * 判断是否存在包含 topic 指定的订阅者信息
 * ========================================================================
 * @method _hasSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const _hasSubscribers = (topic) => {
  let found = _hasDirectSubscribersFor(topic)
  let position = topic.lastIndexOf('.')

  while (!found && position !== -1) {
    topic = topic.substring(0, position)
    position = topic.lastIndexOf('.')
    found = _hasDirectSubscribersFor(topic)
  }

  return found
}

export default _hasSubscribers
