# Bouncing Ballz Game 🎮

Welcome to Bouncing Ballz, a simple, fun, and interactive game built with JavaScript. The game involves creating balls of different colors or patterns on a canvas with just a click of your mouse.

## 🕹️ How to Play

1. Launch the game in your preferred web browser.
2. Click anywhere on the canvas to create a ball.
3. Each click generates a ball at the clicked position, adorned with a random color or pattern.

## 🌟 Game Features

- Utilizes HTML5 Canvas for rendering.
- Balls are generated at the exact position of the mouse click.
- Each ball boasts a random color selected from a predefined list.
- There’s a 10% chance that a ball will feature a black and white pattern instead of a solid color.
- The balls bounce realistically, courtesy of a simple physics simulation.

## 📚 Code Structure

The game code revolves around the Ball class, which symbolizes a ball on the canvas. Each Ball object has properties such as its position, radius, color, and velocity. The Ball class also includes methods to draw the ball on the canvas and to update the ball’s position based on its velocity.

The game loop is implemented using the requestAnimationFrame function. In each frame of the game, the position of each ball is updated, and then the ball is drawn on the canvas.

## 🚀 Future Improvements

- Introduce more interactivity, such as the ability to drag and drop balls.
- Incorporate more patterns and colors for the balls.
- Enhance the physics simulation, by adding friction and enabling balls to bounce off each other.

## Enjoy the game and let the fun begin! 🎉

## 🏁 Getting Started

To get started, clone the repository:

```bash
git clone https://github.com/mariajavadyan/bouncing-ballz.git
```
