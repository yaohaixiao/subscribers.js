import publish from './publish'
import subscribe from './subscribe'
import unsubscribe from './unsubscribe'
import subscribeOnce from './subscribeOnce'
import getSubscribers from './getSubscribers'
import deleteSubscriber from './deleteSubscriber'
import deleteSubscribers from './deleteSubscribers'
import clear from './clear'

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

export default Subscribers
