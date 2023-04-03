# subscribers.js

[![Github file size](https://img.shields.io/github/size/yaohaixiao/subscribers.js/subscribers.min.js.svg)](https://github.com/yaohaixiao/subscribers.js/blob/master/subscribers.min.js)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)


又一个小巧简单而且实用的发布/订阅 JavaScript 工具库！


## Features

- 原生 JavaScript 编写，无任何依赖；
- 基于 topic 主题的消息，且支持命名空间的订阅/发布；
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
import Subscribers from '@yaohaixiao/esm/subscribers'
```

## Usage

```js
// 创建订阅主题的函数
const handler = (msg, data) => {
    console.log( msg, data )
}

// 将函数添加到特定主题的订阅者列表中
Subscribers.subscribe('log', handler)

// 发布一个（名为：log）消息
Subscribers.publish('log', 'hello world!')

// 将 handler 函数从 log 主题中订阅者列表中移除
Subscribers.unsubscribe('log', handler)

// 移除 log 主题及订阅者列表
Subscribers.unsubscribe('log')
```


## License

Licensed under MIT License.
