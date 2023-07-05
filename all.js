import on from './on'

/**
 * 订阅所有主题消息发布，任何消息发布都会执行 handler() 处理器
 * ========================================================================
 * @method all
 * @param {Function} handler - （必须）事件监听的处理器方法
 * @returns {String|Boolean}
 */
const all = (handler) => {
  return on('*', handler)
}

export default all
