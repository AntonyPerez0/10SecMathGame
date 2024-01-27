let timer;
let timeLeft;
let score = 0;
let highScore = 0;

function startGame() {
  resetGame();
  generateEquation();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    endGame();
  } else {
    document.getElementById('timeLeft').textContent = timeLeft;
  }
}

function generateEquation() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;

  document.getElementById('equation').textContent = `${num1} + ${num2} = ?`;
  document.getElementById('answerInput').value = '';
  document.getElementById('answerInput').focus();
  timeLeft = 10;
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answerInput').value, 10);
  const equationParts = document.getElementById('equation').textContent.split(' ');
  const correctAnswer = parseInt(equationParts[0]) + parseInt(equationParts[2]);

  if (userAnswer === correctAnswer) {
    score++;
    timeLeft++;
    document.getElementById('score').textContent = score;
    generateEquation();
  }
}

function endGame() {
  clearInterval(timer);
  alert(`Game over! Your score: ${score}`);
  if (score > highScore) {
    highScore = score;
    document.getElementById('highScore').textContent = highScore;
  }
  resetGame();
}

function resetGame() {
  clearInterval(timer);
  timeLeft = 10;
  score = 0;
  document.getElementById('timeLeft').textContent = timeLeft;
  document.getElementById('score').textContent = score;
}
