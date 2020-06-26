const movie = {
  title: 'Batman',
  formatTitle() {
    return this.title.toUpperCase();
  }
};

function handleCall() {
  let { formatTitle } = movie;
  const text = formatTitle.call(movie);
  console.log(text);
}
handleCall();
