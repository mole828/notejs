const arr = Object.freeze([1,2,])
console.log(arr)
arr.push( 3 ) // Uncaught TypeError TypeError: Cannot add property 0, object is not extensible