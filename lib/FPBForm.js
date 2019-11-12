"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _FullScreenModal = _interopRequireDefault(require("./FullScreenModal"));

var _FPB = _interopRequireDefault(require("./FPB"));

var _mobxReactLite = require("mobx-react-lite");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = _form.default.create,
    Item = _form.default.Item;

var FPBForm = function FPBForm(props) {
  var ref = (0, _react.useRef)();
  var footerRef = (0, _react.useRef)();
  var store = (0, _mobxReactLite.useLocalStore)(function () {
    return {
      visible: false,
      setVisible: function setVisible(visible) {
        store.visible = visible;

        if (visible) {
          setTimeout(function () {
            store.minuHeight = footerRef.current.clientHeight + 21;
          }, 0);
        }
      },
      minuHeight: 0
    };
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_button.default, {
    onClick: function onClick(_) {
      return store.setVisible(true);
    }
  }, "\u8BBE\u8BA1"), _react.default.createElement(_mobxReactLite.Observer, null, function () {
    return _react.default.createElement(_FullScreenModal.default, {
      minuHeight: store.minuHeight,
      onOk: function onOk(_) {
        //   ref.current.config;
        if (props.onChange) {
          props.onChange(ref.current.config);
        }
      },
      destroyOnClose: true,
      footer: _react.default.createElement("div", {
        ref: footerRef
      }, _react.default.createElement(_form.default, {
        layout: "inline"
      }, _react.default.createElement(Item, null, _react.default.createElement(_button.default, {
        type: "primary",
        onClick: function onClick(_) {
          //   ref.current.config;
          if (props.onChange) {
            props.onChange(ref.current.config);
          }
        }
      }, "\u4FDD\u5B58")), _react.default.createElement(Item, null, _react.default.createElement(_button.default, {
        type: "danger",
        onClick: function onClick(_) {
          //   ref.current.config;
          if (props.onChange) {
            props.onChange(ref.current.config);
          }

          store.setVisible(false);
        }
      }, "\u4FDD\u5B58\u5E76\u5173\u95ED")))),
      onCancel: function onCancel(_) {
        return store.setVisible(false);
      },
      visible: store.visible
    }, store.visible && _react.default.createElement(_FPB.default, {
      renderDelay: 200,
      forwardRef: ref,
      components: props.components,
      defaultDatas: props.value
    }));
  }));
};

var _default = FPBForm;
exports.default = _default;