"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _immutable = require("immutable");

var _reactDnd = require("react-dnd");

var _mobxReact = require("mobx-react");

var _Context = require("../../../Context");

var _styled = require("../../../styled");

var _DropableRow = _interopRequireDefault(require("./DropableRow"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _dec, _dec2, _class;

var FormItem = _form.default.Item;
var PRIVIEW_ELEMENT = "PRIVIEW_ELEMENT";
var dropType = ["ELEMENT", PRIVIEW_ELEMENT];
var dragType = PRIVIEW_ELEMENT;

var ElementContainer = _styledComponents.default.div.withConfig({
  displayName: "PriviewItem__ElementContainer",
  componentId: "sc-1n3mh0d-0"
})(["float:left;"]);

var OperationContainer = _styledComponents.default.div.withConfig({
  displayName: "PriviewItem__OperationContainer",
  componentId: "sc-1n3mh0d-1"
})(["float:left;line-height:35px;"]); //放置目标处理集合


var target = {
  canDrop: function canDrop(props) {
    // //console.log(props,`props`);
    return true;
  },
  hover: function hover(props, monitor, component) {},
  drop: function drop(props, monitor, component) {
    var dragItem = monitor.getItem().item;
    var hoverItem = props.item,
        _props$store = props.store,
        createElement = _props$store.createElement,
        moveElement = _props$store.moveElement,
        setDownElement = _props$store.setDownElement,
        addColIntoRow = _props$store.addColIntoRow,
        data = props.parent;
    console.log("hover", dragItem, hoverItem);
    setDownElement(dragItem);

    if (dragItem.type == "col" && hoverItem.type == "col") {//console.log(`colcol`,dragItem,hoverItem);
    }

    if (dragItem.type == "col" && hoverItem.type == "row") {
      addColIntoRow(dragItem, hoverItem); ////console.log(`rowcol`,dragItem,hoverItem);

      return;
    }

    if (dragItem.type == "col" && hoverItem.type != "row") {
      //console.log(`col!row`,dragItem,hoverItem);
      return;
    }

    if (hoverItem.inCol) {
      return;
    }

    var dragIndex = data.indexOf(dragItem);
    var hoverIndex = data.indexOf(hoverItem);

    if (dragIndex === hoverIndex) {
      //console.log(`=`);
      return;
    }

    if (dragIndex === -1) {
      //console.log(`-1`);
      createElement(dragItem, hoverIndex);
      return;
    } // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    // Determine mouse position
    // const clientOffset = monitor.getClientOffset()
    // Get pixels to the top
    // if(!clientOffset){
    // 	return;
    // }
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    // 	return
    // }
    // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    // 	return
    // }
    // Time to actually perform the action


    moveElement(dragIndex, hoverIndex); // Note: we're mutating the monitor item here!
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
    //console.log(monitor.getItemType());
    return props;
  },
  endDrag: function endDrag(props) {//console.log(props);
  }
};
var CheckboxGroup = _checkbox.default.Group;
var RadioGroup = _radio.default.Group;
var Option = _select.default.Option;
var PriviewItem = (_dec = (0, _reactDnd.DropTarget)(dropType, target, function (connect, monitor) {
  return {
    dropItem: monitor.getItem(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset()
  };
}), _dec2 = (0, _reactDnd.DragSource)(dragType, source, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    monitor: monitor,
    connectDragPreview: connect.dragPreview(),
    dragItem: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset()
  };
}), _dec(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PriviewItem, _Component);

  function PriviewItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PriviewItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PriviewItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.getFormItem = function (item, props, index) {
      //根据元素类型获取控件
      var type = item.type;
      var connectDropTarget = _this.props.connectDropTarget;

      if (type === "input") {
        return _react.default.createElement(_input.default, props);
      } else if (type === "inputNumber") {
        return _react.default.createElement(_inputNumber.default, props);
      } else if (type === "checkbox") {
        return _react.default.createElement(_checkbox.default, props);
      } else if (type === "checkboxGroup") {
        return _react.default.createElement(CheckboxGroup, (0, _extends2.default)({}, props, {
          style: {
            width: "100%",
            lineHeight: "32px",
            position: "relative",
            top: 5
          }
        }), _react.default.createElement(_row.default, null, item.options.map(function (e, i) {
          return _react.default.createElement(_col.default, {
            key: i,
            title: e.label,
            span: 24 / item.optionRowShow,
            style: {
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }
          }, _react.default.createElement(_checkbox.default, {
            value: e.value
          }, e.label));
        })));
      } else if (type === "radio") {
        return _react.default.createElement(RadioGroup, (0, _extends2.default)({}, props, {
          style: {
            width: "100%",
            lineHeight: "32px",
            position: "relative",
            top: 5
          }
        }), _react.default.createElement(_row.default, null, item.options.map(function (e, i) {
          return _react.default.createElement(_col.default, {
            key: i,
            title: e.label,
            span: 24 / item.optionRowShow,
            style: {
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }
          }, _react.default.createElement(_radio.default, {
            value: e.value
          }, e.label));
        })));
      } else if (type == "select") {
        return _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: 120
          }
        }, props), item.options.map(function (e, i) {
          return _react.default.createElement(Option, {
            key: i,
            value: e.value
          }, e.label);
        }));
      }
    };

    _this.edit = function () {
      _this.props.store.editingShow(_this.props.item);
    };

    _this.delete = function () {
      _this.props.store.deleteItem(_this.props.item);
    };

    return _this;
  }

  (0, _createClass2.default)(PriviewItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // console.log(nextProps.form.getFieldError(nextProps.item.fieldName));
      return this.props.store.editField === nextProps.item.fieldName || this.props.item !== nextProps.item || this.props.isDragging !== nextProps.isDragging || this.props.isOver !== nextProps.isOver || this.props.clientOffset !== nextProps.clientOffset || this.props.sourceClientOffset !== nextProps.sourceClientOffset || this.props.initialClientOffset !== nextProps.initialClientOffset || this.props.design !== nextProps.design || this.props.required !== nextProps.required || this.props.label !== nextProps.label || this.props.fieldName !== nextProps.fieldName || this.props.optionRowShow !== nextProps.optionRowShow || this.props.isDragging !== nextProps.isDragging || JSON.stringify(this.props.options) != JSON.stringify(nextProps.options) || JSON.stringify(this.props.children) != JSON.stringify(nextProps.children) || nextProps.form.getFieldError(nextProps.item.fieldName) // ||(this.props.item.fieldName!==nextProps.item.fieldName)
      ;
    }
  }, {
    key: "render",
    value: function render() {
      //console.log(`PriviewItem render`);
      var _this$props = this.props,
          store = _this$props.store,
          item = _this$props.item,
          _this$props$item = _this$props.item,
          name = _this$props$item.name,
          type = _this$props$item.type,
          children = _this$props$item.children,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragSource = _this$props.connectDragSource,
          isDragging = _this$props.isDragging,
          isOver = _this$props.isOver,
          defaultValues = _this$props.defaultValues,
          form = _this$props.form,
          _this$props$form = _this$props.form,
          getFieldProps = _this$props$form.getFieldProps,
          getFieldDecorator = _this$props$form.getFieldDecorator,
          design = _this$props.design,
          dragItem = _this$props.dragItem,
          clientOffset = _this$props.clientOffset,
          sourceClientOffset = _this$props.sourceClientOffset,
          initialClientOffset = _this$props.initialClientOffset;
      console.log(dragItem, item); // console.log(clientOffset,
      // sourceClientOffset,
      // initialClientOffset);

      var borderStyle;
      var backStyle;

      if (isDragging) {
        backStyle = {
          background: "#1890ff"
        };
      }

      if (isOver) {
        var dir = clientOffset && sourceClientOffset && initialClientOffset && store.dragDirection(initialClientOffset, clientOffset, sourceClientOffset);
        borderStyle = dir && (0, _defineProperty2.default)({}, "border".concat(dir), "2px dashed #1890ff");
      }

      var labelStyle = {
        // cursor:design?`move`:null,
        display: "inline-block"
      };
      var formItemLayout = {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        }
      };
      var iconContainerWidth = 70;
      var moveContainerWidth = 25;
      var mainMargin = 10;
      var elementContainerStyle = {
        margin: design ? "0 ".concat(mainMargin, "px") : null,
        width: design ? "calc( 100% - ".concat(iconContainerWidth + moveContainerWidth + mainMargin * 2, "px )") : "100%"
      };
      return connectDragSource && connectDropTarget && connectDropTarget(_react.default.createElement("div", {
        style: (0, _objectSpread2.default)({}, backStyle, borderStyle)
      }, design && type != 'row' && store.simple && connectDragSource(_react.default.createElement("div", {
        style: {
          float: "left",
          lineHeight: "35px",
          fontSize: "25px",
          color: "#999"
        }
      }, _react.default.createElement(_icon.default, {
        style: {
          cursor: "move"
        },
        type: "drag"
      }))), _react.default.createElement(ElementContainer, {
        style: elementContainerStyle
      }, _react.default.createElement("style", null, "\n\t\t\t\t\t\t\t.ant-form-item-no-colon .ant-form-item-label label:after{\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t.editor{\n\t\t\t\t\t\t\t\theight:200px;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t.editor-main{\n\t\t\t\t\t\t\t\theight:100px\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t.ant-drawer-content-wrapper{\n\t\t\t\t\t\t\t\toverflow:auto\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t"), type == 'row' ? store.simple ? _react.default.createElement("span", null) : _react.default.createElement(_DropableRow.default, {
        form: form,
        design: design,
        childrenGroup: children,
        store: store,
        item: item
      }) : _react.default.createElement(FormItem, (0, _extends2.default)({}, formItemLayout, {
        colon: true,
        label: _react.default.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: item.label
          },
          style: labelStyle
        })
      }), _react.default.createElement(_row.default, {
        gutter: 5
      }, _react.default.createElement(_col.default, {
        span: 24
      }, getFieldDecorator(item.fieldName || 'invalidField', {
        initialValue: defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues[item.fieldName],
        rules: [{
          required: item.required,
          message: item.requiredMessage
        }]
      })(this.getFormItem(item, {})))))), design ? type == 'row' && store.simple ? _react.default.createElement("span", null) : _react.default.createElement(OperationContainer, {
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
      })));
    }
  }]);
  return PriviewItem;
}(_react.Component)) || _class) || _class);
exports.default = PriviewItem;