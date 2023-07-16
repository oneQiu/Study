/**
 * 发布-订阅者模式
 * @description 当状态发生变化，会通知所有订阅者，发布订阅者模式采用的是多对一的形式，和观察者模式最大的区别在于发布订阅者模式存在一个中间处理层用来专门发布消息
 */
class PublishSubscribe {
  // 事件集合
  #events = new Map();

  /**
   * 添加订阅者
   */
  on(eventName, callback) {
    if (!eventName || typeof callback !== 'function') throw TypeError('pararm error');
    this.#events.set(eventName, [...(this.#events.get(eventName) || []), callback]);
  }

  /**
   * 触发通知
   */
  emit(eventName, ...arg) {
    if (this.#events.has(eventName)) {
      this.#events.get(eventName).forEach(cb => {
        cb(...arg);
      })
    }
  }

  /**
   * 关闭订阅
   */
  off(eventName, callback) {
    if (this.#events.has(eventName)) {
      const cbs = this.#events.get(eventName);
      const idx = cbs.findIndex(cb => cb === callback);
      cbs.splice(idx, 1);
      this.#events.set(eventName, cbs);
    }
  }
}

/**
 * 观察者模式
 */
class Subject {
  #state = '';
  #observers = [];

  on(observer) {
    this.#observers.push(observer);
  }

  emit(newState) {
    this.#state = newState;
    this.#observers.forEach(o => o.notify(this.#state));
  }
}

class Observer {
  name = '';
  constructor(n) {
    this.name = n;
  }
  // 观察者需要有特定的触发接口
  notify(msg) {
    console.log(`${this.name}触发内容${msg}`);
  }
}


/**
 * 单例模型
 */
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    this.instance = this;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance
  }
}

/**
 * 使用Promise封装ajsx
 */
function ajax({
  method,
  url,
  data
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          resolve(xhr.responseText);
        } else {
          reject('请求出错')
        }
      }
    }
    xhr.send(data);
  })
}

