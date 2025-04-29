const words = ["Motivation", "Leadership", "Teamwork", "Communication", "Problem-solving", "Adaptability", "Creativity", "Time Management", "Innovation", "Dedication", "Headed", "Assisted", "Eager"];
const inputField = document.getElementById('inputField');
const wordDisplay = document.getElementById('wordDisplay');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');

let score = 0;
let timeLeft = 30;
let gameInterval;
let wordInterval;
let isGameRunning = false;

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time: ${timeLeft}s`;
  inputField.value = '';
  
  startButton.disabled = true;
  stopButton.style.display = 'inline-block';
  restartButton.style.display = 'none';
  isGameRunning = true;
  
  wordInterval = setInterval(displayWord, 5000); // Words appear every 5 seconds

  gameInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(wordInterval);
      alert(`Game Over! Final Score: ${score}`);
      startButton.disabled = false;
      stopButton.style.display = 'none';
      restartButton.style.display = 'inline-block';
    }
  }, 1000);
}

function displayWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const wordDiv = document.createElement('div');
  wordDiv.classList.add('word');
  wordDiv.textContent = randomWord;
  wordDisplay.appendChild(wordDiv);

  setTimeout(() => {
    wordDiv.remove();
  }, 5000); // Word stays for 5 seconds before disappearing
}

inputField.addEventListener('input', (e) => {
  const currentWord = wordDisplay.querySelector('.word');
  if (e.target.value === currentWord?.textContent) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    currentWord.remove();
    e.target.value = '';
  }
});

startButton.addEventListener('click', startGame);

// Stop the game
stopButton.addEventListener('click', () => {
  clearInterval(gameInterval);
  clearInterval(wordInterval);
  alert(`Game Stopped! Final Score: ${score}`);
  startButton.disabled = false;
  stopButton.style.display = 'none';
  restartButton.style.display = 'inline-block';
});

// Restart button functionality
restartButton.addEventListener('click', () => {
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time: ${timeLeft}s`;
  wordDisplay.innerHTML = '';
  inputField.value = '';
  startGame();
});
