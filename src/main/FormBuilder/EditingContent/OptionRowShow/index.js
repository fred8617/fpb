"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/slider/style");

var _slider = _interopRequireDefault(require("antd/es/slider"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _class;

var OptionRowShow = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(OptionRowShow, _Component);

  function OptionRowShow() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, OptionRowShow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(OptionRowShow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.optionRowShowChange = function (e) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
          _assertThisInitialize2 = _assertThisInitialize.props.store,
          data = _assertThisInitialize2.editingData,
          setEditingData = _assertThisInitialize2.setEditingData;

      setEditingData("optionRowShow", e);
    };

    return _this;
  }

  (0, _createClass2.default)(OptionRowShow, [{
    key: "render",
    value: function render() {
      var optionRowShow = this.props.store.editingData.optionRowShow;
      return _react.default.createElement(_slider.default, {
        min: 1,
        max: 4,
        onChange: this.optionRowShowChange,
        value: Number(optionRowShow)
      });
    }
  }]);
  return OptionRowShow;
}(_react.Component)) || _class) || _class);
exports.default = OptionRowShow;