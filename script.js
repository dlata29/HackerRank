function debounce(fn, delay) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}


obj1.call(obj2)
obj1.apply(obj2,[a,b,c])


function throttle(fn, delay){
  let lastCalledTime=0;
  return function(...args){
    const now=new Date();
    if(now- lastCalledTime >= delay){
      lastCalledTime=now;
      fn.apply(this,args)
    }
  }
}



Question Subquestion REsolution ActualAns             ChildQuestion

1         1                             ans a                 6
            2
              3
              4