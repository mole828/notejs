function add2(x){
  if (x===1)return 1;
  return add2(x-1)+x;
}

export {
  add2
}
