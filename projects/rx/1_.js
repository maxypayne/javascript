// // RxJS v6+
// import { Observable } from 'rxjs';
// /*
//   Create an observable that emits 'Hello' and 'World' on
//   subscription.
// */
// const hello = Observable.create(function(observer) {
//   observer.next('Hello');
//   observer.next('World');
//   observer.complete();
// });
//
// //output: 'Hello'...'World'
// const subscribe = hello.subscribe(val => console.log(val));

const { Observable } = require('rxjs');

const obs = new Observable(el => { el.next('my name is Max')});


obs.subscribe(el => {
  console.log(el);
})
