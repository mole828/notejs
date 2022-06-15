new Promise((resolve)=>{
  return resolve(1);
}).then((data)=>{
  console.log(data)
  return data+1
}).then((data)=>{
  console.log(data)
})

let p = new Promise((resolve)=>{
  return resolve(5);
}).then((data)=>{
  console.log(data)
  return data+1
}).then((data)=>{
  console.log(data)
})

