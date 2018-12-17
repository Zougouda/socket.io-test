(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["clientClasses"] = factory();
	else
		root["clientClasses"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./class/client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./class/client/camera.js":
/*!********************************!*\
  !*** ./class/client/camera.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Camera\r\n{\r\n    constructor()\r\n    {\r\n        this.init();\r\n    }\r\n\r\n    init()\r\n    {\r\n        this.centerX = clientState.canvasWidth / 2;\r\n        this.centerY = clientState.canvasHeight / 2;\r\n        this.width = clientState.canvasWidth;\r\n        this.height = clientState.canvasHeight;\r\n    }\r\n\r\n    update(modifier)\r\n    {\r\n        // TODO\r\n    }\r\n\r\n    attachTo(target)\r\n    {\r\n        this.tagetLock = target;\r\n        // TODO\r\n    }\r\n\r\n    detach()\r\n    {\r\n         // TODO\r\n    }\r\n}\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/camera.js?");

/***/ }),

/***/ "./class/client/graphic.js":
/*!*********************************!*\
  !*** ./class/client/graphic.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Graphic\n{\n\tstatic resizeCanvas(options)\n    {\n\t\tvar {\n\t\t\tcanvas,\n\t\t\twidth, \n\t\t\theight,\n\t\t} = options;\n\n        canvas.width = width;\n        canvas.height = height;\n\n        var gameWidth = window.innerWidth;\n        var gameHeight = window.innerHeight;\n        var scaleToFitX = gameWidth / canvas.width;\n        var scaleToFitY = gameHeight / canvas.height;\n        var currentScreenRatio = gameWidth / gameHeight;\n        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);\n        //if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) //if fullscreen\n        //{\n        //    canvas.ratio = width / gameWidth;\n        //    canvas.style.width = gameWidth + \"px\";\n        //    canvas.style.height = gameHeight + \"px\";\n        //}\n        //else\n        //{\n            canvas.ratio = width / (canvas.width * optimalRatio);\n            canvas.style.width = canvas.width * optimalRatio + \"px\";\n            canvas.style.height = canvas.height * optimalRatio + \"px\";\n        //}\n\n        //Canvas at middle\n        canvas.style.position = \"absolute\";\n\n        canvas.style.marginLeft = parseInt(canvas.style.width, 10) / -2 + \"px\";\n        canvas.style.left = \"50%\";\n\n        canvas.style.marginTop = parseInt(canvas.style.height, 10) / -2 + \"px\";\n        canvas.style.top = \"50%\";\n    }\n\t\n\tstatic getDynamicColor(options)\n\t{\n\t\tvar {\n\t\t\tstartColor,\n\t\t\tendColor,\n\t\t\topacity = 1,\n\t\t\tratio,\n\t\t\tasArray = false\n\t\t} = options;\n\n\t\tvar colorArray = new Array();\n\n\t\tcolorArray.push(startColor[0]);\n\t\tcolorArray.push(startColor[1]);\n\t\tcolorArray.push(startColor[2]);\n\n\t\tvar deltaColor = [\n\t\t\t\t(endColor[0] - startColor[0]) * (1 - ratio),\n\t\t\t\t(endColor[1] - startColor[1]) * (1 - ratio),\n\t\t\t\t(endColor[2] - startColor[2]) * (1 - ratio)\n\t\t];\n\n\t\tcolorArray[0] += deltaColor[0] >> 0;\n\t\tcolorArray[1] += deltaColor[1] >> 0;\n\t\tcolorArray[2] += deltaColor[2] >> 0;\n\n\t\tif(!asArray)\n\t\t\treturn `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${opacity})`;\n\t\telse\n\t\t\treturn colorArray;\n\t}\n}\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/graphic.js?");

/***/ }),

/***/ "./class/client/index.js":
/*!*******************************!*\
  !*** ./class/client/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\r\n    Camera: __webpack_require__(/*! ./camera.js */ \"./class/client/camera.js\"),\r\n    Graphic: __webpack_require__(/*! ./graphic.js */ \"./class/client/graphic.js\"),\r\n    Particle: __webpack_require__(/*! ./particle.js */ \"./class/client/particle.js\"),\r\n};\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/index.js?");

/***/ }),

/***/ "./class/client/particle.js":
/*!**********************************!*\
  !*** ./class/client/particle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = class Particle extends __webpack_require__(/*! ../common/movable.js */ \"./class/common/movable.js\")\r\n{\r\n    get defaultOptions()\r\n    {\r\n        return Object.assign(super.defaultOptions, {\r\n            duration: 100,\r\n            radius: 30,\r\n            startColor: [255, 0, 0],\r\n            endColor: [255, 255, 0],\r\n        });\r\n    }\r\n\r\n    init()\r\n    {\r\n        super.init();\r\n\r\n        this.countdownToDestruction = this.duration;\r\n        this.startRadius = this.radius;\r\n        this.remainingLifeRatio = 1;\r\n        this.opacity = 1;\r\n    }\r\n\r\n    updateClient(modifier)\r\n    {\r\n        this.countdownToDestruction -= modifier*1000;\r\n        if(this.countdownToDestruction < 0)\r\n            return this.remove();\r\n        \r\n        this.remainingLifeRatio = this.countdownToDestruction / this.duration;\r\n        // this.radius = this.startRadius * timeRemainingRatio;\r\n        // this.opacity = 1 * timeRemainingRatio;\r\n\r\n        this.updateByAngleAndDistance(this.moveAngle, this.speed);\r\n    }\r\n\r\n    draw(ctx)\r\n    {\r\n        ctx.save();\r\n        ctx.globalCompositeOperation = 'destination-over';\r\n        ctx.fillStyle = clientClasses.Graphic.getDynamicColor({\r\n            startColor: this.startColor,\r\n            endColor: this.endColor,\r\n            ratio: this.remainingLifeRatio,\r\n            opacity: 1 * this.remainingLifeRatio,\r\n        });\r\n        ctx.beginPath();\r\n        ctx.arc(this.clientCenterX, this.clientCenterY, this.radius, 0, 2*Math.PI);\r\n        ctx.fill();\r\n        ctx.restore();\r\n    }\r\n};\n\n//# sourceURL=webpack://%5Bname%5D/./class/client/particle.js?");

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

/***/ "./class/common/movable.js":
/*!*********************************!*\
  !*** ./class/common/movable.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("class Movable extends __webpack_require__(/*! ./entity.js */ \"./class/common/entity.js\")\n{\n\tget defaultOptions()\n\t{\n\t\treturn Object.assign(super.defaultOptions, {\n\t\t\tcenterX: 50,\n\t\t\tcenterY: 50,\n\t\t\twidth: 50,\n\t\t\theight: 50,\n\t\t\tspeed: 150, // px/s\n\t\t\trotationSpeed: 540, // deg/s\n\t\t\tlookAngle: 90, // looking straight up : default angle\n\t\t\tmoveAngle: null,\n\t\t});\n\t}\n\n\tget leftX()\n\t{\n\t\treturn this.centerX - this.width/2;\n\t}\n\tget topY()\n\t{\n\t\treturn this.centerY - this.height/2;\n\t}\n\n\tsetCenterX(value)\n\t{\n\t\tthis.centerX = value;\n\t}\n\tsetCenterY(value)\n\t{\n\t\tthis.centerY = value;\n\t}\n\n\tinit()\n\t{\n\t\tthis.maxSpeed = this.speed;\n\n        this.lookPointCoords = {};\n\n\t\tthis.movement = {\n\t\t\tx: 0,\n\t\t\ty: 0,\n\t\t};\n\n\t\tthis.moveVector = {\n\t\t\tangle: 90,\n\t\t\tspeed: 0,\n\t\t};\n\n\t\tthis.clientCoords = {}; // this obj contains client-only vars used for interpolation\n\n\t\t/* Client behaviour */\n\t\tif(typeof window !== 'undefined')\n\t\t{\n\t\t\tthis.sprite = new window.Image();\n\t\t\tif(this.spriteSrc)\n\t\t\t\tthis.sprite.src = this.spriteSrc\n\n\t\t\tthis.serverUpdatesArray = [];\n\t\t}\n\t}\n\n\tupdate(modifier)\n\t{\n\t\tthis.updateByMovement(modifier);\n\t}\n\n\tupdateByMovement(modifier)\n\t{\n\t\tthis.setCenterX( this.centerX + this.movement.x * this.speed * modifier );\n\t\tthis.setCenterY( this.centerY + this.movement.y * this.speed * modifier );\n\t}\n\n\tupdateByAngleAndDistance(angle, distance)\n\t{\n\t\tthis.setCenterX( this.centerX + distance * this.constructor.Geometry.getXByAngle(angle) );\n\t\tthis.setCenterY( this.centerY + distance * this.constructor.Geometry.getYByAngle(angle) );\n\t}\n\n\tupdateByAngleAndModifier(angle, modifier)\n\t{\n\t\treturn this.updateByAngleAndDistance(angle, this.speed * modifier);\n\t}\n\n\tmoveByAngleAndSpeed(modifier)\n\t{\n\t\tthis.updateByAngleAndModifier(this.lookAngle, modifier);\n\t}\n\n\tmoveByVector(modifier)\n\t{\n\t\treturn this.updateByAngleAndDistance(this.moveVector.angle, this.moveVector.speed * modifier);\n\t}\n\n\tupdateLookAngle(modifier, angleToReach)\n\t{\n\t\tvar d = angleToReach - (this.lookAngle % 360);\n\t\tif (d < (-180))\n\t\t\td += 360;\n\t\telse if (d > 180)\n\t\t\td -= 360;\n\t\tif (d < -this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle -= this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle < 0)\n\t\t\t\tthis.lookAngle += 360;\n\t\t}\n\t\telse if (d > this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle += this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle > 360)\n\t\t\t\tthis.lookAngle -= 360;\n\t\t}\n\t\telse\n\t\t\tthis.lookAngle = angleToReach;\n\t}\n\n\tturnToLookPointCoords(modifier)\n\t{\n\t\tif(\n\t\t\t!this.lookPointCoords.x\n\t\t\t|| !this.lookPointCoords.y\n\t\t\t|| !modifier\n\t\t)\n\t\t\treturn;\n\n\t\tvar angleBetweenMeAndMouse = this.constructor.Geometry.getAngleBy2XY(\n\t\t\tthis.clientCenterX, \n\t\t\tthis.clientCenterY, \n\t\t\tthis.lookPointCoords.x, \n\t\t\tthis.lookPointCoords.y\n\t\t);\n\n\t\tthis.updateLookAngle(modifier, angleBetweenMeAndMouse);\n\t}\n\n\t/********** CLIENT FUNCTIONS **********/\n\n\tget clientCenterX()\n\t{\n\t\treturn this.clientCoords.centerX || this.centerX;\n\t}\n\tget clientCenterY()\n\t{\n\t\treturn this.clientCoords.centerY || this.centerY;\n\t}\n\tget clientLookAngle()\n\t{\n\t\treturn this.clientCoords.lookAngle || this.lookAngle;\n\t}\n\n\trotateContextByLookAngle(ctx)\n\t{\n\t\tctx.save();\n\t\tctx.translate(this.clientCenterX, this.clientCenterY);\n\t\tvar rotationRadian = Math.PI / 180 * -(this.clientLookAngle - 90);\n\t\tctx.rotate(rotationRadian);\n\t}\n\n\tdraw(ctx, ctxOptions = {})\n\t{\n\t\tthis.rotateContextByLookAngle(ctx); // rotate ctx ...\n\t\t\n\t\tObject.entries(ctxOptions).forEach( ([property, value])=>\n\t\t{\n\t\t\tctx[property] = value;\n\t\t});\n\n\t\tctx.drawImage(\n\t\t\tthis.sprite,\n\t\t\t-this.width/2,\n\t\t\t-this.height/2,\n\t\t\tthis.width,\n\t\t\tthis.height,\n\t\t);\n\t\tctx.restore(); // ... and restore it !\n\t}\n\n\tupdateClient(modifier)\n\t{\n\t\tthis.updateByInterpolation(this.getState().now);\n\t}\n\n\tupdateByInterpolation(now = Date.now())\n\t{\n\t\tif(this.serverUpdatesArray.length < 2)\n\t\t\treturn;\n\t\tvar timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;\n\t\tvar timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;\n\t\tvar modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;\n\t\t\n\t\tthis.clientCoords.centerX = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerX, this.centerX, modifier);\n\t\tthis.clientCoords.centerY = this.constructor.Geometry.lerp(this.serverUpdatesArray[1].centerY, this.centerY, modifier);\n\t}\n\n\tstoreLastPosition()\n\t{\n\t\tthis.serverUpdatesArray.push({\n\t\t\tcenterX: this.centerX,\n\t\t\tcenterY: this.centerY,\n\t\t\tlookAngle: this.lookAngle,\n\t\t\ttimestamp: Date.now(),\n\t\t})\n\t\tif(this.serverUpdatesArray.length > 2)\n\t\t\tthis.serverUpdatesArray.shift();\n\t}\n};\nMovable.Geometry = __webpack_require__(/*! ./geometry.js */ \"./class/common/geometry.js\");\n\nmodule.exports = Movable;\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/movable.js?");

/***/ })

/******/ });
});