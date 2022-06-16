import {range, primes} from './tools.js';

new Promise((resolve)=>{
    console.log('resolve')
    resolve()
}).then(()=>{
    console.log('then 1')
})
for(const p of range(2))console.log(p)
for(const p of primes(100))console.log(p)
