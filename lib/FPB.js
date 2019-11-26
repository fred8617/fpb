"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ApolloFPB = void 0;

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

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _reactGridLayout = require("react-grid-layout");

var _react = _interopRequireWildcard(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _reactJsonView = _interopRequireDefault(require("react-json-view"));

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

var _reactHooks = require("@apollo/react-hooks");

var _CalText = _interopRequireDefault(require("./CalText"));

var _FullScreenModal = _interopRequireDefault(require("./FullScreenModal"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var linePadding = 5;
var ResponsiveGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

var FPB = function FPB(props) {
  var isInit = (0, _react.useRef)(false);
  var settingRef = (0, _react.useRef)();
  var breakpointFormRef = (0, _react.useRef)();
  var store = (0, _useFPBStore.default)(props);
  var localStore = (0, _mobxReactLite.useLocalStore)(function () {
    return {
      configVisible: false,
      setConfigVisible: function setConfigVisible(configVisible) {
        localStore.configVisible = configVisible;
      },
      mainWidth: 0,
      setMainWidth: function setMainWidth(width) {
        localStore.mainWidth = width;
      },
      settingWidth: 0,
      setSettingWidth: function setSettingWidth() {
        if (settingRef.current && settingRef.current.clientWidth) {
          localStore.settingWidth = settingRef.current && settingRef.current.clientWidth;
        }
      }
    };
  });
  (0, _react.useEffect)(function () {
    store.setBreakpointFromEntry(Object.keys(store.breakpoints), props.breakpointDiff);
  }, [props.breakpointDiff]);

  if (props.forwardRef) {
    props.forwardRef.current = store;
  }

  (0, _react.useEffect)(function () {
    (0, _utils.doWindowResize)();
  }, [store.layouts]);
  (0, _react.useEffect)(function () {
    /**
     * 初始化一下setting的宽度
     */
    var func = (0, _debounce2.default)(function () {
      return setTimeout(function () {
        return localStore.setSettingWidth();
      }, 0);
    }, 200);
    func();
    window.addEventListener('resize', func);
    return function () {
      window.removeEventListener('resize', func);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (!isInit.current) {
      isInit.current = true;

      if (props.defaultDatas) {
        store.setLayouts([], props.defaultDatas.layouts);
      }

      setTimeout(_utils.doWindowResize, props.renderDelay || 0);
    }

    if (props.defaultDatas) {
      if (props.FPR) {
        store.mode = _useFPBStore.Mode.PRIVIEW;
      }

      store.setDatas(props.defaultDatas.datas);
      store.setBreakpointFromEntry(props.defaultDatas.breakpoints, props.breakpointDiff); // store.setLayouts([] as any, props.defaultDatas.layouts);

      setTimeout(_utils.doWindowResize, props.renderDelay || 0); //模态框动画弹出需要加renderDelay
      // doWindowResize();
    }
  }, [props.defaultDatas, props.renderDelay]);
  (0, _react.useEffect)(function () {}, []);
  var _props$FPR = props.FPR,
      FPR = _props$FPR === void 0 ? false : _props$FPR;

  var FPRPart = _react.default.createElement(_FormContext.Provider, {
    value: {
      form: props.form
    }
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(ResponsiveGridLayout // compactType={'horizontal'}
    // useCSSTransforms={false}
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
        className: store.draggableCancelClassName,
        key: key
      }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return store.isDesign && _react.default.createElement(_ObservableBlockContainer.default, {
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

  var showPart = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_CalText.default, {
      width: localStore.mainWidth
    });
  }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_empty.default, {
      style: {
        display: store.hasLayout() ? 'none' : 'block'
      },
      description: '暂无元素'
    }), FPRPart);
  }));

  var builderPart = props.layout ? _react.default.createElement("div", {
    key: 'builder',
    style: {
      position: "relative"
    }
  }, props.layout(showPart)) : _react.default.createElement("div", {
    style: {
      position: "relative",
      paddingLeft: linePadding,
      paddingTop: linePadding,
      paddingRight: linePadding
    },
    key: 'builder'
  }, showPart);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement("style", null, store.draggableCancel ? "\n        .react-grid-item{\n          transition:none!important\n        }\n        .react-grid-layout{\n          transition:none!important\n        }\n        ".concat(store.draggableCancel ? ".react-grid-item > .react-resizable-handle{\n          display:none;\n        }" : null, "\n        ") : null);
  }), _react.default.createElement(_reactSplitPane.default, {
    className: "FPB",
    onChange: function onChange(e) {
      localStore.setSettingWidth();
      localStore.setMainWidth(e - (props.layout ? 0 : 10));
    },
    onDragFinished: _utils.doWindowResize,
    pane1Style: {
      overflow: "auto"
    },
    paneStyle: {
      position: "relative"
    },
    style: {
      position: 'relative'
    },
    defaultSize: props.contentDefaultSize || "50%",
    minSize: 479,
    maxSize: 1600
  }, builderPart, _react.default.createElement("div", {
    ref: settingRef,
    key: "setting",
    style: {
      background: "#fff",
      height: "100%",
      paddingLeft: linePadding
    }
  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_drawer.default, {
      destroyOnClose: true,
      title: store.editingTitle,
      placement: "right",
      width: "100%",
      closable: store.isEditing,
      onClose: function onClose(_) {
        return store.setEditingItem(null);
      },
      visible: store.isEditing,
      getContainer: false,
      style: {
        position: 'absolute',
        height: "100%"
      },
      drawerStyle: {
        height: "100%"
      },
      bodyStyle: {
        padding: 0,
        height: "calc( 100% - 54.6px )",
        overflow: "auto"
      }
    }, store.isEditing && _react.default.createElement(_ItemSettingForm.default, {
      parentStore: localStore,
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
      onClick: (0, _debounce2.default)(store.createItem, 50)
    }, "\u6DFB\u52A0\u5143\u7D20");
  })), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_button.default, {
      disabled: store.isPreview,
      onClick: function onClick(_) {
        return store.setBreakpointSettingVisible(true);
      }
    }, "\u65AD\u70B9\u8BBE\u7F6E");
  })), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
    onClick: function onClick(_) {
      return localStore.setConfigVisible(true);
    }
  }, "\u67E5\u770B\u914D\u7F6E")), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_radio.default.Group, {
      buttonStyle: "solid",
      onChange: store.changeMode,
      value: store.mode
    }, _react.default.createElement(_radio.default.Button, {
      value: _useFPBStore.Mode.DESIGN
    }, "\u8BBE\u8BA1"), _react.default.createElement(_radio.default.Button, {
      value: _useFPBStore.Mode.PRIVIEW
    }, "\u9884\u89C8"));
  })), props.renderActions && props.renderActions()))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
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

          store.setBreakpointConfig(values, props.breakpointDiff);
        });
      },
      onCancel: function onCancel(_) {
        return store.setBreakpointSettingVisible(false);
      }
    }, _react.default.createElement(_BreakpointForm.default, {
      ref: breakpointFormRef,
      initialData: store.breakpointsConfig
    }));
  }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_FullScreenModal.default, {
      footer: null,
      onCancel: function onCancel(_) {
        return localStore.setConfigVisible(false);
      },
      visible: localStore.configVisible
    }, _react.default.createElement(_reactJsonView.default, {
      collapsed: 1,
      indentWidth: 10,
      src: store.config
    }));
  }));
};

var FormFPB = _form.default.create({
  name: 'FPB'
})(FPB);

exports.default = FormFPB;

var ApolloFPB = function ApolloFPB(_ref3) {
  var client = _ref3.client,
      props = _objectWithoutProperties(_ref3, ["client"]);

  return _react.default.createElement(_reactHooks.ApolloProvider, {
    client: client
  }, _react.default.createElement(FormFPB, props));
};

exports.ApolloFPB = ApolloFPB;
//# sourceMappingURL=FPB.js.map