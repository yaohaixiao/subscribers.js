import hasDirectSubscribersFor from './hasDirectSubscribersFor'

const hasSubscribers = (topic) => {
  let found = hasDirectSubscribersFor(topic)
  let position = topic.lastIndexOf('.')

  while (!found && position !== -1) {
    topic = topic.substring(0, position)
    position = topic.lastIndexOf('.')
    found = hasDirectSubscribersFor(topic)
  }

  return found
}

export default hasSubscribers
