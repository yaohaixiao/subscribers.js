import Outline from '@yaohaixiao/outline.js/outline'

const defaults = Outline.DEFAULTS

defaults.selector = 'h2,h3'
defaults.title = false
defaults.showCode = false
defaults.position = 'sticky'
defaults.parentElement = '#aside'
defaults.scrollElement = '#main'
defaults.articleElement = '#article'
defaults.git = 'https://github.com/yaohaixiao/subscribers.js'
defaults.tags = 'https://github.com/yaohaixiao/subscribers.js/tags'
defaults.issues = 'https://github.com/yaohaixiao/subscribers.js/issues'
defaults.print = {
  element: '#article',
  title: 'Subscribers.js'
}
defaults.chapterTextFilter = (text) => {
  return text.replace(/\(.*?\)/, '()')
}

new Outline(Outline.DEFAULTS)
