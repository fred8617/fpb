"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useSizeMe3 = _interopRequireDefault(require("./useSizeMe"));

var _CalTag = _interopRequireDefault(require("./CalTag"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Block = function Block(props) {
  var _props$showTag = props.showTag,
      showTag = _props$showTag === void 0 ? true : _props$showTag;

  var _useSizeMe = (0, _useSizeMe3.default)(function () {
    return _react.default.createElement("div", {
      style: {
        position: "relative",
        zIndex: 0
      }
    }, showTag && _react.default.createElement(_CalTag.default, {
      width: width,
      height: props.height
    }), props.children);
  }, {
    monitorHeight: true // refreshMode: showTag?'debounce':'throttle',
    // refreshRate: showTag?200:16,

  }),
      _useSizeMe2 = _slicedToArray(_useSizeMe, 3),
      sized = _useSizeMe2[0],
      width = _useSizeMe2[1],
      height = _useSizeMe2[2];

  var setParent = (0, _react.useCallback)((0, _debounce.default)(props.onParentHeightChange, showTag ? 200 : 0), [props.onParentHeightChange]);
  (0, _react.useEffect)(function () {
    console.log('setHeight');
    setParent(height);
  }, [height, props.breakpoint, props.autoHeight]);
  return _react.default.createElement(_react.default.Fragment, null, sized);
};

exports.default = Block;