const questionBox = document.querySelector('.question-box h2');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score');
const timerProgress = document.getElementById('timer-progress');

let timer;
let currentAnswer;
let score = 0;
let attempts = 0;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  questionBox.textContent = `${num1} + ${num2}`;
  currentAnswer = num1 + num2;
  attempts = 0;
  clearInterval(timer);
  timerProgress.style.width = '100%';
  startTimer();
}

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = score;
  scoreDisplay.parentElement.style.backgroundColor = 'limegreen';
setTimeout(() => {
  scoreDisplay.parentElement.style.backgroundColor = 'transparent';
}, 500);
}

function checkAnswer(event) {
  // Add this line to check if the event is from pressing Enter key and if not, return
  //if (event && event.key !== 'Enter') return;

  const userAnswer = parseInt(answerInput.value);

  if (userAnswer === currentAnswer) {
    clearInterval(timer);
    questionBox.textContent += ` = ${currentAnswer}`;
    updateScore(10 - attempts * 2); // Change the score calculation here
    answerInput.value = '';
    if (score >= 50) {
      alert('Grattis! Du vann spelet när du fick mer än 50 poäng!');
      score = 0;
      updateScore(0);
    }

    setTimeout(() => {
      answerInput.focus(); // Keep the input field focused after submitting the answer
      generateQuestion();
  } else {
    attempts++;

    if (attempts >= 5) {
      alert(`Incorrect 5 times. The correct answer is ${currentAnswer}.`);
      answerInput.value = '';
      generateQuestion();
    } else {
      updateScore(-2); // Deduct 2 points for each incorrect answer
      submitBtn.style.backgroundColor = 'red';
      setTimeout(() => {
        submitBtn.style.backgroundColor = '#4CAF50';
      }, 500);
    }
  }
}
function startTimer() {
  let timeLeft = 30;

  timer = setInterval(() => {
    timeLeft--;
    timerProgress.style.width = `${(timeLeft / 30) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert(`Time's up! The correct answer is ${currentAnswer}.`);
      answerInput.value = '';
      generateQuestion();
    }
  }, 1000);
}

const rulesButton = document.getElementById('rules-button');
const infoBox = document.getElementById('info-box');
const closeInfoBox = document.getElementById('close-info-box');

rulesButton.addEventListener('click', () => {
  infoBox.style.display = 'flex';
});

closeInfoBox.addEventListener('click', () => {
  infoBox.style.display = 'none';
});

startTimer();
submitBtn.addEventListener('click', checkAnswer);
generateQuestion();
