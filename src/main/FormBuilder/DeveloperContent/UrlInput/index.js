"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _class, _class2, _descriptor;

var Search = _input.default.Search;
var UrlInput = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UrlInput, _Component);

  function UrlInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, UrlInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(UrlInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.testSubmit = function () {
      var form = _this.props.form;
      form.validateFields(); // form.validateFieldsAndScroll((err,values)=>{
      //   console.log(err,values);
      //   form.setFields(err)
      //   if(err){
      //     return;
      //   }
      //   Modal.info({title:'测试表单提交',content:<pre>{JSON.stringify(form.getFieldsValue(),null,2)}</pre>});
      // });
    };

    (0, _initializerDefineProperty2.default)(_this, "urlChange", _descriptor, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(UrlInput, [{
    key: "render",
    value: function render() {
      var submitUrl = this.props.store.submitUrl;
      return _react.default.createElement(Search, {
        value: submitUrl,
        placeholder: "\u8F93\u5165url",
        enterButton: "\u6D4B\u8BD5\u63D0\u4EA4",
        onSearch: this.testSubmit,
        onChange: this.urlChange
      });
    }
  }]);
  return UrlInput;
}(_react.Component), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "urlChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (e) {
      _this2.props.store.submitUrl = e.target.value;
    };
  }
})), _class2)) || _class) || _class);
exports.default = UrlInput;