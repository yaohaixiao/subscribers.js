import _subscribers from './_subscribers'

/**
 * 清理所有订阅者（主题和处理器的）信息
 * ========================================================================
 * @method clear
 */
const clear = () => {
  const keys = Object.keys(_subscribers)

  if (keys.length < 1) {
    return false
  }

  keys.forEach((prop) => {
    delete _subscribers[prop]
  })
}

export default clear
