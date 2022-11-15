"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/button/style/css");
var _button = _interopRequireDefault(require("antd/lib/button"));
require("antd/lib/form/style/css");
var _form = _interopRequireDefault(require("antd/lib/form"));
var _react = _interopRequireWildcard(require("react"));
var _graphiql = _interopRequireDefault(require("graphiql"));
require("graphiql/graphiql.css");
var _reactHooks = require("@apollo/react-hooks");
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var _FullScreenModal = _interopRequireDefault(require("./FullScreenModal"));
var _mobxReactLite = require("mobx-react-lite");
var _utils = require("./utils");
var _ErrorWrapper = _interopRequireDefault(require("./ErrorWrapper"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var create = _form.default.create,
  Item = _form.default.Item;
var GraphqlEditor = function GraphqlEditor(props) {
  var client = (0, _reactHooks.useApolloClient)();
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
            (0, _utils.doWindowResize)();
          }, 200);
        }
      },
      minuHeight: 0
    };
  });
  (0, _react.useEffect)(function () {}, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", null, "\n        \n        .graphiql-container .doc-explorer-title, .graphiql-container .history-title{\n            padding: 0px;\n            height: 34px;\n            line-height: 34px;\n        }\n        "), /*#__PURE__*/_react.default.createElement(_button.default, {
    onClick: function onClick(_) {
      return store.setVisible(true);
    }
  }, "Graphql\u7F16\u8F91\u5668"), /*#__PURE__*/_react.default.createElement(_mobxReactLite.Observer, null, function () {
    return /*#__PURE__*/_react.default.createElement(_FullScreenModal.default, {
      minuHeight: store.minuHeight,
      closable: false,
      onOk: function onOk() {},
      destroyOnClose: true,
      footer: /*#__PURE__*/_react.default.createElement("div", {
        ref: footerRef
      }, /*#__PURE__*/_react.default.createElement(_form.default, {
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement(_button.default, {
        type: "primary",
        onClick: function onClick(_) {
          var value = ref.current.getQueryEditor().getValue();
          if (props.onChange) {
            props.onChange(value);
          }
        }
      }, "\u4FDD\u5B58")), /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement(_button.default, {
        type: "danger",
        onClick: function onClick(_) {
          var value = ref.current.getQueryEditor().getValue();
          if (props.onChange) {
            props.onChange(value);
          }
          store.setVisible(false);
        }
      }, "\u4FDD\u5B58\u5E76\u5173\u95ED")), /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement(_button.default, {
        onClick: function onClick(_) {
          store.setVisible(false);
        }
      }, "\u5173\u95ED")))),
      onCancel: function onCancel(_) {
        return store.setVisible(false);
      },
      visible: store.visible,
      bodyStyle: {
        padding: 0
      }
    }, store.visible && /*#__PURE__*/_react.default.createElement(_ErrorWrapper.default, null, function () {
      return /*#__PURE__*/_react.default.createElement(_graphiql.default, {
        query: props.value,
        ref: ref
        // response={`{a:1}`}
        //   query={null}
        ,
        storage: {
          getItem: function getItem() {},
          setItem: function setItem() {}
        },
        operationName: 'query',
        fetcher: function fetcher(param) {
          return client.query({
            query: (0, _graphqlTag.default)(param.query)
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_graphiql.default.Logo, null, "FPB Graphiql"));
    }));
  }));
};
exports.default = GraphqlEditor;
//# sourceMappingURL=GraphqlEditor.js.map