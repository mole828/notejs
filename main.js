// file main.js
console.log(this === globalThis) // false
this.s=21
const obj = {
  s: 42,
  m(){
      console.log(this)
      console.log(this.s)
  }
};
obj.m.call(this) // 21