(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["commonClasses"] = factory();
	else
		root["commonClasses"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./class/common/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./class/client/graphic.js":
/*!*********************************!*\
  !*** ./class/client/graphic.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Graphic\n{\n\tstatic resizeCanvas(options)\n    {\n\t\tvar {\n\t\t\tcanvas,\n\t\t\twidth, \n\t\t\theight,\n\t\t} = options;\n\n        canvas.width = width;\n        canvas.height = height;\n\n        var gameWidth = window.innerWidth;\n        var gameHeight = window.innerHeight;\n        var scaleToFitX = gameWidth / canvas.width;\n        var scaleToFitY = gameHeight / canvas.height;\n        var currentScreenRatio = gameWidth / gameHeight;\n        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);\n        //if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) //if fullscreen\n        //{\n        //    canvas.ratio = width / gameWidth;\n        //    canvas.style.width = gameWidth + \"px\";\n        //    canvas.style.height = gameHeight + \"px\";\n        //}\n        //else\n        //{\n            canvas.ratio = width / (canvas.width * optimalRatio);\n            canvas.style.width = canvas.width * optimalRatio + \"px\";\n            canvas.style.height = canvas.height * optimalRatio + \"px\";\n        //}\n\n        //Canvas at middle\n        canvas.style.position = \"absolute\";\n\n        canvas.style.marginLeft = parseInt(canvas.style.width, 10) / -2 + \"px\";\n        canvas.style.left = \"50%\";\n\n        canvas.style.marginTop = parseInt(canvas.style.height, 10) / -2 + \"px\";\n        canvas.style.top = \"50%\";\n    }\n\t\n\tstatic getDynamicColor(options)\n\t{\n\t\tvar {\n\t\t\tstartColor,\n\t\t\tendColor,\n\t\t\topacity = 1,\n\t\t\tratio,\n\t\t\tasArray = false\n\t\t} = options;\n\n\t\tvar colorArray = new Array();\n\n\t\tcolorArray.push(startColor[0]);\n\t\tcolorArray.push(startColor[1]);\n\t\tcolorArray.push(startColor[2]);\n\n\t\tvar deltaColor = [\n\t\t\t\t(endColor[0] - startColor[0]) * (1 - ratio),\n\t\t\t\t(endColor[1] - startColor[1]) * (1 - ratio),\n\t\t\t\t(endColor[2] - startColor[2]) * (1 - ratio)\n\t\t];\n\n\t\tcolorArray[0] += deltaColor[0] >> 0;\n\t\tcolorArray[1] += deltaColor[1] >> 0;\n\t\tcolorArray[2] += deltaColor[2] >> 0;\n\n\t\tif(!asArray)\n\t\t\treturn `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${opacity})`;\n\t\telse\n\t\t\treturn colorArray;\n\t}\n}\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/graphic.js?");

/***/ }),

/***/ "./class/client/particle.js":
/*!**********************************!*\
  !*** ./class/client/particle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = class Particle extends __webpack_require__(/*! ../common/movable.js */ \"./class/common/movable.js\")\r\n{\r\n    get defaultOptions()\r\n    {\r\n        return Object.assign(super.defaultOptions, {\r\n            duration: 100,\r\n            radius: 30,\r\n            startColor: [255, 0, 0],\r\n            endColor: [255, 255, 0],\r\n        });\r\n    }\r\n\r\n    init()\r\n    {\r\n        super.init();\r\n\r\n        this.countdownToDestruction = this.duration;\r\n        this.startRadius = this.radius;\r\n        this.remainingLifeRatio = 1;\r\n        this.opacity = 1;\r\n    }\r\n\r\n    updateClient(modifier)\r\n    {\r\n        this.countdownToDestruction -= modifier*1000;\r\n        if(this.countdownToDestruction < 0)\r\n            return this.remove();\r\n        \r\n        this.remainingLifeRatio = this.countdownToDestruction / this.duration;\r\n        // this.radius = this.startRadius * timeRemainingRatio;\r\n        // this.opacity = 1 * timeRemainingRatio;\r\n\r\n        this.updateByAngleAndDistance(this.moveAngle, this.speed);\r\n    }\r\n\r\n    draw(ctx)\r\n    {\r\n        ctx.save();\r\n        ctx.globalCompositeOperation = 'destination-over';\r\n        ctx.fillStyle = clientClasses.Graphic.getDynamicColor({\r\n            startColor: this.startColor,\r\n            endColor: this.endColor,\r\n            ratio: this.remainingLifeRatio,\r\n            opacity: 1 * this.remainingLifeRatio,\r\n        });\r\n        ctx.beginPath();\r\n        ctx.arc(this.clientCenterX, this.clientCenterY, this.radius, 0, 2*Math.PI);\r\n        ctx.fill();\r\n        ctx.restore();\r\n    }\r\n};\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/particle.js?");

/***/ }),

/***/ "./class/client/reactor.js":
/*!*********************************!*\
  !*** ./class/client/reactor.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Geometry = __webpack_require__(/*! ../common/geometry.js */ \"./class/common/geometry.js\");\n\nclass Reactor extends __webpack_require__(/*! ../common/entity.js */ \"./class/common/entity.js\")\n{\n\tget defaultOptions()\n\t{\n\t\treturn {\n\t\t\tdistance: 30,\n\t\t\tangle: 0,\n\n\t\t\tcooldown: 15,\n\t\t\tparticle: {\n\t\t\t\tspeed: 1,\n\t\t\t\tduration: 150,\n\t\t\t\tradius: 4,\n\t\t\t},\n\t\t};\n\t}\n\n    init()\n    {\n        this.lastShotTime = Date.now();\n\t\t//this.maxParticleRadius = this.particle.radius;\n    }\n\n    getOwner()\n    {\n        return null;\n    }\n\n    equipTo(shipObj)\n    {\n        shipObj.equipReactor(this);\n    }\n\n\tupdate(modifier)\n\t{\n\t\tif( !this.getOwner().thrusting['forward'] )\n\t\t\treturn;\n\n        var now = Date.now();\n        if( this.lastShotTime + this.cooldown <= now )\n        {\n            this.lastShotTime = now;\n            this.emitParticle();\n        }\n\t}\n\n\temitParticle()\n\t{\n\n\t\tvar particlelOptions = Object.assign\n\t\t(\n\t\t\tthis.particle, \n\t\t\t{\n\t\t\t\tcenterX: Geometry.getXByAngleAndDistance(\n\t\t\t\t\tthis.getOwner().clientCenterX, \n\t\t\t\t\tGeometry.getReverseAngle(this.getOwner().lookAngle + this.angle), this.distance\n\t\t\t\t),\n\t\t\t\tcenterY: Geometry.getYByAngleAndDistance(\n\t\t\t\t\tthis.getOwner().clientCenterY, \n\t\t\t\t\tGeometry.getReverseAngle(this.getOwner().lookAngle + this.angle), this.distance\n\t\t\t\t),\n\t\t\t\t//radius: this.maxParticleRadius * this.getOwner().moveVector.speed / this.getOwner().maxSpeed,\n\t\t\t\tmoveAngle: Geometry.getReverseAngle(this.getOwner().lookAngle),\n\t\t\t}\n\t\t);\n\n\t\tvar particle = new clientClasses.Particle(particlelOptions)\n\t\t.addTo(this.getOwner().getState());\n\t}\n}\n\nmodule.exports = Reactor;\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/reactor.js?");

/***/ }),

/***/ "./class/common/collision.js":
/*!***********************************!*\
  !*** ./class/common/collision.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Collision\n{\n\tstatic checkCollisionBetween2rectangles(obj1, obj2)\n\t{\n\t\t\treturn (obj1.leftX  < obj2.leftX + obj2.width\n\t\t\t\t\t\t&& obj1.topY < obj2.topY + obj2.height\n\t\t\t\t\t\t&& obj2.leftX < obj1.leftX  + obj1.width\n\t\t\t\t\t\t&& obj2.topY < obj1.topY + obj1.height\n\t\t\t\t   );\n\t}\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/collision.js?");

/***/ }),

/***/ "./class/common/entity.js":
/*!********************************!*\
  !*** ./class/common/entity.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Entity\r\n{\r\n    constructor(options = {})\r\n    {\r\n        this.options = options;\r\n        this.applyOptions();\r\n        this.init();\r\n    }\r\n\r\n    get defaultOptions()\r\n    {\r\n        return {\r\n            id: null,\r\n\r\n\t\t\taddEvent: 'addEntity',\r\n\t\t\tremoveEvent: 'removeEntity',\r\n        };\r\n    }\r\n    applyOptions()\r\n    {\r\n        if(!this.options)\r\n            return;\r\n        \r\n        Object.entries( this.defaultOptions )\r\n        .forEach( ([key, defaultValue]) => \r\n        {\r\n            if(this.options[key] === undefined)\r\n                this[key] = defaultValue; // apply default value if doesnt exist\r\n            else\r\n                this[key] = this.options[key]; // or use given value\r\n        });\r\n    }\r\n\r\n\tonAdd()\r\n\t{\r\n\t\treturn null; // to be overriden\r\n\t}\r\n\tonRemove()\r\n\t{\r\n\t\treturn null; // to be overriden\r\n\t}\r\n\r\n    addTo(state, socket)\r\n    {\r\n\t\tif(state)\r\n\t\t\tthis.getState = ()=>{return state;};\r\n\t\tif(socket)\r\n\t\t\tthis.getSocket = ()=>{return socket};\r\n\r\n\t\ttry\r\n\t\t{\r\n\t\t\tthis.getState().addEntity(this);\r\n\t\t}\r\n\t\tcatch(e)\r\n\t\t{\r\n\t\t\tconsole.warn(e);\r\n\t\t}\r\n\r\n\t\tthis.emitAdd(this.getSocket(), true);\r\n\r\n\t\tthis.onAdd();\r\n\r\n        return this;\r\n    }\r\n\temitAdd(socket, broadcast = false)\r\n\t{\r\n\t\tif(!socket)\r\n\t\t\treturn;\r\n\r\n\t\tvar data = {options: this, constructor: this.constructor.name};\r\n\r\n\t\tsocket.emit(this.addEvent, data); // notify the client that this entity is added\r\n\t\tif(broadcast)\r\n\t\t\tsocket.broadcast.emit(this.addEvent, data); // notify every other client that this entity is added\r\n\t}\r\n\tremove()\r\n\t{\r\n\t\tif(this.getSocket())\r\n\t\t{\r\n\t\t\tthis.getSocket().emit(this.removeEvent, this.id); // notify the client that this entity is gone\r\n\t\t\tthis.getSocket().broadcast.emit(this.removeEvent, this.id); // notify every other client that this entity is gone\r\n\t\t}\r\n\t\tthis.getState().removeEntity(this.id);\r\n\r\n\t\tthis.onRemove();\r\n\t}\r\n\r\n    getState()\r\n    {\r\n        return false; // to be overriden\r\n    }\r\n    getSocket()\r\n    {\r\n        return false; // to be overriden\r\n    }\r\n\r\n    init()\r\n    {\r\n        \r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/entity.js?");

/***/ }),

/***/ "./class/common/geometry.js":
/*!**********************************!*\
  !*** ./class/common/geometry.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Geometry\r\n{\r\n\tstatic normalizeAngle(angle)\r\n\t{\r\n\t\twhile(angle < 0)\r\n\t\t\tangle += 360;\r\n\t\treturn angle % 360;\r\n\t}\r\n\r\n    static getDistanceBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var dx = Math.pow(x2 - x1, 2);\r\n        var dy = Math.pow(y1 - y2, 2);\r\n        var distance = Math.sqrt(dx + dy);\r\n        return distance;\r\n    }\r\n\r\n    static getAngleBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var deltaY = y2 - y1;\r\n        var deltaX = x2 - x1;\r\n\r\n        var theta = Math.atan2(-deltaY, deltaX);\r\n        if (theta < 0)\r\n            theta += 2 * Math.PI;\r\n\r\n        var angle = theta * 180 / Math.PI;\r\n\r\n        return angle;\r\n    }\r\n\r\n    static getDistanceBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var dx = Math.pow(x2 - x1, 2);\r\n        var dy = Math.pow(y1 - y2, 2);\r\n        var distance = Math.sqrt(dx + dy);\r\n        return distance;\r\n    }\r\n\r\n\tstatic getDeltaBetweenAngles(angle1, angle2)\r\n\t{\r\n\t\tvar angleDelta = (angle2 % 360) - (angle1 % 360);\r\n\t\tif (angleDelta < (-180))\r\n\t\t\tangleDelta += 360;\r\n\t\telse if (angleDelta > 180)\r\n\t\t\tangleDelta -= 360;\r\n\r\n\t\treturn angleDelta;\r\n\t}\r\n\r\n\tstatic sum2vectors(angle1, speed1, angle2, speed2)\r\n\t{\r\n\t\tvar x1 = this.getXByAngleAndDistance(0, angle1, speed1);\r\n\t\tvar y1 = this.getYByAngleAndDistance(0, angle1, speed1);\r\n\r\n\t\tvar x2 = this.getXByAngleAndDistance(0, angle2, speed2);\r\n\t\tvar y2 = this.getYByAngleAndDistance(0, angle2, speed2);\r\n\r\n\t\tvar xR = x1 + x2;\r\n\t\tvar yR = y1 + y2;\r\n\r\n\t\tvar speedR = this.getDistanceBy2XY(0, 0, xR, yR);\r\n\t\tvar angleR = this.getAngleBy2XY(0, 0, xR, yR);\r\n\r\n\t\treturn {\r\n\t\t\tspeed: speedR,\r\n\t\t  \tangle: angleR\r\n\t\t};\r\n\t}\r\n\r\n    static computeCosByAngle(angle)\r\n    {\r\n        return Math.cos(angle * Math.PI / 180);    \r\n    }\r\n    static computeSinByAngle(angle)\r\n    {\r\n        return Math.sin(angle * Math.PI / 180) * -1;\r\n    }\r\n    static configureStaticCosandSin()\r\n    {\r\n        this.static = {\r\n            COS: {},\r\n            SIN: {},\r\n        };\r\n\r\n        for (var i = 0; i <= 360; i++) \r\n        {\r\n            this.static.COS[i] = this.computeCosByAngle(i);\r\n        }\r\n        for (var i = 0; i <= 360; i++) \r\n        {\r\n            this.static.SIN[i] = this.computeSinByAngle(i);\r\n        }\r\n    }\r\n\r\n\tstatic getXByAngle(angle)\r\n\t{\r\n\t\treturn this.static.COS[angle>>0];\r\n\t}\r\n\tstatic getYByAngle(angle)\r\n\t{\r\n\t\treturn this.static.SIN[angle>>0];\r\n\t}\r\n\r\n    static getXByAngleAndDistance(x, angle, distance)\r\n    {\r\n        return (x + this.getXByAngle(angle) * distance);\r\n    }\r\n    static getYByAngleAndDistance(y, angle, distance)\r\n    {\r\n        return (y + this.getYByAngle(angle) * distance);\r\n    }\r\n    \r\n    static getReverseAngle(angle)\r\n    {\r\n        var newAngle = (angle + 180) % 360;\r\n        return newAngle;\r\n    }\r\n\r\n    /**\r\n     * Linear Interpolation method\r\n     * \r\n     * @param {float} startValue \r\n     * @param {float} destValue \r\n     * @param {float} normal (between 0 & 1)\r\n     */\r\n    static lerp(startValue, destValue, normal)\r\n    {\r\n        return (1 - normal) * startValue + normal * destValue;\r\n    }\r\n};\r\n\r\nGeometry.configureStaticCosandSin(); // Pre-calculate static cos and sin\r\n\r\nmodule.exports = Geometry;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/geometry.js?");

/***/ }),

/***/ "./class/common/index.js":
/*!*******************************!*\
  !*** ./class/common/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n\tPlayer: __webpack_require__(/*! ./player.js */ \"./class/common/player.js\"),\n\n\tMovable: __webpack_require__(/*! ./movable.js */ \"./class/common/movable.js\"),\n\tShip: __webpack_require__(/*! ./ship.js */ \"./class/common/ship.js\"),\n\tWeapon: __webpack_require__(/*! ./weapon.js */ \"./class/common/weapon.js\"),\n\tProjectile: __webpack_require__(/*! ./projectile.js */ \"./class/common/projectile.js\"),\n\n\tParticle: __webpack_require__(/*! ../client/particle.js */ \"./class/client/particle.js\"),\n\tGraphic: __webpack_require__(/*! ../client/graphic.js */ \"./class/client/graphic.js\"),\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/index.js?");

/***/ }),

/***/ "./class/common/movable.js":
/*!*********************************!*\
  !*** ./class/common/movable.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("class Movable extends __webpack_require__(/*! ./entity.js */ \"./class/common/entity.js\")\n{\n\tget defaultOptions()\n\t{\n\t\treturn Object.assign(super.defaultOptions, {\n\t\t\tcenterX: 50,\n\t\t\tcenterY: 50,\n\t\t\twidth: 50,\n\t\t\theight: 50,\n\t\t\tspeed: 150, // px/s\n\t\t\trotationSpeed: 540, // deg/s\n\t\t\tlookAngle: 90, // looking straight up : default angle\n\t\t\tmoveAngle: null,\n\t\t});\n\t}\n\n\tget leftX()\n\t{\n\t\treturn this.centerX - this.width/2;\n\t}\n\tget topY()\n\t{\n\t\treturn this.centerY - this.height/2;\n\t}\n\n\tsetCenterX(value)\n\t{\n\t\tthis.centerX = value;\n\t}\n\tsetCenterY(value)\n\t{\n\t\tthis.centerY = value;\n\t}\n\n\tinit()\n\t{\n\t\tthis.maxSpeed = this.speed;\n\n\t\tthis.movement = {\n\t\t\tx: 0,\n\t\t\ty: 0,\n\t\t};\n\n\t\tthis.moveVector = {\n\t\t\tangle: 90,\n\t\t\tspeed: 0,\n\t\t};\n\n\t\tthis.clientCoords = {}; // this obj contains client-only vars used for interpolation\n\n\t\t/* Client behaviour */\n\t\tif(typeof window !== 'undefined')\n\t\t{\n\t\t\tthis.sprite = new window.Image();\n\t\t\tif(this.spriteSrc)\n\t\t\t\tthis.sprite.src = this.spriteSrc\n\n\t\t\tthis.serverUpdatesArray = [];\n\t\t}\n\t}\n\n\tupdate(modifier)\n\t{\n\t\tthis.updateByMovement(modifier);\n\t}\n\n\tupdateByMovement(modifier)\n\t{\n\t\tthis.setCenterX( this.centerX + this.movement.x * this.speed * modifier );\n\t\tthis.setCenterY( this.centerY + this.movement.y * this.speed * modifier );\n\t}\n\n\tupdateByAngleAndDistance(angle, distance)\n\t{\n\t\tthis.setCenterX( this.centerX + distance * this.constructor.Geometry.getXByAngle(angle) );\n\t\tthis.setCenterY( this.centerY + distance * this.constructor.Geometry.getYByAngle(angle) );\n\t}\n\n\tupdateByAngleAndModifier(angle, modifier)\n\t{\n\t\treturn this.updateByAngleAndDistance(angle, this.speed * modifier);\n\t}\n\n\tmoveByAngleAndSpeed(modifier)\n\t{\n\t\tthis.updateByAngleAndModifier(this.lookAngle, modifier);\n\t}\n\n\tmoveByVector(modifier)\n\t{\n\t\treturn this.updateByAngleAndDistance(this.moveVector.angle, this.moveVector.speed * modifier);\n\t}\n\n\tupdateLookAngle(modifier, angleToReach)\n\t{\n\t\tvar d = angleToReach - (this.lookAngle % 360);\n\t\tif (d < (-180))\n\t\t\td += 360;\n\t\telse if (d > 180)\n\t\t\td -= 360;\n\t\tif (d < -this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle -= this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle < 0)\n\t\t\t\tthis.lookAngle += 360;\n\t\t}\n\t\telse if (d > this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle += this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle > 360)\n\t\t\t\tthis.lookAngle -= 360;\n\t\t}\n\t\telse\n\t\t\tthis.lookAngle = angleToReach;\n\t}\n\n\tturnToLookPointCoords(modifier)\n\t{\n\t\tif(\n\t\t\t!this.lookPointCoords.x\n\t\t\t|| !this.lookPointCoords.y\n\t\t\t|| !modifier\n\t\t)\n\t\t\treturn;\n\n\t\tvar angleBetweenMeAndMouse = this.constructor.Geometry.getAngleBy2XY(\n\t\t\tthis.clientCenterX, \n\t\t\tthis.clientCenterY, \n\t\t\tthis.lookPointCoords.x, \n\t\t\tthis.lookPointCoords.y\n\t\t);\n\n\t\tthis.updateLookAngle(modifier, angleBetweenMeAndMouse);\n\t}\n\n\t/********** CLIENT FUNCTIONS **********/\n\n\tget clientCenterX()\n\t{\n\t\treturn this.clientCoords.centerX || this.centerX;\n\t}\n\tget clientCenterY()\n\t{\n\t\treturn this.clientCoords.centerY || this.centerY;\n\t}\n\tget clientLookAngle()\n\t{\n\t\treturn this.clientCoords.lookAngle || this.lookAngle;\n\t}\n\n\trotateContextByLookAngle(ctx)\n\t{\n\t\tctx.save();\n\t\tctx.translate(this.clientCenterX, this.clientCenterY);\n\t\tvar rotationRadian = Math.PI / 180 * -(this.clientLookAngle - 90);\n\t\tctx.rotate(rotationRadian);\n\t}\n\n\tdraw(ctx, ctxOptions = {})\n\t{\n\t\tthis.rotateContextByLookAngle(ctx); // rotate ctx ...\n\t\t\n\t\tObject.entries(ctxOptions).forEach( ([property, value])=>\n\t\t{\n\t\t\tctx[property] = value;\n\t\t});\n\n\t\tctx.drawImage(\n\t\t\tthis.sprite,\n\t\t\t-this.width/2,\n\t\t\t-this.height/2,\n\t\t\tthis.width,\n\t\t\tthis.height,\n\t\t);\n\t\tctx.restore(); // ... and restore it !\n\t}\n\n\tupdateClient(modifier)\n\t{\n\t\tthis.updateByInterpolation(this.getState().now);\n\t}\n\n\tupdateByInterpolation(now = Date.now())\n\t{\n\t\tif(this.serverUpdatesArray.length < 2)\n\t\t\treturn;\n\t\tvar timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;\n\t\tvar timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;\n\t\tvar modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;\n\t\t\n\t\tthis.clientCoords.centerX = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerX, this.centerX, modifier);\n\t\tthis.clientCoords.centerY = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerY, this.centerY, modifier);\n\t}\n\n\tstoreLastPosition()\n\t{\n\t\tthis.serverUpdatesArray.push({\n\t\t\tcenterX: this.centerX,\n\t\t\tcenterY: this.centerY,\n\t\t\tlookAngle: this.lookAngle,\n\t\t\ttimestamp: Date.now(),\n\t\t})\n\t\tif(this.serverUpdatesArray.length > 2)\n\t\t\tthis.serverUpdatesArray.shift();\n\t}\n};\nMovable.Geometry = __webpack_require__(/*! ./geometry.js */ \"./class/common/geometry.js\");\n\nmodule.exports = Movable;\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/movable.js?");

/***/ }),

/***/ "./class/common/player.js":
/*!********************************!*\
  !*** ./class/common/player.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("class Player extends __webpack_require__(/*! ./entity.js */ \"./class/common/entity.js\")\n{\n\tget defaultOptions()\n\t{\n\t\treturn Object.assign(super.defaultOptions, {\n\t\t\tname: '',\n\t\t\tshipID: null,\n\t\t});\n\t}\n\n\tgetShip()\n\t{\n\t\tif(!this.shipID)\n\t\t\treturn null;\n\t\treturn this.getState().entities[this.shipID];\n\t}\n\n\tgetAssignment()\n\t{\n\t\tvar result = null;\n\t\tvar ship = this.getShip();\n\t\tif(ship)\n\t\t{\n\t\t\tObject.entries(ship.playerCrew).forEach( ([assignment, playerID])=>\n\t\t\t{\n\t\t\t\tif( playerID === this.id )\n\t\t\t\t\tresult = assignment;\n\t\t\t} );\t\t\n\t\t}\n\t\treturn result;\n\t}\n\n    /********** CLIENT FUNCTIONS **********/\n\n\tgiveControls(domContainer)\n\t{\n\t\tvar domContainer = this.getState().canvas;\n\n\t\tvar myShip = this.getShip();\n\t\tif(!myShip)\n\t\t\treturn;\n\t\tvar clientState = myShip.getState();\n\t\tif(!clientState)\n\t\t\treturn;\n\n\t\t/* Keyboard events */\n\n\t\twindow.addEventListener(\"keydown\", this.onKeyDown);\n\t\twindow.addEventListener(\"keyup\", this.onKeyUp);\n\n\t\t/* Mouse events */\n\n\t\tdomContainer.addEventListener('mousemove', this.onMouseMove);\n\t\tdomContainer.addEventListener('mousedown', this.onMouseDown);\n\t\tdomContainer.addEventListener('mouseup', this.onMouseUp || this.onMouseDown);\n\n\t\t/* disable default right click context menu */\n\t\tdomContainer.addEventListener('contextmenu', (e)=>\n\t\t{\n\t\t\te.preventDefault();\n\t\t});\n\t}\n\n\tonAdd()\n\t{\n\t\tif( typeof window !== 'undefined' && this.getState().isCurrentPlayer(this.id) )\n\t\t{\n\t\t\tvar myShip = this.getShip();\n\t\t\tvar myAssignment = this.getAssignment();\n\n\t\t\t/* Assign every ship assignment controls to the player in charge */\n\t\t\tObject.entries(myShip.getMouseControlsByAssignment()[myAssignment])\n\t\t\t.concat( Object.entries(myShip.getKeyControlsByAssignment()[myAssignment]) )\n\t\t\t.forEach( ([event, callback])=>\n\t\t\t{\n\t\t\t\tthis[event] = (e)=>\n\t\t\t\t{\n\t\t\t\t\tcallback.apply(myShip, [e]);\n\t\t\t\t};\n\t\t\t} );\n\n\t\t\tthis.giveControls( this.getState().canvas );\n\t\t}\n\t}\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/player.js?");

/***/ }),

/***/ "./class/common/projectile.js":
/*!************************************!*\
  !*** ./class/common/projectile.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Collision = __webpack_require__(/*! ./collision.js */ \"./class/common/collision.js\");\r\n\r\nmodule.exports = class Projectile extends __webpack_require__(/*! ./movable.js */ \"./class/common/movable.js\")\r\n{\r\n    get defaultOptions()\r\n    {\r\n        return Object.assign(super.defaultOptions, {\r\n\t\t\tgroups: ['projectiles'],\r\n\t\t\t\r\n\t\t\tspriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/blue-beam.png',\r\n\r\n            color: 'red',\r\n\t\t\tdamage: 0,\r\n\t\t\tmaxRange: 200,\r\n\t\t\towner: null,\r\n        });\r\n    }\r\n\r\n\tinit()\r\n\t{\r\n\t\tsuper.init();\r\n\r\n\t\tthis.travelledDistance = 0;\r\n\t\tthis.opacity = 1;\r\n\t}\r\n\r\n    update(modifier)\r\n    {\r\n\t\tvar lastPos = {x: this.centerX, y: this.centerY};\r\n\t\tthis.moveByAngleAndSpeed(modifier);\r\n\t\t\r\n\t\tthis.travelledDistance += this.constructor.Geometry.getDistanceBy2XY(\r\n\t\t\tlastPos.x,\r\n\t\t\tlastPos.y,\r\n\t\t\tthis.centerX,\r\n\t\t\tthis.centerY\r\n\t\t);\r\n\r\n\t\tvar remainingLifeRatio = Math.min(1, (this.maxRange - this.travelledDistance) / this.maxRange );\r\n\t\tthis.opacity = remainingLifeRatio;\r\n\r\n\t\tif(this.travelledDistance >= this.maxRange)\r\n\t\t\treturn this.remove();\r\n\r\n\t\tthis.checkForCollision();\r\n    }\r\n\r\n\tcheckForCollision()\r\n\t{\r\n\t\tvar myOwner = this.getOwner();\r\n\t\tObject.values( this.getState().groups['ships'] ).forEach((obj)=>\r\n\t\t{\r\n\t\t\tif(myOwner.id === obj.id) // don't damage your owner\r\n\t\t\t\treturn;\r\n\t\t\tif(!Collision.checkCollisionBetween2rectangles(this, obj))\r\n\t\t\t\treturn;\r\n\r\n\t\t\tvar damagesToInflict = this.damage;\r\n\t\t\tthis.remove();\r\n\t\t\tobj.takeDamages(damagesToInflict);\r\n\t\t});\r\n\t}\r\n\r\n    /********** CLIENT FUNCTIONS **********/\r\n\r\n\tdraw(ctx)\r\n\t{\r\n\t\tsuper.draw(ctx, {globalAlpha: this.opacity});\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/projectile.js?");

/***/ }),

/***/ "./class/common/ship.js":
/*!******************************!*\
  !*** ./class/common/ship.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Weapon = __webpack_require__(/*! ./weapon.js */ \"./class/common/weapon.js\");\nconst Reactor = __webpack_require__(/*! ../client/reactor.js */ \"./class/client/reactor.js\");\nconst Collision = __webpack_require__(/*! ./collision.js */ \"./class/common/collision.js\");\n\nmodule.exports = class Ship extends __webpack_require__(/*! ./movable.js */ \"./class/common/movable.js\")\n{\n    get defaultOptions()\n\t{\n\t\treturn Object.assign(super.defaultOptions, {\n\t\t\tgroups: ['ships'],\n\t\t\tplayerCrew: {},\n\n\t\t\twidth: 42,\n\t\t\theight: 60,\n\n\t\t\tspeed: 400, // px/s\n\t\t\tthrust: {\n\t\t\t\tforward: 60,\n\t\t\t\tbackward: 20,\n\t\t\t\tleft: 20,\n\t\t\t\tright: 20,\n\t\t\t},\n\t\t\trotationSpeed: 540, // deg/s\n\n\t\t\tlookAngle: 90, // looking straight up : default angle\n\t\t\tHP: 100,\n\t\t\tspriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',\n\n\t\t\tname: '',\n\n\t\t\treactorOptions: [\n\t\t\t\t{\n\t\t\t\t\tdistance: 30,\n\t\t\t\t\tangle: 12,\n\t\t\t\t\tcooldown: 15,\n\t\t\t\t\tparticle: {\n\t\t\t\t\t\tspeed: 1,\n\t\t\t\t\t\tduration: 150,\n\t\t\t\t\t\tradius: 4,\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tdistance: 30,\n\t\t\t\t\tangle: -12,\n\t\t\t\t\tcooldown: 15,\n\t\t\t\t\tparticle: {\n\t\t\t\t\t\tspeed: 1,\n\t\t\t\t\t\tduration: 150,\n\t\t\t\t\t\tradius: 4,\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t],\n\n\t\t\tweaponOptions: \n\t\t\t[\n\t\t\t\t{\n\t\t\t\t\tprojectile: {\n\t\t\t\t\t\twidth: 4, \n\t\t\t\t\t\theight: 16, \n\t\t\t\t\t\tspeed: 1200,\n\t\t\t\t\t\tdamage: 10,\n\t\t\t\t\t\tmaxRange: 600,\n\t\t\t\t\t},\n\t\t\t\t\tcooldown: 100,\n\n\t\t\t\t\tdistance: 15,\n\t\t\t\t\tangle: 110,\n\n\t\t\t\t\twidth: 4,\n\t\t\t\t\theight: 24,\n\t\t\t\t\tlookAngle: 90,\n\t\t\t\t},\t\t\t\t\n\t\t\t\t{\n\t\t\t\t\tprojectile: {\n\t\t\t\t\t\twidth: 4, \n\t\t\t\t\t\theight: 16, \n\t\t\t\t\t\tspeed: 1200,\n\t\t\t\t\t\tdamage: 10,\n\t\t\t\t\t\tmaxRange: 600,\n\t\t\t\t\t},\n\t\t\t\t\tcooldown: 100,\n\n\t\t\t\t\tdistance: 15,\n\t\t\t\t\tangle: -110,\n\n\t\t\t\t\twidth: 4,\n\t\t\t\t\theight: 24,\n\t\t\t\t\tlookAngle: 90,\n\t\t\t\t},\n\t\t\t],\n\n\t\t\tgetMouseControlsByAssignment: ()=>\n\t\t\t{\n\t\t\t\treturn {\n\t\t\t\t\tpilot: \n\t\t\t\t\t{\n\t\t\t\t\t\tonMouseMove: (e)=>\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tthis.setLookPoint(e);\n\t\t\t\t\t\t},\n\t\t\t\t\t\tonMouseDown: (e)=>\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tif(e.which === 1) // left mouse button\n\t\t\t\t\t\t\t\tthis.toggleWeapons([0]);\n\t\t\t\t\t\t\telse if(e.which === 3) // right mouse button\n\t\t\t\t\t\t\t\tthis.toggleWeapons([1]);\n\t\t\t\t\t\t},\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t},\n\n\t\t\tgetKeyControlsByAssignment: ()=>\n\t\t\t{\n\t\t\t\treturn {\n\t\t\t\t\tpilot: \n\t\t\t\t\t{\n\t\t\t\t\t\tonKeyDown: (e)=>\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tthis.setThrustByKeyDown(e);\n\t\t\t\t\t\t},\n\t\t\t\t\t\tonKeyUp: (e)=>\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tthis.setThrustByKeyUp(e);\n\t\t\t\t\t\t},\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t},\n\t\t});\n\t}\n\n\t/* Don't get out of the screen */\n\tsetCenterX(value)\n\t{\n\t\tthis.centerX = value;\n\t\tif(this.centerX < 0 || this.centerX > this.getState().canvasWidth )\n\t\t{\n\t\t\tthis.centerX = Math.min( Math.max( value, 0  ), this.getState().canvasWidth );\n\t\t\tthis.moveVector.speed = 0;\n\t\t}\n\n\t}\n\tsetCenterY(value)\n\t{\n\t\tthis.centerY = value;\n\t\tif(this.centerY < 0 || this.centerY > this.getState().canvasHeight )\n\t\t{\n\t\t\tthis.centerY = Math.min( Math.max( value, 0  ), this.getState().canvasHeight );\n\t\t\tthis.moveVector.speed = 0;\n\t\t}\n\t}\n\n    init()\n    {\n        super.init();\n\n        this.lookPointCoords = {};\n\n\t\tthis.maxHP = this.HP;\n\n\t\t/* TODO better */\n\t\tthis.thrusting = {\n\t\t\tforward: false,\n\t\t\tbackward: false,\n\t\t\tleft: false,\n\t\t\tright: false,\n\t\t};\n\n\t\tthis.weapons = [];\n\t\tif( this.weaponOptions )\n\t\t{\n\t\t\tthis.weaponOptions\n\t\t\t.forEach((weaponOption)=>\n\t\t\t{\n\t\t\t\tvar weaponToEquip = new Weapon(weaponOption);\n\t\t\t\tthis.equipWeapon( weaponToEquip );\n\t\t\t});\n\t\t}\n\n\t\tthis.reactors = [];\n\t\tif(typeof window !== 'undefined' && this.reactorOptions )\n\t\t{\n\t\t\tthis.reactorOptions\n\t\t\t.forEach((reactorOption)=>\n\t\t\t{\n\t\t\t\tvar reactorToEquip = new Reactor(reactorOption);\n\t\t\t\tthis.equipReactor( reactorToEquip );\n\t\t\t});\n\t\t}\n    }\n\n    update(modifier)\n    {\n\t\t/* update moveVector */\n\t\tObject.entries(this.thrusting)\n\t\t.forEach(([direction, value])=>\n\t\t{\n\t\t\tif(value)\n\t\t\t{\n\t\t\t\tvar angleToApply;\n\t\t\t\tvar speedToApply = this.thrust[direction];\n\t\t\t\tswitch(direction)\n\t\t\t\t{\n\t\t\t\t\tcase 'forward':\n\t\t\t\t\t\tangleToApply = this.lookAngle;\n\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'backward':\n\t\t\t\t\t\tangleToApply = this.constructor.Geometry.getReverseAngle(this.moveVector.angle);\n\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'right':\n\t\t\t\t\t\tangleToApply = this.lookAngle - 90;\n\t\t\t\t\t\tif( angleToApply < 0)\n\t\t\t\t\t\t\tangleToApply += 360;\n\t\t\t\t\t\t//console.log('left', angleToApply);\n\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'left': \n\t\t\t\t\t\tangleToApply = (this.lookAngle + 90) % 360;\n\t\t\t\t\t\t//console.log('right', angleToApply);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tthis.moveVector = this.constructor.Geometry.sum2vectors(\n\t\t\t\t\tthis.moveVector.angle, \n\t\t\t\t\tthis.moveVector.speed, \n\t\t\t\t\tangleToApply, \n\t\t\t\t\tspeedToApply\n\t\t\t\t);\n\t\t\t}\n\t\t});\n\t\tthis.moveVector.speed = Math.max(0, Math.min(this.moveVector.speed, this.maxSpeed ) );\n\n        //super.update(modifier);\n\t\tthis.moveByVector(modifier);\n\n\t\tthis.moveVector.speed = Math.max(0, this.moveVector.speed -3); // moveVector decay\n\n\t\tthis.turnToLookPointCoords(modifier);\n\t\t\n\t\tthis.weapons\n\t\t.forEach((weapon) => \n\t\t{\n\t\t\tweapon.update(modifier);\n\t\t});\n\n\t\tthis.checkForCollision();\n\t}\n\n\tcheckForCollision()\n\t{\n\t\tObject.values( this.getState().groups['ships'] ).forEach((obj)=>\n\t\t{\n\t\t\tif(obj.id === this.id) // don't enter in colision with yourself XD\n\t\t\t\treturn;\n\t\t\tif(!Collision.checkCollisionBetween2rectangles(this, obj))\n\t\t\t\treturn;\n\n\t\t\t/* Push the other ship away based on my own vector */\n\t\t\tif(obj.moveVector)\n\t\t\t{\n\t\t\t\tobj.moveVector = this.constructor.Geometry.sum2vectors(\n\t\t\t\t\tthis.moveVector.angle, \n\t\t\t\t\tthis.moveVector.speed, \n\t\t\t\t\tobj.moveVector.angle, \n\t\t\t\t\tobj.moveVector.speed, \n\t\t\t\t);\n\t\t\t}\n\n\t\t\t/* Crash! Take my damages */\n\t\t\tvar damageInflictedToOtherShip = this.maxHP/2 * this.moveVector.speed / this.maxSpeed;\n\t\t\tobj.takeDamages(damageInflictedToOtherShip);\n\n\t\t\t/* Bounce me back as well */\n\t\t\tthis.moveVector = this.constructor.Geometry.sum2vectors(\n\t\t\t\tthis.moveVector.angle, \n\t\t\t\tthis.moveVector.speed, \n\t\t\t\tthis.constructor.Geometry.getReverseAngle(obj.moveVector.angle), \n\t\t\t\tthis.moveVector.speed *1.5,\n\t\t\t);\n\t\t});\n\t}\n\n\ttakeDamages(amount)\n\t{\n\t\tthis.HP -= amount;\n\t\tif( this.HP <= 0)\n\t\t\tthis.remove();\n\t}\n\n\tassignCrewMember(playerID, assignment)\n\t{\n\t\tthis.playerCrew[assignment] = playerID;\n\t}\n\t\n\tequipWeapon(weapon)\n\t{\n\t\tthis.weapons.push(weapon);\n\t\tweapon.getOwner = ()=>{return this};\n\t}\n\n\tequipReactor(reactor)\n\t{\n\t\tthis.reactors.push(reactor);\n\t\treactor.getOwner = ()=>{return this};\n\t}\n\n\tremove()\n\t{\n\t\t/* remove any player inside the ship */\n\t\tObject.values(this.playerCrew).forEach( (playerID)=>\n\t\t{\n\t\t\tvar player = this.getState().players[playerID];\n\t\t\tif( player )\n\t\t\t\tplayer.remove();\n\t\t} );\n\t\tsuper.remove();\n\t}\n\n    /********** CLIENT FUNCTIONS **********/\n\n\t/* don't get offscreen ! */\n\tget clientCenterX()\n\t{\n\t\tvar x = super.clientCenterX;\n\t\treturn Math.min( Math.max( x, 0  ), this.getState().canvasWidth );\n\t}\n\tget clientCenterY()\n\t{\n\t\tvar y = super.clientCenterY;\n\t\treturn Math.min( Math.max( y, 0  ), this.getState().canvasHeight );\n\t}\n\n\tget shortName()\n\t{\n\t\tif(!this.name)\n\t\t\treturn '';\n\n\t\tString.prototype.trunc = String.prototype.trunc ||\n\t\tfunction(n)\n\t\t{\n\t\t\treturn (this.length > n) ? this.substr(0, n-1) + '...' : this;\n\t    };\n\n\t\treturn this.name.trunc( 16 );\n\t}\n\n\tdraw(ctx)\n\t{\n\t\tsuper.draw(ctx);\n\n\t\tthis.weapons\n\t\t.forEach( (weapon)=>\n\t\t{\n\t\t\tweapon.draw(ctx);\n\t\t});\n\n\t\t/* write player's name if has one */\n\t\tif(this.shortName)\n\t\t{\n\t\t\tctx.textAlign = 'center';\n\t\t\tctx.textBaseline = 'top';\n\t\t\tctx.font = 'bold 16px Arial';\n\t\t\tvar colorByRemainingHP = clientClasses.Graphic.getDynamicColor({\n\t\t\t\tstartColor: [0, 130, 0],\n\t\t\t\tendColor: [255, 0, 0],\n\t\t\t\tratio: this.HP / this.maxHP,\n\t\t\t\topacity: 1,\n\t\t\t});\n\t\t\tctx.fillStyle = colorByRemainingHP;\n\t\t\tctx.fillText(this.shortName, this.clientCenterX, this.clientCenterY + this.height/2)\n\t\t}\n\t}\n    \n    updateClient(modifier)\n\t{\n\t\tsuper.updateClient(modifier);\n\n\t\tthis.reactors\n\t\t.forEach( (reactor)=>\n\t\t{\n\t\t\treactor.update(modifier);\n\t\t});\n\t}\n\n\tsetThrustByKeyDown(e)\n\t{\n\t\tvar clientState = this.getState();\n\n\t\t/* Cancel default behaviour */\n\t\tswitch(e.keyCode)\n\t\t{\n\t\t\tcase 90:\n\t\t\tcase 83:\n\t\t\tcase 81:\n\t\t\tcase 68:\n\n\t\t\tcase 37:\n\t\t\tcase 38:\n\t\t\tcase 39:\n\t\t\tcase 40:\n\t\t\t\te.preventDefault();\n\t\t\tbreak;\n\t\t}\n\t\tswitch(e.keyCode)\n\t\t{\n\t\t\tcase 90: // Z\n\t\t\tcase 38: // up\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'forward',\n\t\t\t\t\tvalue: 1,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 83: // S\n\t\t\tcase 40: // down\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'backward',\n\t\t\t\t\tvalue: 1,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 81: // Q\n\t\t\tcase 37: // left\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'left',\n\t\t\t\t\tvalue: 1,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 68: // D\n\t\t\tcase 39: //right\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'right',\n\t\t\t\t\tvalue: 1,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t}\n\t}\n\n\tsetThrustByKeyUp(e)\n\t{\n\t\tvar clientState = this.getState();\n\n\t\tswitch(e.keyCode)\n\t\t{\n\t\t\tcase 90: // Z\n\t\t\tcase 38: // up\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'forward',\n\t\t\t\t\tvalue: 0,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 83: // S\n\t\t\tcase 40: // down\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'backward',\n\t\t\t\t\tvalue: 0,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 81: // Q\n\t\t\tcase 37: // left\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'left',\n\t\t\t\t\tvalue: 0,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t\tcase 68: // D\n\t\t\tcase 39: //right\n\t\t\t\tclientState.socket.emit('thrustingDirection', {\n\t\t\t\t\tid: this.id,\n\t\t\t\t\tside: 'right',\n\t\t\t\t\tvalue: 0,\n\t\t\t\t});\n\t\t\tbreak;\n\t\t}\n\t}\n\n\tsetLookPoint(e)\n\t{\n\t\tvar rect = this.getState().canvas.getBoundingClientRect();\n\t\tvar x = (e.pageX - rect.left) * e.target.ratio,\n\t\t\ty = (e.pageY - rect.top) * e.target.ratio;\n\n\t\tthis.getState().socket.emit('setLookPointCoords', {\n\t\t\tid: this.id,\n\t\t\tx,\n\t\t\ty,\n\t\t});\n\t}\n\n\ttoggleWeapons(weaponIDs = null)\n\t{\n\t\tthis.getState().socket.emit('toggleWeaponsShooting', {\n\t\t\tid: this.id,\n\t\t\tweaponIDs,\n\t\t});\n\t}\n\n\tsetAxisMovement(axis, value)\n\t{\n\t\tthis.movement[axis] = value;\n\t\tif(typeof this.getState() !== 'undefined')\n\t\t{\n\t\t\tthis.getState().socket.emit('setAxisMovement', {\n\t\t\t\tid: this.id,\n\t\t\t\taxis,\n\t\t\t\tvalue,\n\t\t\t});\n\t\t}\n\t}\n\n    addAxisMovement(axis, value)\n\t{\n\t\tvar currentValue = this.movement[axis];\n\t\tvar valueAfterAdd = currentValue + value;\n\t\tif(valueAfterAdd >= -1 && valueAfterAdd <= 1 )\n\t\t\tthis.setAxisMovement(axis, valueAfterAdd)\n\t}\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/ship.js?");

/***/ }),

/***/ "./class/common/weapon.js":
/*!********************************!*\
  !*** ./class/common/weapon.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Projectile = __webpack_require__(/*! ./projectile.js */ \"./class/common/projectile.js\");\r\nconst Geometry = __webpack_require__(/*! ./geometry.js */ \"./class/common/geometry.js\");\r\n\r\nmodule.exports = class Weapon extends __webpack_require__(/*! ./movable.js */ \"./class/common/movable.js\")\r\n{\r\n    get defaultOptions()\r\n    {\r\n        return {\r\n\t\t\tspriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/weapon/test-weapon.png',\r\n\r\n\t\t\tdistance: 30,\r\n\t\t\tangle: 0,\r\n\r\n\t\t\twidth: 4,\r\n\t\t\theight: 24,\r\n\t\t\tlookAngle: 90,\r\n\r\n\t\t\tonTop: false,\r\n\r\n            cooldown: 100,\r\n            projectileNb: 1,\r\n\t\t\tprojectilesDeviation: 0,\r\n            projectile: {}\r\n        };\r\n    }\r\n    \r\n    init()\r\n    {\r\n        super.init();\r\n        this.shooting = false;\r\n        this.lastShotTime = Date.now();\r\n    }\r\n\r\n    getOwner()\r\n    {\r\n        return null; // to be overriden\r\n    }\r\n\r\n\tget centerX()\r\n\t{\r\n\t\tvar myOwner = this.getOwner();\r\n\t\tif(!myOwner) \r\n\t\t\treturn;\r\n        return Geometry.getXByAngleAndDistance(\r\n            myOwner.centerX, \r\n            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), \r\n            this.distance\r\n        );\r\n\t}\r\n\tget centerY()\r\n\t{\r\n\t\tvar myOwner = this.getOwner();\r\n\t\tif(!myOwner) \r\n\t\t\treturn;\r\n        return Geometry.getYByAngleAndDistance(\r\n            myOwner.centerY, \r\n            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), \r\n            this.distance\r\n        );\r\n\t}\r\n\r\n    equipTo(shipObj)\r\n    {\r\n        shipObj.equipWeapon(this);\r\n    }\r\n\r\n    toggleShooting()\r\n    {\r\n        this.shooting = !this.shooting;\r\n    }\r\n\r\n    update(modifier)\r\n    {\r\n\t\tthis.lookAngle = this.getOwner().lookAngle;\r\n\r\n        if(!this.shooting)\r\n            return;\r\n\r\n        var now = Date.now();\r\n        if( this.lastShotTime + this.cooldown <= now )\r\n        {\r\n            this.lastShotTime = now;\r\n            this.shoot();\r\n        }\r\n    }\r\n\r\n    shoot()\r\n    {\r\n        var myOwner = this.getOwner();\r\n        for(var i = 0; i < this.projectileNb; i++)\r\n        {\r\n            var bullet = new Projectile(\r\n                Object.assign\r\n                (\r\n                    Object.create(this.projectile), \r\n                    {\r\n                        owner: myOwner,\r\n\t\t\t\t\t\tcenterX: Geometry.getXByAngleAndDistance(\r\n        \t\t\t\t    this.centerX, \r\n        \t\t\t\t    this.lookAngle, \r\n        \t\t\t\t    this.projectile.height / 2 + this.height / 2\r\n        \t\t\t\t),\r\n\t\t\t\t\t\tcenterY: Geometry.getYByAngleAndDistance(\r\n        \t\t\t\t    this.centerY, \r\n        \t\t\t\t    this.lookAngle, \r\n        \t\t\t\t    this.projectile.height / 2 + this.height / 2\r\n        \t\t\t\t),\r\n                        lookAngle: this.lookAngle,\r\n                    }\r\n                )\r\n            );\r\n\t\t\tbullet.getOwner = ()=>{return myOwner;};\r\n            bullet.addTo(myOwner.getState(), myOwner.getSocket());\r\n        }\r\n    }\r\n\r\n    /********** CLIENT FUNCTIONS **********/\r\n\r\n\tget clientCenterX()\r\n\t{\r\n\t\tvar myOwner = this.getOwner();\r\n\t\tif(!myOwner) \r\n\t\t\treturn;\r\n        return Geometry.getXByAngleAndDistance(\r\n            myOwner.clientCenterX, \r\n            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), \r\n            this.distance\r\n        );\r\n\t}\r\n\tget clientCenterY()\r\n\t{\r\n\t\tvar myOwner = this.getOwner();\r\n\t\tif(!myOwner) \r\n\t\t\treturn;\r\n        return Geometry.getYByAngleAndDistance(\r\n            myOwner.clientCenterY, \r\n            Geometry.normalizeAngle(myOwner.lookAngle + this.angle), \r\n            this.distance\r\n        );\r\n\t}\r\n\r\n\tdraw(ctx)\r\n\t{\r\n\t\tvar ctxOptions = {};\r\n\t\tif(!this.onTop)\r\n\t\t\tctxOptions.globalCompositeOperation = 'destination-over';\r\n\r\n\t\tsuper.draw(ctx, ctxOptions);\r\n\t}\r\n};\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/weapon.js?");

/***/ })

/******/ });
});