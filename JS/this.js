/**
 * 手写apply
 */
Function.prototype.myBind = function (context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const _this = this;
  return function () {
    const args2 = Array.prototype.slice.call(arguments);
    return _this.apply(context, args.concat(args2));
  };
};

/**
 * 手写call
 */
Function.prototype.myCall = function (context) {
  const _context = context || window || {};
  _context.fn = this;
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  const result = eval('_context.fn(' + args + ')');
  delete _context.fn;
  return result;
};

/**
 * 手写bind
 */
Function.prototype.myApply = function (context, arg) {
  const _context = context || window || {};
  _context.fn = this;
  const args = [];
  let func;
  if (arg) {
    for (let i = 0; i < arg.length; i++) {
      args.push('arg[' + i + ']');
    }
    func = eval('_context.fn(' + args + ')');
  } else {
    func = _context.fn();
  }
  delete _context.fn;
  return func;
};

const sourceThis = {
  name: 'source',
  func(x, y) {
    console.log('当前的this: ', this, ' | 当前的参数: ', x, y);
  },
};

const targetThis = {
  name: 'target',
};

// sourceThis.func.myCall(targetThis, '参数1');
// sourceThis.func.myApply(targetThis, ['参数1', ' 参数2']);
// sourceThis.func.bind(targetThis, '参数1')('参数2');

/**
 * ------------手动改实现new关键字---------------
 * 首先需要知道 new做了什么事情
 * 1. 创建空对象
 * 2. 将构造函数的原型对象添加到__proto__
 * 3. 绑定this到当前对象
 * 4. 返回对象或者this
 */
function _new(func) {
  if (typeof func !== 'function') {
    throw TypeError('is not a constructor');
  }
  const object = new Object();
  const Constructor = [].shift.call(arguments);
  object.__proto__ = Constructor.prototype;
  const result = Constructor.apply(object, arguments);
  return typeof result === 'object' ? result : object;
}

function func(x = 221) {
  this.x = x;
}
const e = _new(func);
console.log(e);
