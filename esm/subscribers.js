import publish from './publish'
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
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @returns {Boolean}
   */
  publish(topic, data) {
    publish(topic, data)

    return this
  },
  /**
   * 订阅主题，并给出处理器函数
   * ========================================================================
   * @method subscribe
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   */
  subscribe(topic, handler) {
    return subscribe(topic, handler)
  },
  /**
   * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
   * ========================================================================
   * @method subscribeOnce
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   */
  subscribeOnce(topic, handler) {
    return subscribeOnce(topic, handler)
  },
  /**
   * 取消订阅主题
   * ========================================================================
   * @method unsubscribe
   * @param {String} topic - （必须）订阅的主题
   * @param {Function} [handler] - （可选）订阅主题的处理器函数
   */
  unsubscribe(topic, handler) {
    unsubscribe(topic, handler)

    return this
  },
  /**
   * 获取全部或者包含 topic 主题的订阅者信息
   * ========================================================================
   * @method getSubscribers
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
   * @param {String} topic - （必须）主题名称
   * @returns {Boolean}
   */
  deleteSubscriber(topic) {
    deleteSubscriber(topic)

    return this
  },
  /**
   * 删除包含 topic 主题的订阅者信息
   * ========================================================================
   * @method deleteSubscribers
   * @param {String} topic - （必须）主题名称
   * @returns {Boolean}
   */
  deleteSubscribers(topic) {
    deleteSubscribers(topic)

    return this
  },
  /**
   * 清理所有订阅者（主题和处理器的）信息
   * ========================================================================
   * @method clear
   */
  clear() {
    clear()

    return this
  }
}

export default Subscribers
