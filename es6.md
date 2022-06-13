# ES 6
[教程](https://es6.ruanyifeng.com/#README)

## [let 和 const 命令](https://es6.ruanyifeng.com/#docs/let)
### [let 命令](https://es6.ruanyifeng.com/#docs/let#let-命令)
#### [暂时性死区](https://es6.ruanyifeng.com/#docs/let#暂时性死区)
```js 
var x = 5
console.log(x) // 5
{
    x = 4
    console.log(x) // ReferenceError
    let x = 3
    console.log(x)
    x = 2
}
x = 1
console.log(x)
```

#### [不允许重复声明](https://es6.ruanyifeng.com/#docs/let#不允许重复声明)
```js
// file 0 
var x=5
var x=4 
console.log(x) // 4

// file 1
var x=5
let x=4  // SyntaxError: Identifier 'x' has already been declared

// file 2
let x=5
var x=4  //  SyntaxError: Identifier 'x' has already been declared

// file 3
function f(x){
    let x; //SyntaxError: Identifier 'x' has already been declared
}

// file 4
function f(x){
    {
        let x=1;
        console.log(x); // 1
    }
};
f(0)
```

#### [块级作用域](https://es6.ruanyifeng.com/#docs/let#块级作用域)
```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}
f(); // undefined
console.log(tmp); // Mon Jun 13 2022 14:57:41 GMT+0800 (China Standard Time)
```

```js
if (true) let x = 1; // SyntaxError: Lexical declaration cannot appear in a single-statement context

if (true) {
  let x = 1;
} // Pass
```

### [const 命令](https://es6.ruanyifeng.com/#docs/let#const-命令)
```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
确保指向的对象不变

```js
const arr = Object.freeze([])
console.log(arr) // (2) [1, 2]
arr.push( 1 ) // Uncaught TypeError TypeError: Cannot add property 0, object is not extensible
```
可以通过冻结确保内容不变

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```
通过递归彻底冻结

### [globalThis 对象](https://es6.ruanyifeng.com/#docs/let#globalThis-对象)
```js
// Chrome
window // Window {...}
self // Window {...}
this // Window {...}
global // Window {...}
globalThis // ReferenceError: Can't find variable: global

// Node
window // Uncaught ReferenceError: window is not defined
self // Uncaught ReferenceError: self is not defined
this // Object [global] {...}
global // Object [global] {...}
globalThis // Object [global] {...}
```



## [变量的解构赋值](https://es6.ruanyifeng.com/#docs/destructuring)
```js
{
    let [a,b] = [1,2]
    console.log( a, b ) // 1 2
}{
    let [ a, [ [b], c ]] = [ 1, [ [2], 3 ]]
    console.log( a, b, c ) // 1 2 3
}{
    let [,,a] = [1,2,3,]
    console.log(a) // 3
}{
    let [head, ...newArr] = [1,2,3,]
    console.log( head, newArr ) // 1 (2) [2, 3]
}

// TypeError
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```
只支持可以实现迭代接口的类型，会根据迭代顺序进行赋值

<br/>

```js
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
}
let f = fibs();
console.log(f) // fibs {<suspended>}
let [first, second, third, fourth, fifth, sixth] = f;
console.log(sixth) // 5
```

### [函数参数的解构赋值](https://es6.ruanyifeng.com/#docs/destructuring#函数参数的解构赋值)
```js
(({a:x=0,b:y=-1}) => {
    console.log( x, y )   
})( { a:1 } )
```


## [数值的扩展](https://es6.ruanyifeng.com/#docs/number)
```js
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
```
Number.EPSILON 实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
[链接](https://es6.ruanyifeng.com/#docs/number#Number-EPSILON)

### [安全整数和 Number.isSafeInteger](https://es6.ruanyifeng.com/#docs/number#安全整数和-Number-isSafeInteger)

```js
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

## [函数的扩展](https://es6.ruanyifeng.com/#docs/function)

### [函数参数的默认值](https://es6.ruanyifeng.com/#docs/function#函数参数的默认值)
#### [惰性求值]()
```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101
```

#### [undefined 和 null]()
```js
function f(x = 0){
    console.log(x)
}
f(undefined) // 0
f(null) // null
```
与原有的 x?x:0 和 x||0 不同，null会被正常的传入

### [rest 参数](https://es6.ruanyifeng.com/#docs/function#rest-参数)
```js
let sum = (...nums) => {
    let res = 0;
    for(num of nums) 
        res += num;
    return res;
}
console.log(
    sum(2,3,5,7,)
)
```

### [箭头函数](https://es6.ruanyifeng.com/#docs/function#箭头函数)
#### [使用注意点]()
```js
// file main.js
console.log(this === globalThis) // false in run file
this.s=21
const obj = {
  s: 42,
  m: () => console.log(this.s)
};
obj.m() // 21
```

```js
let fa = () => {
    console.log(arguments) 
}
fa(1,2,3,)
function fb(){
    console.log(arguments) 
}
fb(1,2,3,)
```
没有arguments对象
<!-- 
```js
function fib (n) {
    if ( n <= 1 ) {return 1};
    return fib(n - 1) + fib(n - 2);
}

function log (func){
    const cache = {}
    return function newFunc(){
        if(arguments[0] in cache)
            return cache[arguments[0]]
        const res = func(...arguments)
        cache[arguments[0]]=res
        console.log(...arguments,'=>',res,)
        return res
    }
}
fib = log(fib)

fib(1000)
```
 -->

### [Function.prototype.toString](https://es6.ruanyifeng.com/#docs/function#Function-prototype-toString)
```js
function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"
```
ES2019 对函数实例的 toString() 方法做出修改。

toString() 方法会返回代码，以前会省略注释和空格。

修改后，返回一模一样的原始代码。

## [数组的扩展](https://es6.ruanyifeng.com/#docs/array)

### [扩展运算符](https://es6.ruanyifeng.com/#docs/array#扩展运算符)

``` js
console.log(...[1,2,3,]) // 1 2 3
```
