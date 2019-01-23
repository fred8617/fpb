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

var _mobxReact = require("mobx-react");

var _styled = require("../../../../styled");

var _reactDnd = require("react-dnd");

var _reactDom = require("react-dom");

var _DragableCol = _interopRequireDefault(require("./DragableCol"));

var _dec, _dec2, _class;

var type = "COL"; //放置目标处理集合

var target = {
  canDrop: function canDrop(props) {
    return true;
  },
  hover: function hover(props, monitor, component) {
    var dragItem = monitor.getItem().item;
    var hoverItem = props.item,
        _props$store = props.store,
        createElement = _props$store.createElement,
        moveElement = _props$store.moveElement,
        setDownElement = _props$store.setDownElement,
        addColIntoRow = _props$store.addColIntoRow,
        data = _props$store.data; // console.log(`hover`);
    // setDownElement(dragItem)

    var dragIndex = data.indexOf(dragItem);
    var hoverIndex = data.indexOf(hoverItem);
  },
  drop: function drop(props, monitor, component) {// const tp=monitor.getItemType();
    //const dragData=monitor.getItem().data;
  }
};
var DropableRow = (_dec = (0, _reactDnd.DropTarget)(type, target, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec2 = (0, _mobxReact.inject)('store'), _dec(_class = _dec2(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropableRow, _Component);

  function DropableRow() {
    (0, _classCallCheck2.default)(this, DropableRow);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DropableRow).apply(this, arguments));
  }

  (0, _createClass2.default)(DropableRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          isOver = _this$props.isOver,
          childrenGroup = _this$props.childrenGroup,
          store = _this$props.store,
          item = _this$props.item,
          design = _this$props.design,
          form = _this$props.form;
      return connectDropTarget(_react.default.createElement("div", null, _react.default.createElement(_styled.HoverRow, null, childrenGroup.length == 0 && design ? _react.default.createElement(_styled.NoneElement, {
        style: {
          lineHeight: "31px",
          height: 39,
          marginBottom: 24
        }
      }, "\u884C\u5BB9\u5668\uFF0C\u8BF7\u52A0\u5165\u5217") : childrenGroup.map(function (e, i) {
        return _react.default.createElement(_DragableCol.default, {
          form: form,
          design: design,
          parent: item,
          key: "DragableCol".concat(i),
          store: store,
          item: e
        });
      }))));
    }
  }]);
  return DropableRow;
}(_react.Component)) || _class) || _class) || _class);
exports.default = DropableRow;