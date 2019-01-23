"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _reactDnd = require("react-dnd");

var _index = _interopRequireDefault(require("../../index"));

var _styled = require("../../../../../styled");

var _reactDom = require("react-dom");

var _dec, _dec2, _class;

var PRIVIEW_ELEMENT = "PRIVIEW_ELEMENT";
var dragType = "COL";
var dropType = ["ELEMENT", PRIVIEW_ELEMENT, dragType]; //放置目标处理集合

var target = {
  canDrop: function canDrop(props) {
    return true;
  },
  hover: function hover(props, monitor, component) {},
  drop: function drop(props, monitor, component) {
    var _monitor$getItem = monitor.getItem(),
        dragItem = _monitor$getItem.item;

    var hoverItem = props.item,
        _props$store = props.store,
        createElement = _props$store.createElement,
        moveElement = _props$store.moveElement,
        setDownElement = _props$store.setDownElement,
        addColIntoRow = _props$store.addColIntoRow,
        data = _props$store.data,
        addItemInCol = _props$store.addItemInCol,
        parent = props.parent;
    console.log("hover", dragItem.type, hoverItem.type);
    var dragType = dragItem.type;
    var hoverType = hoverItem.type;

    if (dragType != 'col' && hoverType == 'col') {
      // console.log(hoverItem,parent,dragItem);
      addItemInCol(dragItem, hoverItem);
      return;
    } // setDownElement(dragItem)


    var dragIndex = data.indexOf(dragItem);
    var hoverIndex = data.indexOf(hoverItem); // if (dragIndex === hoverIndex) {
    // 	console.log(`=`);
    // 	return;
    // }
    // if (dragIndex === -1) {
    // 	console.log(`-1`);
    //   createElement(dragItem,hoverIndex);
    //   return;
    // }
    // Determine rectangle on screen

    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect(); // Get vertical middle

    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

    var clientOffset = monitor.getClientOffset(); // Get pixels to the top

    var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    } // Dragging upwards


    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    } // Time to actually perform the action
    // moveElement(dragIndex, hoverIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    //item.index = hoverIndex

  }
}; //拖拽目标处理集合

var source = {
  canDrag: function canDrag(props) {
    return true;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    console.log(monitor.getItemType());
    return props;
  },
  endDrag: function endDrag(props) {
    console.log(props);
  }
};
var DragableCol = (_dec = (0, _reactDnd.DropTarget)(dropType, target, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec2 = (0, _reactDnd.DragSource)(dragType, source, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    monitor: monitor,
    connectDragPreview: connect.dragPreview()
  };
}), _dec(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DragableCol, _Component);

  function DragableCol() {
    (0, _classCallCheck2.default)(this, DragableCol);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DragableCol).apply(this, arguments));
  }

  (0, _createClass2.default)(DragableCol, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragSource = _this$props.connectDragSource,
          item = _this$props.item,
          childrenGroup = _this$props.item.children,
          store = _this$props.store,
          design = _this$props.design,
          form = _this$props.form;
      var iconContainerWidth = 70;
      var moveContainerWidth = 25;
      var mainMargin = 10;
      var elementContainer = {
        margin: design ? "0 ".concat(mainMargin, "px") : null,
        width: design ? "calc( 100% - ".concat(iconContainerWidth + moveContainerWidth + mainMargin * 2, "px )") : "100%"
      };
      return _react.default.createElement(_col.default, null, connectDragSource && connectDropTarget && connectDropTarget(_react.default.createElement("div", {
        className: "priviewItem"
      }, design && connectDragSource(_react.default.createElement("div", {
        className: "move-container"
      }, _react.default.createElement(_icon.default, {
        style: {
          cursor: "move"
        },
        type: "drag"
      }))), _react.default.createElement("div", {
        className: "element-container",
        style: elementContainer
      }, design && childrenGroup.length == 0 ? _react.default.createElement(_styled.NoneElement, {
        style: {
          lineHeight: "31px",
          height: 39,
          marginBottom: 24
        }
      }, "\u5217\u5BB9\u5668\uFF0C\u8BF7\u52A0\u5165\u5143\u7D20") : childrenGroup.map(function (e, i) {
        return _react.default.createElement(_index.default, {
          parent: item,
          design: design,
          key: "PriviewItem".concat(i),
          form: form,
          item: e,
          store: store,
          required: e.required,
          children: (0, _mobx.toJS)(e.children),
          label: e.label,
          options: (0, _mobx.toJS)(e.options),
          optionRowShow: e.optionRowShow,
          fieldName: e.fieldName,
          a: []
        });
      })), design ? _react.default.createElement("div", {
        className: "operation-container",
        style: {
          width: iconContainerWidth
        }
      }, _react.default.createElement(_styled.CursorIcon, {
        type: "edit",
        onClick: this.edit
      }), _react.default.createElement(_divider.default, {
        type: "vertical"
      }), _react.default.createElement(_styled.CursorIcon, {
        type: "delete",
        onClick: this.delete
      })) : void 0, _react.default.createElement("div", {
        style: {
          clear: "both"
        }
      }))));
    }
  }]);
  return DragableCol;
}(_react.Component)) || _class) || _class);
exports.default = DragableCol;