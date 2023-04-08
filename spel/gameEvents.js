const starsContainer = document.getElementById('stars-container');
const equation = document.querySelector('.equation');
const circleContainer = document.querySelector('.circle-container');
const submitAnswerButton = document.getElementById('submit-answer');
const replayGameButton = document.getElementById('replay-game');
const backButton = document.getElementById('back');
const winningScreen = document.getElementById('winning-screen');

let currentCorrectAnswer = 0

function handleCircleClick(e) {
  const circle = e.target;
  if (circle.classList.contains('selected')) {
    circle.classList.remove('selected');
    currentAnswer--;
  } else {
    circle.classList.add('selected');
    currentAnswer++;
  }

  equation.querySelector('#blank').textContent = currentAnswer;
}

function checkAnswer() {
  return currentAnswer == correctAnswer;
}

function updateStars() {
  starsContainer.innerHTML = '';
  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = '★';
    if (i < correctAnswers) {
      star.style.color = '#ffd700';
    } else {
      star.style.color = '#fff';
    }

    starsContainer.appendChild(star);
  }
}

function displayEquation() {
  const { num1, num2, result, sign } = generateEquation();
  const answerCircles = generateCircles(result + 2 + Math.floor(Math.random() * 3));
  answerCircles.forEach(circle => circle.addEventListener('click', handleCircleClick));

  equation.innerHTML = `${num1} ${sign} ${num2} = <span id="blank">_</span>`;
  circleContainer.innerHTML = '';
  answerCircles.forEach(circle => circleContainer.appendChild(circle));
}


function showWinningScreen() {
  winningScreen.style.display = 'flex';
  animateParticles(); // Start the confetti animation
  setTimeout(() => {
    stopParticles(); // Stop the confetti animation after 5 seconds
    window.location.href = 'index.html'; // Navigate back to index page after the animation is done
  }, 5000);
}

// Display initial equation and circles
displayEquation();

// Event listeners
submitAnswerButton.addEventListener('click', () => {
  if (checkAnswer()) {
    correctAnswers++;
    updateStars();
    if (correctAnswers === totalStars) {
      showWinningScreen();
    } else {
      displayEquation();
    }
  } else {
    displayEquation();
  }
});

replayGameButton.addEventListener('click', () => {
  winningScreen.style.display = 'none';
  correctAnswers = 0;
  updateStars();
  displayEquation();
});

backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

updateStars();
