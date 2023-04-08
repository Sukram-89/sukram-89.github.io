const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let animationFrameId;

const particles = [];
const numParticles = 300;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
    this.color = randomColor(); // Assign a random color to the particle
  }
  update() {
    this.weight += 0.01;
    this.y += this.weight;
    this.x += (Math.random() - 0.5) * this.size * 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 300; i++) {
  particles.push(
    new Particle(
      Math.random() * confettiCanvas.width,
      Math.random() * confettiCanvas.height,
      randomRange(5, 10),
      randomRange(1, 3)
    )
  );
}

function randomColor() {
  const colors = [
    '#FFC300', // Bright Yellow
    '#FF5733', // Bright Orange
    '#C70039', // Bright Red
    '#900C3F', // Dark Red
    '#581845', // Dark Purple
    '#00FFFF', // Bright Cyan
    '#00FF00', // Bright Green
    '#FF00FF', // Bright Magenta
    '#FF007F', // Bright Pink
    '#3399FF'  // Bright Sky Blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function animateParticles() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (const particle of particles) {
    particle.update();
    particle.draw();

    if (particle.y > confettiCanvas.height) {
      particle.y = 0 - particle.size;
      particle.weight = randomRange(1, 3);
      particle.x = Math.random() * confettiCanvas.width;
      particle.color = randomColor(); // Assign a new random color to the particle
    }
  }
  animationFrameId = requestAnimationFrame(animateParticles);
}

function stopParticles() {
  cancelAnimationFrame(animationFrameId);
}

// Call the animateParticles function when you want to show confetti
// Example: animateParticles();
