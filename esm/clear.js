// eslint-disable-next-line no-unused-vars
import _subscribers from './_subscribers'

/**
 * 清理所有订阅者（主题和处理器的）信息
 * ========================================================================
 * @method clear
 */
const clear = () => {
  // eslint-disable-next-line no-import-assign
  _subscribers = {}
}

export default clear
