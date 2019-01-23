"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _Element = _interopRequireDefault(require("./Element"));

var _dec, _class;

var ContainerList = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ContainerList, _Component);

  function ContainerList() {
    (0, _classCallCheck2.default)(this, ContainerList);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ContainerList).apply(this, arguments));
  }

  (0, _createClass2.default)(ContainerList, [{
    key: "render",
    value: function render() {
      var data = this.props.store.containerTypes;
      return _react.default.createElement(_list.default, {
        header: _react.default.createElement("div", null, "\u5E03\u5C40"),
        bordered: true,
        dataSource: data,
        renderItem: function renderItem(item) {
          return _react.default.createElement(_list.default.Item, null, _react.default.createElement(_Element.default, {
            item: item
          }));
        }
      });
    }
  }]);
  return ContainerList;
}(_react.Component)) || _class) || _class);
exports.default = ContainerList;