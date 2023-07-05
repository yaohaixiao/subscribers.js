import _subscribers from './_subscribers'

/**
 * 清理所有订阅者信息
 * ========================================================================
 * @method clear
 */
const clear = () => {
  const keys = Object.keys(_subscribers)

  if (keys.length < 1) {
    return false
  }

  keys.forEach((subject) => {
    delete _subscribers[subject]
  })
}

export default clear
