const btn = document.querySelector('.startGame');
const bloc = document.querySelector('.block');
btn.addEventListener('click', () => {
  bloc.classList.toggle('hide');
});
