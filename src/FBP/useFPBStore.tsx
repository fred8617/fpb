import {
  RGLConfig,
  FPBItemIndexList,
  BreakPointsLayouts,
  RGLItem,
  FBPItem,
  RGLItemCallBack,
  BaseComponentType,
  FPBProps,
  ComponentType
} from "./FPB";

import { ItemSettingProps } from "./ItemSettingForm";

// import { ComponentType } from "react";
import { doWindowResize } from "./utils";
import { observable, action, computed, toJS, set } from "mobx";
import shortid from "shortid";
import { useRef } from "react";
import React from "react";
import { useLocalStore } from "mobx-react-lite";
/**
 * pb的store
 */
interface FPBStore extends RGLConfig, ItemSettingProps {
  source: Omit<FPBProps, "form">;
  force: any;
  datas: FPBItemIndexList;
  hasLayout: () => boolean;
  breakPoint: "lg" | "md" | "sm" | "xs" | "xxs";
  /**
   * 布局变更
   * @param currentLayout 当前布局
   * @param layouts 变更后布局
   */
  setLayouts(currentLayout: BreakPointsLayouts, layouts: BreakPointsLayouts);
  /**
   * 设置当前断点
   * @param breakPoint 当前断点
   * @param col 布局列
   */
  setBreakPoint(breakPoint, col);
  /**
   * RGLConfig
   */
  jsConfig: RGLConfig;
  /**
   * 根据高度计算元素相对的h
   * @param height 高度
   * @param key 主键
   */
  caclHeight(height: number | null | undefined, key: string);
  /**
   * 创建一个元素
   */
  createItem();
  /**
   * 根据主键查询当前断点下的item
   * @param key 主键
   */
  findItem(key): RGLItem;
  /**
   * 获取元素当前响应布局高度高度
   * @param key 主键
   */
  getItemHeight(key): number;
  /**
   * item的resize事件
   */
  onResize: RGLItemCallBack;
  onResizeStop: RGLItemCallBack;
  /**
   * 操作中的item
   */
  operatedItem: RGLItem;
  /**
   * 设置操作中数据
   * @param item @interface RGLItem
   */
  setOperatedItem(item: RGLItem);
  /**
   * 编辑中的数据
   */
  editingItem: FBPItem;
  /**
   * 设置编辑中的数据
   * @param item @interface FBPItem
   */
  setEditingItem(item: FBPItem);
  /**
   * 编辑状态
   */
  isEditing: boolean;
  /**
   * 平铺组件，方便查找
   */
  flatComponents: { [id: string]: ComponentType };
  /**
   * 组件的为formField,则编辑时默认表单域为true
   */
  defaultFormField: boolean;
  /**
   * 断点设置弹出
   */
  breakPointSettingVisible: boolean;
  setBreakPointSettingVisible(breakPointSettingVisible: boolean);
}
const emptyLayouts: BreakPointsLayouts = {
  lg: [],
  md: [],
  sm: [],
  xs: [],
  xxs: []
};
export class Store implements FPBStore {
  constructor(source, force) {
    this.source = source;
    this.force = force;
  }
  @observable source = null;
  @action force = () => {};
  @observable rowHeight = 1;
  @observable margin: [number, number] = [0, 0];
  @observable layouts = emptyLayouts;
  /*********************** */
  @observable datas = {};
  @observable defaultFormField = true;
  @action hasLayout = () => {
    return Object.keys(this.datas).length !== 0;
  };
  @observable breakPoint = null;
  @action setLayouts = (_currentLayout, layouts) => {
    if (JSON.stringify(this.layouts) == JSON.stringify(layouts)) {
      return;
    }
    console.log("layout-change", toJS(this.layouts), layouts);
    this.layouts = layouts;
  };
  @action setBreakPoint = (breakPoint, _col) => {
    console.log("setBreakPoint", breakPoint);

    this.breakPoint = breakPoint;
  };
  @computed get jsConfig() {
    return toJS(
      {
        layouts: this.layouts,
        rowHeight: this.rowHeight,
        margin: this.margin,
        onBreakpointChange: this.setBreakPoint,
        onLayoutChange: this.setLayouts,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        //此处是个问题
        isDraggable: this.editingItem === null,
        isResizable: this.editingItem === null
      },
      { recurseEverything: true }
    );
  }
  @observable operatedItem = null;
  @action setOperatedItem = operatedItem => {
    this.operatedItem = operatedItem;
  };
  @action onResize = (_layout, _oldItem, newItem) => {
    this.setOperatedItem(newItem);
  };
  @action onResizeStop = () => {
    this.setOperatedItem(null);
  };
  @action findItem = key => {
    return this.layouts[this.breakPoint].find(b => b.i === key);
  };
  @action getItemHeight = key => {
    const item = this.findItem(key);
    return item && item.h;
  };
  @action caclHeight = (height, key) => {
    const itemData = this.datas[key];
    const item = this.findItem(key);
    if (!itemData.autoHeight) {
      delete item.maxH;
      delete item.minH;
      return;
    }
    if (height === null || height === undefined) {
      return;
    }
    //store中对应的数据，非布局
    const h = Math.ceil(height / this.rowHeight);
    item.h = h || 30;
    item.maxH = item.h;
    item.minH = item.h;
  };
  @action createItem = () => {
    debugger;
    const i = shortid.generate();
    // this.layouts[this.breakPoint].push(item);
    const newItem: FBPItem = {
      i,
      Component: null,
      autoHeight: true,
      componentProps: {},
      componentId: null,
      isFormField: null,
      $id: null
    };
    set(this.datas, i, newItem);
    this.force();
    setTimeout(doWindowResize, 0);
  };
  @observable editingItem = null;
  @action onItemTypeChange = value => {
    if (!value) {
      this.editingItem.Component = null;
      this.editingItem.componentProps = null;
      this.editingItem.isFormField = null;
      return;
    }
    const component = this.flatComponents[value];

    this.editingItem.Component = component.Component;
    this.editingItem.componentProps = {};
    if (component.formField) {
      this.editingItem.isFormField = this.defaultFormField;
      //这里默认给i值吧
      // this.editingItem.$id = shortid.generate()
    }

    // Object.entries(component.componentProps).
    // this.editingItem.componentProps = ;
    this.editingItem.componentId = value;

    // set(this.editingItem, field, value);
  };
  @action onItemPropsChange = (field, value) => {
    this.editingItem[field] = value;
  };
  @computed get isEditing() {
    return this.editingItem !== null;
  }
  @action setEditingItem = editingItem => {
    this.editingItem = editingItem;
  };
  @computed get flatComponents() {
    const flatComponents = {};
    const dealChildren = (
      arr: (ComponentType | BaseComponentType)[] = (this.source&&this.source.components)||[],
      parent?: ComponentType | BaseComponentType
    ) => {
      arr.forEach(component => {
        flatComponents[component.id] = component;
        if (parent) {
          component.parent = parent;
        }
        if (component.children) {
          dealChildren(component.children, component);
        }
      });
    };
    dealChildren();
    return flatComponents;
  }
  @computed get componentGroup() {
    if (!this.source) {
      return [];
    }
    //有分组组件
    const componentsHasGroup = this.source.components.filter(
      component => component.group
    );
    //无分组组件
    const componentsNoGroup = this.source.components.filter(
      component => !component.group
    );
    //全部分组
    const allGroup = [
      ...new Set(componentsHasGroup.map(component => component.group))
    ];
    //自动分组
    const returnGroup = [];
    allGroup.forEach((group: string) => {
      const filterGroup = componentsHasGroup.filter(
        component => component.group === group
      );
      returnGroup.push({ [group]: filterGroup, groupName: group });
    });
    componentsNoGroup.forEach(component => {
      returnGroup.push(component);
    });
    return returnGroup;
  }
  @observable breakPointSettingVisible: false;
  @action setBreakPointSettingVisible = breakPointSettingVisible => {
    this.breakPointSettingVisible = breakPointSettingVisible;
  };
}
const storeContext = React.createContext({  });
export const StoreProvider = ({ children }) => {
  // const store = new Store();
  return (
    <storeContext.Provider value={{ store: {}}}>
      {children}
    </storeContext.Provider>
  );
};
const useFPBStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};

export default useFPBStore;
