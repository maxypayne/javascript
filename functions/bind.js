const person = {
  title: 'Max',
  name: 'dsds',
  formatTitle() {
    return this.title.toUpperCase();
  }
};

function callBind() {
  person.name = 'kol';
  let { formatTitle, name } = person;
  formatTitle = formatTitle.bind(person);
  console.log(name);
  console.log(person);
  console.log(formatTitle());
}
callBind();

// const members = {
//   people: ['Max', 'Ana'],
//   age: 22,
//   getPeople() {
//     this.people.forEach(function (person) {
//       console.log(person + " " + this.age);
//     }.bind(members)
//     );
//   }
// };
// members.getPeople();
