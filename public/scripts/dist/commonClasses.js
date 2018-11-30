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

/***/ "./class/common/geometry.js":
/*!**********************************!*\
  !*** ./class/common/geometry.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Geometry\r\n{\r\n    static getDistanceBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var dx = Math.pow(x2 - x1, 2);\r\n        var dy = Math.pow(y1 - y2, 2);\r\n        var distance = Math.sqrt(dx + dy);\r\n        return distance;\r\n    }\r\n\r\n    static getAngleBy2XY(x1, y1, x2, y2)\r\n    {\r\n        var deltaY = y2 - y1;\r\n        var deltaX = x2 - x1;\r\n\r\n        var theta = Math.atan2(-deltaY, deltaX);\r\n        if (theta < 0)\r\n            theta += 2 * Math.PI;\r\n\r\n        var angle = theta * 180 / Math.PI;\r\n\r\n        return angle;\r\n    }\r\n\r\n    static getXByAngleAndDistance(x, angle, distance)\r\n    {\r\n        // return (x + GAME.utils.COS[(angle % 360) >> 0] * distance);\r\n        return (x + Math.cos(angle % 360) * distance);\r\n    }\r\n    \r\n    static getYByAngleAndDistance(y, angle, distance)\r\n    {\r\n        // return (y + GAME.utils.SIN[(angle % 360) >> 0] * distance);\r\n        return (y + Math.sin(angle % 360) * distance);\r\n    }\r\n\r\n    /**\r\n     * Linear Interpolation method\r\n     * \r\n     * @param {float} startValue \r\n     * @param {float} destValue \r\n     * @param {float} normal (between 0 & 1)\r\n     */\r\n    static lerp(startValue, destValue, normal)\r\n    {\r\n        return (1 - normal) * startValue + normal * destValue;\r\n    }\r\n};\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/geometry.js?");

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

eval("const Geometry = __webpack_require__(/*! ./geometry.js */ \"./class/common/geometry.js\");\n\nmodule.exports = class Movable\n{\n\tconstructor(options = {})\n\t{\n\t\tvar {\n\t\t\tx = 50, \n\t\t\ty = 50, \n\t\t\twidth = 20, \n\t\t\theight = 20,\n\t\t\tspeed = 150, // px/s\n\t\t\tplayerID = null,\n\t\t\tcolor = null,\n\t\t} = options;\n\t\tObject.assign(this, {\n\t\t\tx, \n\t\t\ty, \n\t\t\twidth, \n\t\t\theight, \n\t\t\tspeed, \n\t\t\tplayerID, \n\t\t\tcolor\n\t\t});\n\n\t\tvar colors = ['red', 'blue', 'green', 'purple'];\n\t\tif(!this.color)\n\t\t\tthis.color = colors[ Math.floor(Math.random() * colors.length) ];\n\n\t\tthis.movement = {\n\t\t\tx: 0,\n\t\t\ty: 0,\n\t\t};\n\n\t\tthis.serverUpdatesArray = [];\n\t}\n\n\tstoreLastPosition()\n\t{\n\t\tthis.serverUpdatesArray.push({\n\t\t\tx: this.x,\n\t\t\ty: this.y,\n\t\t\ttimestamp: Date.now(),\n\t\t})\n\t\tif(this.serverUpdatesArray.length > 2)\n\t\t\tthis.serverUpdatesArray.shift();\n\t}\n\n\tsetAxisMovement(axis, value)\n\t{\n\t\tthis.movement[axis] = value;\n\t\tif(typeof clientState !== 'undefined')\n\t\t{\n\t\t\tclientState.socket.emit('setAxisMovement', {\n\t\t\t\tid: this.playerID,\n\t\t\t\taxis,\n\t\t\t\tvalue,\n\t\t\t})\n\t\t}\n\t}\n\n\tupdate(modifier)\n\t{\n\t\tthis.x += this.movement.x * this.speed * modifier;\n\t\tthis.y += this.movement.y * this.speed * modifier;\n\t}\n\n\tupdateByInterpolation(now = Date.now())\n\t{\n\t\tif(this.serverUpdatesArray.length < 2)\n\t\t\treturn;\n\t\tvar timeBetweenLastUpdates = this.serverUpdatesArray[1].timestamp - this.serverUpdatesArray[0].timestamp;\n\t\tvar timeBetweenNowAndLastUpdate = now -this.serverUpdatesArray[1].timestamp;\n\t\tvar modifier = timeBetweenNowAndLastUpdate / timeBetweenLastUpdates;\n\t\tthis.drawX = Geometry.lerp(this.serverUpdatesArray[1].x, this.x, modifier);\n\t\tthis.drawY = Geometry.lerp(this.serverUpdatesArray[1].y, this.y, modifier);\n\t}\n\n\tdraw(ctx)\n\t{\n\t\tctx.strokeStyle = this.color;\n\t\tvar drawX = this.drawX || this.x, \n\t\t\tdrawY = this.drawY || this.y;\n\t\tctx.strokeRect(drawX, drawY, this.width, this.height);\n\t}\n\n\tinitKeyboardControl()\n\t{\n\t\t\n\t\twindow.addEventListener(\"keydown\", (e)=>\n\t\t{\n\t\t\t/* Cancel default behaviour */\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 37:\n\t\t\t\tcase 38:\n\t\t\t\tcase 39:\n\t\t\t\tcase 40:\n\t\t\t\t\te.preventDefault();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 38: // up\n\t\t\t\t\tif(this.movement.y !== -1)\n\t\t\t\t\t\tthis.setAxisMovement('y', -1);\n\t\t\t\tbreak;\n\t\t\t\tcase 40: // down\n\t\t\t\t\tif(this.movement.y !== 1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 1);\n\t\t\t\tbreak;\n\t\t\t\tcase 37: // left\n\t\t\t\t\tif(this.movement.x !== -1)\n\t\t\t\t\t\tthis.setAxisMovement('x', -1);\n\t\t\t\tbreak;\n\t\t\t\tcase 39: //right\n\t\t\t\t\tif(this.movement.x !== 1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 1);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}, false);\n\n\t\twindow.addEventListener(\"keyup\", (e)=>\n\t\t{\n\t\t\tswitch(e.keyCode)\n\t\t\t{\n\t\t\t\tcase 38: // up\n\t\t\t\t\tif(this.movement.y === -1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 40: // down\n\t\t\t\t\tif(this.movement.y === 1)\n\t\t\t\t\t\tthis.setAxisMovement('y', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 37: // left\n\t\t\t\t\tif(this.movement.x === -1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 0);\n\t\t\t\tbreak;\n\t\t\t\tcase 39: //right\n\t\t\t\t\tif(this.movement.x === 1)\n\t\t\t\t\t\tthis.setAxisMovement('x', 0);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}, false);\n\t}\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./class/common/movable.js?");

/***/ })

/******/ });
});