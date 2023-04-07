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
    updateScore(5 - attempts);
    answerInput.value = '';
    setTimeout(generateQuestion, 2000);
  } else {
    attempts++;

    if (attempts >= 5) {
      alert(`Incorrect 5 times. The correct answer is ${currentAnswer}.`);
      answerInput.value = '';
      generateQuestion();
    } else {
      updateScore(-1);
      submitBtn.style.backgroundColor = 'red';
      setTimeout(() => {
        submitBtn.style.backgroundColor = '#4CAF50';
      }, 500);
    }
  }
}
function startTimer() {
  let timeLeft = 30 * 100; // Multiply by 100 to get finer granularity

  timer = setInterval(() => {
    timeLeft--;
    timerProgress.style.width = `${(timeLeft / (30 * 100)) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert(`Time's up! The correct answer is ${currentAnswer}.`);
      answerInput.value = '';
      generateQuestion();
    }
  }, 10); // Decrease the interval duration to 10 milliseconds
}
startTimer();
submitBtn.addEventListener('click', checkAnswer);
generateQuestion();
