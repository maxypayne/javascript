// var locate = function(arr,value){
//   // const x = [];
//   // if (x.length === 5) {
//   //   return x.includes(value);
//   // }
//   // arr.forEach(el => {
//   //   if (typeof el === 'string') {
//   //     x.push(el);
//   //   } else {
//   //     return locate(el);
//   //   }
//   const x = [].concat(...arr).reduce((acc, curr) => acc + curr).includes(value);
//   console.log(x);
//
// }
// locate(['a','b',['c','d',['e']]],'e');
const obj = {
  testFunc(b, c) {
    b('xdsds');
    c(new Error("not a number"));
  }
}
obj.testFunc((res) => console.log(res), (err) => console.log(err));
