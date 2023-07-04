import _subscribers from './_subscribers'
import _removeSubscriber from './_removeSubscriber'

const _removeSubscriberByToken = (token) => {
  const keys = Object.keys(_subscribers)
  let index = -1

  if (!token || keys.length < 1) {
    return false
  }

  keys.forEach((prop) => {
    const subscriber = _subscribers[prop]
    let topic
    subscriber.forEach((subject, j) => {
      if (subject.callback === token || subject.token === token) {
        topic = subject.topic
        subscriber.splice(index, j)
      }
    })

    /* istanbul ignore else */
    if (subscriber.length < 1) {
      _removeSubscriber(topic)
    }
  })
}

export default _removeSubscriberByToken
