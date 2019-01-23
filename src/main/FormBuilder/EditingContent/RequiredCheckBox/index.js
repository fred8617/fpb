"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _class, _class2, _descriptor, _descriptor2;

var RequiredCheckBox = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RequiredCheckBox, _Component);

  function RequiredCheckBox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RequiredCheckBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RequiredCheckBox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _initializerDefineProperty2.default)(_this, "requireChange", _descriptor, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    (0, _initializerDefineProperty2.default)(_this, "requiredMessageChange", _descriptor2, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(RequiredCheckBox, [{
    key: "render",
    value: function render() {
      var _this$props$store$edi = this.props.store.editingData,
          required = _this$props$store$edi.required,
          requiredMessage = _this$props$store$edi.requiredMessage;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_checkbox.default, {
        checked: required,
        onChange: this.requireChange
      }, "\u5FC5\u586B"), required ? _react.default.createElement(_input.default, {
        value: requiredMessage,
        onChange: this.requiredMessageChange,
        placeholder: "\u8F93\u5165\u6821\u9A8C\u5FC5\u586B\u7684\u6807\u8BED",
        style: {
          width: 200
        }
      }) : void 0);
    }
  }]);
  return RequiredCheckBox;
}(_react.Component), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "requireChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (e) {
      var store = _this2.props.store;
      store.editingData.required = e.target.checked;
    };
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "requiredMessageChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (e) {
      var _this3$props = _this3.props,
          store = _this3$props.store,
          data = _this3$props.store.editingData,
          form = _this3$props.form;
      store.editingData.requiredMessage = e.target.value; // debugger

      var fName = data.fieldName || "invalidField";

      if (!form.getFieldValue(fName)) {
        form.setFieldsValue((0, _defineProperty2.default)({}, fName, 1));
        form.setFieldsValue((0, _defineProperty2.default)({}, fName, ""));
        setTimeout(function () {
          form.validateFields();
        }, 1);
      }
    };
  }
})), _class2)) || _class) || _class);
exports.default = RequiredCheckBox;