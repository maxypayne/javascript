async function start() {
  return await Promise.resolve('async is working');
}
start().then(res => console.log(res));
