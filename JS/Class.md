# `Class`

> 由于`JS`的历史包袱，尽管它具备面向对象编程的能力，但它是基于原型链来实现，为了能标准统一化，它在`ES6`中新加了`Class`的语法，虽然说是语法糖（组合寄生式继承），但还是面向对象有了个新的开始，相较于以前采取各种函数继承方案更加直观了。

## 类的组成

### `constructor`

 在定义类的时候可以通过`constructor`关键字来定义构造函数，它会在实例化的时候调用，返回值如果是引用类型则作为实例对象初始值返回，默认为`this`。

```JavaScript
class Parent {} // 父类
class Child extends Parent { // 继承
  construcotr() {
    super();
    return { a: 1};
  }
}
new Child(); // { a: 1}
```



**注：如果在继承父类的情况下定义构造函数，那么就一定需要调用`super`，否则无法实例化父类，获取不到`this`，就不能被实例化对象了。（当你手动返回了一个对象的时候，即便不调用`super`也不会报错哦～）**

### 属性和方法

常规情况下我们都是在构造函数里面去初始化赋值需要的值，并不是说所有的值都需要，毕竟你可以一开始声明的时候就写上初始值。注意一点，当你在构造函数里进行赋值的时候一定要把语句写在`super`后面（如果有的话），因为在之前是无法正确获取到`this`的。

在声明方法的时候请不要使用箭头函数，虽然合法但有病～，因为`this`不会绑定在当前的实例对象上。

```JavaScript
class Child extends Parent {
  name;
  age = 20; // 直接初始化
  constructor(name) {
    this.name = name; // 这里会报错哦
    super();
    this.name = name;
  }
  
  getName() {
    return this.name;
  }
}
```

### `static`（静态关键字）

在类里面我们是可以通过`static`关键字定义静态属性和方法的，它无须实例化即可调用，但是`this`就只能访问当前定义的静态属性咯，不随实例化对象所初始化。

```JavaScript
class A {
  static a = 1;
  b = 2;
  static staticFunc() {} // 只能通过this访问到静态属性a
}
```



Tips：利用静态属性和构造函数的特点可以实现单例模型。

### 私有标识

私有属性可以通过使用前缀`#`来定义，私有属性无法被外界访问，在`ts`里面直接使用`private`即可，和其它公开属性不同的是，当你读取不存在的私有属性是会报错的（可以使用`in`关键字来判断）。

```JavaScript
const key = Symbol('key');
class B {
  #name = 'b';
  #getName() {
    console.log(this.#name);
  };
  [key]() {
    // todo...
  };
  
}
new B(); // {}; 无法访问私有属性和方法
```

Tips：使用`Symbol`和`属性表达式`也能实现私有效果，但是`#`才是纯正血统！

### 取值函数和赋值函数

就是我们常说的`geter`和`setter`函数，类似于`Object.defineProperty`和`Proxy`的同等的数据拦截能力（`vue`双向绑定原理）

```JavaScript
class C {
  get name() {
    return 'name';
  }
  set name(newName) {
    console.log('this is new name', newName);
  }
}
const c = new C();
c.name = 123; // this is new name 123;
console.log(c.name); // name
```



## FAQ

### 存在的意义是什么？

- 语义化
- 统一对象编程模式

### 语法糖是哪种实现方式？

组合寄生式继承

### 当私有标识和静态标识同时出现会发生什么？

同时出现的话，你只能在内部直接`A.#xx`调用，不需要`this`，同时在类外面无法调用。
