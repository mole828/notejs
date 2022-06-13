
var _a=0
Object.defineProperties(globalThis,{
    'a' : {
        get(){
            return ++_a;
        }
    }
})

console.log(global)
if ( a===1 && a===2 && a===3 ){
    console.log('pass')
}

let obj = {m:{key:17}}

let {m:{key}} = obj

console.log(key)

function f([a,b]){
    return a+b
}

console.log([[1,2],[3,4]].map(f))

console.log(...[0,3])
{
    let Person = class{
        name
        constructor(name){
            this.name = name
        }
    }
    let p = new Person('bob')
    console.log(p)
}


