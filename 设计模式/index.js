// 单例模型
// ES5
const CreateSingleton = (() => {
    let instance;
    return function (name) {
        if (instance) return instance;
        this.name = name;
        return instance = this;
    }
})()

CreateSingleton.prototype.getName = function () {
    return this.name;
}

const sing = new CreateSingleton('QiuQiu');
const sing2 = new CreateSingleton('WiuWiu');
console.log(sing.getName(), sing2.getName())
