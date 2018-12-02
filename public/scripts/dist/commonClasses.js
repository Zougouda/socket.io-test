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

/***/ "./class/common/entity.js":
/*!********************************!*\
  !*** ./class/common/entity.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Entity\r\n{\r\n    constructor(options = {})\r\n    {\r\n        this.options = options;\r\n        this.applyOptions();\r\n        this.init();\r\n    }\r\n\r\n    get defaultOptions()\r\n    {\r\n        return {\r\n            x: 0,\r\n            y: 0,\r\n            width: 50,\r\n            height: 50,\r\n        };\r\n    }\r\n\r\n    applyOptions()\r\n    {\r\n        if(!this.options)\r\n            return;\r\n        \r\n        Object.entries( this.defaultOptions )\r\n        .forEach( ([key, defaultValue]) => \r\n        {\r\n            if(this.options[key] === undefined)\r\n                this[key] = defaultValue; // apply default value if doesnt exist\r\n            else\r\n                this[key] = this.options[key]; // or use given value\r\n        });\r\n    }\r\n\r\n    init()\r\n    {\r\n        \r\n    }\r\n};\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/entity.js?");

/***/ }),

/***/ "./class/common/geometry.js":
/*!**********************************!*\
  !*** ./class/common/geometry.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Geometry\r\n{\r\n    static getDistanceBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var dx = Math.pow(x2 - x1, 2);\r\n        var dy = Math.pow(y1 - y2, 2);\r\n        var distance = Math.sqrt(dx + dy);\r\n        return distance;\r\n    }\r\n\r\n    static getAngleBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var deltaY = y2 - y1;\r\n        var deltaX = x2 - x1;\r\n\r\n        var theta = Math.atan2(-deltaY, deltaX);\r\n        if (theta < 0)\r\n            theta += 2 * Math.PI;\r\n\r\n        var angle = theta * 180 / Math.PI;\r\n\r\n        return angle;\r\n    }\r\n\r\n    static getXByAngleAndDistance(x, angle, distance)\r\n    {\r\n        return (x + Math.cos(angle % 360) * distance);\r\n    }\r\n    \r\n    static getYByAngleAndDistance(y, angle, distance)\r\n    {\r\n        return (y + Math.sin(angle % 360) * distance);\r\n    }\r\n\r\n    /**\r\n     * Linear Interpolation method\r\n     * \r\n     * @param {float} startValue \r\n     * @param {float} destValue \r\n     * @param {float} normal (between 0 & 1)\r\n     */\r\n    static lerp(startValue, destValue, normal)\r\n    {\r\n        return (1 - normal) * startValue + normal * destValue;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/geometry.js?");

/***/ }),

/***/ "./class/common/index.js":
/*!*******************************!*\
  !*** ./class/common/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n\t// Geometry: require('./geometry.js'),\n\tMovable: __webpack_require__(/*! ./movable.js */ \"./class/common/movable.js\")\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/index.js?");

/***/ }),

/***/ "./class/common/movable.js":
/*!*********************************!*\
  !*** ./class/common/movable.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Geometry = __webpack_require__(/*! ./geometry.js */ \"./class/common/geometry.js\");\n\nmodule.exports = class Movable extends __webpack_require__(/*! ./entity.js */ \"./class/common/entity.js\")\n{\n\tget defaultOptions()\n\t{\n\t\treturn Object.assign(super.defaultOptions, {\n\t\t\tx: 50,\n\t\t\ty: 50,\n\t\t\twidth: 42,\n\t\t\theight: 60,\n\t\t\tspeed: 150, // px/s\n\t\t\trotationSpeed: 540, // deg/s\n\t\t\tlookAngle: 90, // looking straight up : default angle\n\t\t\tplayerID: null,\n\t\t\t// color: null,\n\t\t\tspriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',\n\t\t});\n\t}\n\n\tinit()\n\t{\n\t\t// var colors = ['red', 'blue', 'green', 'purple'];\n\t\t// if(!this.color)\n\t\t// \tthis.color = colors[ Math.floor(Math.random() * colors.length) ];\n\n\t\tthis.movement = {\n\t\t\tx: 0,\n\t\t\ty: 0,\n\t\t};\n\t\tthis.lookPointCoords = {};\n\n\t\t/* Client behaviour */\n\t\tif(typeof window !== 'undefined')\n\t\t{\n\t\t\tthis.sprite = new window.Image();\n\t\t\tif(this.spriteSrc)\n\t\t\t\tthis.sprite.src = this.spriteSrc\n\n\t\t\tthis.serverUpdatesArray = [];\n\t\t}\n\t}\n\n\tupdate(modifier)\n\t{\n\t\tthis.x += this.movement.x * this.speed * modifier;\n\t\tthis.y += this.movement.y * this.speed * modifier;\n\t\tthis.turnToLookPointCoords(modifier);\n\t}\n\n\tupdateLookAngle(modifier, angleToReach)\n\t{\n\t\tvar d = angleToReach - (this.lookAngle % 360);\n\t\tif (d < (-180))\n\t\t\td += 360;\n\t\telse if (d > 180)\n\t\t\td -= 360;\n\t\tif (d < -this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle -= this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle < 0)\n\t\t\t\tthis.lookAngle += 360;\n\t\t}\n\t\telse if (d > this.rotationSpeed * modifier)\n\t\t{\n\t\t\tthis.lookAngle += this.rotationSpeed * modifier;\n\t\t\tif (this.lookAngle > 360)\n\t\t\t\tthis.lookAngle -= 360;\n\t\t}\n\t\telse\n\t\t\tthis.lookAngle = angleToReach;\n\t}\n\n\tturnToLookPointCoords(modifier)\n\t{\n\t\tif(\n\t\t\t!this.lookPointCoords.x\n\t\t\t|| !this.lookPointCoords.y\n\t\t\t|| !modifier\n\t\t)\n\t\t\treturn;\n\n\t\tvar centerX = (this.drawX || this.x) + this.width/2, \n\t\t\tcenterY = (this.drawY || this.y) + this.height/2;\n\t\tvar angleBetweenMeAndMouse = Geometry.getAngleBy2XY(\n\t\t\tcenterX, \n\t\t\tcenterY, \n\t\t\tthis.lookPointCoords.x, \n\t\t\tthis.lookPointCoords.y\n\t\t);\n\n\t\tthis.updateLookAngle(modifier, angleBetweenMeAndMouse);\n\t}\n\n\t/********** CLIENT FUNCTIONS **********/\n\n\trotateContextByLookAngle(ctx)\n\t{\n\t\tvar centerX = (this.drawX || this.x) + this.width/2, \n\t\t\tcenterY = (this.drawY || this.y) + this.height/2;\n\n\t\tctx.save();\n\t\tctx.translate(centerX, centerY);\n\t\tvar rotationRadian = Math.PI / 180 * -(this.lookAngle - 90);\n\t\tctx.rotate(rotationRadian);\n\t}\n\n\tdraw(ctx)\n\t{\n\t\tthis.rotateContextByLookAngle(ctx); // rotate ctx ...\n\t\tctx.drawImage(\n\t\t\tthis.sprite,\n\t\t\t-this.width/2,\n\t\t\t-this.height/2,\n\t\t\tthis.width,\n\t\t\tthis.height,\n\t\t);\n\t\tctx.restore(); // ... and restore it !\n\t}\n\n\tupdateClient(modifier)\n\t{\n\t\tthis.updateByInterpolation(this.clientState.now);\n\t\tthis.turnToLookPointCoords(modifier);\n\t}\n\n\tupdateByInterpolation(now = Date.now())\n\t{\n\t\tif(this.serverUpdatesArray.length < 2)\n\t\t\treturn;\n\t\tvar timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;\n\t\tvar timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;\n\t\tvar modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;\n\t\tthis.drawX = Geometry.lerp(this.serverUpdatesArray[1].x, this.x, modifier);\n\t\tthis.drawY = Geometry.lerp(this.serverUpdatesArray[1].y, this.y, modifier);\n\t}\n\n\tstoreLastPosition()\n\t{\n\t\tthis.serverUpdatesArray.push({\n\t\t\tx: this.x,\n\t\t\ty: this.y,\n\t\t\ttimestamp: Date.now(),\n\t\t})\n\t\tif(this.serverUpdatesArray.length > 2)\n\t\t\tthis.serverUpdatesArray.shift();\n\t}\n\n\tsetAxisMovement(axis, value)\n\t{\n\t\tthis.movement[axis] = value;\n\t\tif(typeof this.clientState !== 'undefined')\n\t\t{\n\t\t\tthis.clientState.socket.emit('setAxisMovement', {\n\t\t\t\tid: this.playerID,\n\t\t\t\taxis,\n\t\t\t\tvalue,\n\t\t\t})\n\t\t}\n\t}\n\n\tinitKeyboardControl()\n\t{\n\t\twindow.addEventListener(\"keydown\", (e)=>\n\t\t{\n\t\t\t/* Cancel default behaviour */\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 90:\n\t\t\t\tcase 83:\n\t\t\t\tcase 81:\n\t\t\t\tcase 68:\n\n\t\t\t\tcase 37:\n\t\t\t\tcase 38:\n\t\t\t\tcase 39:\n\t\t\t\tcase 40:\n\t\t\t\t\te.preventDefault();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 90: // Z\n\t\t\t\tcase 38: // up\n\t\t\t\t\tif(this.movement.y !== -1)\n\t\t\t\t\t\tthis.setAxisMovement('y', -1);\n\t\t\t\tbreak;\n\t\t\t\tcase 83: // S\n\t\t\t\tcase 40: // down\n\t\t\t\t\tif(this.movement.y !== 1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 1);\n\t\t\t\tbreak;\n\t\t\t\tcase 81: // Q\n\t\t\t\tcase 37: // left\n\t\t\t\t\tif(this.movement.x !== -1)\n\t\t\t\t\t\tthis.setAxisMovement('x', -1);\n\t\t\t\tbreak;\n\t\t\t\tcase 68: // D\n\t\t\t\tcase 39: //right\n\t\t\t\t\tif(this.movement.x !== 1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 1);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}, false);\n\n\t\twindow.addEventListener(\"keyup\", (e)=>\n\t\t{\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 90: // Z\n\t\t\t\tcase 38: // up\n\t\t\t\t\tif(this.movement.y === -1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 83: // S\n\t\t\t\tcase 40: // down\n\t\t\t\t\tif(this.movement.y === 1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 81: // Q\n\t\t\t\tcase 37: // left\n\t\t\t\t\tif(this.movement.x === -1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 68: // D\n\t\t\t\tcase 39: //right\n\t\t\t\t\tif(this.movement.x === 1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 0);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}, false);\n\t}\n\n\tinitMouseControl(domContainer)\n\t{\n\t\tdomContainer.addEventListener('mousemove', (e)=>\n\t\t{\n\t\t\tvar rect = domContainer.getBoundingClientRect();\n\t\t\tvar x = e.pageX - rect.left,\n\t\t\t\ty = e.pageY - rect.top;\n\n\t\t\tthis.lookPointCoords.x = x;\n\t\t\tthis.lookPointCoords.y = y;\n\t\t\t\n\t\t\tif(typeof this.clientState !== 'undefined')\n\t\t\t{\n\t\t\t\tthis.clientState.socket.emit('setLookPointCoords', {\n\t\t\t\t\tid: this.playerID,\n\t\t\t\t\tx,\n\t\t\t\t\ty,\n\t\t\t\t})\n\t\t\t}\n\t\t});\n\t}\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/movable.js?");

/***/ })

/******/ });
});