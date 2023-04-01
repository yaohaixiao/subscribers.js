import hasDirectSubscribersFor from './hasDirectSubscribersFor'

/**
 * 判断是否存在包含 topic 指定的订阅者信息
 * ========================================================================
 * @method hasSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const hasSubscribers = (topic) => {
  let found = hasDirectSubscribersFor(topic)
  let position = topic.lastIndexOf('.')

  while (!found && position !== -1) {
    topic = topic.substring(0, position)
    position = topic.lastIndexOf('.')
    found = hasDirectSubscribersFor(topic)
  }

  return found
}

export default hasSubscribers
