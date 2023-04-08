const urlParams = new URLSearchParams(window.location.search);
const difficulty = Number(urlParams.get('difficulty')) || 1;
const totalStars = 7;
let correctAnswers = 0;
let currentAnswer = 0;

function generateEquation() {
  let num1, num2, result, sign;
  switch (difficulty) {
    case 1:
    case 2:
      do {
        num1 = Math.floor(Math.random() * (difficulty === 1 ? 5 : 10)) + 1;
        num2 = Math.floor(Math.random() * (difficulty === 1 ? 5 : 10)) + 1;
        result = num1 + num2;
      } while (result === 0);
      sign = "+";
      break;
    case 3:
    case 4:
      do {
        num1 = Math.floor(Math.random() * (difficulty === 3 ? 5 : 10)) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        result = num1 - num2;
      } while (result === 0);
      sign = "-";
      break;
    case 5:
      do {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        if (Math.random() < 0.5) {
          result = num1 + num2;
          sign = '+';
        } else {
          if (num1 < num2) [num1, num2] = [num2, num1];
          result = num1 - num2;
          sign = '-';
        }
      } while (result === 0);
      break;
  }
  currentAnswer = 0;
  correctAnswer = result;
  return { num1, num2, result, sign };
}

function generateCircles(value) {
  console.log("Value: "+value)
  const circles = [];
  for (let i = 0; i < value; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const xMark = document.createElement('span');
    xMark.classList.add('x-mark');
    xMark.innerHTML = '&times;';
    circle.appendChild(xMark);

    circles.push(circle);
  }
  return circles;
}
