import _subscribers from './_subscribers'
import hasOwn from './hasOwn'

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

export default getSubscribers
