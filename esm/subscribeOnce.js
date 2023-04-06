import subscribe from './subscribe'
import unsubscribe from './unsubscribe'

/**
 * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
 * ========================================================================
 * @method subscribeOnce
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 * @return {String|Boolean}
 */
const subscribeOnce = (topic, handler) => {
  return subscribe(topic, function () {
    unsubscribe(topic, handler)
    handler.apply(this, arguments)
  })
}

export default subscribeOnce
