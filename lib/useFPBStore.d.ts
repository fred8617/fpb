import React, { ExoticComponent } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Size } from 'react-split-pane';
import { ItemSettingProps } from './ItemSettingForm';
import { FormComponentProps, ValidationRule } from 'antd/lib/form';
import { RadioChangeEvent } from 'antd/lib/radio';
interface Breakpoints {
    xxl?: number;
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
}
declare type ColNumber = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
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
    static?: boolean;
    isDraggable?: boolean;
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
    type: 'array:component' | 'array:string' | 'string' | 'number' | 'FPR' | 'graphql';
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
/**
 * 数组组件属性
 */
export interface ArrayComponentProp extends BaseComponentProp {
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
export interface ComponentProps {
    [propName: string]: FPRProp | ArrayComponentProp | ArrayStringProp | StringProp | GraphqlProp;
    children?: FPRProp | ArrayComponentProp | ArrayStringProp | StringProp;
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
    /**
     * 子组件
     */
    children?: BaseComponentType[];
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
    FPR?: boolean;
    forwardRef?: any;
    /**
     * 延迟渲染，在模态框弹出动画非常有用，antd modal设置200即可
     */
    renderDelay?: number;
    defaultDatas?: FPBConfig;
    /**
     * 左侧布局的默认宽度
     */
    contentDefaultSize?: Size;
    /**
     * 导入组件
     */
    components: ComponentType[];
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
/**
 * pb的store
 */
export interface FPBStore extends RGLConfig, ItemSettingProps {
    setBreakpointFromEntry(breakpoints: any): any;
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
    isPreview: boolean;
    /**
     * 索引数据源
     */
    datas: FPBItemIndexList;
    hasLayout: () => boolean;
    breakpoint: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
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
    setLayouts(currentLayout: BreakpointsLayouts, layouts: BreakpointsLayouts): any;
    /**
     * 数据集合变更
     *
     * @param datas 数据集合
     */
    setDatas(datas: any): any;
    /**
     * 设置当前断点
     * @param breakpoint 当前断点
     * @param col 布局列
     */
    setBreakpoint(breakpoint: any, col?: any): any;
    /**
     * RGLConfig
     */
    jsConfig: RGLConfig;
    /**
     * 根据高度计算元素相对的h
     * @param height 高度
     * @param key 主键
     */
    caclHeight(height: number | null | undefined, key: string): any;
    /**
     * 创建一个元素
     */
    createItem(): any;
    /**
     * 根据主键查询当前断点下的item
     * @param key 主键
     */
    findItem(key: string): RGLItem;
    /**
     * 找出全部断点下的当前item
     */
    findItemInAllBreakpoints(key: string): {
        [point: string]: RGLItem;
    };
    /**
     * 获取元素当前响应布局高度高度
     * @param key 主键
     */
    getItemHeight(key: any): number;
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
    setOperatedItem(item: RGLItem): any;
    /**
     * 编辑中的数据
     */
    editingItem: FPBItem;
    /**
     * 设置编辑中的数据
     * @param item @interface FPBItem
     */
    setEditingItem(item: FPBItem): any;
    /**
     * 编辑状态
     */
    isEditing: boolean;
    /**
     * 平铺组件，方便查找
     */
    flatComponents: {
        [id: string]: ComponentType;
    };
    /**
     * 组件的为formField,则编辑时默认表单域为true
     */
    defaultFormField: boolean;
    /**
     * 断点设置弹出
     */
    breakpointSettingVisible: boolean;
    setBreakpointSettingVisible(breakpointSettingVisible: boolean): any;
    /**
     * 设置布局断点配置
     */
    setBreakpointConfig(values: any): any;
}
export declare type RGLItemCallBack = (layout: RGLItem[], 
/**
 * 旧数据
 */
oldItem: RGLItem, 
/**
 * 新数据
 */
newItem: RGLItem, placeholder: RGLItem, e: MouseEvent, element: HTMLElement) => void;
export interface FPBItemIndexList {
    [key: string]: FPBItem;
}
export interface FPBItemIndexListInitial {
    [key: string]: Omit<FPBItem, 'Component'>;
}
export declare enum Mode {
    /**
     * 设计模式
     */
    DESIGN = "design",
    /**
     * 预览模式
     */
    PRIVIEW = "priview"
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
    componentProps: {
        [key: string]: any;
    };
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
export declare const breakpointsStandard: Breakpoints;
declare const useFPBStore: (props: any) => FPBStore;
export default useFPBStore;
//# sourceMappingURL=useFPBStore.d.ts.map