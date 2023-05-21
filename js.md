# `JavaScript`

## `JavaScript`基础

### 声明

- `var`: 声明一个函数范围或全局范围内的变量，具备`变量提升`，如果在全局作用域内创建变量的时候会在 window 上面挂载变量。
  - 变量提升: 任何使用`var`声明的变量都将会在代码执行前提前创建好变量，初始值为`undefined`。
  - 函数提升: 优先于变量提升，并且会进行赋值。
- `let`: `es6`新增语法，声明一个具有`块级作用域`的变量，且不具备变量提升，存在`暂时性死区`。
- `const`: 同为`es6`语法，声明`块级作用域`的常量，基础类型的值不可修改，引用类型不可修改引用地址，但是可以直接操作属性。
  - 块级作用域: 以每一个块语句为域，一对花括号为界限。
  - 暂时性死区: 当一个代码块开始到变量到创建到这一个阶段即为`暂时性死区`，访问会抛出错误，死区到判定是代码的执行顺序，而不是代码编写的顺序。

PS：声明一共存在六种方式`var let const import class function`

### `try catch`

> `try catch`捕获机制：执行线程已经进入`try catch`并且在结束前，笼统上来说就是同步任务。
> 当出现语法错误的时候，`JS`会在`try catch`
> 执行前抛出错误，即执行前。而当其中存在异步任务的时候，等到异步任务出错时，当前的执行栈已经不是`try catch`所在的区域，故结束后

### 循环

- `while`
- `do...while`
- `for`
- `for...in`：遍历对象的可枚举属性
- `for...of`：可迭代对象遍历
- `for await...of`

## `ES6`

### `class`类

> 在`es5`阶段，创建对象的方式采用的是构造函数的方式，`js`并不存在类的概念，而在`es6`里推出了`class`。

```typescript
class Base {
	name: string;

	constructor(name) {
		this.name = name;
	}
}

class Instance extends Base {
	// 继承
	age: number;
	#sex: 1 | 1; // 私有属性

	constructor(age) {
		// 构造
		super('QiuQiu'); // 调用父类方法
		this.age = age;
	}

	static staticFunc() {
		// 静态方法，可以直接调用，无法访问`this`
	}
}
```

- `constructor`：类实例化时的特殊方法，可以理解为一个生命周期。

- `extends`：继承

- 私有属性：在变量前添加`#`表示似有属性，实例化后无法被访问，在`TS`当中使用关键字`private`

- `super`：在派生类里我们需要在`constructor`内调用`super`方法来使用父类的方法和属性，如果不调，则无法使用`this`。

### 拓展运算符

> 通用`...`运算符，通常用来获取剩余参数

### 解构赋值

```typescript
const [x, y, z] = [1, 2, 3];
const { a, b } = { a: 1, b: 2 };
```

### 新的扩展方法

#### 数组

- `Array.from`：将`可迭代对象`或类数组转换，获取到一个浅拷贝的数组
- `includes`：数组中是否存在查找值，返回`Bool`
- `find`：数组中
- `findIndex`
- `reduce`
- `at`：存在兼容问题
- `fill`

#### 对象

#### 字符串

### 新的数据结构

#### `map`

#### `set`

#### `symbol`

### `proxy`

### 箭头函数

> `() => void`
> 更加简短的函数使用方式，并且自身不存在`this arguments new.target super`

### `Promise`

> `Promise`的出现是为了更好的异步编程，解决回调地狱的问题。

它具备哪些特点？

- 链式调用：连续执行多个异步操作是一个很常见的需求，在`Promise`中每次执行完都会返回一个新的`Promise`
  使用，这样就能进行下一轮的异步操作。（`then`需要有返回值，这样后续的`Promise`才能接收到参数）。
- 拒绝事件：当`Promise`被拒绝时，会存在两个全局事件被触发，`rejectionhandled` `unhandledrejection`
  ，我们可以通过这个方法进行`Promise`错误的补偿机制。

`Promise`方法

- `Promise.reject ｜ Promise.resolve` ：直接创建一个状态完成的`Promise`
- `Promise.all`：进行多任务执行，只有当所有的`Promise`都返回成功状态，才会进行`reject`，类似`Array.every`
  。或者当有任一进入`reject`时则会返回失败
- `Promise.race`：同样接受多个`Promise`任务，只要有一个`Promise`结束就会直接结束当前的状态，可以理解为`Array.some`

`Promise`为什么不能被`try catch`捕获错误？

> 当`Promise`没有添加`.catch`的时候才会往抛出错误。首先我们需要知道`JS事件循环机制`，`try catch`
> 是同步任务，而`Promise.catch`是微任务，当它执行到错误阶段的时候，已经不在当前的执行栈中，所以无法被当前所在的`try catch`
> 所捕获

如何解决这个问题呢？

- 尽量使用自身的错误捕获机制，补充`Promise.catch`
- 使用`async await`

例如：

```typescript
try {
	// 去掉 await 则不会被当前catch住
	await new Promise(() => {
		throw Error('这里出错了');
	});
} catch (e) {
	console.log('try catch error');
}
```
