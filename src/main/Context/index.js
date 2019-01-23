"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormConsume = exports.Provider = exports.setChangeField = exports.changField = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _createContext = (0, _react.createContext)({}),
    Pro = _createContext.Provider,
    Consumer = _createContext.Consumer;

var changField;
exports.changField = changField;

var setChangeField = function setChangeField(fieldName) {
  exports.changField = changField = fieldName;
};

exports.setChangeField = setChangeField;
var Provider = Pro;
exports.Provider = Provider;

var FormConsume = function FormConsume(Component) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (e) {
      return _react.default.createElement(Component, (0, _extends2.default)({}, props, e));
    });
  };
};

exports.FormConsume = FormConsume;