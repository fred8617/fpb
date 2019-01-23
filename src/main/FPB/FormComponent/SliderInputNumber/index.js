"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/slider/style");

var _slider = _interopRequireDefault(require("antd/es/slider"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var SliderInputNumber =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SliderInputNumber, _Component);

  function SliderInputNumber() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SliderInputNumber);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SliderInputNumber)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      value: 0
    };

    _this.onChange = function (value) {
      if (value == null || value === '') {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          min = _this$props.min,
          max = _this$props.max;

      if (value < min || value > max) {
        return;
      }

      _this.setState({
        value: value
      });

      onChange === null || onChange === void 0 ? void 0 : onChange(value);
    };

    return _this;
  }

  (0, _createClass2.default)(SliderInputNumber, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;

      if (value != null) {
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      return _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
        span: 12
      }, _react.default.createElement(_slider.default, (0, _extends2.default)({
        min: 0,
        max: 100
      }, this.props, {
        onChange: this.onChange,
        value: value
      }))), _react.default.createElement(_col.default, {
        span: 12
      }, _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
        min: 0,
        max: 100
      }, this.props, {
        style: {
          marginLeft: 16
        },
        value: value,
        onChange: this.onChange
      }))));
    }
  }]);
  return SliderInputNumber;
}(_react.Component);

exports.default = SliderInputNumber;