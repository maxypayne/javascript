interface User {
  id: number;
  name: string;
}

const obj: User = {
  id: 10,
  name: 'Max'
};
const obj2 = <User> {
  id: 10,
  name: 'Max'
};
console.log({obj2});
