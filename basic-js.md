# JavaScript

## 词法结构
### 采用Unicode编码

可以在没有hello world按键都坏了都情况下输出'hello world'
```javascript 
> $["c\x6fnst\x72uct\x6f\x72"]("c\x6fns\x6f\x6c\x65.\x6c\x6f\g('\x68\x65\x6c\x6c\x6f \x77\x6f\x72\x6c\x64')")()
[Log] hello world
< undefined
```

### 直接量
```javascript
"str"
'str'
`str`
true, false
/javascript/gi  //正则
null
```

### 分号
```javascript
var y = x + f
(a+b).toString() //var y=x+f(a+b).toString()

return //return undefined
true;

x
++
y //x; ++y
```
不严格限制分号所导致的语意判断困难

应当要求自身的语法规范

### 类型、值和变量
除了 数字、字符串、布尔值、null 和 undefined 之外都是对象
``` javascript
> let list = [1,2,3]
< undefined
> list
< [1, 2, 3] (3)
> list['a']=12
< 12
> list
< [1, 2, 3] (3)
> Object.keys(list)
< ["0", "1", "2", "a"] (4)
```
## 类型、值和变量
### 数字
``` javascript
> 0xCAFE911
< 212855057
> 0377
< 255
> 0.1+0.2
< 0.30000000000000004
> .3-.2
< 0.09999999999999998
> .2-.1
< 0.1
> Infinity
< Infinity
> -Infinity
< -Infinity
> Infinity-Infinity
< NaN
> -Infinity-Infinity
< -Infinity
> NaN==NaN
< false
> 6.02e23
< 6.02e+23
> 1.45e-13
< 1.45e-13

typeof 1234 // number
typeof new Number(1234) // object
```
基本数据类型造成一定的混淆
<!-- page 35 -->

全局对象    
``` javascript
undefined Infinity NaN // null 为object

isNaN() parseInt() eval()
eval("isNaN(parseInt(1.1)+1)") // => false 脚本语言特有

Date() RegExp() String() Object() Array() //常见数据结构

Math JSON //常见操作
JSON.parse(JSON.stringify({name:'bob'}))
Math.max(0, Math.min( page, page_size ) )
```

### 对象包装
```javascript
> s = 'bob'
< "bob"
> s.len=-1 // 临时赋值
< -1
> s.len 
< undefined 
> s.length
< 3
> s.length=-1
< -1
> s.length  // string本身是不具有属性的
< 3  // 在使用时 解释器会将string先通过String()重新包装
```
<!-- 3.7 page 47 -->
### 不可变的原始值和可变的对象引用
``` js
> let s = 'hello'
> s.toUpperCase()
< "HELLO"
> s 
< "hello"
```
js采用了高级语言通用的方式处理对象引用，将不同的string都在内存空间单独存放，不在原始的变量上修改。

<!-- 3.8 p48 -->
### 类型转换
``` js
> 10+"obj"
< "10obj"
> "7"*"4"
< 28
> n = 1 - 'x'
< NaN
> n+'obj'
< "NaNobj"
```

<!-- 3.10 p56 -->
### 变量作用域

``` js
let n = 0
let lockMaker = function(name){
    let flag = undefined
    let lock = function(){
        n += 1
        console.log('where is',name)
        if(flag)return 
        console.log(name,': i\'m here')
        flag = setTimeout(()=>{
            flag=undefined
        },3000)
    }
    return lock
}
let a = lockMaker('bob')
let b = lockMaker('lisa')
a()
a()
b()
console.log(n)
/*
where is bob
bob : i'm here
where is bob
where is lisa
lisa : i'm here
3
*/
var a = 3
{
    var a = 2
    console.log(a)
}
f = ()=>{
    var a = 1
    console.log(a)
}
f()
console.log(a)
/*
2 
1 
2 
*/

// file1.js
if(!obj){ // obj is not defined
    obj={}
}

// file2.js
if(!obj){ // pass
    var obj={}
}
```

## 表达式和运算符
### 运算符比较
```js
11 < 3      // false 
'11' < '3' // true 比较编码
'11' < 3  // false '11'隐式转换为11

"" == "0" // false
0 == "" // true
0 == "0" // true
false == "false" // false
false == "0" // true
false == undefined // false
false == null // false
null == undefined // true
" \t\r\n" == 0 // true
```
推荐大部分情况使用===，大小比较应当做类型判断

<!-- 4.9.4 p78 -->
### instanceof 运算符
```js
new Number(1) instanceof Number // true
Number(1) instanceof Number    // false
1 instanceof Number           // false
```

<!-- ## debugger语句 
```js
function f(x){
    if (x===undefined) debugger;
    pass..
}
``` -->
<!-- page 114 -->
### "use strict"
严格模式    
```js
function hasStrictMode(){
    "use strict";
    return this===undefined
}
```
<!-- stage 6  p118 -->
## 对象 
属性特性：可写、可枚举、可配置

### 属性检测
```js
function inherit(p){
    if (p==null) throw TypeError();
    if (Object.create)return Object.create(p);
    let type = typeof p;
    if (type!=="object" && type!=='function')throw TypeError();
    (f=()=>{}).prototype = p;
    return new f();
}
let o = inherit({y:2});
o.x = 1;
console.log(
    o.propertyIsEnumerable('x'),
    o.propertyIsEnumerable('y'),
    Object.prototype.propertyIsEnumerable('toString'),
) // true false false
```
<!-- 6.7 page 134 -->
### 属性枚举
```js
let o = {a:1,b:2,c:3}
console.log(o,o.propertyIsEnumerable('toString'))
for(key of Object.keys(o))console.log(key,o[key])
for(key in o)console.log(key,o[key])
/*
{a: 1, b: 2, c: 3} false
a 1
b 2
...
*/
```

### 属性getter和setter
```js
let o = {
    value: undefined,
    set value(newVal){this.value = newVal}
}
o.value = 4
//Uncaught RangeError: Maximum call stack size exceeded
let circle = {
    area: 0,
    perimeter: 0,
    set r(value){
        this.area = Math.PI * value**2;
        this.perimeter = 2*Math.PI*value;
    }
}
for(v of [1,2,3,]){
    circle.r=v
    console.log(circle.area,circle.perimeter)
}
/*
3.141592653589793 6.283185307179586
12.566370614359172 12.566370614359172
28.274333882308138 18.84955592153876
*/
```

### 属性的特性
```js
let obj = Object.defineProperties({},{
    a: {
        value: 1,
        enumerable: false,
        writable: true,
        configurable: true,
    },
    b: {
        value: 2,
        enumerable: true,
        writable: false,
        configurable: true,
    }
})
obj.b = 3
console.log(obj, Object.keys(obj))
// {a: 1} (0) []
```

## 数组
```js
if ( arr && 
　　　typeof arr === 'object' &&
　　　typeof arr.length === 'number' &&
　　　!arr.propertyIsEnumerable('length'))
{
    console.log("is array");
}
```
数组在汇编层面就是继承的对象，typeof无法区分
### 稀疏数组
```js
> arr = new Array(5)
< [] (5)
> arr.length
< 5
> arr
< [] (5)
> arr[1000]=0
< 0
> arr
< [1000: 0] (1001)

> a1 = [,,,]
< [] (3)  
/* 
page 147
[undefined,undefined,undefined] # in book
[] # in Chrome
[] # in node12
*/
> a2 = new Array(3)
< [] (3)
> 0 in a1 
< false  // 
> 0 in a2
< false
> a1 
< [] (3)
```

<!-- page 148 -->
### 数组长度
```js
// node 12
> a = [1,2,3,4,5]
[ 1, 2, 3, 4, 5 ]
> a.length = 3
3
> a
[ 1, 2, 3 ]
> a.length = 5
5
> a
[ 1, 2, 3, <2 empty items> ]
> 
```

<!-- page 149 -->
### 数组遍历
```js
function consoleAll(array){
    for(let i=0;i<array.length;i++){
        let element = array[i];
        console.log(element);
    }
    for(let index in array){
        let element = array[index];
        console.log(element);
    }
    for(let element of array){
        console.log(element);
    }
    array.forEach(element => {
        console.log(element);
    });
};
let array = [
    'bob',
    'andy',
];
consoleAll(array);
```

### ES5中的数组方法
```js
arr = [1,2,3]
console.log(
    arr.map(x=>x**2),
    arr.filter(x=>x%2!=0),
    arr.every(x=>x%2==0),
    arr.some(x=>x%2==0),
    arr.reduce((a,b)=>a+b),
)
// (3) [1, 4, 9] (2) [1, 3] false true 6
```

## 函数
### 间接调用
```js
let cat = {
    name:'cat',
    eat(food){
        console.log(
            this.name,
            'eat',
            food,
        )
    },
}
cat.eat('fish')
let dog={name:'dog'}
cat.eat.call(dog,'meat')
cat.eat.apply(dog,['beef'])
cat.eat.bind(dog)('mutton')
cat.eat.bind(dog,'coin')()
/*
cat eat fish
dog eat meat
dog eat beef
dog eat mutton
dog eat coin
*/
```

## 类型
<!-- page 239 -->
### ES5中的类
```js
function Person(name){
    const props = {
        _name: {
            value:null,
            writable: true, // default is false
        },
        name: {
            get: function(){
                console.log(this)
                return this._name
            },
            set: (value)=>{
                console.log(this)
                if(value.length){
                    value = value.split('')
                    value[0] = value[0].toUpperCase()
                    value = value.join('')
                    this._name = value
                }
            },
        },
        speak: {
            value:(x)=>{
                console.log(this.name,x)
            }
        },
        say: ()=>{
            console.log(this.name)
        }
    }
    if(this instanceof Person)
        Object.defineProperties(this, props)
    else return Object.create(Person.prototype,props)
}
let bob = new Person()
bob.name = 'bob'
console.log(bob.name) // Bob hi
bob.speak('hi') // Bob hi
let lisa = Person() 
lisa.name='lisa' 
console.log(lisa.name) // null
lisa.speak('hi') // undefined hi

console.log(bob instanceof Person) // true
console.log(lisa instanceof Person) // true
console.log(bob.speak===lisa.speak) // false
let bart= new Person()
console.log(bob.speak===bart.speak) // false
console.log(bob.say===bart.s) // true
bob.say() // bob.say is not a function

```
<!-- page 252 -->

# 随笔？
## js执行方式
``` js
f()
function f(){
    // pass
}
```
这样是可行的，js并非单步解释，会预先读完全部的代码，完成定义。

将 var  function 预先载入

``` js
f()
var f = () => {
    // pass
}
```
与之对应的，箭头函数属于 <a>赋值</a> 这一行为，和定义不在同一周期。
