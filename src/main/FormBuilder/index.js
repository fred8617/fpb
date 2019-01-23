"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormBuilderNoBackend = exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/es/affix/style");

var _affix = _interopRequireDefault(require("antd/es/affix"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _reactDnd = require("react-dnd");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _mobxReact = require("mobx-react");

var _Store = _interopRequireDefault(require("../Store"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Priview = _interopRequireDefault(require("./Priview"));

var _ElementList = _interopRequireDefault(require("./ElementList"));

var _ContainerList = _interopRequireDefault(require("./ContainerList"));

var _EditingContent = _interopRequireDefault(require("./EditingContent"));

var _DeveloperContent = _interopRequireDefault(require("./DeveloperContent"));

var _dec, _class;

//开发者视图
var store = new _Store.default();

var PrivicwContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__PrivicwContainer",
  componentId: "f4lyp8-0"
})(["padding:10px;min-height:200px;float:left;width:", ";", ""], function (props) {
  return props.simple ? "calc( 100% - 158px)" : "calc( 100% - 316px)";
}, ''
/* @media screen and (max-width: 1900px) {
width: 600px;
}
@media screen and (max-width: 1024px) {
width: 500px;
} */
);

var ElementListContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__ElementListContainer",
  componentId: "f4lyp8-1"
})(["float:left;width:150px;margin-left:8px;"]);

var ContainerListContainer = _styledComponents.default.div.withConfig({
  displayName: "FormBuilder__ContainerListContainer",
  componentId: "f4lyp8-2"
})(["", ""], ''
/* margin-left: 5px; */
);

var FormBuilderVersion = (_dec = _form.default.create({
  onValuesChange: function onValuesChange(props, fields) {
    store.editField = Object.keys(fields)[0];
  }
}), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FormBuilderVersion, _Component);

  function FormBuilderVersion() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormBuilderVersion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormBuilderVersion)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isInit: false
    };
    return _this;
  }

  (0, _createClass2.default)(FormBuilderVersion, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$setStore, _this$props;

      (_this$props$setStore = (_this$props = this.props).setStore) === null || _this$props$setStore === void 0 ? void 0 : _this$props$setStore.call(_this$props, store);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          design = _this$props2.design,
          priviewStyle = _this$props2.priviewStyle,
          style = _this$props2.style,
          formLayout = _this$props2.formLayout,
          onSave = _this$props2.onSave,
          defaultValues = _this$props2.defaultValues,
          elementStyle = _this$props2.elementStyle,
          _this$props2$develope = _this$props2.developerContent,
          developerContent = _this$props2$develope === void 0 ? true : _this$props2$develope; // store?.editingData?.required

      return _react.default.createElement(_mobxReact.Provider, {
        store: store
      }, _react.default.createElement(_react.Fragment, null, _react.default.createElement("style", null, "\n          p,ol{\n            margin:0\n          }\n          "), _react.default.createElement("div", {
        style: style
      }, _react.default.createElement(PrivicwContainer, {
        simple: store.simple,
        style: (0, _objectSpread2.default)({
          width: !design ? "100%" : null
        }, priviewStyle)
      }, design && developerContent ? _react.default.createElement(_affix.default, {
        style: {
          position: 'relative',
          top: -11
        }
      }, _react.default.createElement(_DeveloperContent.default, {
        onSave: onSave,
        form: this.props.form
      })) : void 0, _react.default.createElement(_Priview.default, {
        defaultValues: defaultValues,
        form: this.props.form,
        store: store,
        design: design
      })), design ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(ElementListContainer, {
        style: elementStyle
      }, _react.default.createElement(_affix.default, null, _react.default.createElement(_ElementList.default, null))), !store.simple ? _react.default.createElement(ElementListContainer, {
        style: elementStyle
      }, _react.default.createElement(_affix.default, null, _react.default.createElement(_ContainerList.default, null))) : void 0) : void 0), _react.default.createElement("div", {
        style: {
          clear: "both"
        }
      }), design ? _react.default.createElement(_EditingContent.default, {
        form: this.props.form
      }) : void 0));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, state) {
      var _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data,
          restProps = (0, _objectWithoutProperties2.default)(_ref, ["data"]);

      // console.log(restProps.form.validateFields());
      if (!state.isInit) {
        store.init((0, _objectSpread2.default)({
          data: data
        }, restProps));
      }

      console.log("getDerivedStateFromProps");
      return {
        isInit: true
      };
    }
  }]);
  return FormBuilderVersion;
}(_react.Component)) || _class) || _class);
var FormBuilder = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.default, {
  window: window
})(FormBuilderVersion);
exports.default = FormBuilder;
var FormBuilderNoBackend = FormBuilderVersion;
exports.FormBuilderNoBackend = FormBuilderNoBackend;