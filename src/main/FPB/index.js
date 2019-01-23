"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/popover/style");

var _popover = _interopRequireDefault(require("antd/es/popover"));

require("antd/es/empty/style");

var _empty = _interopRequireDefault(require("antd/es/empty"));

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _mobx = require("mobx");

var _mobxReact = require("mobx-react");

var _reactGridLayout = _interopRequireWildcard(require("react-grid-layout"));

require("react-grid-layout/css/styles.css");

require("react-resizable/css/styles.css");

require("./index.less");

var _lodash = _interopRequireDefault(require("lodash"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _Store = _interopRequireDefault(require("../Store"));

var _SliderInputNumber = _interopRequireDefault(require("./FormComponent/SliderInputNumber"));

var _NumberComponent = _interopRequireDefault(require("./FormComponent/NumberComponent"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _dec, _class;

var Item = _form.default.Item,
    create = _form.default.create;
var ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
var ReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.default);
var store = new _Store.default();

var Block = _styledComponents.default.div.withConfig({
  displayName: "FPB__Block",
  componentId: "nluzrd-0"
})(["box-sizing:border-box;overflow:hidden;position:relative;"]);

var ToolSpan = _styledComponents.default.span.withConfig({
  displayName: "FPB__ToolSpan",
  componentId: "nluzrd-1"
})(["margin-right:7px;"]);

var DevelopShadowContainer = _styledComponents.default.div.withConfig({
  displayName: "FPB__DevelopShadowContainer",
  componentId: "nluzrd-2"
})(["border:", ";cursor:pointer;width:100%;height:", ";position:absolute;left:0;top:0;transition:all 0.3s;:hover{background:rgba(0,0,0,0.3);}", ""], function (_ref) {
  var mode = _ref.mode,
      editing = _ref.editing;
  return mode == "develop" && !editing ? '1px dashed #d9d9d9' : null;
}, function (_ref2) {
  var mode = _ref2.mode;
  return mode == "develop" ? "100%" : 0;
}, ''
/* z-index: 1; */
);

var RadioButton = _radio.default.Button;
var RadioGroup = _radio.default.Group;
var Option = _select.default.Option,
    OptGroup = _select.default.OptGroup;
var GRID_HEIGHT = 'gridHeight'; //格子单位高度

var GRID_WIDTH = 'gridWidth'; //格子单位宽度

var COLS = 'cols'; //格子单位宽度

var DEFAULT_GRID_HEIGHT = 32; //默认单位高度

var DEFAULT_GRID_WIDTH = 10; //默认单位宽度

var MARGIN_LR = "marginLR"; //左右间距

var DEFAULT_MARGIN_LR = 10; //默认左右间距

var MARGIN_TB = "marginTB"; //上下间距

var DEFAULT_MARGIN_TB = 10; //默认上下间距

var DEFAULT_COLS = 12; //默认栅格数量

var SETTING_DRAWER_WIDTH = 512; //布局抽屉宽度

var CONTAINER_TYPE = "containerType";
var CONTAINER_HEIGHT = "containerHeight";
var DEFAULT_CONTAINER_TYPE = 0;
var DEFAULT_CONTAINER_HEIGHT = [null, null];
var DRAWER_MASK_STYLE = {
  background: "transparent"
}; //抽屉遮罩样式

function generateLayout() {
  return _lodash.default.map(_lodash.default.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _lodash.default.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

var FPB = (_dec = create(), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FPB, _React$Component);

  // static defaultProps = {
  //   className: "layout",
  //   items: 20,
  //   rowHeight: 30,
  //   onLayoutChange: function() {},
  //   cols: 12
  // };
  function FPB(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FPB);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FPB).call(this, props));
    _this.layoutRef = _react.default.createRef();
    _this.toolRef = _react.default.createRef();

    _this.resize = function () {
      setTimeout((0, _debounce.default)(_this.resizeEvent, 200), 200);
    };

    _this.resizeEvent = function () {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    };

    var layout = _this.generateLayout();

    _this.state = {
      layout: layout
    };
    return _this;
  }

  (0, _createClass2.default)(FPB, [{
    key: "generateLayout",
    value: function generateLayout() {
      var p = this.props;
      return _lodash.default.map(new Array(p.items), function (item, i) {
        var y = _lodash.default.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
        return {// x: (i * 2) % 12,
          // y: Math.floor(i / 6) * y,
          // w: 2,
          // h: y,
          // i: i.toString()
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", function () {
        return console.log("resize");
      });
      store.setDefaultLeft(this.toolRef.current.clientWidth - 18);
    }
  }, {
    key: "onLayoutChange",
    value: function onLayoutChange(layout) {
      console.log("onLayoutChange", layout);
      store.setLayoutData(layout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$form = this.props.form,
          getFieldsValue = _this$props$form.getFieldsValue,
          getFieldDecorator = _this$props$form.getFieldDecorator;

      var _getFieldsValue = getFieldsValue(),
          _getFieldsValue$gridH = _getFieldsValue.gridHeight,
          gridHeight = _getFieldsValue$gridH === void 0 ? DEFAULT_GRID_HEIGHT : _getFieldsValue$gridH,
          _getFieldsValue$margi = _getFieldsValue.marginLR,
          marginLR = _getFieldsValue$margi === void 0 ? DEFAULT_MARGIN_LR : _getFieldsValue$margi,
          _getFieldsValue$margi2 = _getFieldsValue.marginTB,
          marginTB = _getFieldsValue$margi2 === void 0 ? DEFAULT_MARGIN_TB : _getFieldsValue$margi2,
          _getFieldsValue$cols = _getFieldsValue.cols,
          cols = _getFieldsValue$cols === void 0 ? DEFAULT_COLS : _getFieldsValue$cols,
          _getFieldsValue$conta = _getFieldsValue.containerType,
          containerType = _getFieldsValue$conta === void 0 ? DEFAULT_CONTAINER_TYPE : _getFieldsValue$conta,
          _getFieldsValue$conta2 = _getFieldsValue.containerHeight,
          containerHeight = _getFieldsValue$conta2 === void 0 ? DEFAULT_CONTAINER_HEIGHT : _getFieldsValue$conta2;

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_mobxReact.Observer, null, function () {
        var showSettingDrawer = store.showSettingDrawer,
            addItem = store.addItem,
            addDisabled = store.addDisabled,
            toggleTool = store.toggleTool;
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_mobxReact.Observer, null, function () {
          var toolLeft = store.toolLeft;
          return _react.default.createElement("div", {
            ref: _this2.toolRef,
            className: "FPB-tool",
            style: {
              left: toolLeft
            }
          }, _react.default.createElement(_button.default, {
            onClick: showSettingDrawer,
            icon: "setting",
            shape: "circle",
            type: "primary"
          }), _react.default.createElement(_divider.default, {
            type: "vertical"
          }), _react.default.createElement(_button.default, {
            onClick: addItem,
            disabled: addDisabled,
            icon: "plus",
            shape: "circle",
            type: "primary"
          }), _react.default.createElement(_divider.default, {
            type: "vertical"
          }), _react.default.createElement(ToolSpan, null, "\u6A21\u5F0F:"), _react.default.createElement(_mobxReact.Observer, null, function () {
            var mode = store.mode,
                setMode = store.setMode;
            return _react.default.createElement(RadioGroup, {
              value: mode,
              onChange: setMode
            }, _react.default.createElement(RadioButton, {
              value: "develop"
            }, "\u5F00\u53D1"), _react.default.createElement(RadioButton, {
              value: "priview"
            }, "\u9884\u89C8"));
          }), _react.default.createElement(_divider.default, {
            type: "vertical"
          }), _react.default.createElement(ToolSpan, null, "\u78B0\u649E:"), _react.default.createElement(_mobxReact.Observer, null, function () {
            var compact = store.compact,
                setCompact = store.setCompact;
            return _react.default.createElement(RadioGroup, {
              value: compact,
              onChange: setCompact
            }, _react.default.createElement(RadioButton, {
              value: "vertical"
            }, "\u7EB5\u5411"), _react.default.createElement(RadioButton, {
              value: "horizontal"
            }, "\u6A2A\u5411"), _react.default.createElement(RadioButton, {
              value: "none"
            }, "\u65E0"));
          }), _react.default.createElement(_divider.default, {
            type: "vertical"
          }), _react.default.createElement(_mobxReact.Observer, null, function () {
            var toolIcon = store.toolIcon;
            return _react.default.createElement(_icon.default, {
              className: "FPB-tool-icon",
              type: toolIcon,
              onClick: toggleTool
            });
          }));
        }), _react.default.createElement(_mobxReact.Observer, null, function () {
          var settingDrawerVisible = store.settingDrawerVisible,
              hideSettingDrawer = store.hideSettingDrawer,
              minCol = store.minCol,
              layoutDrawerPlacement = store.layoutDrawerPlacement,
              layoutDrawerPlacementChange = store.layoutDrawerPlacementChange,
              drawerBodyStyle = store.drawerBodyStyle;
          return _react.default.createElement(_drawer.default, {
            placement: layoutDrawerPlacement,
            width: SETTING_DRAWER_WIDTH,
            maskStyle: DRAWER_MASK_STYLE,
            bodyStyle: drawerBodyStyle,
            title: _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", null, "\u5E03\u5C40\u8BBE\u7F6E"), _react.default.createElement(RadioGroup, {
              value: layoutDrawerPlacement,
              onChange: layoutDrawerPlacementChange
            }, _react.default.createElement(RadioButton, {
              value: "top"
            }, "\u4E0A"), _react.default.createElement(RadioButton, {
              value: "right"
            }, "\u53F3"), _react.default.createElement(RadioButton, {
              value: "bottom"
            }, "\u4E0B"), _react.default.createElement(RadioButton, {
              value: "left"
            }, "\u5DE6"))),
            onClose: hideSettingDrawer,
            visible: settingDrawerVisible
          }, _react.default.createElement(_divider.default, null, "\u5143\u7D20"), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u5355\u4F4D\u9AD8\u5EA6(px)"
          }, getFieldDecorator(GRID_HEIGHT, {
            initialValue: DEFAULT_GRID_HEIGHT
          })(_react.default.createElement(_SliderInputNumber.default, {
            min: 1,
            max: 100
          })))), _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u5DE6\u53F3\u95F4\u8DDD"
          }, getFieldDecorator(MARGIN_LR, {
            initialValue: DEFAULT_MARGIN_LR
          })(_react.default.createElement(_SliderInputNumber.default, {
            min: 0
          }))))), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u4E0A\u4E0B\u95F4\u8DDD"
          }, getFieldDecorator(MARGIN_TB, {
            initialValue: DEFAULT_MARGIN_TB
          })(_react.default.createElement(_SliderInputNumber.default, {
            min: 0
          })))), _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u6805\u683C\u6570\u91CF"
          }, getFieldDecorator(COLS, {
            initialValue: DEFAULT_COLS
          })(_react.default.createElement(_SliderInputNumber.default, {
            min: minCol
          }))))), _react.default.createElement(_divider.default, null, "\u5BB9\u5668"), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u7C7B\u578B"
          }, getFieldDecorator(CONTAINER_TYPE, {
            initialValue: DEFAULT_CONTAINER_TYPE
          })(_react.default.createElement(_select.default, {
            style: {
              width: 100
            }
          }, _react.default.createElement(Option, {
            value: 0
          }, "\u81EA\u5B9A\u4E49"), _react.default.createElement(Option, {
            value: 1
          }, "\u79FB\u52A8\u7AEF"))))), containerType === 0 ? _react.default.createElement(_col.default, {
            span: 12
          }, _react.default.createElement(Item, {
            label: "\u9AD8\u5EA6"
          }, getFieldDecorator(CONTAINER_HEIGHT, {
            initialValue: DEFAULT_CONTAINER_HEIGHT
          })(_react.default.createElement(_NumberComponent.default, null)))) : void 0));
        }));
      }), _react.default.createElement(_mobxReact.Observer, null, function () {
        var layout = store.layout,
            layoutData = store.layoutData,
            mode = store.mode,
            isResizable = store.isResizable,
            isDraggable = store.isDraggable,
            deleteItem = store.deleteItem,
            isEditing = store.isEditing,
            editingItem = store.editingItem,
            showItemSettingDrawer = store.showItemSettingDrawer,
            compact = store.compact,
            preventCollision = store.preventCollision;
        return _react.default.createElement("div", {
          className: "FPB-container",
          style: {
            width: "100%",
            height: containerHeight[1] && containerHeight[0] && "".concat(containerHeight[1]).concat(containerHeight[0])
          }
        }, layout.length === 0 ? _react.default.createElement(_empty.default, null) : _react.default.createElement(ReactGridLayout, (0, _extends2.default)({}, _this2.props, {
          ref: _this2.layoutRef,
          isDraggable: isDraggable,
          isResizable: isResizable,
          layout: (0, _mobx.toJS)(layoutData),
          onLayoutChange: _this2.onLayoutChange,
          measureBeforeMount: false,
          margin: [marginLR, marginTB],
          rowHeight: gridHeight,
          cols: cols,
          useCSSTransforms: _this2.state.mounted,
          compactType: compact,
          preventCollision: preventCollision,
          onDragStop: _this2.resize,
          onResizeStop: _this2.resize
        }), layout.map(function (e, i) {
          var ComponentClass = e.ComponentClass;
          return _react.default.createElement(Block, {
            "data-grid": e,
            key: e.i
          }, _react.default.createElement(_popover.default, {
            trigger: "contextMenu",
            content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_button.default, {
              icon: "edit",
              type: "primary",
              onClick: function onClick(_) {
                return showItemSettingDrawer(e);
              }
            }), _react.default.createElement(_divider.default, {
              type: "vertical"
            }), _react.default.createElement(_button.default, {
              icon: "delete",
              type: "danger",
              onClick: function onClick(_) {
                return deleteItem(e);
              }
            }))
          }, _react.default.createElement(Item // label="元素类型"
          , null, ComponentClass && _react.default.createElement(ComponentClass, null)), _react.default.createElement(DevelopShadowContainer, {
            mode: mode,
            editing: editingItem && editingItem !== e
          })));
        })));
      }), _react.default.createElement(_mobxReact.Observer, null, function () {
        var _React$createElement;

        var itemSettingDrawerVisible = store.itemSettingDrawerVisible,
            hideItemSettingDrawer = store.hideItemSettingDrawer,
            editingItem = store.editingItem,
            layoutDrawerPlacement = store.layoutDrawerPlacement,
            drawerBodyStyle = store.drawerBodyStyle,
            layoutDrawerPlacementChange = store.layoutDrawerPlacementChange,
            formElements = store.formElements,
            itemTypeChange = store.itemTypeChange;
        return _react.default.createElement(_drawer.default, (_React$createElement = {
          placement: layoutDrawerPlacement,
          width: SETTING_DRAWER_WIDTH,
          maskStyle: DRAWER_MASK_STYLE,
          bodyStyle: drawerBodyStyle,
          title: _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", null, "\u5E03\u5C40\u8BBE\u7F6E"), _react.default.createElement(RadioGroup, {
            value: layoutDrawerPlacement,
            onChange: layoutDrawerPlacementChange
          }, _react.default.createElement(RadioButton, {
            value: "top"
          }, "\u4E0A"), _react.default.createElement(RadioButton, {
            value: "right"
          }, "\u53F3"), _react.default.createElement(RadioButton, {
            value: "bottom"
          }, "\u4E0B"), _react.default.createElement(RadioButton, {
            value: "left"
          }, "\u5DE6"))),
          visible: itemSettingDrawerVisible
        }, (0, _defineProperty2.default)(_React$createElement, "title", "\u5143\u7D20\u8BBE\u7F6E"), (0, _defineProperty2.default)(_React$createElement, "onClose", hideItemSettingDrawer), _React$createElement), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
          span: 12
        }, _react.default.createElement(Item, {
          label: "\u5143\u7D20\u7C7B\u578B"
        }, _react.default.createElement(_select.default, {
          onChange: itemTypeChange,
          value: editingItem === null || editingItem === void 0 ? void 0 : editingItem.type,
          style: {
            width: "100%"
          }
        }, _react.default.createElement(Option, {
          value: 'blank'
        }, "\u7A7A\u767D\u5360\u4F4D"), _react.default.createElement(OptGroup, {
          label: "\u8868\u5355\u5143\u7D20"
        }, formElements.map(function (_ref3, i) {
          var name = _ref3.name,
              value = _ref3.value;
          return _react.default.createElement(Option, {
            value: value,
            key: "ele".concat(i)
          }, name);
        })), _react.default.createElement(OptGroup, {
          label: "\u5E03\u5C40\u5143\u7D20"
        }, _react.default.createElement(Option, {
          value: "divider"
        }, "\u5206\u5272\u7EBF"))))), _react.default.createElement(_col.default, {
          span: 12
        })));
      }));
    }
  }]);
  return FPB;
}(_react.default.Component)) || _class);
exports.default = FPB;