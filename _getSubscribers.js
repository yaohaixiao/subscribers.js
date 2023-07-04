import hasOwn from './utils/hasOwn'
import _subscribers from './_subscribers'

const _getSubscribers = (topic) => {
  const keys = Object.keys(_subscribers)
  let subscribers = []

  if (keys.length < 1) {
    return subscribers
  }

  keys.forEach((subject) => {
    const observer = {}
    if (hasOwn(_subscribers, subject) && subject.startsWith(topic)) {
      observer[subject] = _subscribers[subject]
      subscribers.push(observer)
    }
  })

  return subscribers
}

export default _getSubscribers
