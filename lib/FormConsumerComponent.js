"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _FormContext = require("./FormContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = _form.default.Item;
/**
 * FPB表单元素
 */

var FormConsumerComponent = function FormConsumerComponent(_ref) {
  var item = _ref.item,
      component = _ref.component;
  (0, _react.useEffect)(function () {}, []);
  return _react.default.createElement(_mobxReactLite.Observer, null, function () {
    var $id = item.$id,
        i = item.i,
        label = item.label;
    var id = $id && $id.trim() || i;
    return _react.default.createElement(_FormContext.Consumer, null, function (_ref2) {
      var form = _ref2.form;
      var renderComponent = form.getFieldDecorator(id)(component);

      if (label) {
        renderComponent = _react.default.createElement(_form.default, null, _react.default.createElement(Item, {
          label: label
        }, renderComponent));
      }

      return _react.default.createElement(_react.default.Fragment, null, renderComponent);
    });
  });
};

var _default = FormConsumerComponent;
exports.default = _default;
//# sourceMappingURL=FormConsumerComponent.js.map