"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.breakpointsStandard = exports.Mode = void 0;

var _mobxReactLite = require("mobx-react-lite");

var _utils = require("./utils");

var _mobx = require("mobx");

require("react-grid-layout/css/styles.css");

require("react-resizable/css/styles.css");

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var emptyLayouts = {
  xxl: [],
  xl: [],
  lg: [],
  md: [],
  sm: [],
  xs: []
};
var Mode;
/**
 * fpb元素
 */

exports.Mode = Mode;

(function (Mode) {
  Mode["DESIGN"] = "design";
  Mode["PRIVIEW"] = "priview";
})(Mode || (exports.Mode = Mode = {}));

// xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// xxl
var breakpointsStandard = {
  xl: 1600,
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 576 // xs: 0

};
exports.breakpointsStandard = breakpointsStandard;
var defaultbreakpoints = {
  lg: breakpointsStandard.lg // md: breakpointsStandard.md

};
var defaultCols = {
  xxl: 12,
  xl: 12,
  lg: 8,
  md: 6,
  sm: 4,
  xs: 2
};

var useFPBStore = function useFPBStore(props) {
  var force = (0, _mobxReactLite.useForceUpdate)();
  var store = (0, _mobxReactLite.useLocalStore)(function (source) {
    return {
      rowHeight: 1,
      margin: [0, 0],
      layouts: emptyLayouts,
      breakpoints: defaultbreakpoints,
      cols: defaultCols,

      get draggableCancelClassName() {
        return _shortid.default.generate();
      },

      get draggableCancel() {
        return store.editingItem !== null || store.isPreview ? ".".concat(store.draggableCancelClassName) : '';
      },

      /*********************** */
      get editingTitle() {
        return store.editingItem && store.editingItem.i;
      },

      get config() {
        return (0, _mobx.toJS)({
          datas: store.datas,
          layouts: store.layouts,
          cols: store.cols,
          breakpoints: store.breakpointsArr
        }, {
          recurseEverything: true
        });
      },

      mode: Mode.DESIGN,

      get isDesign() {
        return store.mode === Mode.DESIGN;
      },

      get isPreview() {
        return store.mode === Mode.PRIVIEW;
      },

      changeMode: function changeMode(e) {
        store.mode = e.target.value;
      },
      datas: {},
      breakpoint: 'lg',
      defaultFormField: true,

      get breakpointsConfig() {
        return {
          breakpoints: store.breakpointsArr,
          cols: store.cols
        };
      },

      get breakpointsArr() {
        return Object.keys(store.breakpoints);
      },

      get computedLayout() {
        return Object.fromEntries(store.breakpointsArr.map(function (point) {
          return [point, store.layouts[point] || []];
        }));
      },

      hasLayout: function hasLayout() {
        return Object.keys(store.datas).length !== 0;
      },
      setDatas: function setDatas(datas) {
        var entries = Object.fromEntries(Object.entries(datas).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              data = _ref2[1];

          return [key, _objectSpread({}, data, {
            Component: data.componentId && store.flatComponents[data.componentId].Component
          })];
        }));
        store.datas = entries;
      },
      setLayouts: function setLayouts(_currentLayout, layouts) {
        if (JSON.stringify(store.layouts) == JSON.stringify(layouts)) {
          return;
        }

        store.layouts = layouts;
      },
      setBreakpoint: function setBreakpoint(breakpoint, _col) {
        store.breakpoint = breakpoint;
      },
      setBreakpointFromEntry: function setBreakpointFromEntry(breakpoints) {
        store.breakpoints = Object.fromEntries(breakpoints.map(function (point) {
          return [point, breakpointsStandard[point]];
        }));
      },
      setBreakpointConfig: function setBreakpointConfig(values) {
        store.setBreakpointFromEntry(values.breakpoints);
        store.cols = _objectSpread({}, store.cols, {}, values.cols);
        store.setBreakpointSettingVisible(false);
      },
      deleteItem: function deleteItem(key) {
        (0, _mobx.remove)(store.datas, key);
        force();
      },

      get jsConfig() {
        return (0, _mobx.toJS)({
          layouts: store.computedLayout,
          rowHeight: store.rowHeight,
          margin: store.margin,
          breakpoints: store.breakpoints,
          cols: store.cols,
          onBreakpointChange: store.setBreakpoint,
          onLayoutChange: store.setLayouts,
          onResize: store.onResize,
          onResizeStop: store.onResizeStop,
          draggableCancel: store.draggableCancel //此处是个问题
          // isDraggable: store.editingItem === null && !store.isPreview,
          // isResizable: store.editingItem === null && !store.isPreview,

        }, {
          recurseEverything: true
        });
      },

      operatedItem: null,
      setOperatedItem: function setOperatedItem(operatedItem) {
        store.operatedItem = operatedItem;
      },
      onResize: function onResize(_layout, _oldItem, newItem) {
        store.setOperatedItem(newItem);
      },
      onResizeStop: function onResizeStop() {
        store.setOperatedItem(null);
      },
      findItem: function findItem(key) {
        return store.layouts[store.breakpoint].find(function (b) {
          return b.i === key;
        });
      },
      findItemInAllBreakpoints: function findItemInAllBreakpoints(key) {
        return Object.fromEntries(Object.entries(store.layouts).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              point = _ref4[0],
              items = _ref4[1];

          return [point, items.find(function (item) {
            return item.i === key;
          })];
        }));
      },
      getItemHeight: function getItemHeight(key) {
        var item = store.findItem(key);
        return item && item.h;
      },
      caclHeight: function caclHeight(height, key) {
        var itemData = store.datas[key];
        var item = store.findItem(key);
        var breakpointsItems = store.findItemInAllBreakpoints(key);

        if (!itemData.autoHeight) {
          Object.values(breakpointsItems).forEach(function (item) {
            if (item) {
              delete item.maxH;
              delete item.minH;
            }
          });
          return;
        }

        if (height === null || height === undefined) {
          return;
        } //store中对应的数据，非布局


        var h = Math.ceil(height / store.rowHeight);
        item.h = h || 30;
        item.maxH = item.h;
        item.minH = item.h;
      },
      createItem: function createItem() {
        var i = _shortid.default.generate(); // store.layouts[store.breakpoint].push(item);


        var newItem = {
          i: i,
          Component: null,
          autoHeight: true,
          componentProps: {},
          componentId: null,
          isFormField: null,
          $id: null
        };
        (0, _mobx.set)(store.datas, i, newItem);
        force();
        setTimeout(_utils.doWindowResize, 0);
      },
      editingItem: null,
      onItemTypeChange: function onItemTypeChange(value) {
        if (!value) {
          store.editingItem.Component = null;
          store.editingItem.componentProps = null;
          store.editingItem.isFormField = null;
          delete store.editingItem.label;
          return;
        }

        var component = store.flatComponents[value];
        store.editingItem.Component = component.Component;
        store.editingItem.componentProps = {};

        if (component.formField) {
          store.editingItem.isFormField = store.defaultFormField; // store.editingItem.label = "";

          (0, _mobx.set)(store.editingItem, 'label', ''); // .label = '';
          //这里默认给i值吧
          // store.editingItem.$id = shortid.generate()
        } // Object.entries(component.componentProps).
        // store.editingItem.componentProps = ;


        store.editingItem.componentId = value; // set(store.editingItem, field, value);
      },
      onItemPropsChange: function onItemPropsChange(field, value) {
        store.editingItem[field] = value;
      },

      get isEditing() {
        return store.editingItem !== null;
      },

      setEditingItem: function setEditingItem(editingItem) {
        store.editingItem = editingItem;
      },

      get flatComponents() {
        var flatComponents = {};

        var dealChildren = function dealChildren() {
          var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : source.components;
          var parent = arguments.length > 1 ? arguments[1] : undefined;
          arr.forEach(function (component) {
            flatComponents[component.id] = component;

            if (parent) {
              component.parent = parent;
            }

            if (component.children) {
              dealChildren(component.children, component);
            }
          });
        };

        dealChildren();
        return flatComponents;
      },

      get componentGroup() {
        //有分组组件
        var componentsHasGroup = source.components.filter(function (component) {
          return component.group;
        }); //无分组组件

        var componentsNoGroup = source.components.filter(function (component) {
          return !component.group;
        }); //全部分组

        var allGroup = _toConsumableArray(new Set(componentsHasGroup.map(function (component) {
          return component.group;
        }))); //自动分组


        var returnGroup = [];
        allGroup.forEach(function (group) {
          var _returnGroup$push;

          var filterGroup = componentsHasGroup.filter(function (component) {
            return component.group === group;
          });
          returnGroup.push((_returnGroup$push = {}, _defineProperty(_returnGroup$push, group, filterGroup), _defineProperty(_returnGroup$push, "groupName", group), _returnGroup$push));
        });
        componentsNoGroup.forEach(function (component) {
          returnGroup.push(component);
        });
        return returnGroup;
      },

      breakpointSettingVisible: false,
      setBreakpointSettingVisible: function setBreakpointSettingVisible(breakpointSettingVisible) {
        store.breakpointSettingVisible = breakpointSettingVisible;
      }
    };
  }, {
    components: props.components
  });
  return store;
};

var _default = useFPBStore;
exports.default = _default;
//# sourceMappingURL=useFPBStore.js.map