"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/row/style/css");
var _row = _interopRequireDefault(require("antd/lib/row"));
require("antd/lib/switch/style/css");
var _switch = _interopRequireDefault(require("antd/lib/switch"));
require("antd/lib/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));
require("antd/lib/col/style/css");
var _col = _interopRequireDefault(require("antd/lib/col"));
require("antd/lib/button/style/css");
var _button = _interopRequireDefault(require("antd/lib/button"));
require("antd/lib/card/style/css");
var _card = _interopRequireDefault(require("antd/lib/card"));
require("antd/lib/icon/style/css");
var _icon = _interopRequireDefault(require("antd/lib/icon"));
var _get2 = _interopRequireDefault(require("lodash/get"));
require("antd/lib/form/style/css");
var _form = _interopRequireDefault(require("antd/lib/form"));
require("antd/lib/collapse/style/css");
var _collapse = _interopRequireDefault(require("antd/lib/collapse"));
require("antd/lib/tree-select/style/css");
var _treeSelect = _interopRequireDefault(require("antd/lib/tree-select"));
require("antd/lib/select/style/css");
var _select = _interopRequireDefault(require("antd/lib/select"));
var _react = _interopRequireWildcard(require("react"));
var _CommonInput = _interopRequireDefault(require("./CommonInput"));
var _reactBeautifulDnd = require("react-beautiful-dnd");
var _mobx = require("mobx");
var _FPBForm = _interopRequireDefault(require("./FPBForm"));
var _GraphqlEditor = _interopRequireDefault(require("./GraphqlEditor"));
var _mobxReactLite = require("mobx-react-lite");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Option = _select.default.Option,
  OptGroup = _select.default.OptGroup;
var TreeNode = _treeSelect.default.TreeNode;
var Panel = _collapse.default.Panel;
var Size; // xs	<576
// sm	≥576
// md	≥768
// lg	≥992
// xl	≥1200
// xxl ≥1600
(function (Size) {
  Size[Size["SMALL"] = 0] = "SMALL";
  Size[Size["MIDDLE"] = 1] = "MIDDLE";
  Size[Size["LARGE"] = 2] = "LARGE";
})(Size || (Size = {}));
var getFormItemCol = function getFormItemCol(width) {
  var col = {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 24
    }
  };
  // if (width >= 256) {
  //   col.labelCol.span = 10;
  //   col.wrapperCol.span = 14;
  // }
  return col;
};
var getCol = function getCol(width, size) {
  var col = {
    span: 24
  };
  if (size === Size.LARGE) {
    return col;
  } else if (size === Size.MIDDLE) {
    if (width >= 576 && width < 1200) {
      col.span = 8;
      return col;
    } else if (width >= 1200) {
      col.span = 6;
      return col;
    }
    return col;
  } else if (size === Size.SMALL) {
    if (width > 256 && width < 576) {
      col.span = 12;
      return col;
    } else if (width >= 576 && width < 1200) {
      col.span = 6;
      return col;
    } else if (width >= 1200) {
      col.span = 4;
      return col;
    }
    return col;
  }
};
var create = _form.default.create,
  Item = _form.default.Item;
var ItemSettingForm = (0, _mobxReactLite.observer)(function (props) {
  // const [render, setRender] = useState(false);
  var form = props.form,
    item = props.item;
  var _useState = (0, _react.useState)(function () {
      return props.initialKeyCounter;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    keyCounter = _useState2[0],
    setKeyCounter = _useState2[1];
  var recordItem = (0, _react.useRef)(item);
  // useEffect(() => {
  //   setTimeout(() => setRender(true), 300);
  // }, []);
  (0, _react.useEffect)(function () {
    if (recordItem.current !== item) {
      form.resetFields();
      recordItem.current = item;
    }
  }, [item]);
  (0, _react.useEffect)(function () {
    // if (!render) {
    //   return;
    // }
    //临时解决方案
    var _form$getFieldsValue = form.getFieldsValue(),
      componentProps = _form$getFieldsValue.componentProps;
    Object.keys(keyCounter).length && componentProps && form.setFieldsValue({
      componentProps: componentProps
    });
  }, [keyCounter]);
  var initialValue = (0, _mobx.toJS)(item, {
    recurseEverything: true
  }) || {};
  var getFieldDecorator = form.getFieldDecorator,
    getFieldsValue = form.getFieldsValue,
    getFieldValue = form.getFieldValue;
  var renderTypeTreeNode = function renderTypeTreeNode(component) {
    if (component.children) {
      return /*#__PURE__*/_react.default.createElement(TreeNode, {
        value: component.id,
        title: component.label,
        key: component.id
      }, component.children.map(function (component) {
        return renderTypeTreeNode(component);
      }));
    }
    return /*#__PURE__*/_react.default.createElement(TreeNode, {
      value: component.id,
      title: component.label,
      key: component.id
    });
  };
  // const [settingForm] = useSizeMe(size => {
  //   const { width } = size;
  //   return (
  //     <>
  //       <div></div>
  //       {width && render&&(

  //       )}
  //     </>
  //   );
  // }, {});
  // if (!render) {
  //   return <>{/* <Spin spinning={true}/> */}</>;
  // }
  //组件类型
  var componentTypeDec = getFieldDecorator('componentId', {
    initialValue: initialValue.componentId
    //preserve: true
  });
  /**
   * 自适应高度
   */
  var autoHeightDec = getFieldDecorator('autoHeight', {
    valuePropName: 'checked',
    initialValue: initialValue.autoHeight
    //preserve: true
  });
  /**
   * 是否作为表单域
   */
  var isFormFieldDec = getFieldDecorator('isFormField', {
    valuePropName: 'checked',
    initialValue: initialValue.isFormField
    //preserve: true
  });
  /**
   * 是否作为表单域id
   */
  var $idDec = getFieldDecorator('$id', {
    initialValue: initialValue.$id
    //preserve: true
  });
  /**
   * 是否作为表单域label
   */
  var labelDec = getFieldDecorator('label', {
    initialValue: initialValue.label
    //preserve: true
  });

  var _getFieldsValue = getFieldsValue(),
    componentId = _getFieldsValue.componentId,
    isFormField = _getFieldsValue.isFormField;
  // console.log(props.flatComponents[componentId]);
  var _ref = props.flatComponents[componentId] || {},
    _ref$componentProps = _ref.componentProps,
    componentProps = _ref$componentProps === void 0 ? {} : _ref$componentProps,
    formField = _ref.formField;
  var sortProps = function sortProps(_ref2) {
    var destination = _ref2.destination,
      source = _ref2.source;
    if (!destination) {
      return;
    }
    var values = form.getFieldsValue();
    var arr = (0, _get2.default)(values, destination.droppableId);
    var dragValue = arr[source.index];
    arr.splice(source.index, 1);
    arr.splice(destination.index, 0, dragValue);
    form.setFieldsValue({
      componentProps: values.componentProps
    });
  };
  var deleteProp = function deleteProp(propName, index) {
    var values = getFieldsValue();
    var arr = (0, _get2.default)(values, propName);
    arr.splice(index, 1);
    keyCounter[propName].splice(index, 1);
    form.setFieldsValue({
      componentProps: values.componentProps
    });
    setKeyCounter(_objectSpread({}, keyCounter));
  };
  var createComponentPropsForm = function createComponentPropsForm(componentProps) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'componentProps';
    var componentPropsEntries = Object.entries(componentProps);
    return [].concat(_toConsumableArray(componentPropsEntries.filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        prop = _ref4[1];
      return prop.type.indexOf('array') < 0;
    }).map(function (_ref5, i) {
      var _ref6 = _slicedToArray(_ref5, 2),
        name = _ref6[0],
        prop = _ref6[1];
      var setting;
      var propName = "".concat(prefix, ".").concat(name);
      var options = {
        rules: prop.rules
      };
      if (prop.type === 'string') {
        setting = /*#__PURE__*/_react.default.createElement(Item, {
          label: prop.label,
          key: propName
        }, getFieldDecorator(propName, _objectSpread({
          initialValue: (0, _get2.default)(initialValue, propName)
        }, options))( /*#__PURE__*/_react.default.createElement(_CommonInput.default, null)));
      } else if (prop.type === 'FPR') {
        // console.log('FPR', get(initialValue, propName));

        setting = /*#__PURE__*/_react.default.createElement(Item, {
          label: prop.label,
          key: propName
        }, getFieldDecorator(propName, _objectSpread({
          initialValue: (0, _mobx.toJS)((0, _get2.default)(initialValue, propName), {
            recurseEverything: true
          })
        }, options))( /*#__PURE__*/_react.default.createElement(_FPBForm.default, {
          components: props.components
        })));
      } else if (prop.type === 'graphql') {
        setting = /*#__PURE__*/_react.default.createElement(Item, {
          label: prop.label,
          key: propName
        }, getFieldDecorator(propName, _objectSpread({
          initialValue: (0, _get2.default)(initialValue, propName)
        }, options))( /*#__PURE__*/_react.default.createElement(_GraphqlEditor.default, null)));
      }
      return setting;
    })), [/*#__PURE__*/_react.default.createElement(_collapse.default, {
      key: "settings",
      accordion: true,
      destroyInactivePanel: false
    }, componentPropsEntries.filter(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        prop = _ref8[1];
      return prop.type.indexOf('array') >= 0;
    }).map(function (_ref9, i) {
      var _ref10 = _slicedToArray(_ref9, 2),
        name = _ref10[0],
        prop = _ref10[1];
      var setting;
      var propName = "".concat(prefix, ".").concat(name);
      var mapedArr;
      mapedArr = keyCounter[propName] || [];
      var renderAfterAddButtonComponent;
      if (prop.type === 'array:component') {
        renderAfterAddButtonComponent = /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
          onDragEnd: sortProps
        }, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
          droppableId: propName
        }, function (provided) {
          return /*#__PURE__*/_react.default.createElement("div", _extends({}, provided.droppableProps, {
            ref: provided.innerRef
          }), mapedArr.map(function (p, pi) {
            var key = "".concat(propName, "[").concat(pi, "]");
            return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
              key: key,
              draggableId: key,
              index: pi
            }, function (provided) {
              return /*#__PURE__*/_react.default.createElement("div", _extends({
                key: key,
                ref: provided.innerRef
              }, provided.draggableProps), /*#__PURE__*/_react.default.createElement(_card.default, {
                style: {
                  margin: "5px 0"
                },
                key: "car".concat(pi),
                actions: [/*#__PURE__*/_react.default.createElement("div", provided.dragHandleProps, /*#__PURE__*/_react.default.createElement(_icon.default, {
                  type: "drag",
                  key: 'drag'
                })), /*#__PURE__*/_react.default.createElement(_icon.default, {
                  type: "delete",
                  key: 'delete',
                  onClick: function onClick(_) {
                    return deleteProp(propName, pi);
                  }
                })]
              }, createComponentPropsForm(componentProps[name].componentProps, "".concat(propName, "[").concat(pi, "].componentProps"))));
            });
          }), provided.placeholder);
        }));
      } else if (prop.type === 'array:string') {
        renderAfterAddButtonComponent = /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
          onDragEnd: sortProps
        }, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
          droppableId: propName
        }, function (provided) {
          return /*#__PURE__*/_react.default.createElement("div", _extends({}, provided.droppableProps, {
            ref: provided.innerRef
          }), mapedArr.map(function (p, pi) {
            var key = "".concat(propName, "[").concat(pi, "]");
            return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
              key: key,
              draggableId: key,
              index: pi
            }, function (provided) {
              return /*#__PURE__*/_react.default.createElement("div", _extends({
                key: key,
                ref: provided.innerRef
              }, provided.draggableProps, {
                className: "ant-form ant-form-inline"
              }), /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement("div", provided.dragHandleProps, /*#__PURE__*/_react.default.createElement(_icon.default, {
                type: "drag"
              }))), /*#__PURE__*/_react.default.createElement(Item, null, getFieldDecorator(key, {
                //preserve: true,
                initialValue: (0, _get2.default)(item, key)
              })( /*#__PURE__*/_react.default.createElement(_CommonInput.default, null))), /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement(_icon.default, {
                onClick: function onClick(_) {
                  return deleteProp(propName, pi);
                },
                type: "delete",
                style: {
                  color: "red",
                  cursor: "pointer"
                }
              })));
            });
          }), provided.placeholder);
        }));
      }
      setting = /*#__PURE__*/_react.default.createElement(Panel, {
        forceRender: true,
        header: prop.label,
        key: "setting".concat(i)
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        icon: "plus",
        onClick: function onClick(e) {
          var props = (0, _get2.default)(item, prefix) || {};
          if (!props[name]) {
            //没有则默认设置为空数组并默认添加一个
            keyCounter[propName] = [{}];
            setKeyCounter(_objectSpread({}, keyCounter));
            return;
          }
          //这里是有shouldHaveOne的情况，只走这里
          if (!keyCounter[propName]) {
            keyCounter[propName] = [];
          }
          keyCounter[propName].push({});
          setKeyCounter(_objectSpread({}, keyCounter));
        }
      }, "\u6DFB\u52A0", prop.label), renderAfterAddButtonComponent);
      return setting;
    }))]);
  };
  var propsDecModels = createComponentPropsForm(componentProps);
  return /*#__PURE__*/_react.default.createElement(_mobxReactLite.Observer, null, function () {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_form.default, getFormItemCol(props.parentStore.settingWidth), /*#__PURE__*/_react.default.createElement(_collapse.default, {
      accordion: true,
      defaultActiveKey: ['1'],
      destroyInactivePanel: false
    }, /*#__PURE__*/_react.default.createElement(Panel, {
      forceRender: true,
      header: "\u57FA\u7840\u8BBE\u7F6E",
      key: "1"
    }, /*#__PURE__*/_react.default.createElement(_row.default, {
      gutter: 15
    }, /*#__PURE__*/_react.default.createElement(_col.default, getCol(props.parentStore.settingWidth, Size.MIDDLE), /*#__PURE__*/_react.default.createElement(Item, {
      label: '组件'
    }, componentTypeDec( /*#__PURE__*/_react.default.createElement(_treeSelect.default, {
      onChange: function onChange(_) {
        return setKeyCounter({});
      },
      showSearch: true,
      style: {
        width: "100%"
      },
      dropdownStyle: {
        maxHeight: 400,
        overflow: 'auto'
      },
      placeholder: "\u8BF7\u9009\u62E9\u7EC4\u4EF6",
      allowClear: true,
      autoClearSearchValue: true,
      treeDefaultExpandAll: true
    }, props.componentGroup.map(function (groupOrComponent, index) {
      if (groupOrComponent.id) {
        return renderTypeTreeNode(groupOrComponent);
      }
      return /*#__PURE__*/_react.default.createElement(TreeNode, {
        disabled: true,
        value: groupOrComponent['groupName'],
        title: groupOrComponent['groupName'],
        key: groupOrComponent['groupName']
      }, groupOrComponent[groupOrComponent['groupName']].map(function (component) {
        return renderTypeTreeNode(component);
      }));
    }))))), /*#__PURE__*/_react.default.createElement(_col.default, getCol(props.parentStore.settingWidth, Size.SMALL), /*#__PURE__*/_react.default.createElement(Item, {
      label: /*#__PURE__*/_react.default.createElement("span", null, "\u81EA\u9002\u5E94\u9AD8\u5EA6\xA0", /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: "\u5F00\u542F\u540E\u533A\u5757\u5C06\u81EA\u9002\u5E94\u5185\u5BB9\u9AD8\u5EA6\uFF0C\u4E0D\u80FD\u8FDB\u884C\u7EB5\u5411resize\u64CD\u4F5C"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "question-circle-o"
      })))
    }, autoHeightDec( /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: '开',
      unCheckedChildren: '关'
    })))), formField && /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: "frag"
    }, /*#__PURE__*/_react.default.createElement(_col.default, getCol(props.parentStore.settingWidth, Size.SMALL), /*#__PURE__*/_react.default.createElement(Item, {
      label: '是否作为表单域'
    }, isFormFieldDec( /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: '是',
      unCheckedChildren: '否'
    })))), isFormField && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_col.default, getCol(props.parentStore.settingWidth, Size.MIDDLE), /*#__PURE__*/_react.default.createElement(Item, {
      label: /*#__PURE__*/_react.default.createElement("span", null, "id\xA0", /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: "\u8868\u5355\u57DF\u4F20\u503C\u5B57\u6BB5\uFF0C\u4E0D\u586B\u5199\u9ED8\u8BA4\u4E3A\u533A\u5757id\uFF0C\u9700\u4FDD\u8BC1\u552F\u4E00"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "question-circle-o"
      })))
    }, $idDec( /*#__PURE__*/_react.default.createElement(_CommonInput.default, {
      placeholder: '请填写id'
    })))), /*#__PURE__*/_react.default.createElement(_col.default, getCol(props.parentStore.settingWidth, Size.MIDDLE), /*#__PURE__*/_react.default.createElement(Item, {
      label: /*#__PURE__*/_react.default.createElement("span", null, "label")
    }, labelDec( /*#__PURE__*/_react.default.createElement(_CommonInput.default, {
      placeholder: ''
    })))))))), propsDecModels.length && /*#__PURE__*/_react.default.createElement(Panel, {
      forceRender: true,
      header: '自定义设置',
      key: "2"
    }, propsDecModels))));
  });
});
ItemSettingForm.displayName = 'ItemSettingFormObserver';
var _default = /*#__PURE__*/_react.default.memo(create({
  onValuesChange: function onValuesChange(props, changedValues, allValues) {
    var field = Object.keys(changedValues)[0];
    if (!field) {
      return;
    }
    var value = changedValues[field];
    if (field === 'componentId') {
      props.onItemTypeChange(value);
    } else {
      props.onItemPropsChange(field, allValues[field]);
    }
  },
  onFieldsChange: function onFieldsChange(props, fields) {}
})(ItemSettingForm));
exports.default = _default;
//# sourceMappingURL=ItemSettingForm.js.map