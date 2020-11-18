/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Asteroid(options) {\n    options = options || {};\n    options.color = \"red\";\n    options.radius = 20;\n    options.pos = options.pos;\n    options.vel = options.vel || Util.randomVec(3);\n    \n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function (otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n    } else {\n        this.remove();\n        otherObject.remove();\n    }\n}\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\")\n\nfunction Game () {\n    this.asteroids = [];\n    this.addAsteroids();\n    this.ship = new Ship({pos: this.randomPosition(), game: this});\n}\n\nGame.DIM_X = 640;\nGame.DIM_Y = 480;\nGame.NUM_ASTEROIDS = 6;\n\nGame.prototype.addAsteroids = function () {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));\n    }\n};\nGame.prototype.moveObjects = function () {\n     this.allObjects().forEach(function (object) {\n       object.move();\n     });\n}\n\nGame.prototype.wrap = function (pos) {\n \n    function newPos (pos, bound) {\n         if (pos < 0) {\n           return (bound + pos) % bound;\n         } else {\n           return pos % bound;\n         }\n    }\n    return [newPos(pos[0],Game.DIM_X), newPos(pos[1], Game.DIM_Y)];\n}\n\nGame.prototype.randomPosition = function () {\n    const randX = Game.DIM_X * Math.random();\n    const randY = Game.DIM_Y * Math.random();\n    return [randX, randY];\n};\n\nGame.prototype.draw = function (ctx) {\n    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);\n    \n    this.allObjects().forEach(function (object) {\n        object.draw(ctx);\n    });\n};\n\nGame.prototype.checkCollisions = function () {\n    for (let i = 0; i < this.allObjects.length - 1; i++) {\n        for (let j = i + 1; j < this.allObjects.length; j++) {\n            if (this.allObjects[i].isCollidedWith(this.allObjects[j])){\n                this.allObjects[i].collideWith(this.allObjects[j]);\n            }\n        }   \n    }\n}\n\nGame.prototype.step = function(){\n    this.moveObjects();\n    this.checkCollisions();\n}\n\nGame.prototype.remove = function (asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);\n}\n\nGame.prototype.allObjects = function () {\n    return this.asteroids.concat(this.ship);\n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n}\n\nGameView.prototype.start = function () {\n    const that = this;\n    setInterval(function () {\n        that.game.step();\n        that.game.draw(that.ctx);\n    }, 20);\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("function MovingObject(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\n\nMovingObject.prototype.draw = function (ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false\n        );\n    ctx.fill();\n};\n\nMovingObject.prototype.move = function() {\n    this.pos = this.game.wrap([this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n    const distance =\n      ((this.pos[0] - otherObject.pos[0]) ** 2 \n      + (this.pos[1] - otherObject.pos[1]) ** 2) ** 0.5;\n    return (this.radius + otherObject.radius) > distance;\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n    // this.game.remove(this);\n    // this.game.remove(otherObject);\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\")\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\n\nfunction Ship (options) {\n    options.radius = 15;\n    options.color = \"yellow\";\n    options.vel = options.vel || [0, 0];\n\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function () {\n    this.pos = this.game.randomPosition();\n    \n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const Util = {\n    inherits(childClass, parentClass) {\n        function Surrogate(){};\n        Surrogate.prototype = parentClass.prototype;\n        childClass.prototype = new Surrogate();\n        childClass.prototype.constructor = childClass;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("console.log(\"Webpack is working!\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\")\n\nwindow.addEventListener(\"DOMContentLoaded\", function (event) {\n  const canvas = document.getElementById(\"game-canvas\");\n  const ctx = canvas.getContext(\"2d\");\n//   window.Game = Game;\n//   window.GameView = GameView;\n//   window.MovingObject = MovingObject;\n//   window.Asteroid = Asteroid;\n    const gv = new GameView(new Game, ctx);\n    gv.start();\n    window.ctx = ctx;\n    \n});\n\n\n// window.MovingObject = MovingObject;\n\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;