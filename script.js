const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityY = 0;
    this.dampening = 0.9;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update(canvasHeight) {
    const gravity = 0.98;
    this.velocityY += gravity;
    this.y += this.velocityY;

    if (this.y + this.radius > canvasHeight) {
      this.y = canvasHeight - this.radius;
      this.velocityY *= -this.dampening;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.velocityY *= -this.dampening;
    }
  }
}

canvas.width = 1000;
canvas.height = 700;

let balls = [];

canvas.addEventListener("click", function (event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let radius = 20;
  let color = "blue";
  balls.push(new Ball(x, y, radius, color));
});

let lastTime = 0;
function tick(currentTime) {
  //let deltaTime = currentTime - lastTime;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(function (ball) {
    ball.update(canvas.height);
    ball.draw(context);
  });

  lastTime = currentTime;
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
