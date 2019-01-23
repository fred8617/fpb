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

var _react = _interopRequireWildcard(require("react"));

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css");

var _draftJs = require("draft-js");

var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));

var _htmlToDraftjs = _interopRequireDefault(require("html-to-draftjs"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _Context = require("../../../Context");

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

var _dec, _class, _class2, _descriptor;

var LabelEditor = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LabelEditor, _Component);

  function LabelEditor() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LabelEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LabelEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      toolbar: ['inline', 'blockType', 'fontSize', 'fontFamily', //'list',
      //'textAlign',
      'colorPicker', 'link', //'embedded',
      'emoji', 'image', 'remove', 'history']
    };
    (0, _initializerDefineProperty2.default)(_this, "onEditorStateChange", _descriptor, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(LabelEditor, [{
    key: "render",
    value: function render() {
      var toolbar = this.state.toolbar,
          editorState = this.props.store.editorState;
      return _react.default.createElement(_reactDraftWysiwyg.Editor, {
        toolbar: {
          options: toolbar
        },
        editorState: editorState,
        wrapperClassName: "editor",
        editorClassName: "editor-main",
        onEditorStateChange: this.onEditorStateChange
      });
    }
  }]);
  return LabelEditor;
}(_react.Component), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "onEditorStateChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (editorState) {
      var _this2$props = _this2.props,
          store = _this2$props.store,
          _this2$props$store = _this2$props.store,
          data = _this2$props$store.editingData,
          setEditingData = _this2$props$store.setEditingData;
      var label = (0, _draftjsToHtml.default)((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      setEditingData("label", label);
      store.editorState = editorState;
    };
  }
})), _class2)) || _class) || _class);
exports.default = LabelEditor;