"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectKeysWhenIsArray = exports.findRequiredRules = exports.doWindowResize = void 0;
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var doWindowResizeInitial = function doWindowResizeInitial() {
  if (typeof window !== 'undefined') {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
};
var doWindowResize = (0, _debounce2.default)(doWindowResizeInitial, 200);
//@ts-ignore
exports.doWindowResize = doWindowResize;
window.doWindowResize = doWindowResize;
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