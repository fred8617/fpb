"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _mobx = require("mobx");

var _lodash = _interopRequireDefault(require("lodash"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23;

function loadAntElement(name) {
  var element;

  switch (name) {
    case 'input':
      element = import('antd/lib/input');
      break;

    default:
      element = import('antd/lib/input');
  }

  return element;
}

var Store = (_class =
/*#__PURE__*/
function () {
  function Store() {
    (0, _classCallCheck2.default)(this, Store);
    this.counter = 0;
    this.formElements = [//表单元素选项
    {
      name: "\u6587\u672C\u8F93\u5165\u6846",
      value: "input"
    }, {
      name: "\u6570\u5B57\u8F93\u5165\u6846",
      value: "input-number"
    }, {
      name: "\u4E0B\u62C9\u6846",
      value: "select"
    }, {
      name: "\u5355\u9009\u6846",
      value: "radio"
    }, {
      name: "\u590D\u9009\u6846",
      value: "checkbox"
    }, {
      name: "\u65E5\u671F\u8F93\u5165\u6846",
      value: "date-picker"
    }, {
      name: "\u65F6\u95F4\u8F93\u5165\u6846",
      value: "time-picker"
    }];
    (0, _initializerDefineProperty2.default)(this, "mode", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "compact", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "toolHide", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "toolDefaultLeft", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "settingDrawerVisible", _descriptor5, this);
    (0, _initializerDefineProperty2.default)(this, "layoutDrawerPlacement", _descriptor6, this);
    (0, _initializerDefineProperty2.default)(this, "itemSettingDrawerVisible", _descriptor7, this);
    (0, _initializerDefineProperty2.default)(this, "editingItem", _descriptor8, this);
    (0, _initializerDefineProperty2.default)(this, "layout", _descriptor9, this);
    (0, _initializerDefineProperty2.default)(this, "layoutData", _descriptor10, this);
    (0, _initializerDefineProperty2.default)(this, "toggleTool", _descriptor11, this);
    (0, _initializerDefineProperty2.default)(this, "setDefaultLeft", _descriptor12, this);
    (0, _initializerDefineProperty2.default)(this, "layoutDrawerPlacementChange", _descriptor13, this);
    (0, _initializerDefineProperty2.default)(this, "showSettingDrawer", _descriptor14, this);
    (0, _initializerDefineProperty2.default)(this, "setLayoutData", _descriptor15, this);
    (0, _initializerDefineProperty2.default)(this, "showItemSettingDrawer", _descriptor16, this);
    (0, _initializerDefineProperty2.default)(this, "itemTypeChange", _descriptor17, this);
    (0, _initializerDefineProperty2.default)(this, "hideSettingDrawer", _descriptor18, this);
    (0, _initializerDefineProperty2.default)(this, "hideItemSettingDrawer", _descriptor19, this);
    (0, _initializerDefineProperty2.default)(this, "addItem", _descriptor20, this);
    (0, _initializerDefineProperty2.default)(this, "deleteItem", _descriptor21, this);
    (0, _initializerDefineProperty2.default)(this, "setMode", _descriptor22, this);
    (0, _initializerDefineProperty2.default)(this, "setCompact", _descriptor23, this);
  }

  (0, _createClass2.default)(Store, [{
    key: "onLayoutChange",
    value: function onLayoutChange(layout) {
      // console.log(layout);
      this.layout = layout;
    }
  }, {
    key: "toolIcon",
    //默认左偏移
    get: function get() {
      //工具板图标
      return this.toolHide ? "right" : "left";
    }
  }, {
    key: "preventCollision",
    get: function get() {
      //碰撞失效
      return this.compact === "none";
    }
  }, {
    key: "toolLeft",
    get: function get() {
      //工具板left
      return this.toolHide ? -this.toolDefaultLeft : 0;
    }
  }, {
    key: "addDisabled",
    get: function get() {
      //添加禁用
      return this.mode !== "develop" || this.editingItem != null;
      /**/

      ;
    }
  }, {
    key: "isDraggable",
    get: function get() {
      //是否可拖拽
      return this.mode === "develop" && this.editingItem == null;
    }
  }, {
    key: "drawerBodyStyle",
    get: function get() {
      //抽屉体样式
      var style = {
        overflow: "auto"
      };

      if (this.layoutDrawerPlacement == "left" || this.layoutDrawerPlacement == "right") {
        style.height = "93%";
      } else {
        style.height = 192;
      }

      return style;
    }
  }, {
    key: "isResizable",
    get: function get() {
      //是否可缩放
      return this.isDraggable;
      /**/
    }
  }, {
    key: "minCol",
    get: function get() {
      //最小栅格所需数量
      var min = 0;
      this.layoutData.forEach(function (e) {
        return min = Math.max(min, e.w);
      });
      return min;
    }
  }]);
  return Store;
}(), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "mode", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "develop";
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "compact", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "vertical";
  }
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "toolHide", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "toolDefaultLeft", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 9999;
  }
}), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "toolIcon", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "toolIcon"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "preventCollision", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "preventCollision"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "toolLeft", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "toolLeft"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "addDisabled", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "addDisabled"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "isDraggable", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDraggable"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "drawerBodyStyle", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "drawerBodyStyle"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "isResizable", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isResizable"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "minCol", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "minCol"), _class.prototype), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "settingDrawerVisible", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutDrawerPlacement", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "right";
  }
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "itemSettingDrawerVisible", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "editingItem", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layout", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor10 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor11 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "toggleTool", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (e) {
      //工具版切换
      _this.toolHide = !_this.toolHide;
    };
  }
}), _descriptor12 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "setDefaultLeft", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (e) {
      //工具版切换
      _this2.toolDefaultLeft = e;
    };
  }
}), _descriptor13 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutDrawerPlacementChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (e) {
      //布局抽屉方向变化
      _this3.layoutDrawerPlacement = e.target.value;
    };
  }
}), _descriptor14 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "showSettingDrawer", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.toggleTool();

      _this4.settingDrawerVisible = true;
    };
  }
}), _descriptor15 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "setLayoutData", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (layoutData) {
      _this5.layoutData = layoutData;
    };
  }
}), _descriptor16 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "showItemSettingDrawer", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      //开始编辑
      _this6.editingItem = e;
      _this6.itemSettingDrawerVisible = true;
    };
  }
}), _descriptor17 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "itemTypeChange", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return (
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(e) {
          var el;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this7.editingItem.type = e;
                  _context.next = 3;
                  return loadAntElement(e);

                case 3:
                  el = _context.sent;
                  (0, _mobx.runInAction)(function () {
                    _this7.editingItem.ComponentClass = el.default;
                  }); // console.log(el);
                  // this.editingItem.ComponentClass=await import(`${ANTD_PREFIX}/${e}`).then(e=>{
                  //   console.log(e);
                  // }).catch(e=>{
                  //   console.log(e);
                  // });

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  }
}), _descriptor18 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "hideSettingDrawer", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function () {
      //收起全局设置
      _this8.settingDrawerVisible = false;
    };
  }
}), _descriptor19 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "hideItemSettingDrawer", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function () {
      //收起元素设置
      _this9.itemSettingDrawerVisible = false;
      _this9.editingItem = null;
    };
  }
}), _descriptor20 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "addItem", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function () {
      _this10.layout.push({
        x: 0,
        w: 1,
        h: 1,
        y: Infinity,
        i: "item".concat(_this10.counter),
        type: 'blank',
        ComponentClass: null
      });

      _this10.counter++;
    };
  }
}), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "onLayoutChange", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "onLayoutChange"), _class.prototype), _descriptor21 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "deleteItem", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return function (e) {
      // console.log(e);
      _this11.layout.remove(e); // console.log(_.reject(toJS(this.layout), { i:`Block${i}`}));
      // const re=_.reject(toJS(this.layout), { oriKey});
      // console.log(re);
      // this.layout=re

    };
  }
}), _descriptor22 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "setMode", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this12 = this;

    return function (_ref2) {
      var stopPropagation = _ref2.stopPropagation,
          value = _ref2.target.value;
      //设置模式
      _this12.mode = value;
    };
  }
}), _descriptor23 = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "setCompact", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this13 = this;

    return function (_ref3) {
      var stopPropagation = _ref3.stopPropagation,
          value = _ref3.target.value;
      //设置碰撞
      _this13.compact = value;
    };
  }
})), _class);
exports.default = Store;