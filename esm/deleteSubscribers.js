import _subscribers from './_subscribers'
import hasOwn from './hasOwn'
import hasSubscribers from './hasSubscribers'

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

export default deleteSubscribers
