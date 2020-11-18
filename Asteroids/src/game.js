const Asteroid = require("./asteroid");
const Util = require("./util");
const Ship = require("./ship")

function Game () {
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Ship({pos: this.randomPosition(), game: this});
}

Game.DIM_X = 640;
Game.DIM_Y = 480;
Game.NUM_ASTEROIDS = 6;

Game.prototype.addAsteroids = function () {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
    }
};
Game.prototype.moveObjects = function () {
     this.allObjects().forEach(function (object) {
       object.move();
     });
}

Game.prototype.wrap = function (pos) {
 
    function newPos (pos, bound) {
         if (pos < 0) {
           return (bound + pos) % bound;
         } else {
           return pos % bound;
         }
    }
    return [newPos(pos[0],Game.DIM_X), newPos(pos[1], Game.DIM_Y)];
}

Game.prototype.randomPosition = function () {
    const randX = Game.DIM_X * Math.random();
    const randY = Game.DIM_Y * Math.random();
    return [randX, randY];
};

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
};

Game.prototype.checkCollisions = function () {
    for (let i = 0; i < this.allObjects.length - 1; i++) {
        for (let j = i + 1; j < this.allObjects.length; j++) {
            if (this.allObjects[i].isCollidedWith(this.allObjects[j])){
                this.allObjects[i].collideWith(this.allObjects[j]);
            }
        }   
    }
}

Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
}

Game.prototype.remove = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
}

Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
}


module.exports = Game;