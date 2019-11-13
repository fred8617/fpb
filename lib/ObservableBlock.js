"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("antd/lib/alert/style/css");var _alert=_interopRequireDefault(require("antd/lib/alert")),_react=_interopRequireDefault(require("react")),_mobxReactLite=require("mobx-react-lite"),_Block=_interopRequireDefault(require("./Block")),_mobx=require("mobx"),_FormConsumerComponent=_interopRequireDefault(require("./FormConsumerComponent")),_FPB=_interopRequireDefault(require("./FPB")),_ErrorWrapper=_interopRequireDefault(require("./ErrorWrapper")),_utils=require("./utils");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}/**
 * 观察者区块
 * @param props @interface ObservableBlockProps
 */var ObservableBlock=_react.default.memo(function(a){// useEffect(() => {
//   console.log("mounted");
// }, []);
var b=a.store,c=function(){var c=a.store.datas[a.i],d=c.Component,e=c.componentProps,f=c.componentId,g=c.isFormField,h=b.flatComponents[f],i=(0,_mobx.toJS)(e||{},{recurseEverything:!0}),j=i.children,k=_objectWithoutProperties(i,["children"]),l=_objectSpread({},k);g&&(delete l.defaultValue,delete l.value);// component.componentProps&&findRequiredRules(component.componentProps);
/**
       *
       * @param comp 组件类型
       * @param chil 表单中的子元素部分
       */var m=function(){var b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:h,c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:j;// console.log(toJS(children));
//debugger;
// //debugger
return b.componentProps&&//组件含有属性
b.componentProps.children&&//组件属性中包含子元素
"array:component"===b.componentProps.children.type//子元素为数组
?c.map(function(a,c){var d=b.componentProps.children.Component,e=(0,_mobx.toJS)(a.componentProps,{recurseEverything:!0})||{},f=e.children,g=_objectWithoutProperties(e,["children"]),h=(0,_utils.findRequiredRules)(b.componentProps.children.componentProps);//获取子组件组件类型
return h.find(function(a){return!g[a]})?_react.default.createElement(_alert.default,{key:"chil".concat(c),message:"\u63D0\u793A",description:"\u5C5E\u6027\u4E0D\u5168\u8BF7\u8865\u9F50",type:"warning",showIcon:!0}):_react.default.createElement(d,_extends({key:"chil".concat(c)},g),f&&m(b.componentProps.children,f))}):b.componentProps&&//组件含有属性
b.componentProps.children&&//组件属性中包含子元素
"FPR"===b.componentProps.children.type//子元素为数组
?_react.default.createElement(_mobxReactLite.Observer,null,function(){return _react.default.createElement(_FPB.default,{components:a.components,FPR:!0,defaultDatas:c})}):c};return d&&(//存在Component并且
!h.componentProps||//没有属性或者
!h.componentProps.children||//有属性没有子元素或者
!h.componentProps.children.shouldHaveOne||//或者有子元素不需要默认创建
h.componentProps.children&&//有子元素并且需要有默认元素并且类型还是数组的需要长度大于0
h.componentProps.children.shouldHaveOne&&"array:component"===h.componentProps.children.type&&j&&j.length)&&_react.default.createElement(_ErrorWrapper.default,null,function(a){// console.log('rule',component.componentProps);
var b=(0,_utils.findRequiredRules)(h.componentProps);return b.find(function(a){return!l[a]})?_react.default.createElement(_alert.default,{message:"\u63D0\u793A",description:"\u5C5E\u6027\u4E0D\u5168\u8BF7\u8865\u9F50",type:"warning",showIcon:!0}):_react.default.createElement(d,_extends({},l,a),j&&m())})},d=c();return _react.default.createElement(_mobxReactLite.Observer,null,function(){var e=a.store.datas[a.i];return _react.default.createElement(_Block.default,{showTag:!b.isPreview,autoHeight:e.autoHeight,height:a.store.operatedItem&&a.store.operatedItem.i===a.i?a.store.operatedItem.h:a.store.getItemHeight(a.i),breakpoint:a.store.breakpoint,onParentHeightChange:function onParentHeightChange(b){a.store.caclHeight(b,a.i)}},_react.default.createElement(_mobxReactLite.Observer,null,function(){var a;return b.isPreview||(d=c()),a=e.isFormField&&d?_react.default.createElement(_FormConsumerComponent.default,{item:e,component:d}):d,_react.default.createElement(_react.default.Fragment,null,a)}))})}),_default=ObservableBlock;exports.default=_default;
//# sourceMappingURL=ObservableBlock.js.map