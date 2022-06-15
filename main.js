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