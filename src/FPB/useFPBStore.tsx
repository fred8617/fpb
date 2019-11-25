import React, { ExoticComponent } from 'react';
import { useLocalStore, useForceUpdate } from 'mobx-react-lite';
import { doWindowResize } from './utils';
import { toJS, set, remove } from 'mobx';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Size } from 'react-split-pane';
import shortid from 'shortid';
import { ItemSettingProps } from './ItemSettingForm';
import { FormComponentProps, ValidationRule } from 'antd/lib/form';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ApolloClient } from 'apollo-boost';
import debounce from 'lodash/debounce';
const emptyLayouts: BreakpointsLayouts = {
  xxl: [],
  xl: [],
  lg: [],
  md: [],
  sm: [],
  xs: [],
};
interface Breakpoints {
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}
type ColNumber = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
interface Cols {
  xxl?: ColNumber;
  xl?: ColNumber;
  lg?: ColNumber;
  md?: ColNumber;
  sm?: ColNumber;
  xs?: ColNumber;
}
/**
 * RGL的基础配置
 */
export interface RGLConfig {
  draggableCancel: string;
  /**
   * 元素单位高度
   */
  rowHeight?: number;
  /**
   * 元素间距
   */
  margin?: [number, number];
  /**
   *元素的断点布局
   */
  layouts: BreakpointsLayouts;
  /**
   * 响应断点宽度
   */
  breakpoints: Breakpoints;
  /**
   * 断点对应格子数
   */
  cols: Cols;
}

/**
 * RGL元素
 */
export interface RGLItem {
  /**
   * A string corresponding to the component key
   */
  i: string;
  /**
   * These are all in grid units, not pixels
   */
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  // If true equal to `isDraggable: false, isResizable: false`.
  static?: boolean;
  moved?: boolean;
  // If false, will not be draggable. Overrides `static`.
  isDraggable?: boolean;
  // If false, will not be resizable. Overrides `static`.
  isResizable?: boolean;
}

/**
 * 断点布局
 */
export interface BreakpointsLayouts {
  xxl?: RGLItem[];
  xl?: RGLItem[];
  lg?: RGLItem[];
  md?: RGLItem[];
  sm?: RGLItem[];
  xs?: RGLItem[];
}

/**
 * 组件基础属性
 */
interface BaseComponentProp {
  /**
   * 属性名称
   */
  label: string;
  /**
   * 类型
   */
  type:
    | 'array:component'
    | 'array:string'
    | 'string'
    | 'number'
    | 'FPR'
    | 'graphql';
  /**
   * 校验规则
   */
  rules?: ValidationRule[];
  /**
   * 组件
   */
  Component?: React.ComponentClass | ExoticComponent | null | React.SFC;
  /**
   * type为array时是否默认增加一个元素
   */
  shouldHaveOne?: boolean;
  /**
   * 存在组件的话可设置组件默认属性
   */
  componentProps?: ComponentProps;
}
export interface CommonComponentProp {
  /**
   * id,用于平铺组件查找,仅仅带有component类型的组件有
   */
  id: string;
}
/**
 * 数组组件属性
 */
export interface ArrayComponentProp
  extends BaseComponentProp,
    CommonComponentProp {
  /**
   * 类型
   */
  type: 'array:component';
  /**
   * 组件
   */
  Component: React.ComponentClass | ExoticComponent | React.SFC;
  /**
   * type为array时是否默认增加一个元素
   */
  shouldHaveOne?: boolean;
  /**
   * 存在组件的话可设置组件默认属性
   */
  componentProps?: ComponentProps;
}
/**
 * 数组字符串
 */
export interface ArrayStringProp extends BaseComponentProp {
  /**
   * 类型
   */
  type: 'array:string';
  /**
   * type为array时是否默认增加一个元素
   */
  shouldHaveOne?: boolean;
}

export interface FPRProp extends BaseComponentProp {
  type: 'FPR';
}

export interface StringProp extends BaseComponentProp {
  /**
   * 类型
   */
  type: 'string';
}
export interface GraphqlProp extends BaseComponentProp {
  /**
   * 类型
   */
  type: 'graphql';
}
export type ComponentPropsCommon =
  | FPRProp
  | ArrayComponentProp
  | ArrayStringProp
  | StringProp
  | GraphqlProp;

export type ComponentPropsChildren =
  | FPRProp
  | ArrayComponentProp
  | ArrayStringProp
  | StringProp;

export interface ComponentProps {
  [propName: string]: ComponentPropsCommon;

  children?: ComponentPropsChildren;
}

/**
 * 组件基础
 */
export interface BaseComponentType {
  /**
   * 主键
   */
  id: string;
  /**
   * 组件名称
   */
  label: string;
  /**
   * 组件引入名称
   */
  name: string;
  asName?: string;
  /**
   * 子组件
   */
  children?: Omit<BaseComponentType, 'children'>[];
  /**
   * 父组件
   */
  parent?: BaseComponentType;
  /**
   * 组件,本想dynamic import 一下，但是webpack不支持
   */
  Component: React.ComponentClass | React.SFC;
  /**
   * 组件属性
   */
  componentProps?: ComponentProps;
  /**
   * 是否可为表单域
   */
  formField?: boolean;
}

/**
 * 组件类型
 */
export interface ComponentType extends BaseComponentType {
  /**
   * 引入路径
   */
  path: string;
  /**
   * 是否为默认引入
   */
  isDefault: boolean;
  /**
   * 分组
   */
  group?: string;
}

export interface ComponentGroup {
  [groupName: string]: ComponentType[] | string;
}

export interface FPBProps extends FormComponentProps {
  /**
   * 断点差值
   */
  breakpointDiff?: number;
  /**
   * 外层自定义布局
   * @param showPart 主要显示内容
   */
  layout?(showPart: React.ReactElement): React.ReactElement;
  FPR?: boolean;
  forwardRef?: any;
  /**
   * 延迟渲染，在模态框弹出动画非常有用，antd modal设置200即可
   */
  renderDelay?: number;
  /**
   * 渲染其他操作
   */
  renderActions?(): React.ReactElement;
  defaultDatas?: FPBConfig;
  /**
   * 左侧布局的默认宽度
   */
  contentDefaultSize?: Size;
  /**
   * 导入组件
   */
  components: ComponentType[];
  /**
   * 父级断点，存在时可以锁死断点?很奇怪的是局部宽度响应了fpr
   */
  breakpoint?: Breakpoint;
}
export interface ApolloFPBProps extends FPBProps {
  client: ApolloClient<any>;
}
export interface BreakpointsConfig {
  breakpoints: string[];
  cols: Cols;
}

export interface FPBConfig {
  /**
   *元素的断点布局
   */
  layouts: BreakpointsLayouts;
  /**
   * 数据源
   */
  datas: FPBItemIndexListInitial;
  /**
   * 断点对应格子数
   */
  cols?: Cols;
  /**
   * 包含断点
   */
  breakpoints?: string[];
}
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
/**
 * pb的store
 */
export interface FPBStore extends RGLConfig, ItemSettingProps {
  /**
   * 不让拖拽的样式名称
   */
  draggableCancelClassName: string;
  /**
   * 编辑元素窗口的标题，取i
   */
  editingTitle: string;
  setBreakpointFromEntry(breakpoints: any, breakpointDiff?: number);
  /**
   * 获取全部配置项以及数据
   */
  config: FPBConfig;
  /**
   * 删除区块
   * @param itemKey 主键
   */
  deleteItem(itemKey: string): void;
  /**
   * 模式
   * @enum Mode
   */
  mode: Mode;
  changeMode: (e: RadioChangeEvent) => void;
  /**
   * 模式
   */
  isPreview: boolean;
  isDesign: boolean;
  /**
   * 索引数据源
   */
  datas: FPBItemIndexList;
  hasLayout: () => boolean;
  breakpoint: Breakpoint;
  /**
   * 断点数组的key
   */
  breakpointsArr: string[];
  /**
   * 获取当前所有断点的布局数组
   */
  computedLayout: BreakpointsLayouts;
  /**
   *断点计算配置用于表单初始值
   */
  breakpointsConfig: BreakpointsConfig;
  /**
   * 布局变更
   * @param currentLayout 当前布局
   * @param layouts 变更后布局
   */
  setLayouts(currentLayout: BreakpointsLayouts, layouts: BreakpointsLayouts);
  /**
   * 数据集合变更
   *
   * @param datas 数据集合
   */
  setDatas(datas);
  /**
   * 设置当前断点
   * @param breakpoint 当前断点
   * @param col 布局列
   */
  setBreakpoint(breakpoint, col?);
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
  findItem(key: string): RGLItem;
  /**
   * 找出全部断点下的当前item
   */
  findItemInAllBreakpoints(key: string): { [point: string]: RGLItem };
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
  editingItem: FPBItem;
  /**
   * 设置编辑中的数据
   * @param item @interface FPBItem
   */
  setEditingItem(item: FPBItem);
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
  breakpointSettingVisible: boolean;
  setBreakpointSettingVisible(breakpointSettingVisible: boolean);
  /**
   * 设置布局断点配置
   */
  setBreakpointConfig(values);
}
export type RGLItemCallBack = (
  layout: RGLItem[],
  /**
   * 旧数据
   */
  oldItem: RGLItem,
  /**
   * 新数据
   */
  newItem: RGLItem,
  placeholder: RGLItem,
  e: MouseEvent,
  element: HTMLElement,
) => void;
export interface FPBItemIndexList {
  [key: string]: FPBItem;
}
export interface FPBItemIndexListInitial {
  [key: string]: Omit<FPBItem, 'Component'>;
}

export enum Mode {
  /**
   * 设计模式
   */
  DESIGN = 'design',
  /**
   * 预览模式
   */
  PRIVIEW = 'priview',
}

/**
 * fpb元素
 */
export interface FPBItem {
  /**
   * 主键
   */
  i: string;
  /**
   * 组件类
   */
  Component: React.ComponentClass | React.SFC;
  /**
   * 组件属性
   */
  componentProps: { [key: string]: any };
  /**
   * 自适应高度
   */
  autoHeight: boolean;
  /**
   * 组件id
   */
  componentId: string;
  /**
   * 是否为表单域
   */
  isFormField: boolean;
  /**
   * 表单域id,默认为i
   */
  $id: string;
  /**
   * 表单域的label
   */
  label?: string;
}
// xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
// xxl
export const breakpointsStandard: Breakpoints = {
  xl: 1600,
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 576,
  // xs: 0
};
const defaultbreakpoints: Breakpoints = {
  lg: breakpointsStandard.lg,
  // md: breakpointsStandard.md
};
const defaultCols: Cols = { xxl: 12, xl: 12, lg: 8, md: 6, sm: 4, xs: 2 };

const useFPBStore = (props): FPBStore => {
  const force = useForceUpdate();
  const store: FPBStore = useLocalStore<
    FPBStore,
    Omit<Omit<FPBProps, 'form'>, 'apolloClient'>
  >(
    source => ({
      rowHeight: 1,
      margin: [0, 0],
      layouts: emptyLayouts,
      breakpoints: defaultbreakpoints,
      cols: defaultCols,
      get draggableCancelClassName() {
        return shortid.generate();
      },
      get draggableCancel() {
        return store.editingItem !== null || store.isPreview
          ? `.${store.draggableCancelClassName}`
          : '';
      },
      /*********************** */
      get editingTitle() {
        return store.editingItem && store.editingItem.i;
      },
      get config() {
        return toJS<FPBConfig>(
          {
            datas: store.datas,
            layouts: store.layouts,
            cols: store.cols,
            breakpoints: store.breakpointsArr,
          },
          { recurseEverything: true },
        );
      },
      mode: Mode.DESIGN,
      get isDesign() {
        return store.mode === Mode.DESIGN;
      },
      get isPreview() {
        return store.mode === Mode.PRIVIEW;
      },
      changeMode(e) {
        store.mode = e.target.value;
      },
      datas: {},
      breakpoint: 'lg',
      defaultFormField: true,
      get breakpointsConfig() {
        return {
          breakpoints: store.breakpointsArr,
          cols: store.cols,
        };
      },
      get breakpointsArr() {
        return Object.keys(store.breakpoints);
      },
      get computedLayout() {
        return Object.fromEntries(
          store.breakpointsArr.map(point => [
            point,
            store.layouts[point] || [],
          ]),
        );
      },
      hasLayout() {
        return Object.keys(store.datas).length !== 0;
      },
      setDatas(datas: any) {
        const entries = Object.fromEntries(
          Object.entries(datas).map(([key, data]: [string, any]) => [
            key,
            {
              ...data,
              Component:
                data.componentId &&
                store.flatComponents[data.componentId].Component,
            },
          ]),
        ) as any;
        store.datas = entries;
      },
      setLayouts(_currentLayout, layouts) {
        if (JSON.stringify(store.layouts) == JSON.stringify(layouts)) {
          return;
        }
        console.log('layout-change', toJS(store.layouts), layouts);
        store.layouts = layouts;
      },
      setBreakpoint(breakpoint, _col) {
        console.log('setBreakpoint', breakpoint, store.datas);

        store.breakpoint = source.breakpoint || breakpoint;
      },
      setBreakpointFromEntry(breakpoints, breakpointDiff = 0) {
        store.breakpoints = Object.fromEntries(
          breakpoints.map(point => [
            point,
            breakpointsStandard[point] + breakpointDiff,
          ]),
        );
      },
      setBreakpointConfig(values) {
        store.setBreakpointFromEntry(values.breakpoints);
        store.cols = {
          ...store.cols,
          ...values.cols,
        };
        store.setBreakpointSettingVisible(false);
      },
      deleteItem(key) {
        remove(store.datas, key);
        force();
        // setTimeout(doWindowResize,300)
      },
      get jsConfig() {
        return toJS(
          {
            layouts: store.computedLayout,
            rowHeight: store.rowHeight,
            margin: store.margin,
            breakpoints: store.breakpoints,
            cols: store.cols,
            onBreakpointChange: store.setBreakpoint,
            onLayoutChange: store.setLayouts,
            onResize: store.onResize,
            onResizeStop: store.onResizeStop,
            draggableCancel: store.draggableCancel,
            //此处是个问题
            // isDraggable: store.editingItem === null && !store.isPreview,
            // isResizable: store.editingItem === null && !store.isPreview,
          },
          { recurseEverything: true },
        );
      },

      operatedItem: null,
      setOperatedItem(operatedItem) {
        store.operatedItem = operatedItem;
      },
      onResize(_layout, _oldItem, newItem) {
        store.setOperatedItem(newItem);
      },
      onResizeStop() {
        store.setOperatedItem(null);
      },
      findItem(key) {
        return store.layouts[store.breakpoint].find(b => b.i === key);
      },
      findItemInAllBreakpoints(key) {
        return Object.fromEntries(
          Object.entries(store.layouts).map(([point, items]) => [
            point,
            items.find((item: { i: string }) => item.i === key),
          ]),
        );
      },
      getItemHeight(key) {
        const item = store.findItem(key);
        return item && item.h;
      },
      caclHeight(height, key) {
        const itemData = store.datas[key];
        const item = store.findItem(key);
        const breakpointsItems = store.findItemInAllBreakpoints(key);
        if (!itemData.autoHeight) {
          Object.values(breakpointsItems).forEach(item => {
            if (item) {
              delete item.maxH;
              delete item.minH;
            }
          });

          return;
        }
        if (height === null || height === undefined) {
          return;
        }
        //store中对应的数据，非布局
        const h = Math.ceil(height / store.rowHeight);
        item.h = h || 30;
        item.maxH = item.h;
        item.minH = item.h;
        // debounce(doWindowResize,200)
        // console.log(store.layouts);

        // store.setLayouts([] as any, store.layouts);
      },
      createItem() {
        const i = shortid.generate();
        // store.layouts[store.breakpoint].push(item);
        const newItem: FPBItem = {
          i,
          Component: null,
          autoHeight: true,
          componentProps: {},
          componentId: null,
          isFormField: null,
          $id: null,
        };
        set(store.datas, i, newItem);
        force();
        // setTimeout(doWindowResize, 200);
      },
      editingItem: null,
      onItemTypeChange(value) {
        if (!value) {
          store.editingItem.Component = null;
          store.editingItem.componentProps = null;
          store.editingItem.isFormField = null;
          delete store.editingItem.label;
          return;
        }
        const component = store.flatComponents[value];

        store.editingItem.Component = component.Component;
        store.editingItem.componentProps = {};
        if (component.formField) {
          store.editingItem.isFormField = store.defaultFormField;
          // store.editingItem.label = "";
          set(store.editingItem, 'label', '');
          // .label = '';
          //这里默认给i值吧
          // store.editingItem.$id = shortid.generate()
        }

        // Object.entries(component.componentProps).
        // store.editingItem.componentProps = ;
        store.editingItem.componentId = value;

        // set(store.editingItem, field, value);
      },
      onItemPropsChange(field, value) {
        store.editingItem[field] = value;
      },
      get isEditing() {
        return store.editingItem !== null;
      },
      setEditingItem(editingItem) {
        store.editingItem = editingItem;
      },
      get flatComponents() {
        const flatComponents = {};
        const dealChildren = (
          arr: (ComponentType | BaseComponentType)[] = source.components,
          parent?: ComponentType | BaseComponentType,
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
      },
      get componentGroup() {
        //有分组组件
        const componentsHasGroup = source.components.filter(
          component => component.group,
        );
        //无分组组件
        const componentsNoGroup = source.components.filter(
          component => !component.group,
        );
        //全部分组
        const allGroup = [
          ...new Set(componentsHasGroup.map(component => component.group)),
        ];
        //自动分组
        const returnGroup = [];
        allGroup.forEach(group => {
          const filterGroup = componentsHasGroup.filter(
            component => component.group === group,
          );
          returnGroup.push({ [group]: filterGroup, groupName: group });
        });
        componentsNoGroup.forEach(component => {
          returnGroup.push(component);
        });
        return returnGroup;
      },
      breakpointSettingVisible: false,
      setBreakpointSettingVisible(breakpointSettingVisible) {
        store.breakpointSettingVisible = breakpointSettingVisible;
      },
    }),
    { components: props.components, breakpoint: props.breakpoint },
  );
  return store;
};

export default useFPBStore;
