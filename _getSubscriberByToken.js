import _subscribers from './_subscribers'

/**
 * 获取全部的订阅者信息
 * ========================================================================
 * @method _getSubscriberByToken
 * @param {String} token - （必须）订阅者信息 token 字符串
 * @returns {{}} - 返回全部的订阅信息
 * @private
 */
const _getSubscriberByToken = (token) => {
  const keys = Object.keys(_subscribers)
  let targetSubscriber = null

  if (keys.length < 1) {
    return null
  }

  _subscribers.forEach((subscriber) => {
    subscriber.forEach((execution) => {
      if (execution.callback === token || execution.token === token) {
        targetSubscriber = subscriber
      }
    })
  })

  return targetSubscriber
}

export default _getSubscriberByToken
