/**
 * 实现New功能
 */
function newFunc() {
	// 取出构造函数
	const constructor = [].shift.call(arguments);
	const obj = Object.create(constructor.prototype);
	const result = constructor.apply(obj, arguments);
	return typeof result === 'object' ? result : obj;
}

function Father(name, age) {
	this.name = name;
	this.age = age;
}

Father.prototype.home = '杭州';

Father.prototype.goHome = function () {
	console.log(`${this.name}（${this.age}岁）回${this.home}`);
};

const son = newFunc(Father, 'QiuQiu', 19);
son.goHome(); // QiuQiu（19岁）回杭州
