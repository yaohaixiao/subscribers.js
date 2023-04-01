import subscribe from './subscribe'
import unsubscribe from './unsubscribe'

const subscribeOnce = (topic, handler) => {
  subscribe(topic, function () {
    unsubscribe(topic, handler)
    handler.apply(this, arguments)
  })
}

export default subscribeOnce
