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
### [实例方法：at()](https://es6.ruanyifeng.com/#docs/array#实例方法：at)
```js
const arr = [5, 12, 8, 130, 44];
arr.at(2) // 8
arr.at(-2) // 130
```
这一方法在node12中未被使用，node16中被使用了。

## [对象的扩展](https://es6.ruanyifeng.com/#docs/object)
### [属性的简洁表示法](https://es6.ruanyifeng.com/#docs/object#属性的简洁表示法)
```js
const url = 't.co'
const req = {url,}
console.log(req) // {url: 't.co'}
```

### [super 关键字](https://es6.ruanyifeng.com/#docs/object#super-关键字)

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
es6中新增了关键字super，指向当前对象的原型对象。

```js
// a
const obj = {
  foo: super.foo
}
// b
const obj = {
  foo: () => super.foo 
}
// c
const obj = {
  foo: function () {
    return super.foo
  }
}
```
三种不算在对象方法中的情况，都会报错

### [对象的扩展运算符](https://es6.ruanyifeng.com/#docs/object#对象的扩展运算符)

#### [解构赋值]()
``` js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x) // 1
console.log(y) // 2
console.log(z) // { a: 3, b: 4 }
```

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```
与数组不同，对象的解构赋值是浅拷贝

## [运算符的扩展](https://es6.ruanyifeng.com/#docs/operator)

### [链判断运算符](https://es6.ruanyifeng.com/#docs/operator#链判断运算符)

```js
// 错误的写法
const  firstName = message.body.user.firstName || 'default';

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

// es5写法
const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

// es2020写法
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
iterator.return?.() // 判断存在后执行
```

#### [短路机制]()
```js
a?.[++x]
// 等同于
a == null ? undefined : a[++x]
```

#### [报错场合]()
```js
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c
```

#### [右侧不得为十进制数值]()
`is?.3` 优先将 `.3` 视作小数，然后再解释 `?` 将索要 `:` 从而报错。

### [逻辑赋值运算符](https://es6.ruanyifeng.com/#docs/operator#逻辑赋值运算符)

```js
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```

## [Symbol](https://es6.ruanyifeng.com/#docs/symbol)

```js
> a = Symbol('a')
Symbol(a)
> aa = Symbol('a')
Symbol(a)
> obj[a]=1
1
> obj[aa]
undefined

> Object.getOwnPropertySymbols(obj)
[ Symbol(a) ]
> obj[aa]=2
2
> Object.getOwnPropertySymbols(obj)
[ Symbol(a), Symbol(a) ]
```

### [Symbol-for，Symbol-keyFor](https://es6.ruanyifeng.com/#docs/symbol#Symbol-for，Symbol-keyFor)

``` js
> Object.getOwnPropertySymbols(obj)
[ Symbol(a), Symbol(a) ]
> a === aa
false
> a = Symbol.for('a')
Symbol(a)
> aa = Symbol.for('a')
Symbol(a)
> a === aa
true
```
`Symbol.for()`方法可以在我们希望使用同一个Symbol值的时候从全局环境中登记、搜索以便共用。

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
`Symbol.keyFor()`可以从全局环境中找到对应的key，仅供于`Symbol.for()`创建的Symbol变量

<!-- ## [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

### [WeakSet](https://es6.ruanyifeng.com/#docs/set-map#WeakSet) --> 

## [Promise](https://es6.ruanyifeng.com/#docs/promise)

### [Promise.prototype.finally()]()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```js
let nums = [8,16,1,2,4,'asd',undefined]
let res = []
for(let v of nums){
  new Promise((resolve,reject)=>{
    if (typeof v=='number') {
      setTimeout(()=>resolve(v),v)
    }else{
      reject(v)
    }
  }).then((v)=>{
    res.push(v);
  }).catch((v)=>{
    console.log(v)
  }).finally(()=>{
    console.log(res)
  })
}
/**
asd
main.js:14
undefined
main.js:14
(0) []
(0) []
(1) [1]
(2) [1, 2]
(3) [1, 2, 4]
(4) [1, 2, 4, 8]
(5) [1, 2, 4, 8, 16]
*/
```

## [Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator)

### [Iterator 接口与 Generator 函数](https://es6.ruanyifeng.com/#docs/iterator#Iterator-接口与-Generator-函数)
```js
let primes = ((max)=>{
  let nums = [];
  let num = 2;
  return {
    *[Symbol.iterator](){
      while(true){
        if(num>max)break;
        yield num;
        while(true){
          num+=1;
          let flag=true;
          for(let root of nums){
            if(num%root===0){
              flag=false;
              break;
            }
          }
          if(flag){
            nums.push(num);
            break;
          }
        }
      }
      
    }
  }
})(10)

for(let i of primes){
  console.log(i)
} // 2 3 5 7
```

### [默认 Iterator 接口](https://es6.ruanyifeng.com/#docs/iterator#默认-Iterator-接口)

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() { return this; }
  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(...args) {
  if(args.length===1)return new RangeIterator(0, ...args);
  if(args.length===2)return new RangeIterator(...args);
  return []
}

for (let value of range(3)) {
  console.log(value); // 0, 1, 2
}
```

### [遍历器对象的 return()，throw()](https://es6.ruanyifeng.com/#docs/iterator#遍历器对象的-return，throw)
```js
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { value:`done:${false}`,done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
let file = {
  close(){
    console.log('close')
  }
}
let reader = readLinesSync(file)

let time = 2
for(let data of reader){
  console.log(data)
  if(!time-->0)break;
}
/**
done:false
done:false
done:false
close
*/
```

## [Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)

### [Generator.prototype.return()](https://es6.ruanyifeng.com/#docs/generator#Generator-prototype-return)
```js
let g = (function* () {
  console.info('I\'m created') // 1
  yield 1
  console.info('I\'ve done my job') // 2
})()
console.log(g.next()) // I'm created {value: 1, done: false}  // 1
console.log(g.next()) // I've done my job {value: undefined, done: true}  // 2
console.log(g.next()) // {value: undefined, done: true}
console.log(g.return(2)) // {value: 2, done: true}
```
next的调用与generator的执行息息相关。在调用next之后，才会执行函数开始到第一次yield语句之间的所有逻辑。若是直接调用return函数，则会直接返回不执行函数。
### [yield* 表达式](https://es6.ruanyifeng.com/#docs/generator#yield--表达式)
```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
```

## [async 函数](https://es6.ruanyifeng.com/#docs/async)

### [async 函数的实现原理](https://es6.ruanyifeng.com/#docs/async#async-函数的实现原理)
```js
async function f1(){
  await console.log('f1 start')
  for(let i of Array(3).keys()){
    await console.log('f1',i)
  }
}
async function f2(){
  await console.log('f2 start')
  for(let i of Array(3).keys()){
    await console.log('f2',i)
  }
}

f1()
f2()
/***
f1 start
f2 start
f1 0
f2 0
f1 1
f2 1
f1 2
f2 2
*/
```
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

### [await]()

```js
async function f1(){
  await console.log('f1 start')
  for(let i of Array(3).keys()){
    await console.log('f1',i)
  }
}
async function f2(){
  await console.log('f2 start')
  for(let i of Array(3).keys()){
    await console.log('f2',i)
  }
}
(async ()=>{
  await f1()
  f2()
})()
/**
f1 start
f1 0
f1 1
f1 2
f2 start
f2 0
f2 1
f2 2
*/
```
await可以改变async函数的执行顺序。


## [Class 的基本语法](https://es6.ruanyifeng.com/#docs/class)
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
console.log(typeof Point) // "function"
console.log(Point === Point.prototype.constructor) // true
let p = new Point(x=1,y=2)
console.log(p.toString()) // (1, 2)
console.log(Object.keys(p)) // (2) ['x', 'y']  // 类内定义的方法不可枚举
console.log(Point.prototype) // {constructor: ƒ, toString: ƒ}
```

### [constructor 方法](https://es6.ruanyifeng.com/#docs/class#constructor-方法)
``` js
class Foo {
  constructor() {
    return Object.create(null);
  }
}
console.log(new Foo() instanceof Foo)  // false
```
constructor()函数可以返回一个全新的、完全不同的对象，结果导致实例对象不是Foo类的实例。

### [注意点]()

#### [不存在提升]()
```js
new Foo(); // ReferenceError
class Foo {}
```

#### [name 属性]()
```js
class Point {}
Point.name // "Point" 
```

## [Class 的继承](https://es6.ruanyifeng.com/#docs/class-extends)

```js
class Point{
  x;y;
  constructor(x,y){
    this.y = y;
    this.x = x;
  };
  toJSON(){
    return {
      x: this.x,
      y: this.y,
    }
  };
  toString(){
    return JSON.stringify(this)
  };
}
class ColorPoint extends Point{
  color;
  constructor(x,y,color,){
    super(x,y);
    this.color = color;
  };
  toJSON(){
    return Object.assign(super.toJSON(), {color:this.color});
  }
}
let p = new ColorPoint(1,2,'red')
console.log(p.toString())
// {"x":1,"y":2,"color":"red"}
```


## [Module 的语法](https://es6.ruanyifeng.com/#docs/module)

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
ES6 模块的设计思想是尽量的静态化，将其他包内的变量、方法像是函数返回值一样引入到其他文件。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
import 方式是"编译时加载"，比起CommonJS模块加载效率更高。

```json
{
  "name": "notejs",
  "version": "1.0.0",
  "description": "## JS基础 [教材](https://github.com/mynane/PDF/blob/master/JavaScript权威指南(第6版)(中文版).pdf)",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mole828/notejs.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mole828/notejs/issues"
  },
  "homepage": "https://github.com/mole828/notejs#readme"
}
```
使用时应该加上 

``"type": "module",`` 

否则会出现错误，无法通过

``Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.``