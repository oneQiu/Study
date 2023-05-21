# `JavaScript`

## `JavaScript`基础

### 声明

- `var`: 声明一个函数范围或全局范围内的变量，具备`变量提升`，如果在全局作用域内创建变量的时候会在 window 上面挂载变量。
  - 变量提升: 任何使用`var`声明的变量都将会在代码执行前提前创建好变量，初始值为`undefined`。
  - 函数提升: 优先于变量提升，并且会进行赋值。
- `let`: `es6`新增语法，声明一个具有`块级作用域`的变量，且不具备变量提升，存在`暂时性死区`。
- `const`: 同为`es6`语法，声明`块级作用域`的常量，基础类型的值不可修改，引用类型不可修改引用地址，但是可以直接操作属性。
  - 块级作用域: 以每一个块语句为域，一对花括号为界限。
  - 暂时性死区: 当一个代码块开始到变量 到创建到这一个阶段即为`暂时性死区`，访问会抛出错误，死区到判定是代码的执行顺序，而不是代码编写的顺序。

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

> 通用`...`运算符，通常用来获取剩余参数，支持数组和对象。

### 解构赋值

```typescript
const [x, y, z] = [1, 2, 3];
const { a, b } = { a: 1, b: 2 };
```

### 模板字符串

> 通过 \`符号分割的字符串，内部支持变量插值，减少常规字符串拼接的麻烦。变量使用：`${A}`

#### 标签函数

这是模板字面量的一种高级形式，它可以将函数一起使用。它会将模板解析为多个参数传入，第一个参数为根据变量插值分割文本的数组，后面为每个插值。

```typescript
const name = 'QiuQiu';
const age = 15;
const fun = (...arg) => {};
fun`name: ${name} age: ${age}`; // fun(['name: ', ' age: '], name, age);
```

### 新的扩展方法

#### 数组

```typescript
const arrayFunction = function () {
    const arg = Array.from(arguments); // 将可迭代对象或类数组转换，获取到一个浅拷贝的数组
    const isQiu = arg.includes('QiuQiu'); // 数组中是否存在查找值，返回Bool
	const item = arg.find(i => i === 'QiuQiu'); // 从数组中查询首个符合条件的项
    const index = arg.findIndex(i => i === 'QiuQiu'); // 从数组中查询首个符合条件的项的下表
    const reduceArr = arg.reduce((prev, curr, idx, arr) => curr); 
    const at = arg.at(0); // 等同于 arg[0]
    const arr = arg.fill(null); // 填充数组每一项
}
```

#### 对象

```typescript
const objectFunction = () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, a, {
        enumerable: false, // 是否可枚举
        writable: false, // 是否能被重写
        configurable: false, // 不可被配置 包括delete
    }); // 对对象的某个属性进行定义 包括get set方法，这也是vue2.0数据监听核心
    Object.assign(obj, { c: 3 }); // 对象合并，可用于浅拷贝
    Object.keys(obj); // ['b', 'c'] 取出对象里的可枚举key
    Object.values(obj); // [2, 3] 取出对象里的可枚举值的value
    Object.entries(obj); // [['b', 2], ['c', 3]] 转为可迭代对象的二维数组 [[key, value]]
    Object.is({}, {}); // false 用于判断是否是同一对象 浅对比 对比的是指针地址
}
```

#### 字符串

```typescript
const str = 'QiuQiu';
str.includes('Q'); // true 字符串是否存在子串
str.at(0); // Q 等同于 str[0]
str.startsWith('iu'); // false 是否存在子串开头 相类似还有 endsWith
str.replaceAll('Q', 'o'); // oiuoiu 全局替换，等同于str.replace(/Q/g, 'o')
```

### 新的数据结构

#### `map`

> 类似于对象的一个键值对`hash`表，以往的对象的`key`只能是字符串，但是`map`可以使各种类型作为键，更加灵活。（如果键是对象，那么实际上使用的是该对象的内存地址）

```typescript
const map = new Map([[1,1]]); // 创建map 接收可迭代对象作为初始值
map.set(2, 2); // { 1 => 1, 2 => 2 }; 添加
map.get(1); // 1 查询
map.delete(1); // true 删除
map.set(['a'], 6).set(['a'], 7); // 此时存入的地址不同，所以你再也取不出咯，也不会覆盖
```

#### `set`

> 这是类似于数组形式的一种新数据结构，但是不同于数组的是它各项唯一，并且不能直接获取，所以经常用来数组去重。

```typescript
const set = new Set([1,2,3]); // 创建set对象
set.add(44); // { 1, 2, 3, 44 } 增加
set.delete(2); // true 删除值为2的项
set.has(3); // true 是否存在值
set.size; // 3 等同于数组的length
```

PS：`set`和`map`都存在这些方法`forEach keys values has size clear entries`

#### `symbol`

> `es6`新增的一个基础数据类型，它能够创建唯一的变量，创建时候不需要`new`，因为他只是一个原始类型的值，不是对象，接受一个字符串用于作为描述。

### `proxy`

> `proxy`可以理解为在对象外面做了一层拦截，外界对该对象的访问都必须通过这层拦截，包括`prototype`，相当于对`.`操作符的重写，在`vue3.0`里就是用的`proxy`实现的数据监听。

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
