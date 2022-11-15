"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/tag/style/css");
var _tag = _interopRequireDefault(require("antd/lib/tag"));
var _mobxReactLite = require("mobx-react-lite");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
        store.opacity = 0;
        // store.transition= `opacity .5s`;
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
  return /*#__PURE__*/_react.default.createElement(_mobxReactLite.Observer, null, function () {
    return /*#__PURE__*/_react.default.createElement(_tag.default, {
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