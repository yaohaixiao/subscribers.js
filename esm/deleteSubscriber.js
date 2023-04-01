import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

const deleteSubscriber = (topic) => {
  if (!hasOwn(_subscribers, topic)) {
    return false
  }

  delete _subscribers[topic]
}

export default deleteSubscriber
