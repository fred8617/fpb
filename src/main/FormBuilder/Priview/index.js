"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _styled = require("../../styled");

var _reactDnd = require("react-dnd");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _PriviewItem = _interopRequireDefault(require("./PriviewItem"));

var _dec, _class;

//预览单个元素
var FormItem = _form.default.Item;
var type = ["ELEMENT"]; //放置目标处理集合

var target = {
  canDrop: function canDrop(props) {
    return props.store.data.length == 0;
  },
  drop: function drop(props, monitor, component) {
    var _monitor$getItem = monitor.getItem(),
        element = _monitor$getItem.item;

    var addElement = props.store.addElement;
    addElement(element);
  }
};
var Priview = (_dec = (0, _reactDnd.DropTarget)(type, target, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Priview, _Component);

  function Priview() {
    (0, _classCallCheck2.default)(this, Priview);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Priview).apply(this, arguments));
  }

  (0, _createClass2.default)(Priview, [{
    key: "render",
    value: function render() {
      console.log("Priview render");
      var _this$props = this.props,
          connectDropTarget = _this$props.connectDropTarget,
          store = _this$props.store,
          defaultValues = _this$props.defaultValues,
          _this$props$store = _this$props.store,
          _this$props$store$edi = _this$props$store.editingData,
          _this$props$store$edi2 = _this$props$store$edi.required,
          required = _this$props$store$edi2 === void 0 ? false : _this$props$store$edi2,
          label = _this$props$store$edi.label,
          options = _this$props$store$edi.options,
          optionRowShow = _this$props$store$edi.optionRowShow,
          fieldName = _this$props$store$edi.fieldName,
          data = _this$props$store.data,
          length = _this$props$store.data.length,
          form = _this$props.form,
          design = _this$props.design;
      console.log("design", design);
      var a = [];
      options === null || options === void 0 ? void 0 : options.forEach(function (e) {
        return a.push(e.label);
      });
      return connectDropTarget && connectDropTarget(_react.default.createElement("div", null, _react.default.createElement(_form.default, null, length == 0 ? design && _react.default.createElement(_styled.NoneElement, null, "\u8BF7\u5728\u5143\u7D20\u680F\u6293\u53D6\u5143\u7D20\u6216\u76F4\u63A5\u70B9\u51FB\u5143\u7D20") : data.map(function (e, i) {
        return _react.default.createElement(_PriviewItem.default, {
          defaultValues: defaultValues,
          parent: data,
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
          a: a
        });
      }))));
    }
  }]);
  return Priview;
}(_react.Component)) || _class) || _class);
exports.default = Priview;