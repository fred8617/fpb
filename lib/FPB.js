"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/radio/style/css");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/drawer/style/css");

var _drawer = _interopRequireDefault(require("antd/lib/drawer"));

require("antd/lib/empty/style/css");

var _empty = _interopRequireDefault(require("antd/lib/empty"));

var _reactGridLayout = require("react-grid-layout");

var _react = _interopRequireWildcard(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _utils = require("./utils");

require("react-grid-layout/css/styles.css");

require("react-resizable/css/styles.css");

var _reactSplitPane = _interopRequireDefault(require("react-split-pane"));

var _ItemSettingForm = _interopRequireDefault(require("./ItemSettingForm"));

var _ObservableBlock = _interopRequireDefault(require("./ObservableBlock"));

var _ObservableBlockContainer = _interopRequireDefault(require("./ObservableBlockContainer"));

var _FormContext = require("./FormContext");

var _BreakpointForm = _interopRequireDefault(require("./BreakpointForm"));

var _useFPBStore = _interopRequireWildcard(require("./useFPBStore"));

var _mobx = require("mobx");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ResponsiveGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

var FPB = _react.default.memo(function (props) {
  var breakpointFormRef = (0, _react.useRef)();
  var store = (0, _useFPBStore.default)(props);

  if (props.forwardRef) {
    props.forwardRef.current = store;
  }

  (0, _react.useEffect)(function () {
    if (props.defaultDatas) {
      if (props.FPR) {
        store.mode = _useFPBStore.Mode.PRIVIEW;
      }

      store.setDatas(props.defaultDatas.datas);
      store.setBreakpointFromEntry(props.defaultDatas.breakpoints);
      store.setLayouts([], props.defaultDatas.layouts); //模态框动画弹出需要加renderDelay

      setTimeout(_utils.doWindowResize, props.renderDelay || 0); // doWindowResize();
    }
  }, [props.defaultDatas]);
  console.log('render', store);
  var _props$FPR = props.FPR,
      FPR = _props$FPR === void 0 ? false : _props$FPR;

  var FPRPart = _react.default.createElement(_FormContext.Provider, {
    value: {
      form: props.form
    }
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(ResponsiveGridLayout // useCSSTransforms={false}
    , _extends({
      style: {
        display: !store.hasLayout() ? 'none' : 'block'
      },
      className: "layout"
    }, store.jsConfig), Object.entries(store.datas).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          data = _ref2[1];

      return _react.default.createElement("div", {
        key: key
      }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return store.mode === _useFPBStore.Mode.DESIGN && _react.default.createElement(_ObservableBlockContainer.default, {
          store: store,
          itemKey: key,
          data: data
        });
      }), _react.default.createElement(_ObservableBlock.default, {
        store: store,
        i: key,
        components: props.components
      }));
    }));
  }));

  if (FPR) {
    return FPRPart;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement("style", null, store.isPreview ? "\n        .react-grid-item{\n          transition:none!important\n        }\n        .react-grid-layout{\n          transition:none!important\n        }\n        " : null);
  }), _react.default.createElement(_reactSplitPane.default, {
    className: "FPB",
    onDragFinished: _utils.doWindowResize,
    paneStyle: {
      position: "relative"
    },
    style: {
      position: 'relative'
    },
    defaultSize: props.contentDefaultSize || "50%",
    minSize: 479,
    maxSize: 1600
  }, _react.default.createElement("div", {
    style: {
      position: "relative"
    },
    key: 'builder'
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_empty.default, {
      style: {
        display: store.hasLayout() ? 'none' : 'block'
      },
      description: '暂无元素'
    }), FPRPart);
  })), _react.default.createElement("div", {
    key: "setting"
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_drawer.default, {
      destroyOnClose: true,
      title: store.editingItem && store.editingItem.i,
      placement: "right",
      width: "100%",
      closable: store.isEditing,
      onClose: function onClose(_) {
        return store.setEditingItem(null);
      },
      visible: store.isEditing,
      getContainer: false,
      style: {
        position: 'absolute'
      },
      bodyStyle: {
        padding: 0,
        height: "calc( 100% - 54.6px )",
        overflow: "auto"
      }
    }, store.isEditing && _react.default.createElement(_ItemSettingForm.default, {
      initialKeyCounter: store.editingItem && (0, _utils.getObjectKeysWhenIsArray)((0, _mobx.toJS)(store.editingItem.componentProps, {
        recurseEverything: true
      }) || {}, 'componentProps') || {},
      components: props.components,
      item: store.editingItem,
      onItemTypeChange: store.onItemTypeChange,
      onItemPropsChange: store.onItemPropsChange,
      componentGroup: store.componentGroup,
      flatComponents: store.flatComponents
    }));
  }), _react.default.createElement(_form.default, {
    layout: "inline"
  }, _react.default.createElement(_form.default.Item, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_button.default, {
      type: "primary",
      icon: "plus",
      disabled: store.isPreview,
      onClick: store.createItem
    }, "\u6DFB\u52A0\u5143\u7D20");
  })), _react.default.createElement(_form.default.Item, {
    label: "\u65AD\u70B9"
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_button.default, {
      disabled: store.isPreview,
      onClick: function onClick(_) {
        return store.setBreakpointSettingVisible(true);
      }
    }, "\u65AD\u70B9");
  })), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
    onClick: function onClick(_) {
      return console.log(JSON.stringify(store.config));
    }
  }, "\u83B7\u53D6\u914D\u7F6E")), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_radio.default.Group, {
      buttonStyle: "solid",
      onChange: store.changeMode,
      value: store.mode
    }, _react.default.createElement(_radio.default.Button, {
      value: _useFPBStore.Mode.DESIGN
    }, "\u8BBE\u8BA1"), _react.default.createElement(_radio.default.Button, {
      value: _useFPBStore.Mode.PRIVIEW
    }, "\u9884\u89C8"));
  }))))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_modal.default, {
      centered: true,
      destroyOnClose: true,
      maskClosable: false,
      title: '设置断点',
      visible: store.breakpointSettingVisible,
      onOk: function onOk(_) {
        return breakpointFormRef.current.validateFieldsAndScroll(function (err, values) {
          if (err) {
            return;
          }

          store.setBreakpointConfig(values);
        });
      },
      onCancel: function onCancel(_) {
        return store.setBreakpointSettingVisible(false);
      }
    }, _react.default.createElement(_BreakpointForm.default, {
      ref: breakpointFormRef,
      initialData: store.breakpointsConfig
    }));
  }));
});

var FormFPB = _form.default.create({
  name: 'FPB'
})(FPB);

exports.default = FormFPB;