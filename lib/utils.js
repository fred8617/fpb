"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectKeysWhenIsArray = exports.findRequiredRules = exports.doWindowResize = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var doWindowResize = function doWindowResize() {
  var event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, false);
  window.dispatchEvent(event);
};

exports.doWindowResize = doWindowResize;

var findRequiredRules = function findRequiredRules(componentProps) {
  if (!componentProps) {
    return [];
  }

  return Object.entries(componentProps).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (Object.entries(value).find(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          propName = _ref4[0],
          value = _ref4[1];

      return propName === 'rules' && value.find(function (rule) {
        return rule.required;
      });
    })) {
      return key;
    }
  }).filter(Boolean);
};

exports.findRequiredRules = findRequiredRules;

var getObjectKeysWhenIsArray = function getObjectKeysWhenIsArray(obj) {
  var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var returnValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var defaultPush = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (obj === null) {
    return returnValue;
  }

  if (obj instanceof Array) {
    returnValue["".concat(prev)] = obj.map(function () {
      return defaultPush;
    });
    obj.forEach(function (e, i) {
      getObjectKeysWhenIsArray(e, "".concat(prev, "[").concat(i, "]"), returnValue, defaultPush);
    });
    return returnValue;
  }

  if (_typeof(obj) === 'object') {
    Object.entries(obj).forEach(function (_ref5, i) {
      var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];

      var index = "".concat(prev, ".").concat(key);

      if (value instanceof Array) {
        returnValue[index] = value.map(function (e) {
          return defaultPush;
        });
        getObjectKeysWhenIsArray(value, index, returnValue, defaultPush);
        return true;
      }

      getObjectKeysWhenIsArray(value, index, returnValue, defaultPush);
    });
    return returnValue;
  }
};

exports.getObjectKeysWhenIsArray = getObjectKeysWhenIsArray;
//# sourceMappingURL=utils.js.map