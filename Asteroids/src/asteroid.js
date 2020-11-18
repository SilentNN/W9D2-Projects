const Util = require("./util");
const MovingObject = require("./moving_object");

function Asteroid(options) {
    options = options || {};
    options.color = "red";
    options.radius = 20;
    options.pos = options.pos;
    options.vel = options.vel || Util.randomVec(3);
    
    MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
    } else {
        this.remove();
        otherObject.remove();
    }
}
module.exports = Asteroid;