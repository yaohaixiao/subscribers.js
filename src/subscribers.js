let _subscribers = {}

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
  return (
    typeof val === 'function' ||
    Object.prototype.toString.apply(val) === '[object Function]'
  )
}

const hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

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

const publish = (topic, data) => {
  const deliver = (topic) => {
    if (!hasDirectSubscribersFor(topic)) {
      return false
    }

    _subscribers[topic].forEach((handler) => {
      handler(data)
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
 * @param {String} topic - 主题名称
 * @param {Function} handler - 主题的处理器函数
 */
const subscribe = (topic, handler) => {
  if (!isFunction(handler)) {
    return false
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = []
  }

  _subscribers[topic].push(handler)
}

const unsubscribe = (topic, handler) => {
  let index = -1
  let subscription = []

  if (!hasSubscribers(topic)) {
    return false
  }

  subscription = _subscribers[topic]

  if (isFunction(handler)) {
    subscription.forEach((fn, i) => {
      if (fn === handler) {
        index = i
      }
    })

    if (index > -1) {
      subscription.splice(index, 1)

      /* istanbul ignore else */
      if (subscription.length < 1) {
        deleteSubscriber(topic)
      }
    }
  } else {
    deleteSubscriber(topic)
  }
}

const subscribeOnce = (topic, handler) => {
  subscribe(topic, function () {
    unsubscribe(topic, handler)
    handler.apply(this, arguments)
  })
}

const getSubscribers = (topic) => {
  const subscriptions = []

  Object.keys(_subscribers).forEach((subscription) => {
    if (
      hasOwn(_subscribers, subscription) &&
      subscription.indexOf(topic) === 0
    ) {
      const option = {}

      option[subscription] = _subscribers[subscription]
      subscriptions.push(option)
    }
  })

  return subscriptions
}

const deleteSubscriber = (topic) => {
  if (!hasOwn(_subscribers, topic)) {
    return false
  }

  delete _subscribers[topic]
}

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
  publish(topic, data) {
    publish(topic, data)

    return this
  },

  subscribe(topic, handler) {
    subscribe(topic, handler)

    return this
  },

  subscribeOnce(topic, handler) {
    subscribeOnce(topic, handler)

    return this
  },

  unsubscribe(topic, handler) {
    unsubscribe(topic, handler)

    return this
  },

  getSubscriptions(topic) {
    return getSubscribers(topic)
  },

  deleteSubscription(topic) {
    deleteSubscriber(topic)

    return this
  },

  deleteSubscriptions(topic) {
    deleteSubscribers(topic)

    return this
  },

  clear() {
    clear()

    return this
  }
}
