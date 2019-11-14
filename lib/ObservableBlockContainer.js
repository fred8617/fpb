"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/popover/style/css");

var _popover = _interopRequireDefault(require("antd/lib/popover"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

var _mobxReactLite = require("mobx-react-lite");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObservableBlockContainer = function ObservableBlockContainer(props) {
  return _react.default.createElement(_mobxReactLite.Observer, null, function () {
    var hasEditingItem = props.store.isEditing;
    var isEditingItem = props.store.editingItem && props.store.editingItem.i === props.itemKey;
    var hasBorder = !hasEditingItem || isEditingItem;
    var border = "1px solid ".concat(isEditingItem ? '#e72727' : '#d3d3d3');
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: "item-container",
      style: {
        border: hasBorder ? border : null,
        zIndex: isEditingItem ? null : 1,
        boxSizing: isEditingItem ? 'content-box' : null
      }
    }, !isEditingItem && _react.default.createElement(_popover.default, {
      trigger: "contextMenu",
      content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_form.default, {
        layout: "inline"
      }, _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
        icon: "edit",
        onClick: function onClick(_) {
          props.store.setEditingItem(props.data);
        },
        type: "primary"
      })), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
        icon: "delete",
        type: "danger",
        onClick: function onClick(_) {
          return props.store.deleteItem(props.itemKey);
        }
      }))))
    }, _react.default.createElement("div", {
      className: "function-container",
      style: {
        cursor: props.store.draggableCancel ? 'not-allowed' : null
      }
    }))));
  });
};

var _default = ObservableBlockContainer;
exports.default = _default;
//# sourceMappingURL=ObservableBlockContainer.js.map