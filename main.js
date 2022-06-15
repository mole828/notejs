async function f1(){
  await console.log('f1 start')
  for(let i of Array(3).keys()){
    await console.log('f1',i)
  }
}
async function f2(){
  await console.log('f2 start')
  for(let i of Array(3).keys()){
    await console.log('f2',i)
  }
}

function normal(){
  console.log('start');
  (async ()=>{
    f1();
    (async ()=>{
      f2()
    })()
  })()
  console.log('end')
}

normal()
console.log('free')
