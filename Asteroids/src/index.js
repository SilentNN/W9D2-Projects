console.log("Webpack is working!");
const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const Game = require("./game.js");
const GameView = require("./game_view.js")

window.addEventListener("DOMContentLoaded", function (event) {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
//   window.Game = Game;
//   window.GameView = GameView;
//   window.MovingObject = MovingObject;
//   window.Asteroid = Asteroid;
    const gv = new GameView(new Game, ctx);
    gv.start();
    window.ctx = ctx;
    
});


// window.MovingObject = MovingObject;
