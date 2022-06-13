class Person{
   name:string
   constructor(name){
      this.name = name;
   }
}
class Student extends Person{

}
let p: Person = new Student('')