import { range, primes } from './tools.js';

new Promise((resolve) => {
    console.log('main.js begin')
    resolve()
}).then(() => {
    console.log('main.js end')
})
// for(const p of range(2))console.log(p)
// for(const p of primes(100))console.log(p)

function argTest({ func, ...params }) {
    console.log(func, params)
    return func(params)
}

function f({ x }) {
    return x ** 2
}

// console.log(argTest({func:f, x:10}))

class Person {
    constructor({ name = '', age = 0 }) {
        this.name = name;
        this.age = age;
    }
}
let p = new Person({ name: 'bob' })
// console.log(p)

f = ({ x = 0 }) => {
    console.log(x)
}
f({ x: 5 })