let _subscribers = {}

/**
 * 生成唯一 id 字符串的函数
 * ========================================================================
 * @method guid
 * @param {String} [prefix] - 生成 id 的前缀字符串
 * @return {String} 返回一个
 */
const guid = (() => {
  let id = 0

  return (prefix = 'guid-') => {
    id += 1

    return `${prefix + id}`
  }
})()

/**
 * 检测对象自身属性中是否具有指定的属性。
 * ========================================================================
 * @method hasOwn
 * @param {Object} obj - （必须）检测的目标对象
 * @param {String} prop - （必须）属性名
 * @returns {Boolean}
 */
const hasOwn = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * 检测测试数据是否为 Function 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - （必须）待检测的数据
 * @returns {Boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
const isFunction = (val) => {
  return Object.prototype.toString.apply(val) === '[object Function]'
}

/**
 * 判断是否存在特定 topic 指定的订阅者信息
 * ========================================================================
 * @method hasDirectSubscribersFor
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

/**
 * 判断是否存在包含 topic 指定的订阅者信息
 * ========================================================================
 * @method hasSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const hasSubscribers = (topic) => {
  let found = hasDirectSubscribersFor(topic)
  let position = topic.lastIndexOf('.')

  while (!found && position !== -1) {
    topic = topic.substring(0, position)
    position = topic.lastIndexOf('.')
    found = hasDirectSubscribersFor(topic)
  }

  return found
}

/**
 * 发布订阅主题信息
 * ========================================================================
 * @method publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 * @returns {Boolean}
 */
const publish = (topic, data) => {
  const deliver = (topic) => {
    if (!hasDirectSubscribersFor(topic)) {
      return false
    }

    _subscribers[topic].forEach((observer) => {
      observer.callback(data)
    })
  }
  let subscriber = topic
  let position = topic.lastIndexOf('.')

  if (!hasSubscribers(topic)) {
    return false
  }

  while (position !== -1) {
    subscriber = subscriber.substring(0, position)
    position = subscriber.lastIndexOf('.')

    deliver(subscriber)
  }

  deliver(topic)
}

/**
 * 订阅主题，并给出处理器函数
 * ========================================================================
 * @method subscribe
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 */
const subscribe = (topic, handler) => {
  const token = guid()

  if (!isFunction(handler)) {
    return false
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = []
  }

  _subscribers[topic].push({
    callback: handler,
    token
  })

  return token
}

/**
 * 取消订阅主题
 * ========================================================================
 * @method unsubscribe
 * @param {String} topic - （必须）订阅的主题
 * @param {Function|String} [token] - （可选）订阅主题的处理器函数
 */
const unsubscribe = (topic, token) => {
  let index = -1
  let subscriber = []

  if (!hasSubscribers(topic)) {
    return false
  }

  subscriber = _subscribers[topic]

  if (token) {
    subscriber.forEach((observer, i) => {
      if (observer.callback === token && isFunction(token)) {
        index = i
      } else {
        if (observer.token === token && typeof token === 'string') {
          index = i
        }
      }
    })

    if (index > -1) {
      subscriber.splice(index, 1)

      /* istanbul ignore else */
      if (subscriber.length < 1) {
        deleteSubscriber(topic)
      }
    }
  } else {
    deleteSubscriber(topic)
  }
}

/**
 * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
 * ========================================================================
 * @method subscribeOnce
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 */
const subscribeOnce = (topic, handler) => {
  return subscribe(topic, function () {
    unsubscribe(topic, handler)
    handler.apply(this, arguments)
  })
}

/**
 * 获取全部或者包含 topic 主题的订阅者信息
 * ========================================================================
 * @method getSubscribers
 * @param {String} [topic] - （可选）主题名称
 *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
 *                            不传递 topic 参数，返回全部订阅者信息
 * @returns {*[]}
 */
const getSubscribers = (topic) => {
  const subscribers = []

  Object.keys(_subscribers).forEach((subscriber) => {
    const observer = {}

    if(!topic) {
      observer[subscriber] = _subscribers[subscriber]
      subscribers.push(observer)
    } else {
      if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
        observer[subscriber] = _subscribers[subscriber]
        subscribers.push(observer)
      }
    }
  })

  return subscribers
}

/**
 * 删除特定 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscriber
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const deleteSubscriber = (topic) => {
  if (!hasOwn(_subscribers, topic)) {
    return false
  }

  delete _subscribers[topic]
}

/**
 * 删除包含 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
const deleteSubscribers = (topic) => {
  if (!hasSubscribers(topic)) {
    return false
  }

  Object.keys(_subscribers).forEach((subscriber) => {
    if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
      delete _subscribers[subscriber]
    }
  })
}

const clear = () => {
  _subscribers = {}
}

// eslint-disable-next-line no-unused-vars
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
    subscribe(topic, handler)

    return this
  },
  /**
   * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
   * ========================================================================
   * @method subscribeOnce
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   */
  subscribeOnce(topic, handler) {
    subscribeOnce(topic, handler)

    return this
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
