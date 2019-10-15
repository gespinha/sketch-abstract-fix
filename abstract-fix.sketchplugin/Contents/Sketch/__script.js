var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: processFix, processDetach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processFix", function() { return processFix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processDetach", function() { return processDetach; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var ui = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI;
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var library = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries().filter(function (l) {
  return l.libraryType == 'User';
});
var librarySymbols = library.flatMap(function (l) {
  return l.getImportableSymbolReferencesForDocument(document);
});
var selected = document.selectedLayers.layers; // look for clean symbol sources

var findSymbol = function findSymbol(layerName) {
  var search = librarySymbols.find(function (s) {
    return s.name == layerName;
  });

  if (search) {
    search = search.import();
  } else {
    search = null;
  }

  return search;
}; // clean the dirty symbol sources with now ones


var cleanSources = function cleanSources(layer) {
  var symbolsToClean = layer.overrides.filter(function (o) {
    return o.symbolOverride;
  });
  var layerMasterSource = findSymbol(layer.master.name); // fix base layer source

  if (layerMasterSource && layer.master !== layer.master.name) layer.master = layerMasterSource; // loop through overrides

  for (var i = 0; i < symbolsToClean.length; i++) {
    var thisSymbol = symbolsToClean[i];
    var symbolSource = null; // get source symbol

    if (thisSymbol.isDefault) {
      symbolSource = findSymbol(thisSymbol.affectedLayer.master.name);
    } else {
      var symbolContext = context.document.documentData().symbolWithID(thisSymbol.value);
      symbolSource = symbolContext ? findSymbol(symbolContext.name()) : null;
    } // update symbol


    if (symbolSource) {
      if (thisSymbol.value !== symbolSource.symbolId) layer.setOverrideValue(thisSymbol, symbolSource.symbolId);
    } else {
      ui.alert('Error', 'Library for "' + thisSymbol.affectedLayer.name + '" not found!');
    }
  }
}; // run the process


var process = function process(layers, detach) {
  var groupCount = layers.filter(function (l) {
    return l.type == 'Group';
  }).length;

  for (var i = 0; i < layers.length; i++) {
    var thisLayer = layers[i];

    if (thisLayer.type == 'Group') {
      process(thisLayer.layers, detach);
    } else if (thisLayer.type == 'SymbolInstance') {
      var result = cleanSources(thisLayer);
      if (detach) thisLayer.detach();
    }
  }
}; // success message


var success = function success(message) {
  var rocket = String.fromCodePoint(128640);
  return ui.message(rocket + ' ' + message + ' ' + rocket);
}; // handler functions


function processFix() {
  process(selected, false);
  return success('All symbols have been fixed!');
}
function processDetach() {
  process(selected, true);
  return success('All symbols have been fixed!');
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['processFix'] = __skpm_run.bind(this, 'processFix');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['processDetach'] = __skpm_run.bind(this, 'processDetach')

//# sourceMappingURL=__script.js.map