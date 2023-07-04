import on from './on'
import off from './off'

/**
 * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
 * ========================================================================
 * @method once
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 * @return {String|Boolean} - 唯一的 token 字符串，例如：'guid-1'。
 */
const once = (topic, handler) => {
  return on(topic, function () {
    off(topic, handler)
    handler.apply(this, arguments)
  })
}

export default once
