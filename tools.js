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

export let primes = ((max)=>{
  let nums = [];
  let num = 2;
  return {
    *[Symbol.iterator](){
      while(true){
        if(num>max)break;
        yield num;
        while(true){
          num+=1;
          let flag=true;
          for(let root of nums){
            if(num%root===0){
              flag=false;
              break;
            }
          }
          if(flag){
            nums.push(num);
            break;
          }
        }
      }
      
    }
  }
})