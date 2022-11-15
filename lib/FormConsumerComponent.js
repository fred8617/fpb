"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/form/style/css");
var _form = _interopRequireDefault(require("antd/lib/form"));
var _react = _interopRequireWildcard(require("react"));
var _mobxReactLite = require("mobx-react-lite");
var _FormContext = require("./FormContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Item = _form.default.Item;
/**
 * FPB表单元素
 */

var FormConsumerComponent = function FormConsumerComponent(_ref) {
  var item = _ref.item,
    component = _ref.component;
  (0, _react.useEffect)(function () {}, []);
  return /*#__PURE__*/_react.default.createElement(_mobxReactLite.Observer, null, function () {
    var $id = item.$id,
      i = item.i,
      label = item.label;
    var id = $id && $id.trim() || i;
    return /*#__PURE__*/_react.default.createElement(_FormContext.Consumer, null, function (_ref2) {
      var form = _ref2.form;
      var renderComponent = form.getFieldDecorator(id)(component);
      if (label) {
        renderComponent = /*#__PURE__*/_react.default.createElement(_form.default, null, /*#__PURE__*/_react.default.createElement(Item, {
          label: label
        }, renderComponent));
      }
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderComponent);
    });
  });
};
var _default = FormConsumerComponent;
exports.default = _default;
//# sourceMappingURL=FormConsumerComponent.js.map