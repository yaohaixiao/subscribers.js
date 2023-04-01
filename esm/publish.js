import _subscribers from './_subscribers'
import hasSubscribers from './hasSubscribers'
import hasDirectSubscribersFor from './hasDirectSubscribersFor'

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

export default publish
