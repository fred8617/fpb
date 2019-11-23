"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/alert/style/css");

var _alert = _interopRequireDefault(require("antd/lib/alert"));

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

var _Block = _interopRequireDefault(require("./Block"));

var _mobx = require("mobx");

var _FormConsumerComponent = _interopRequireDefault(require("./FormConsumerComponent"));

var _FPB = _interopRequireDefault(require("./FPB"));

var _ErrorWrapper = _interopRequireDefault(require("./ErrorWrapper"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getComponent = function getComponent(props) {
  var store = props.store;
  var item = props.store.datas[props.i];
  var Component = item.Component,
      componentProps = item.componentProps,
      componentId = item.componentId,
      isFormField = item.isFormField;
  var isEditing = store.editingItem === item;
  var component = store.flatComponents[componentId]; // const component = store.flatComponents[componentId];

  var _toJS = (0, _mobx.toJS)(componentProps || {}, {
    recurseEverything: true
  }),
      children = _toJS.children,
      rest = _objectWithoutProperties(_toJS, ["children"]);

  var finalComponentProps = _objectSpread({}, rest);

  if (isFormField) {
    delete finalComponentProps.defaultValue;
    delete finalComponentProps.value;
  } // component.componentProps&&findRequiredRules(component.componentProps);

  /**
   *
   * @param comp 组件类型
   * @param chil 表单中的子元素部分
   */


  var renderComponentChildren = function renderComponentChildren() {
    var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : component;
    var chil = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : children;

    // console.log(toJS(children));
    //debugger;
    // //debugger
    if (comp.componentProps && //组件含有属性
    comp.componentProps.children && //组件属性中包含子元素
    comp.componentProps.children.type === 'array:component' //子元素为数组
    ) {
        // if(comp.componentProps.children.shouldHaveOne){
        //   //debugger
        //   chil.push({})
        // }
        // console.log('child');
        return chil.map(function (child, i) {
          var Comp = comp.componentProps.children.Component; //获取子组件组件类型

          var _ref = (0, _mobx.toJS)(child.componentProps, {
            recurseEverything: true
          }) || {},
              children = _ref.children,
              rest = _objectWithoutProperties(_ref, ["children"]);

          var requiredRules = (0, _utils.findRequiredRules)(comp.componentProps.children.componentProps);

          if (requiredRules.find(function (rule) {
            return !rest[rule];
          })) {
            return _react.default.createElement(_alert.default, {
              key: "chil".concat(i),
              message: "\u63D0\u793A",
              description: "\u5C5E\u6027\u4E0D\u5168\u8BF7\u8865\u9F50",
              type: "warning",
              showIcon: true
            });
          }

          return _react.default.createElement(Comp, _extends({
            key: "chil".concat(i)
          }, rest), children && renderComponentChildren(comp.componentProps.children, children));
        });
      } else if (comp.componentProps && //组件含有属性
    comp.componentProps.children && //组件属性中包含子元素
    comp.componentProps.children.type === 'FPR' //子元素为数组
    ) {
        // console.log('renderfpr');
        var Comp = _react.default.createElement(_mobxReactLite.Observer, null, function () {
          return _react.default.createElement(_FPB.default, {
            components: props.components,
            FPR: true,
            defaultDatas: chil
          });
        });

        return Comp; //组件含有属性 //组件属性中包含子元素
      } else {
      return chil;
    }
  };

  return Component && ( //存在Component并且
  !component.componentProps || //没有属性或者
  !component.componentProps.children || //有属性没有子元素或者
  !component.componentProps.children.shouldHaveOne || //或者有子元素不需要默认创建
  component.componentProps.children && //有子元素并且需要有默认元素并且类型还是数组的需要长度大于0
  component.componentProps.children.shouldHaveOne && component.componentProps.children.type === 'array:component' && children && children.length) && _react.default.createElement(_ErrorWrapper.default, null, function (props) {
    // console.log('rule',component.componentProps);
    var requiredRules = (0, _utils.findRequiredRules)(component.componentProps);

    if (requiredRules.find(function (rule) {
      return !finalComponentProps[rule];
    })) {
      return _react.default.createElement(_alert.default, {
        message: "\u63D0\u793A",
        description: "\u5C5E\u6027\u4E0D\u5168\u8BF7\u8865\u9F50",
        type: "warning",
        showIcon: true
      });
    }

    return _react.default.createElement(Component, _extends({}, finalComponentProps, props), children && renderComponentChildren());
  });
};
/**
 * 观察者区块
 * @param props @interface ObservableBlockProps
 */


var ObservableBlock = _react.default.memo(function (props) {
  // useEffect(() => {
  //   console.log("mounted");
  // }, []);
  var store = props.store;
  var finalComponent = getComponent(props);
  return _react.default.createElement(_mobxReactLite.Observer, null, function () {
    var item = props.store.datas[props.i];
    return _react.default.createElement(_Block.default, {
      showTag: !store.isPreview,
      autoHeight: item.autoHeight,
      height: props.store.operatedItem && props.store.operatedItem.i === props.i ? props.store.operatedItem.h : props.store.getItemHeight(props.i),
      breakpoint: props.store.breakpoint,
      onParentHeightChange: function onParentHeightChange(height) {
        props.store.caclHeight(height, props.i);
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var renderedComponent;

      if (!store.isPreview) {
        finalComponent = getComponent(props);
      }

      if (item.isFormField && finalComponent) {
        renderedComponent = _react.default.createElement(_FormConsumerComponent.default, {
          item: item,
          component: finalComponent
        }); //
      } else {
        renderedComponent = finalComponent;
      }

      return _react.default.createElement(_react.default.Fragment, null, renderedComponent);
    }));
  });
});

var _default = ObservableBlock;
exports.default = _default;
//# sourceMappingURL=ObservableBlock.js.map