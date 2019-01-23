"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _react = _interopRequireWildcard(require("react"));

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");

var _draftJs = require("draft-js");

var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));

var _htmlToDraftjs = _interopRequireDefault(require("html-to-draftjs"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _styled = require("../../styled");

var _Context = require("../../Context");

var _LabelEditor = _interopRequireDefault(require("./LabelEditor"));

var _FieldNameInput = _interopRequireDefault(require("./FieldNameInput"));

var _RequiredCheckBox = _interopRequireDefault(require("./RequiredCheckBox"));

var _DataOptions = _interopRequireDefault(require("./DataOptions"));

var _OptionRowShow = _interopRequireDefault(require("./OptionRowShow"));

var _mobxReact = require("mobx-react");

var _dec, _class;

var RadioButton = _radio.default.Button;
var RadioGroup = _radio.default.Group;
var EditingContent = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EditingContent, _Component);

  function EditingContent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, EditingContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EditingContent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      position: "right"
    };

    _this.positionChange = function (e) {
      _this.setState({
        position: e.target.value
      });
    };

    _this.onClose = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
          store = _assertThisInitialize.props.store;

      store.editing = false;
    };

    return _this;
  }

  (0, _createClass2.default)(EditingContent, [{
    key: "render",
    value: function render() {
      console.log("EditingContent render");
      var _this$props = this.props,
          form = _this$props.form,
          _this$props$store = _this$props.store,
          visible = _this$props$store.editing,
          type = _this$props$store.editingData.type,
          position = this.state.position,
          positionChange = this.positionChange,
          setGroupData = this.setGroupData,
          addGroupData = this.addGroupData,
          deleteGroupData = this.deleteGroupData;
      return _react.default.createElement(_drawer.default, {
        style: {
          background: "white"
        },
        onClose: this.onClose,
        mask: false,
        title: _react.default.createElement(RadioGroup, {
          onChange: positionChange,
          value: position
        }, _react.default.createElement(RadioButton, {
          value: "top"
        }, "top"), _react.default.createElement(RadioButton, {
          value: "right"
        }, "right"), _react.default.createElement(RadioButton, {
          value: "bottom"
        }, "bottom"), _react.default.createElement(RadioButton, {
          value: "left"
        }, "left")),
        width: 500,
        height: 350,
        visible: visible,
        placement: position
      }, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u4F20\u503C\u5B57\u6BB5"), _react.default.createElement(_FieldNameInput.default, null), _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u663E\u793A\u5B57\u6BB5\u540D"), _react.default.createElement(_LabelEditor.default, null), _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u662F\u5426\u5FC5\u586B"), _react.default.createElement(_styled.SpanLH32, null, _react.default.createElement(_RequiredCheckBox.default, {
        form: form
      })), type == "checkboxGroup" || type == "radio" || type == "select" ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u9009\u9879"), _react.default.createElement(_DataOptions.default, null), type == "checkboxGroup" || type == "radio" ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_divider.default, {
        orientation: "left"
      }, "\u6BCF\u884C\u5C55\u793A\u6570\u91CF"), _react.default.createElement(_OptionRowShow.default, null)) : void 0) : void 0);
    }
  }]);
  return EditingContent;
}(_react.Component)) || _class) || _class);
exports.default = EditingContent;