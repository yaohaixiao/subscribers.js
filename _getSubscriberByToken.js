import _subscribers from './_subscribers'

const _getSubscriberByToken = (token) => {
  const keys = Object.keys(_subscribers)
  let observer = null

  if (keys.length < 1) {
    return null
  }

  _subscribers.forEach((subscriber) => {
    subscriber.forEach((subject) => {
      if (subject.callback === token || subject.token === token) {
        observer = subscriber
      }
    })
  })

  return observer
}

export default _getSubscriberByToken
