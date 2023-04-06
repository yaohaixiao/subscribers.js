import publish from './publish'

/**
 * 同步发布订阅主题信息
 * ========================================================================
 * @method notify
 * @alias publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 */
const notify = (topic, data) => {
  publish(topic, data, false)
}

export default notify
