export function range(num){
  if(Number.isSafeInteger(num)){
    let i=0;
    return {
      [Symbol.iterator](){
        return {
          next(){
            return {
              value: i, 
              done:i++===num,
            }
          }
        }
      }
    }
  }
  return [];
}