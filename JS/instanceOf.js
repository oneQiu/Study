// a instance of b;
const myInstanceOf = (left, right) => {
    if (left === null) return false;
    const rProto = right.prototype;
    let lProto = left.__proto__;
    while (true) {
        if (lProto === rProto) return true;
        if (lProto === null) return false;
        lProto = lProto.__proto__;
    }
}

class Parent {
    firstName = 'Qiu'
}
class Child extends  Parent {
    age = 16
}
const parent = new Parent();
const child = new Child();

const result = myInstanceOf(child, parent);
console.log(result);
