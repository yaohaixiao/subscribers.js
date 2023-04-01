import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

const hasDirectSubscribersFor = (topic) => {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0
}

export default hasDirectSubscribersFor
