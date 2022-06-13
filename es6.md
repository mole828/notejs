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

