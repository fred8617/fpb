"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactContainerQuery = require("react-container-query");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//测量尺
var _default = (0, _reactContainerQuery.applyContainerQuery)(function (props) {
  var _props$containerQuery = props.containerQuery,
      xs = _props$containerQuery.xs,
      sm = _props$containerQuery.sm,
      md = _props$containerQuery.md;
  var nowBreakpoint = Object.entries(props.containerQuery).find(function (e) {
    return e[1] === true;
  })[0];
  var isMobile = xs || sm || md;

  var childrenProps = _objectSpread({}, props.containerQuery, {
    isMobile: isMobile,
    nowBreakpoint: nowBreakpoint
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%"
    }
  }), props.children(childrenProps));
}, {
  xs: {
    maxWidth: 575
  },
  sm: {
    minWidth: 576,
    maxWidth: 767
  },
  md: {
    minWidth: 768,
    maxWidth: 1024
  },
  lg: {
    minWidth: 1025,
    maxWidth: 1199
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599
  },
  xxl: {
    minWidth: 1600
  }
});

exports.default = _default;
//# sourceMappingURL=ContainerQuery.js.map