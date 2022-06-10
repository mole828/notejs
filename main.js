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
lisa.name='lisa' // <-- setter this=global
console.log(lisa.name) // null
lisa.speak('hi') // undefined hi

console.log(bob instanceof Person) // true
console.log(lisa instanceof Person) // true
console.log(bob.speak===lisa.speak) // false
let bart= new Person()
console.log(bob.speak===bart.speak) // false
console.log(bob.say===bart.s) // true
bob.say() // bob.say is not a function