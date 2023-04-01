import _subscribers from './_subscribers'

const subscribe = (topic, handler) => {
  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = []
  }

  _subscribers[topic].push(handler)
}

export default subscribe
