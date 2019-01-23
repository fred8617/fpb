"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

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

var FieldNameInput = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FieldNameInput, _Component);

  function FieldNameInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FieldNameInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FieldNameInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _initializerDefineProperty2.default)(_this, "handleChange", _descriptor, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    (0, _initializerDefineProperty2.default)(_this, "handleBlur", _descriptor2, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FieldNameInput, [{
    key: "render",
    value: function render() {
      var fieldName = this.props.store.editingData.fieldName;
      return _react.default.createElement(_input.default, {
        value: fieldName,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        placeholder: "\u8F93\u5165\u4F20\u5165\u540E\u53F0\u5B57\u6BB5\u540D\u79F0",
        style: {
          width: 200
        }
      });
    }
  }]);
  return FieldNameInput;
}(_react.Component), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "handleChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (e) {
      var store = _this2.props.store;
      store.editingData.fieldName = e.target.value;
    };
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "handleBlur", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      var _this3$props$store = _this3.props.store,
          editingData = _this3$props$store.editingData,
          fieldName = _this3$props$store.editingData.fieldName,
          checkName = _this3$props$store.checkName;
      editingData.fieldName = checkName(fieldName, editingData.type, 1);
    };
  }
})), _class2)) || _class) || _class);
exports.default = FieldNameInput;