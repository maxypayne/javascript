const button  = document.querySelector('.startGame');
function personGet() {
  const person = {
    name: 'Max',
    set title(val) {
      if (val.trim() === ''){
        this._title = 'DEFAULT';
        return;
      }
      this._title = val;
    },
    get title() {
      return this._title;
    },
    getName() {
      return this.name;
    }
  };
  person.title = 'Some title';
  console.log(person);
}
button.addEventListener('click', personGet);
