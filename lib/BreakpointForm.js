"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/radio/style/css");
var _radio = _interopRequireDefault(require("antd/lib/radio"));
require("antd/lib/checkbox/style/css");
var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));
require("antd/lib/form/style/css");
var _form = _interopRequireDefault(require("antd/lib/form"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var create = _form.default.create,
  Item = _form.default.Item;
var BreakpointForm = function BreakpointForm(props) {
  var form = props.form,
    initialData = props.initialData;
  var getFieldDecorator = form.getFieldDecorator,
    getFieldsValue = form.getFieldsValue;
  var breakpointsDec = getFieldDecorator("breakpoints", {
    initialValue: initialData.breakpoints,
    rules: [{
      required: true,
      message: "必须存在一个断点"
    }]
  });
  var _getFieldsValue = getFieldsValue(),
    _getFieldsValue$break = _getFieldsValue.breakpoints,
    breakpoints = _getFieldsValue$break === void 0 ? [] : _getFieldsValue$break;

  // xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // xxl ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Item, {
    label: "\u65AD\u70B9"
  }, breakpointsDec( /*#__PURE__*/_react.default.createElement(_checkbox.default.Group, null, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    value: "xs"
  }, "xs <576px"), /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    value: "sm"
  }, "sm ≥768px"), /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    value: "md"
  }, "md ≥992px"), /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    value: "lg"
  }, "lg ≥1200px"), /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    value: "xl"
  }, "xl ≥1600px")))), breakpoints.map(function (point) {
    return /*#__PURE__*/_react.default.createElement(Item, {
      label: point,
      key: point
    }, getFieldDecorator("cols.".concat(point), {
      initialValue: initialData.cols[point],
      rules: [{
        required: true,
        message: "请选择断点布局栅格数量"
      }]
    })( /*#__PURE__*/_react.default.createElement(_radio.default.Group, null, /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 1
    }, "1"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 2
    }, "2"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 3
    }, "3"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 4
    }, "4"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 6
    }, "6"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 8
    }, "8"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 12
    }, "12"), /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: 24
    }, "24"))));
  }));
};
var _default = _form.default.create()(BreakpointForm);
exports.default = _default;
//# sourceMappingURL=BreakpointForm.js.map