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
  return typeof val === 'function' || Object.prototype.toString.apply(val) === '[object Function]';
};
var hasDirectSubscribersFor = function hasDirectSubscribersFor(topic) {
  return hasOwn(_subscribers, topic) && _subscribers[topic].length > 0;
};
var hasSubscribers = function hasSubscribers(topic) {
  var found = hasDirectSubscribersFor(topic);
  var position = topic.lastIndexOf('.');
  while (!found && position !== -1) {
    topic = topic.substring(0, position);
    position = topic.lastIndexOf('.');
    found = hasDirectSubscribersFor(topic);
  }
  return found;
};
var _publish = function publish(topic, data) {
  var deliver = function deliver(topic) {
    if (!hasDirectSubscribersFor(topic)) {
      return false;
    }
    _subscribers[topic].forEach(function (handler) {
      handler(data);
    });
  };
  var subscriber = topic;
  var position = topic.lastIndexOf('.');
  if (!hasSubscribers(topic)) {
    return false;
  }
  while (position !== -1) {
    subscriber = subscriber.substring(0, position);
    position = subscriber.lastIndexOf('.');
    deliver(subscriber);
  }
  deliver(topic);
};

/**
 * 订阅主题，并给出处理器函数
 * ========================================================================
 * @method subscribe
 * @param {String} topic - 主题名称
 * @param {Function} handler - 主题的处理器函数
 */
var _subscribe = function subscribe(topic, handler) {
  if (!isFunction(handler)) {
    return false;
  }

  /* istanbul ignore else */
  if (!_subscribers[topic]) {
    _subscribers[topic] = [];
  }
  _subscribers[topic].push(handler);
};
var _unsubscribe = function unsubscribe(topic, handler) {
  var index = -1;
  var subscription = [];
  if (!hasSubscribers(topic)) {
    return false;
  }
  subscription = _subscribers[topic];
  if (isFunction(handler)) {
    subscription.forEach(function (fn, i) {
      if (fn === handler) {
        index = i;
      }
    });
    if (index > -1) {
      subscription.splice(index, 1);

      /* istanbul ignore else */
      if (subscription.length < 1) {
        deleteSubscriber(topic);
      }
    }
  } else {
    deleteSubscriber(topic);
  }
};
var _subscribeOnce = function subscribeOnce(topic, handler) {
  _subscribe(topic, function () {
    _unsubscribe(topic, handler);
    handler.apply(this, arguments);
  });
};
var getSubscribers = function getSubscribers(topic) {
  var subscriptions = [];
  Object.keys(_subscribers).forEach(function (subscription) {
    if (hasOwn(_subscribers, subscription) && subscription.indexOf(topic) === 0) {
      var option = {};
      option[subscription] = _subscribers[subscription];
      subscriptions.push(option);
    }
  });
  return subscriptions;
};
var deleteSubscriber = function deleteSubscriber(topic) {
  if (!hasOwn(_subscribers, topic)) {
    return false;
  }
  delete _subscribers[topic];
};
var deleteSubscribers = function deleteSubscribers(topic) {
  if (!hasSubscribers(topic)) {
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
  publish: function publish(topic, data) {
    _publish(topic, data);
    return this;
  },
  subscribe: function subscribe(topic, handler) {
    _subscribe(topic, handler);
    return this;
  },
  subscribeOnce: function subscribeOnce(topic, handler) {
    _subscribeOnce(topic, handler);
    return this;
  },
  unsubscribe: function unsubscribe(topic, handler) {
    _unsubscribe(topic, handler);
    return this;
  },
  getSubscriptions: function getSubscriptions(topic) {
    return getSubscribers(topic);
  },
  deleteSubscription: function deleteSubscription(topic) {
    deleteSubscriber(topic);
    return this;
  },
  deleteSubscriptions: function deleteSubscriptions(topic) {
    deleteSubscribers(topic);
    return this;
  },
  clear: function clear() {
    _clear();
    return this;
  }
};
return Subscribers;
}));
