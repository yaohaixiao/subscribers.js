# subscribers.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/subscribers.js)](https://www.npmjs.com/package/@yaohaixiao/subscribers.js)
[![Github file size](https://img.shields.io/github/size/yaohaixiao/subscribers.js/dist/subscribers.min.js.svg)](https://github.com/yaohaixiao/subscribers.js/blob/master/dist/subscribers.min.js)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![Coverage](https://codecov.io/gh/yaohaixiao/delegate.js/branch/main/graph/badge.svg)](https://codecov.io/gh/yaohaixiao/subscribers.js)
[![npm downloads](https://img.shields.io/npm/dm/@yaohaixiao/subscribers.js)](https://npmcharts.com/compare/@yaohaixiao/subscribers.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/subscribers.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/LICENSE)

又一个小巧简单而且实用的发布/订阅 JavaScript 工具库！


## Features

- 原生 JavaScript 编写，无任何依赖；
- 基于 topic 主题的消息，且支持命名空间的订阅/发布；
- 支持异/同步 publish 消息；
- 支持 UMD 规范，同时也提供 ES6 模块调用；
- API 接口调用简单便捷；


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
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/subscribers.js/dist/subscribers.min.js"></script>
```

#### 本地调用 JS 文件

```html
<script src="/path/to/subscribers.min.js"></script>
```

### Node.js 中调用

```js
const Subscribers = require('@yaohaixiao/subscribers.js')
```

### ES6 模块中调用

```js
// 调用 Subscribers 对象
import Subscribers from '@yaohaixiao/subscribers.js/esm/subscribers'
```

## Usage

```js
import Subscribers from '@yaohaixiao/subscribers.js'

// 创建订阅主题的函数
const handler = (msg, data) => {
    console.log( msg, data )
}

/* 订阅主题 */
// 将函数添加到特定主题的订阅者列表中
Subscribers.subscribe('log', handler)
// 采用命名空间式的消息主题
Subscribers.subscribe('log.info', handler)
Subscribers.subscribe('log.info.update', handler)

/* 发布主题 */
// 发布一个（名为：log）消息，log 会触发
Subscribers.publish('log', 'hello world!')
// log/log.info/log.info.update 主题的处理器函数都将执行
Subscribers.publish('log.info.update', `hello world! it's update!`)

/* 取消订阅 */
// 将 handler 函数从 log 主题中订阅者列表中移除
Subscribers.unsubscribe('log', handler)

const token = Subscribers.subscribe('alert', handler)

// 将 handler 函数从 alert 主题中订阅者列表中移除
Subscribers.unsubscribe('alert', token)

// 移除 log 主题及订阅者列表
Subscribers.unsubscribe('log')
```

## API 文档

subscribers.js 中封装了一系列常用方法，并且适用起来非常方便。

### methods

#### subscribe(topic, handler)

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

```js
Subscribers.subscribe('author', handlerAuthor)

// 支持命名空间形式的主题的订阅
Subscribers.subscribe('author.career', handlerCareer)
Subscribers.subscribe('author.career.years', handlerYears)
```

#### subscribeOnce(topic, handler)

订阅主题，并给出处理器函数，仅执行一次。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### handler

Type: `Function`

Default: ``

（必须）主题的处理器函数。

```js
Subscribers.subscribeOnce('author', handlerAuthor)

Subscribers.publish('author', 'ok')

// handlerAuthor() 函数将不再执行
Subscribers.publish('author', 'again')
```

#### publish(topic, data[, async = true])

发布订阅主题信息。subscribers.js 主题默认是异步发布的。确保在消费者处理主题时，主题的发起者不会被阻止。 当然 publish() 方法也支持同步主题发布。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### data

Type: `Object`

Default: ``

必须）消息传递的数据对象。

##### async

Type: `Boolean`

Default: `true`

(可选) 是否异步发布。默认值：true。

```js
Subscribers.subscribe('author', handlerAuthor)
Subscribers.subscribe('author.career', handlerCareer)
Subscribers.subscribe('author.career.years', handlerYears)

// 异步发布
Subscribers.publish('author', 'ok')
// 同步发布
Subscribers.publish('author', 'ok', false)
```

#### unsubscribe(topic[, token])

取消订阅主题。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

##### token

Type: `Function|String`

Default: ``

（可选）订阅主题的处理器函数或者唯一 Id 值。

```js
Subscribers.subscribe('author', handlerAuthor)
const token = Subscribers.subscribe('author.career', handlerCareer)

// 取消订阅 author 主题
Subscribers.unsubscribe('author',handlerAuthor)
// 取消订阅 author.career 主题
Subscribers.publish('author.career', token)
```

#### getSubscriptions([topic])

获取全部或者包含 topic 主题的订阅者信息。

#### Parameters

##### topic

Type: `String`

Default: ``

（可选）主题名称。传递 topic 参数，返回包含 topic 主题的订阅者信息，不传递 topic 参数，返回全部订阅者信息。

```js
Subscribers.subscribe('author', handlerAuthor)
Subscribers.subscribe('author.career', handlerCareer)
Subscribers.subscribe('author.career.years', handlerYears)

// 获取 author 主题订阅者信息
Subscribers.getSubscriptions('author')

// 获取所有订阅者信息
Subscribers.getSubscriptions()
```

#### deleteSubscriber(topic)

删除特定 topic 主题的订阅者信息。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

```js
Subscribers.subscribe('author', handlerAuthor)

// 删除 author 主题相关的所有信息
Subscribers.deleteSubscriber('autor')
```

#### deleteSubscribers(topic)

删除包含 topic 主题的订阅者信息。

#### Parameters

##### topic

Type: `String`

Default: ``

（必须）主题名称。

```js
Subscribers.subscribe('author', handlerAuthor)
Subscribers.subscribe('author.career', handlerCareer)
Subscribers.subscribe('author.career.years', handlerYears)

// 删除包含 author 或者 author.career 主题相关的所有信息
Subscribers.deleteSubscribers('author.career')
```

#### clear()

清理所有订阅者（主题和处理器的）信息

```js
Subscribers.subscribe('author', handlerAuthor)
Subscribers.subscribe('author.career', handlerCareer)
Subscribers.subscribe('author.career.years', handlerYears)

// 清理所有订阅者（主题和处理器的）信息
Subscribers.clear()
```

## License

Licensed under MIT License.
