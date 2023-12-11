const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const colors = ["red", "green", "blue", "magenta", "purple", "cyan"];
let lastColorIndex = -1;
class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityY = 0;
    this.dampening = 0.7;
    this.epsilon = 0.05;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update(canvasHeight) {
    const gravity = Math.max(Math.random(), 0.5);
    this.velocityY += gravity;
    this.y += this.velocityY;

    if (this.y + this.radius > canvasHeight) {
      this.y = canvasHeight - this.radius;
      this.velocityY *= -this.dampening;

      if (Math.abs(this.velocityY) < this.epsilon) {
        this.velocityY = 0;
      }
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.velocityY *= -this.dampening;
    }
  }
}

canvas.width = 1000;
canvas.height = 700;

const balls = [];

canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const radius = 20;
  if (x - radius >= 0 && x + radius <= canvas.width) {
    let colorIndex;
    do {
      colorIndex = Math.floor(Math.random() * colors.length);
    } while (colorIndex === lastColorIndex);
    lastColorIndex = colorIndex;

    const color = colors[colorIndex];
    balls.push(new Ball(x, y, radius, color));
  }
});

let lastTime = 0;
function tick(currentTime) {
  //let deltaTime = currentTime - lastTime;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(function (ball) {
    ball.update(canvas.height);
    ball.draw(context);
  });

  // lastTime = currentTime;
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
