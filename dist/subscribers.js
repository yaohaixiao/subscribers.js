;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Subscribers = factory();
  }
}(this, function() {
"use strict";

var _subscribers = {};

/**
 * 生成唯一 id 字符串的函数
 * ========================================================================
 * @method guid
 * @param {String} [prefix] - 生成 id 的前缀字符串
 * @return {String} 返回一个
 */
var guid = function () {
  var id = 0;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'guid-';
    id += 1;
    return "".concat(prefix + id);
  };
}();

/**
 * 检测对象自身属性中是否具有指定的属性。
 * ========================================================================
 * @method hasOwn
 * @param {Object} obj - （必须）检测的目标对象
 * @param {String} prop - （必须）属性名
 * @returns {Boolean}
 */
var hasOwn = function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/**
 * 检测测试数据是否为 Function 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - （必须）待检测的数据
 * @returns {Boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
var isFunction = function isFunction(val) {
  return Object.prototype.toString.apply(val) === '[object Function]';
};

/**
 * 判断是否存在特定 topic 指定的订阅者信息
 * ========================================================================
 * @method hasDirectSubscribersFor
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
var _hasDirectSubscribersFor = function hasDirectSubscribersFor(topic) {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0;
};

/**
 * 判断是否存在包含 topic 指定的订阅者信息
 * ========================================================================
 * @method hasSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
var _hasSubscribers = function hasSubscribers(topic) {
  var found = _hasDirectSubscribersFor(topic);
  var position = topic.lastIndexOf('.');
  while (!found && position !== -1) {
    topic = topic.substring(0, position);
    position = topic.lastIndexOf('.');
    found = _hasDirectSubscribersFor(topic);
  }
  return found;
};

/**
 * （异步）发布订阅主题信息
 * ========================================================================
 * 主题默认是异步发布的。确保在消费者处理主题时，主题的发起者不会被阻止。
 * ========================================================================
 * @method publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 * @param {Boolean} async - (可选) 是否异步发布
 */
var _publish = function publish(topic, data) {
  var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var execute = function execute(topic) {
    if (!_hasDirectSubscribersFor(topic)) {
      return false;
    }
    _subscribers[topic].forEach(function (subscriber) {
      subscriber.callback(data);
    });
  };
  var deliver = function deliver() {
    var subscriber = topic;
    var position = topic.lastIndexOf('.');
    while (position !== -1) {
      subscriber = subscriber.substring(0, position);
      position = subscriber.lastIndexOf('.');
      execute(subscriber);
    }
    execute(topic);
  };
  if (!_hasSubscribers(topic)) {
    return false;
  }
  if (async) {
    setTimeout(deliver, 4);
  } else {
    deliver();
  }
};

/**
 * 同步发布订阅主题信息
 * ========================================================================
 * @method notify
 * @alias publish
 * @param {String} topic - （必须）主题名称
 * @param {Object} data - （必须）数据对象
 */
var _notify = function notify(topic, data) {
  _publish(topic, data, false);
};

/**
 * 订阅主题，并给出处理器函数
 * ========================================================================
 * @method subscribe
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 * @return {String|Boolean}
 */
var _subscribe = function subscribe(topic, handler) {
  var token = guid();
  if (!isFunction(handler)) {
    return false;
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = [];
  }
  _subscribers[topic].push({
    callback: handler,
    token: token
  });
  return token;
};

/**
 * 取消订阅主题
 * ========================================================================
 * @method unsubscribe
 * @param {String} topic - （必须）订阅的主题
 * @param {Function|String} [token] - （可选）订阅主题的处理器函数
 */
var _unsubscribe = function unsubscribe(topic, token) {
  var index = -1;
  var subscriber = [];
  if (!_hasSubscribers(topic)) {
    return false;
  }
  subscriber = _subscribers[topic];
  if (token) {
    subscriber.forEach(function (observer, i) {
      if (observer.callback === token || observer.token === token) {
        index = i;
      }
    });
    if (index > -1) {
      subscriber.splice(index, 1);

      /* istanbul ignore else */
      if (subscriber.length < 1) {
        _deleteSubscriber(topic);
      }
    }
  } else {
    _deleteSubscriber(topic);
  }
};

/**
 * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
 * ========================================================================
 * @method subscribeOnce
 * @param {String} topic - （必须）主题名称
 * @param {Function} handler - （必须）主题的处理器函数
 * @return {String|Boolean}
 */
var _subscribeOnce = function subscribeOnce(topic, handler) {
  return _subscribe(topic, function () {
    _unsubscribe(topic, handler);
    handler.apply(this, arguments);
  });
};

/**
 * 获取全部或者包含 topic 主题的订阅者信息
 * ========================================================================
 * @method getSubscribers
 * @param {String} [topic] - （可选）主题名称
 *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
 *                            不传递 topic 参数，返回全部订阅者信息
 * @returns {*[]}
 */
var getSubscribers = function getSubscribers(topic) {
  var subscribers = [];
  Object.keys(_subscribers).forEach(function (subscriber) {
    var observer = {};
    if (!topic) {
      observer[subscriber] = _subscribers[subscriber];
      subscribers.push(observer);
    } else {
      if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
        observer[subscriber] = _subscribers[subscriber];
        subscribers.push(observer);
      }
    }
  });
  return subscribers;
};

/**
 * 删除特定 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscriber
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
var _deleteSubscriber = function deleteSubscriber(topic) {
  if (!hasOwn(_subscribers, topic)) {
    return false;
  }
  delete _subscribers[topic];
};

/**
 * 删除包含 topic 主题的订阅者信息
 * ========================================================================
 * @method deleteSubscribers
 * @param {String} topic - （必须）主题名称
 * @returns {Boolean}
 */
var _deleteSubscribers = function deleteSubscribers(topic) {
  if (!_hasSubscribers(topic)) {
    return false;
  }
  Object.keys(_subscribers).forEach(function (subscriber) {
    if (hasOwn(_subscribers, subscriber) && subscriber.indexOf(topic) === 0) {
      delete _subscribers[subscriber];
    }
  });
};
var _clear = function clear() {
  _subscribers = {};
};

// eslint-disable-next-line no-unused-vars
var Subscribers = {
  /**
   * （异步）发布订阅主题信息
   * ========================================================================
   * @method publish
   * @see publish
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @param {Boolean} async - (可选) 是否异步发布
   * @returns {Subscribers}
   */
  publish: function publish(topic, data) {
    var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    _publish(topic, data, async);
    return this;
  },
  /**
   * 同步发布订阅主题信息
   * ========================================================================
   * @method notify
   * @alias publish
   * @param {String} topic - （必须）主题名称
   * @param {Object} data - （必须）数据对象
   * @returns {Subscribers}
   */
  notify: function notify(topic, data) {
    _notify(topic, data);
    return this;
  },
  /**
   * 订阅主题，并给出处理器函数
   * ========================================================================
   * @method subscribe
   * @see subscribe
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean}
   */
  subscribe: function subscribe(topic, handler) {
    return _subscribe(topic, handler);
  },
  /**
   * 订阅主题，并给出处理器函数，接受到消息后，仅执行一次
   * ========================================================================
   * @method subscribeOnce
   * @see subscribeOnce
   * @param {String} topic - （必须）主题名称
   * @param {Function} handler - （必须）主题的处理器函数
   * @return {String|Boolean}
   */
  subscribeOnce: function subscribeOnce(topic, handler) {
    return _subscribeOnce(topic, handler);
  },
  /**
   * 取消订阅主题
   * ========================================================================
   * @method unsubscribe
   * @see unsubscribe
   * @param {String} topic - （必须）订阅的主题
   * @param {Function|String} [token] - （可选）订阅主题的处理器函数或者唯一 Id 值
   * @returns {Subscribers}
   */
  unsubscribe: function unsubscribe(topic, token) {
    _unsubscribe(topic, token);
    return this;
  },
  /**
   * 获取全部或者包含 topic 主题的订阅者信息
   * ========================================================================
   * @method getSubscribers
   * @see getSubscribers
   * @param {String} [topic] - （可选）主题名称
   *                            传递 topic 参数，返回包含 topic 主题的订阅者信息
   *                            不传递 topic 参数，返回全部订阅者信息
   * @returns {*[]}
   */
  getSubscriptions: function getSubscriptions(topic) {
    return getSubscribers(topic);
  },
  /**
   * 判断是否存在特定 topic 指定的订阅者信息
   * ========================================================================
   * @method hasDirectSubscribersFor
   * @param {String} topic - （必须）主题名称
   * @returns {Boolean}
   */
  hasDirectSubscribersFor: function hasDirectSubscribersFor(topic) {
    return _hasDirectSubscribersFor(topic);
  },
  /**
   * 判断是否存在包含 topic 指定的订阅者信息
   * ========================================================================
   * @method hasSubscribers
   * @param {String} topic - （必须）主题名称
   * @returns {Boolean}
   */
  hasSubscribers: function hasSubscribers(topic) {
    return _hasSubscribers(topic);
  },
  /**
   * 删除特定 topic 主题的订阅者信息
   * ========================================================================
   * @method deleteSubscriber
   * @see deleteSubscriber
   * @param {String} topic - （必须）主题名称
   * @returns {Subscribers}
   */
  deleteSubscriber: function deleteSubscriber(topic) {
    _deleteSubscriber(topic);
    return this;
  },
  /**
   * 删除包含 topic 主题的订阅者信息
   * ========================================================================
   * @method deleteSubscribers
   * @see deleteSubscribers
   * @param {String} topic - （必须）主题名称
   * @returns {Subscribers}
   */
  deleteSubscribers: function deleteSubscribers(topic) {
    _deleteSubscribers(topic);
    return this;
  },
  /**
   * 清理所有订阅者（主题和处理器的）信息
   * ========================================================================
   * @method clear
   * @see clear
   * @returns {Subscribers}
   */
  clear: function clear() {
    _clear();
    return this;
  }
};
return Subscribers;
}));
