"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tag/style/css");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _mobxReactLite = require("mobx-react-lite");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalTag = function CalTag(_ref) {
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
      showCalTag: function showCalTag() {
        store.opacity = 1;
        store.transition = null;
      },
      hideCalTag: function hideCalTag() {
        store.opacity = 0; // store.transition= `opacity .5s`;
      }
    };
  });
  (0, _react.useEffect)(function () {
    clearTimeout(store.timeout);
    store.showCalTag();
    store.timeout = setTimeout(function () {
      store.hideCalTag();
    }, 1000);
  }, [height, width]);
  return _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_tag.default, {
      style: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: 0,
        transition: store.transition,
        opacity: store.opacity
      }
    }, Math.round(width), "x", Math.round(height));
  });
};

var _default = CalTag;
exports.default = _default;
//# sourceMappingURL=CalTag.js.map