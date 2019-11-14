"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobxReactLite = require("mobx-react-lite");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
        store.opacity = 0; // store.transition= `opacity .5s`;
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
  return _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement("div", {
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