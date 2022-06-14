let primes = ((max)=>{
  let nums = [];
  let num = 2;
  return {
    *[Symbol.iterator](){
      while(true){
        if(num>max)break;
        yield num;
        nums.push(num);
        while(true){
          num+=1;
          let flag=true;
          for(let root of nums){
            if(num%root===0){
              flag=false;
              break;
            }
          }
          if(flag)break;
        }
      }
      
    }
  }
})(10)

for(let i of primes){
  console.log(i)
}