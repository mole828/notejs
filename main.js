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
console.log(Object.keys(p)) 
console.log(Point.prototype)
