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

var _Element = _interopRequireDefault(require("./Element"));

var _Context = require("../../Context");

var _mobxReact = require("mobx-react");

var _dec, _class;

var ElementList = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ElementList, _Component);

  function ElementList() {
    (0, _classCallCheck2.default)(this, ElementList);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ElementList).apply(this, arguments));
  }

  (0, _createClass2.default)(ElementList, [{
    key: "render",
    value: function render() {
      var data = this.props.store.elementTypes;
      return _react.default.createElement(_list.default, {
        header: _react.default.createElement("div", null, "\u5143\u7D20"),
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
  return ElementList;
}(_react.Component)) || _class) || _class);
exports.default = ElementList;