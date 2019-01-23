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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireWildcard(require("react"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var Option = _select.default.Option;

var NumberComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NumberComponent, _Component);

  function NumberComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NumberComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NumberComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      value: null,
      mode: null
    };

    _this.modeChange = function (mode) {
      var onChange = _this.props.onChange;
      var value = _this.state.value;

      _this.setState({
        mode: mode
      });

      onChange === null || onChange === void 0 ? void 0 : onChange([mode, value]);

      _this.resize();
    };

    _this.resize = function () {
      setTimeout((0, _debounce.default)(_this.resizeEvent, 200), 200);
    };

    _this.resizeEvent = function () {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    };

    _this.valueChange = function (value) {
      if (!value) {
        return;
      }

      var onChange = _this.props.onChange;
      var mode = _this.state.mode;

      _this.setState({
        mode: mode,
        value: value
      });

      onChange === null || onChange === void 0 ? void 0 : onChange([mode, value]);

      _this.resize();
    };

    return _this;
  }

  (0, _createClass2.default)(NumberComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;

      if (value) {
        this.setState({
          mode: value[0],
          value: value[1]
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          value = _this$state.value,
          mode = _this$state.mode;
      return _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
        span: 12
      }, _react.default.createElement(_select.default, {
        onChange: this.modeChange,
        value: mode,
        style: {
          width: 100
        }
      }, _react.default.createElement(Option, {
        value: null
      }, "\u81EA\u9002\u5E94"), _react.default.createElement(Option, {
        value: "%"
      }, "\u767E\u5206\u6BD4"), _react.default.createElement(Option, {
        value: "px"
      }, "\u50CF\u7D20"))), mode ? _react.default.createElement(_col.default, {
        span: 12
      }, _react.default.createElement(_inputNumber.default, {
        min: 0,
        onChange: this.valueChange,
        formatter: function formatter(value) {
          return "".concat(value).concat(mode);
        },
        parser: function parser(value) {
          return value.replace(mode, '');
        },
        value: value
      })) : void 0);
    }
  }]);
  return NumberComponent;
}(_react.Component);

exports.default = NumberComponent;