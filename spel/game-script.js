const timerElement = document.querySelector(".timer-bar");
const equationElement = document.querySelector(".equation");
const answerInput = document.querySelector("#answer");
const formElement = document.querySelector("form");
const exitButton = document.querySelector(".exit-btn");
const scoreElement = document.querySelector(".score");
const finishedContainer = document.querySelector(".finished-container");
const finalScoreElement = document.querySelector("#final-score");
const playAgainButton = document.querySelector("#play-again-btn");
const submitButton = document.querySelector("#submit-btn");


function getConfigFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  const value1 = parseInt(urlParams.get("value1"));
  const value2 = parseInt(urlParams.get("value2"));
  const operations = urlParams.get("operation");
  const time = parseInt(urlParams.get("time"));

  return { value1, value2, operations, time };
}

let config = getConfigFromUrl();

let totalTime = config.time * 1000;
let questionCount = 0;
let correctAnswers = 0;
let startTime;
let timer;
let score = 0;

function getOperatorFromText(operation) {
  switch (operation) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "*";
    case "divide":
      return "/";
    default:
      return "";
  }
}

function generateEquation() {
  let value1 = Math.floor(Math.random() * (config.value1 + 1));
  let value2 = Math.floor(Math.random() * (config.value2 + 1));
  let operator = getOperatorFromText(config.operations);

  let equationString = `${value1} ${operator} ${value2}`;
  console.log(equationString)
  let correctAnswer = eval(equationString);

  return { equationString, correctAnswer };
}

function startTimer() {
  startTime = new Date().getTime();
  timer = setInterval(() => {
    let elapsedTime = new Date().getTime() - startTime;
    let remainingTime = totalTime - elapsedTime;
    let percentage = (remainingTime / totalTime) * 100;

    timerElement.style.width = `${percentage}%`;

    if (remainingTime <= 0) {
      clearInterval(timer);
      handleTimerEnd();
    }
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function calculateScore(timeTaken) {
  let timePercentage = (1 - timeTaken / totalTime) * 100;
  let baseScore = 100;

  return baseScore * (timePercentage / 100);
}

function updateScore(newScore) {
  score += newScore;
  scoreElement.textContent = Math.round(score);
}

function finishGame() {
  stopTimer();
  finishedContainer.style.display = "block";
  finalScoreElement.textContent = Math.round(score);
  hideElements();
  finishedContainer.classList.add("animate__animated", "animate__zoomIn");

  playAgainButton.addEventListener("click", () => {
    showElements();
    finishedContainer.style.display = "none";
    formElement.style.display = "block";
    timerElement.style.display = "block";
    resetGame();
    generateAndDisplayNewEquation();
  });
}

function showElements() {
  const elementsToShow = [
    document.querySelector(".score"),
    document.querySelector(".timer"),
    document.querySelector(".equation"),
    document.querySelector("form"),
  ];

  elementsToShow.forEach((element) => {
    element.style.display = "block";
  });
}

function resetGame() {
  correctAnswers = 0;
  score = 0;
  scoreElement.textContent = Math.round(score);
}


function hideElements() {
  const elementsToHide = [
    document.querySelector(".score"),
    document.querySelector(".timer"),
    document.querySelector(".equation"),
    document.querySelector("form"),
  ];

  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });
}


function handleSubmit(e) {
  e.preventDefault();

  let timeTaken = new Date().getTime() - startTime;
  let userAnswer = parseInt(answerInput.value);

  if (userAnswer === currentEquation.correctAnswer) {
    let newScore = calculateScore(timeTaken);
    updateScore(newScore);
    correctAnswers++;
    generateAndDisplayNewEquation();
  } else {
    updateScore(-10);
  }
}

function handleTimerEnd() {
  generateAndDisplayNewEquation();
}
function generateAndDisplayNewEquation() {
  if (correctAnswers >= 5) {
    finishGame();
    return;
  }

  currentEquation = generateEquation();
  equationElement.textContent = currentEquation.equationString;
  answerInput.value = "";
  answerInput.focus();
  stopTimer();
  startTimer();
}


let currentEquation = generateEquation();
equationElement.textContent = currentEquation.equationString;
startTimer();

formElement.addEventListener("submit", handleSubmit);
exitButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
