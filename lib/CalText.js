"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mobxReactLite = require("mobx-react-lite");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CalText = function CalText(_ref) {
  var width = _ref.width,
    height = _ref.height;
  var store = (0, _mobxReactLite.useLocalStore)(function () {
    return {
      timeout: null,
      //计量维度定时器
      /**
       * 计量维度的透明度
       */
      opacity: 0,
      transition: null,
      showCalText: function showCalText() {
        store.opacity = 1;
        store.transition = null;
      },
      hideCalText: function hideCalText() {
        store.opacity = 0;
        // store.transition= `opacity .5s`;
      }
    };
  });

  (0, _react.useEffect)(function () {
    clearTimeout(store.timeout);
    store.showCalText();
    store.timeout = setTimeout(function () {
      store.hideCalText();
    }, 1000);
  }, [height, width]);
  return /*#__PURE__*/_react.default.createElement(_mobxReactLite.Observer, null, function () {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 10,
        transition: store.transition,
        opacity: store.opacity,
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: "bold"
      }
    }, width && height && "".concat(Math.round(width), "x").concat(Math.round(height)) || width && "".concat(Math.round(width), "px") || height && "".concat(Math.round(height), "px"));
  });
};
var _default = CalText;
exports.default = _default;
//# sourceMappingURL=CalText.js.map