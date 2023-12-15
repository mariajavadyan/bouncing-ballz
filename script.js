const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const colors = ["red", "blue", "lime", "magenta", "purple", "cyan", "yellow"];
let lastColorIndex = -1;
class Ball {
  constructor(x, y, radius, color, striped = false, pattern = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityY = 0;
    this.dampening = 0.7;
    this.epsilon = 0.05;
    this.striped = striped;
    this.pattern = pattern;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.pattern) {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = this.radius * 2;
      patternCanvas.height = this.radius * 2;
      const patternContext = patternCanvas.getContext("2d");

      patternContext.fillStyle = "black";
      patternContext.fillRect(0, 0, this.radius, this.radius);
      patternContext.fillRect(
        this.radius,
        this.radius,
        this.radius,
        this.radius
      );
      patternContext.fillStyle = "white";
      patternContext.fillRect(this.radius, 0, this.radius, this.radius);
      patternContext.fillRect(0, this.radius, this.radius, this.radius);

      const pattern = context.createPattern(patternCanvas, "repeat");
      context.fillStyle = pattern;
    } else {
      context.fillStyle = this.color;
    }

    context.fill();
    context.closePath();
  }

  update(canvasHeight, deltaTime) {
    if (this.velocitY !== 0) {
      // gravity determines a realistic acceleration
      const gravity = 0.005;
      this.velocityY += gravity * deltaTime;
      this.y += this.velocityY * deltaTime;

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
}

canvas.width = 1000;
canvas.height = 700;

const balls = [];

canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const isPatterned = Math.random() < 0.1;
  const radius = 20;
  let color;
  let pattern = null;

  if (x - radius >= 0 && x + radius <= canvas.width) {
    if (isPatterned) {
      pattern = "bw";
    } else {
      let colorIndex;
      do {
        colorIndex = Math.floor(Math.random() * colors.length);
      } while (colorIndex === lastColorIndex);
      lastColorIndex = colorIndex;

      color = colors[colorIndex];
    }
    balls.push(new Ball(x, y, radius, color, false, pattern));
  }
});

let lastTime = 0;
function tick(currentTime) {
  let deltaTime = currentTime - lastTime;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(function (ball) {
    ball.update(canvas.height, deltaTime);
    ball.draw(context);
  });

  lastTime = currentTime;

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
