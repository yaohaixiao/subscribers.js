# subscribers.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/subscribers.js)](https://www.npmjs.com/package/@yaohaixiao/subscribers.js)
![Gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/gh/yaohaixiao/subscribers.js/subscribers.min.js?compression=gzip&label=gzip%20size)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![Coverage](https://codecov.io/gh/yaohaixiao/delegate.js/branch/main/graph/badge.svg)](https://codecov.io/gh/yaohaixiao/subscribers.js)
[![npm downloads](https://img.shields.io/npm/dt/@yaohaixiao/subscribers.js)](https://npmcharts.com/compare/@yaohaixiao/subscribers.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/subscribers.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/LICENSE)

subscribers.js - 小巧且实用的 JavaScript 发布/订阅工具库。

## 项目初衷

编写 subscribers.js 主要是在日常的开发中经常需要使用到发布/订阅模式，同时也为初学 JavaScript 的朋友了解 [JavaScript中的发布订阅模式实现与应用](http://www.yaohaixiao.com/blog/publish-subscribe-pattern-in-javascript/) 所以自己也整理了一个。虽然简单，但基本的功能都有了，还是挺好用的。这个项目的 API 文档就使用到了 subscribers.js。


## Features

- 原生 JavaScript 编写，无任何依赖；
- 基于 topic 主题的消息，且支持命名空间的订阅/发布；
- 支持异/同步 发布消息；
- 支持 UMD 规范，同时也提供 ES6 模块调用；
- API 接口易于理解和调用简单；


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Opera |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IE11, Edge                                                                                                                                                                                               | last 10 versions                                                                                                                                                                                           | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                   |

## 安装说明

subscribers.js 支持 UMD 规范和 ES6 的模块调用方式，可以在 Node.js 环境中（仅适用于单线程的 Node.js 应用）使用 npm 安装，也可以在浏览器中使用 script 标签引入到页面。

### npm 安装

```sh
# install from npmjs.com
npm i -S @yaohaixiao/subscribers.js
```

### 浏览器中调用

在浏览器中调用 subscribers.js，可以选择调用 jsdelivr 提供的 CDN 服务中的文件，也可以使用本地的 subscribers.js 文件。

#### CDN 调用 JS 文件

```html
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/subscribers.js/subscribers.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/subscribers.js/subscribers.core.min.js"></script>
```

#### 本地调用 JS 文件

```html
<script src="/path/to/subscribers.min.js"></script>
<script src="/path/to/subscribers.core.min.js"></script>
```

### Node.js 中调用

```js
const subscribers = require('@yaohaixiao/subscribers.js')
```

### ES6 模块中调用

```js
// 调用完整功能的 subscribers 对象
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

// 调用 Core 版本的 subscribers 对象，仅包含以下方法：
// on()
// emit()
// off()
import subscribers from '@yaohaixiao/subscribers.js/subscribers.core'
```

## Usage

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const Person = {
    name: 'robert',
    age: 24
}

// 创建订阅主题的函数
const handler = (msg, data) => {
    console.log( msg, data )
}

/* ==== 订阅主题 ==== */
// 将函数添加到特定主题的订阅者列表中
subscribers.on('log', handler)
// 设置 handler 的执行上下文为 Person
subscribers.on('log', handler, Person)
// 采用命名空间式的消息主题
subscribers.on('log.info', handler)
subscribers.on('log.info.update', handler)

/* ==== 发布主题 ==== */
// 发布一个（名为：log）消息，log 会触发
subscribers.emit('log', 'hello world!')
// log/log.info/log.info.update 主题的处理器函数都将执行
subscribers.emit('log.info.update', `hello world! it's update!`)

/* ==== 取消订阅 ==== */
// 将 handler 函数从 log 主题中订阅者列表中移除
subscribers.off('log', handler)

const token = Subscribers.on('alert', handler)

// 将 handler 函数从 alert 主题中订阅者列表中移除
subscribers.off('alert', token)

// 移除 log 主题及订阅者列表
subscribers.off('log')
```

## API 文档

subscribers.js 中封装了一系列常用方法，并且适用起来非常方便。

### on(topic, handler)

订阅主题，并给出处理器函数。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### handler

Type: `Function`

Default: ``

（必须）主题的处理器函数。

#### Returns

Type: `String`

唯一的 token 字符串，例如：'guid-1'。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = () => {
  console.log('author is Robert')
}

const Person = {
  name: 'robert',
  age: 24
}

subscribers.on('author', handler)
// 设置 handler 的执行上下文为 Person
subscribers.on('log', handler, Person)

// 支持命名空间形式的主题的订阅
subscribers.on('author.career', handler)
subscribers.on('author.career.years', handler)

// 发布消息
subscribers.emit('author', 'Yaohaixiao') // -> `Author: Yaohaixiao`
subscribers.emit('author.career', 'Programmer') // -> `Author: Programmer`
subscribers.emit('author.career.years', 23) // -> `Author: 23`
```


### once(topic, handler)

once() 方法用于订阅主题，并给出处理器函数，仅执行一次。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### handler

Type: `Function`

Default: ``

（必须）主题的处理器函数。

#### Returns

Type: `String`

唯一的 token 字符串，例如：'guid-1'。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = () => {
  console.log('author is Robert')
}

subscribers.once('author', handler)

// 发布消息
subscribers.emit('author')

// 再次发布 handler 将不再执行
subscribers.emit('author')
```

### all(handler)

all() 方法用于订阅所有主题消息发布，任何消息发布都会执行 handler() 处理器。

#### Parameters

##### handler

Type: `Function`

Default: ``

（必须）处理器函数。

#### Returns

Type: `String`

唯一的 token 字符串，例如：'guid-1'。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log(`handler：${msg}`)
}

const callback = (msg) => {
  console.log(`handler：${msg}`)
}

subscribers.on('author', handler)
subscribers.on('career', handler)

// 监听所有消息
subscribers.all(callback)

// 发布消息
subscribers.emit('author', 'Robert')
// -> 'handler：Robert'
// 每次都会触发 all() 方法的订阅处理方法
// -> 'callback：Robert'
subscribers.emit('career', 'Programmer')
// -> 'handler：Programmer'
// -> 'callback：Programmer'
```


#### emit(topic, data[, async = true])

emit() 用于发布订阅主题信息。

subscribers.js 参考了（[PubSubJS](https://github.com/mroderick/PubSubJS)）默认是采用异步方式发布的。以确保在消费者处理主题时，主题的发起者不会被阻止。 当然 emit() 方法也支持同步方式（浏览器环境下比较适合）发布主题。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### data

Type: `Object`

Default: ``

（必须）消息传递的数据对象。

##### async

Type: `Boolean`

Default: `true`

(可选) 是否异步发布。默认值：true。

- 当 async 设置为 true（默认） 时，异步发布；
- 当 async 设置为 false 时，同步发布；

#### Returns

Type: `subscribers`

subscribers 对象，以便实现链式调用。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log(msg)
}

subscribers.on('author', handler)
subscribers.on('career', handler)
subscribers.on('years', handler)

// 异步发布
subscribers.emit('author', 'ok') // -> 'ok'

// 同步发布
// 延迟10毫秒：应该看输出 ok 后输出 programmer
subscribers.emit('career', 'programmer', false) // -> 'programmer'
```


### notify(topic, data)

notify() 用于同步发布订阅主题信息，是 emit() 方法的别名。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### data

Type: `Object`

Default: ``

必须）消息传递的数据对象。

#### Returns

Type: `subscribers`

subscribers 对象，以便实现链式调用。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log(msg)
}

subscribers.on('author', handler)
subscribers.on('career', handler)
subscribers.on('years', handler)

// 依次输出：'author'、'career'、'years'
subscribers.notify('author', 'ok') // -> 'ok'
subscribers.notify('career', 'programmer') // -> 'programmer'
subscribers.notify('years', 19) // -> 19
```


### off(topic[, token])

off() 方法用来取消订阅主题。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### token

Type: `Function|String`

Default: ``

（可选）订阅主题的处理器函数或者唯一 Id 值。

#### Returns

Type: `subscribers`

subscribers 对象，以便实现链式调用。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log('handler:', msg)
}

const callback = (msg) => {
  console.log('callback:', msg)
}

subscribers.on('author', handler)

const token = subscribers.on('career', handler)
const guid = subscribers.on('career', handler)

// 取消订阅 author 主题
subscribers.off('author', handler)

// 删除订阅 career 主题下的 handler 处理器
subscribers.off('career', token)

// 删除订阅 career 主题下的 callback 处理器
subscribers.off('career', guid)

// 订阅 career 主题下2个处理器都删除后
// 会取消整个 author 主题订阅，因此再发布 author 主题消息
// 不会有任何反应
subscribers.emit('career', 'web developer')
```


### get([topic])

get() 方法用来获取全部或者包含 topic 主题或者订阅 token 的订阅者信息。

#### Parameters

##### topic

Type: `String`

Default: ``

（可选）主题名称。

- 不传递 topic 参数，返回全部订阅者信息；
- 传递 topic 参数
  - 如果是 topic 主题：返回包含 topic 主题的订阅者信息；
  - 如果是订阅 token：返回包含此 token 信息的 topic 主题的订阅者信息；

#### Returns

Type: `Array | Object`

返回全部或者包含 topic 主题或者订阅 token 的订阅者信息。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log('handler:', msg)
}

subscribers.on('author', handler)
subscribers.on('career', handler)
subscribers.on('years', handler)

const token = subscribers.on('years', handler)

// 获取 author 主题订阅者信息
subscribers.get('author')
// -> 返回 author 主题的订阅信息
// [
//   topic: 'author',
//   callback: handler,
//   token: 'guid-1'
// ]

subscribers.get(token)
// -> 返回 career 主题的订阅信息
// [
//   topic: 'career',
//   callback: handler,
//   token: 'guid-2'
// ]

// 获取所有订阅者信息
subscribers.get()
// -> 返回所有主题的订阅信息
// {
//   'author': [
//     topic: 'author',
//     callback: handler,
//     token: 'guid-1'
//   ]
//   'career': [
//     topic: 'career',
//     callback: handler,
//     token: 'guid-2'
//   ]
//   'years': [
//     topic: 'years',
//     callback: handler,
//     token: 'guid-3'
//   ]
// }
```


### has([topic, isDirect = true])

has() 方法用于判断是否存在包含 topic 指定的订阅者信息。

#### Parameters

##### topic

Type: `String`

Default: ``

（可选）主题名称。

- 传递 topic 参数：判断指定 topic 或者消息主题的命名空间中包含 topic 的订阅信息；
- 不传递 topic 参数：判断是否包含任何订阅信息；

##### isDirect

Type: `Boolean`

Default: `true`

（可选）是否完全匹配 topic。

- true：匹配完全相同的主题或者主题的命名空间中包含 topic 的订阅；
- false：只匹配与指定 topic 主题完全相同的主题；

#### Returns

Type: `Boolean`

- true：有相关的订阅信息；
- false：无相关的订阅信息；

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log('handler:', msg)
}

subscribers.on('author', handler)
subscribers.on('author.career.years', handler)

subscribers.has('author.career')
// => true - 因为包含 author 主题

subscribers.has('author.career.year')
// => true 因为有完全匹配的主题

subscribers.has('author.career', false)
// => false 因为没有完全匹配的主题

subscribers.has()
// => true
```


### remove(topic)

remove() 方法用来删除特定 topic 主题的订阅者信息。

#### Parameters

##### topic

Type: `String|Array`

Default: ``

（必须）主题名称。

- String 类型：删除单个 topic 订阅信息；
- Array 类型：删除多个 topic 订阅信息；

#### Returns

Type: `subscribers`

subscribers 对象，以便实现链式调用。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log('handler:', msg)
}

const callback = (msg) => {
  console.log('callback:', msg)
}

subscribers.on('author', handler)
subscribers.on('publish', callback)

// 删除 author 主题相关的所有信息
subscribers.remove('author')

// 同时删除 author 和 publish 主题相关的所有信息
subscribers.remove(['author', 'publish'])
```


#### clear()

clear() 方法用于清理所有订阅者（主题和处理器的）信息。

#### Returns

Type: `subscribers`

subscribers 对象，以便实现链式调用。

```js
import subscribers from '@yaohaixiao/subscribers.js/subscribers'

const handler = (msg) => {
  console.log('handler:', msg)
}

subscribers.on('author', handler)
subscribers.on('author.career', handler)
subscribers.on('author.career.years', handler)

// 清理所有订阅者（主题和处理器的）信息
subscribers.clear()

subscribers.has() // -> false
```

## License

Licensed under MIT License.
