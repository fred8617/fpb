"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../../Context");

var _reactDnd = require("react-dnd");

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _dec2, _class;

var type = "ELEMENT"; //拖拽目标处理集合

var source = {
  canDrag: function canDrag(props) {
    return true;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    return props;
  }
};
var Element = (_dec = (0, _mobxReact.inject)('store'), _dec2 = (0, _reactDnd.DragSource)(type, source, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}), _dec(_class = (0, _mobxReact.observer)(_class = (0, _Context.FormConsume)(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Element, _Component);

  function Element() {
    (0, _classCallCheck2.default)(this, Element);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Element).apply(this, arguments));
  }

  (0, _createClass2.default)(Element, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDragSource = _this$props.connectDragSource,
          item = _this$props.item,
          name = _this$props.item.name,
          addElement = _this$props.store.addElement;
      return connectDragSource && connectDragSource(_react.default.createElement("div", {
        onClick: function onClick(e) {
          return addElement(item);
        },
        style: {
          cursor: "pointer"
        }
      }, name));
    }
  }]);
  return Element;
}(_react.Component)) || _class) || _class) || _class) || _class);
exports.default = Element;