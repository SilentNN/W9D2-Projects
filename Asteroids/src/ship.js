const MovingObject = require("./moving_object")
const Util = require("./util")

function Ship (options) {
    options.radius = 15;
    options.color = "yellow";
    options.vel = options.vel || [0, 0];

    MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    
}

module.exports = Ship;