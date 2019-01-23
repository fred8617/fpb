"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/collapse/style");

var _collapse = _interopRequireDefault(require("antd/es/collapse"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _mobxReact = require("mobx-react");

var _UrlInput = _interopRequireDefault(require("./UrlInput"));

var _dec, _class;

var Search = _input.default.Search;
var Panel = _collapse.default.Panel;
var FormItem = _form.default.Item;
var DeveloperContent = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DeveloperContent, _Component);

  function DeveloperContent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DeveloperContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DeveloperContent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.saveFormDesign = function () {
      var _this$props = _this.props,
          getFieldValue = _this$props.form.getFieldValue,
          _this$props$store = _this$props.store,
          data = _this$props$store.data,
          submitUrl = _this$props$store.submitUrl,
          index = _this$props$store.index,
          onSave = _this$props.onSave;
      var param = {
        data: data,
        submitUrl: submitUrl,
        index: index
      };
      onSave === null || onSave === void 0 ? void 0 : onSave(param);
    };

    return _this;
  }

  (0, _createClass2.default)(DeveloperContent, [{
    key: "render",
    // shouldComponentUpdate(nextProps){
    //   return (
    //     (this.props.changField===nextProps.changField)
    //   );
    // }
    value: function render() {
      var formItemLayout = {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18
        }
      };
      var _this$props2 = this.props,
          form = _this$props2.form,
          developer = _this$props2.store.developer;
      console.log("DeveloperContent render");
      return _react.default.createElement(_collapse.default, {
        bordered: false
      }, _react.default.createElement(Panel, {
        style: {
          background: "white",
          border: "none"
        },
        showArrow: false,
        header: _react.default.createElement("div", null, _react.default.createElement(_divider.default, {
          orientation: "left"
        }, _react.default.createElement(_icon.default, {
          type: "setting"
        }), "\u8868\u5355\u9009\u9879")),
        key: "1"
      }, developer ? _react.default.createElement(FormItem, (0, _extends2.default)({}, formItemLayout, {
        colon: true,
        label: "\u63D0\u4EA4\u7684url"
      }), _react.default.createElement(_UrlInput.default, {
        form: form
      })) : void 0, _react.default.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement(_button.default, {
        onClick: this.saveFormDesign,
        type: "primary"
      }, "\u4FDD\u5B58\u8868\u5355")), _react.default.createElement(_divider.default, {
        style: {
          margin: "10px 0"
        }
      })));
    }
  }]);
  return DeveloperContent;
}(_react.Component)) || _class) || _class);
exports.default = DeveloperContent;