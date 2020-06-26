const startBtn = document.querySelector('.startGame');
function startGame() {
  getUserChoice();
}
const getUserChoice = () => {
  const selection = prompt('Rock, Paper or Scissors ?');
  console.log(selection)
};
startBtn.addEventListener('click', startGame);
