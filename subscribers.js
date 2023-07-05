import emit from './emit'
import notify from './notify'
import on from './on'
import once from './once'
import all from './all'
import off from './off'
import remove from './remove'
import clear from './clear'
import get from './get'
import has from './has'

const subscribers = {
  /**
   * 发布订阅主题信息
   * ========================================================================
   * @method emit
   * @see emit
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @param {Boolean} async - (可选) 是否异步发布
   * @returns {subscribers}
   */
  emit(topic, data, async = true) {
    emit(topic, data, async)

    return this
  },

  /**
   * 同步发布订阅主题信息
   * ========================================================================
   * @method notify
   * @alias emit
   * @see emit
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @returns {subscribers}
   */
  notify(topic, data) {
    notify(topic, data)

    return this
  },

  /**
   * 订阅主题，并给出处理器函数
   * ========================================================================
   * @method on
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean} -
   */
  on(topic, handler) {
    return on(topic, handler)
  },

  /**
   * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
   * ========================================================================
   * @method once
   * @see once
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean}
   */
  once(topic, handler) {
    return once(topic, handler)
  },

  /**
   * 订阅所有主题消息发布，任何消息发布都会执行 handler() 处理器
   * ========================================================================
   * @method all
   * @see all
   * @param {Function} handler - （必须）处理器函数
   * @return {String|Boolean}
   */
  all(handler) {
    return all(handler)
  },

  /**
   * 取消订阅主题
   * ========================================================================
   * @method off
   * @see off
   * @param {String} topic - （必须）订阅的主题
   * @param {Function|String} [token] - （可选）订阅主题的处理器函数或者唯一 Id 值
   * @returns {subscribers}
   */
  off(topic, token) {
    off(topic, token)

    return this
  },

  /**
   * 删除特定 topic 或者多个主题的订阅者信息
   * ========================================================================
   * @method remove
   * @see _removeSubscriber
   * @see _removeSubscribers
   * @param {String|Array} topic - （必须）主题名称
   * @returns {subscribers}
   */
  remove(topic) {
    remove(topic)

    return this
  },

  /**
   * 清理所有订阅者（主题和处理器的）信息
   * ========================================================================
   * @method clear
   * @see clear
   * @returns {subscribers}
   */
  clear() {
    clear()

    return this
  },

  /**
   * 获取全部或者包含 topic 主题的订阅者信息
   * ========================================================================
   * @method get
   * @param {String} [topic] - （可选）主题名称
   *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
   *                            不传递 topic 参数，返回全部订阅者信息
   * @returns {*[]}
   */
  get(topic) {
    return get(topic)
  },

  /**
   * 判断是否存在包含 topic 指定的订阅者信息
   * ========================================================================
   * @method has
   * @see _hasSubscribers
   * @see _hasDirectSubscribersFor
   * @param {String} topic - （必须）主题名称
   * @param {Boolean} [isDirect] -（可选）是否为直接的主题，默认值：true
   * @returns {Boolean}
   */
  has(topic, isDirect = true) {
    return has(topic, isDirect)
  }
}

export default subscribers
