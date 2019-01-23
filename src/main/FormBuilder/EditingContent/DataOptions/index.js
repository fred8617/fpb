"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _styled = require("../../../styled");

var _dec, _class;

var DataOptions = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DataOptions, _Component);

  function DataOptions() {
    (0, _classCallCheck2.default)(this, DataOptions);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DataOptions).apply(this, arguments));
  }

  (0, _createClass2.default)(DataOptions, [{
    key: "render",
    value: function render() {
      var _this$props$store = this.props.store,
          data = _this$props$store.editingData,
          options = _this$props$store.editingData.options,
          setGroupData = _this$props$store.setGroupData,
          addGroupData = _this$props$store.addGroupData,
          deleteGroupData = _this$props$store.deleteGroupData;
      return _react.default.createElement(_react.Fragment, null, options.map(function (e, i) {
        return _react.default.createElement(_styled.RowMB10, {
          gutter: 15
        }, _react.default.createElement(_col.default, {
          span: 10
        }, _react.default.createElement(_input.default, {
          onChange: function onChange(e) {
            return setGroupData(data, "options", i, "label", e.target.value);
          },
          value: e.label,
          placeHolder: "label"
        })), _react.default.createElement(_col.default, {
          span: 10
        }, _react.default.createElement(_input.default, {
          onChange: function onChange(e) {
            return setGroupData(data, "options", i, "value", e.target.value);
          },
          value: e.value,
          placeHolder: "value"
        })), _react.default.createElement(_col.default, {
          span: 2
        }, _react.default.createElement(_button.default, {
          icon: "plus",
          onClick: function onClick(e) {
            return addGroupData(data, "options", i, {
              label: "default",
              value: "default"
            });
          }
        })), _react.default.createElement(_col.default, {
          span: 2
        }, options && options.length > 1 ? _react.default.createElement(_button.default, {
          icon: "minus",
          onClick: function onClick(e) {
            return deleteGroupData(data, "options", i);
          }
        }) : void 0));
      }));
    }
  }]);
  return DataOptions;
}(_react.Component)) || _class) || _class);
exports.default = DataOptions;