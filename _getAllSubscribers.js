import _subscribers from './_subscribers'

/**
 * 获取全部的订阅者信息
 * ========================================================================
 * @method _getAllSubscribers
 * @returns {{}} - 返回全部的订阅信息
 * @private
 */
const _getAllSubscribers = () => {
  return _subscribers
}

export default _getAllSubscribers
