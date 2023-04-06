import publish from './publish'
import notify from './notify'
import subscribe from './subscribe'
import unsubscribe from './unsubscribe'
import subscribeOnce from './subscribeOnce'
import getSubscribers from './getSubscribers'
import deleteSubscriber from './deleteSubscriber'
import deleteSubscribers from './deleteSubscribers'
import clear from './clear'

const Subscribers = {
  /**
   * 发布订阅主题信息
   * ========================================================================
   * @method publish
   * @see publish
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @param {Boolean} async - (可选) 是否异步发布
   * @returns {Subscribers}
   */
  publish(topic, data, async = true) {
    publish(topic, data, async)

    return this
  },
  /**
   * 同步发布订阅主题信息
   * ========================================================================
   * @method notify
   * @alias publish
   * @see publish
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @returns {Subscribers}
   */
  notify(topic, data) {
    notify(topic, data)

    return this
  },
  /**
   * 订阅主题，并给出处理器函数
   * ========================================================================
   * @method subscribe
   * @see subscribe
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean}
   */
  subscribe(topic, handler) {
    return subscribe(topic, handler)
  },
  /**
   * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
   * ========================================================================
   * @method subscribeOnce
   * @see subscribeOnce
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean}
   */
  subscribeOnce(topic, handler) {
    return subscribeOnce(topic, handler)
  },
  /**
   * 取消订阅主题
   * ========================================================================
   * @method unsubscribe
   * @see unsubscribe
   * @param {String} topic - （必须）订阅的主题
   * @param {Function|String} [token] - （可选）订阅主题的处理器函数或者唯一 Id 值
   * @returns {Subscribers}
   */
  unsubscribe(topic, token) {
    unsubscribe(topic, token)

    return this
  },
  /**
   * 获取全部或者包含 topic 主题的订阅者信息
   * ========================================================================
   * @method getSubscribers
   * @see getSubscribers
   * @param {String} [topic] - （可选）主题名称
   *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
   *                            不传递 topic 参数，返回全部订阅者信息
   * @returns {*[]}
   */
  getSubscriptions(topic) {
    return getSubscribers(topic)
  },
  /**
   * 删除特定 topic 主题的订阅者信息
   * ========================================================================
   * @method deleteSubscriber
   * @see deleteSubscriber
   * @param {String} topic - （必须）主题名称
   * @returns {Subscribers}
   */
  deleteSubscriber(topic) {
    deleteSubscriber(topic)

    return this
  },
  /**
   * 删除包含 topic 主题的订阅者信息
   * ========================================================================
   * @method deleteSubscribers
   * @see deleteSubscribers
   * @param {String} topic - （必须）主题名称
   * @returns {Subscribers}
   */
  deleteSubscribers(topic) {
    deleteSubscribers(topic)

    return this
  },
  /**
   * 清理所有订阅者（主题和处理器的）信息
   * ========================================================================
   * @method clear
   * @see clear
   * @returns {Subscribers}
   */
  clear() {
    clear()

    return this
  }
}

export default Subscribers
