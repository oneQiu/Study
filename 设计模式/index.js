class Test {
	static a = 123;
}

new Test();
Test.a = '1234';
console.log(Test.a);