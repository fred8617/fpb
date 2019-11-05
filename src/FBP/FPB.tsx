import { Responsive, WidthProvider } from "react-grid-layout";
import React, { ExoticComponent } from "react";
import {
  useLocalStore,
  useObserver,
  useForceUpdate,
  Observer
} from "mobx-react-lite";
import { doWindowResize } from "./utils";
import { toJS, set } from "mobx";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";
import {
  Empty,
  Row,
  Button,
  Col,
  Form,
  Popover,
  Drawer,
  Radio,
  Checkbox,
  Modal
} from "antd";
import SplitPane, { Size } from "react-split-pane";
import shortid from "shortid";
import ItemSettingForm, { ItemSettingProps } from "./ItemSettingForm";
import ObservableBlock from "./ObservableBlock";
import ObservableBlockContainer from "./ObservableBlockContainer";
import { FormProps, FormComponentProps } from "antd/lib/form";
import { Provider } from "./FormContext";
import BreakPointForm from "./BreakPointForm";
console.log(shortid);

const ResponsiveGridLayout = WidthProvider(Responsive);
const emptyLayouts: BreakPointsLayouts = {
  lg: [],
  md: [],
  sm: [],
  xs: [],
  xxs: []
};

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
  layouts: BreakPointsLayouts;
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
  // If false, will not be draggable. Overrides `static`.
  isDraggable?: boolean;
  // If false, will not be resizable. Overrides `static`.
  isResizable?: boolean;
}

/**
 * 断点布局
 */
export interface BreakPointsLayouts {
  lg?: RGLItem[];
  md?: RGLItem[];
  sm?: RGLItem[];
  xs?: RGLItem[];
  xxs?: RGLItem[];
}

interface ComponentProp {
  /**
   * 属性名称
   */
  label: string;
  /**
   * 类型
   */
  type: "array:component" | "array:string" | "string" | "number";
  /**
   * 组件
   */
  Component?: React.ComponentClass | ExoticComponent;
  /**
   * type为array时是否默认增加一个元素
   */
  createDefault?: boolean;
  /**
   * 存在组件的话可设置组件默认属性
   */
  componentProps?: ComponentProps;
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
  type: "array:component" | "array:string" | "string" | "number";
  /**
   * 组件
   */
  Component?: React.ComponentClass | ExoticComponent | null;
  /**
   * type为array时是否默认增加一个元素
   */
  createDefault?: boolean;
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
  type: "array:component";
  /**
   * 组件
   */
  Component: React.ComponentClass | ExoticComponent;
  /**
   * type为array时是否默认增加一个元素
   */
  createDefault?: boolean;
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
  type: "array:string";
  /**
   * type为array时是否默认增加一个元素
   */
  createDefault?: boolean;
}

export interface StringProp extends BaseComponentProp {
  /**
   * 类型
   */
  type: "string";
}

export interface ComponentProps {
  [propName: string]: ArrayComponentProp | ArrayStringProp | StringProp;
  children?: ArrayComponentProp | ArrayStringProp | StringProp;
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
  Component: React.ComponentClass;
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
   * 默认配置
   */
  defaultConfig?: RGLConfig;
  /**
   * 默认布局
   */
  defaultLayouts?: BreakPointsLayouts;
  /**
   * 左侧布局的默认宽度
   */
  contentDefaultSize?: Size;
  /**
   * 导入组件
   */
  components: ComponentType[];
}

/**
 * pb的store
 */
export interface FPBStore extends RGLConfig, ItemSettingProps {
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
  element: HTMLElement
) => void;
export interface FPBItemIndexList {
  [key: string]: FBPItem;
}

/**
 * fpb元素
 */
export interface FBPItem {
  /**
   * 主键
   */
  i: string;
  /**
   * 组件类
   */
  Component: React.ComponentClass;
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
}

const FPB: React.SFC<FPBProps> = props => {
  const force = useForceUpdate();
  const store: FPBStore = useLocalStore<FPBStore, Omit<FPBProps, "form">>(
    source => ({
      rowHeight: 1,
      margin: [0, 0],
      layouts: emptyLayouts,
      /*********************** */
      datas: {},
      defaultFormField: true,
      hasLayout() {
        return Object.keys(store.datas).length !== 0;
      },
      breakPoint: null,
      setLayouts(_currentLayout, layouts) {
        if (JSON.stringify(store.layouts) == JSON.stringify(layouts)) {
          return;
        }
        console.log("layout-change", toJS(store.layouts), layouts);
        store.layouts = layouts;
      },
      setBreakPoint(breakPoint, _col) {
        console.log("setBreakPoint", breakPoint);

        store.breakPoint = breakPoint;
      },
      get jsConfig() {
        return toJS(
          {
            layouts: store.layouts,
            rowHeight: store.rowHeight,
            margin: store.margin,
            onBreakpointChange: store.setBreakPoint,
            onLayoutChange: store.setLayouts,
            onResize: store.onResize,
            onResizeStop: store.onResizeStop,
            //此处是个问题
            isDraggable: store.editingItem === null,
            isResizable: store.editingItem === null
          },
          { recurseEverything: true }
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
        return store.layouts[store.breakPoint].find(b => b.i === key);
      },
      getItemHeight(key) {
        const item = store.findItem(key);
        return item && item.h;
      },
      caclHeight(height, key) {
        const itemData = store.datas[key];
        const item = store.findItem(key);
        if (!itemData.autoHeight) {
          delete item.maxH;
          delete item.minH;
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
      },
      createItem() {
        const i = shortid.generate();
        // store.layouts[store.breakPoint].push(item);
        const newItem: FBPItem = {
          i,
          Component: null,
          autoHeight: true,
          componentProps: {},
          componentId: null,
          isFormField: null,
          $id: null
        };
        set(store.datas, i, newItem);
        force();
        setTimeout(doWindowResize, 0);
      },
      editingItem: null,
      onItemTypeChange(value) {
        if (!value) {
          store.editingItem.Component = null;
          store.editingItem.componentProps = null;
          store.editingItem.isFormField = null;
          return;
        }
        const component = store.flatComponents[value];

        store.editingItem.Component = component.Component;
        store.editingItem.componentProps = {};
        if (component.formField) {
          store.editingItem.isFormField = store.defaultFormField;
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
      },
      get componentGroup() {
        //有分组组件
        const componentsHasGroup = source.components.filter(
          component => component.group
        );
        //无分组组件
        const componentsNoGroup = source.components.filter(
          component => !component.group
        );
        //全部分组
        const allGroup = [
          ...new Set(componentsHasGroup.map(component => component.group))
        ];
        //自动分组
        const returnGroup = [];
        allGroup.forEach(group => {
          const filterGroup = componentsHasGroup.filter(
            component => component.group === group
          );
          returnGroup.push({ [group]: filterGroup, groupName: group });
        });
        componentsNoGroup.forEach(component => {
          returnGroup.push(component);
        });
        return returnGroup;
      },
      breakPointSettingVisible: false,
      setBreakPointSettingVisible(breakPointSettingVisible) {
        store.breakPointSettingVisible = breakPointSettingVisible;
      }
    }),
    { components: props.components }
  );
  console.log("render", store);

  return (
    <>
      <SplitPane
        className="FPB"
        onDragFinished={doWindowResize}
        paneStyle={{ position: `relative` }}
        style={{ position: "relative" }}
        defaultSize={props.contentDefaultSize || `50%`}
        minSize={479}
        maxSize={1201}
      >
        <div style={{ position: `relative` }} key={"builder"}>
          <Observer>
            {() => (
              <>
                <Empty
                  style={{ display: store.hasLayout() ? "none" : "block" }}
                  description={"暂无元素"}
                />
                <Provider value={{ form: props.form }}>
                  <ResponsiveGridLayout
                    style={{ display: !store.hasLayout() ? "none" : "block" }}
                    // draggableHandle=".drag"
                    className="layout"
                    // onLayout
                    breakpoints={{
                      lg: 1200,
                      md: 996,
                      sm: 768,
                      xs: 480,
                      xxs: 0
                    }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    {...store.jsConfig}
                  >
                    {Object.entries(store.datas).map(([key, data]) => {
                      return (
                        <div key={key}>
                          <ObservableBlockContainer
                            store={store}
                            itemKey={key}
                            data={data}
                          />

                          <ObservableBlock store={store} i={key} />
                        </div>
                      );
                    })}
                  </ResponsiveGridLayout>
                </Provider>
              </>
            )}
          </Observer>
        </div>
        <div key="setting">
          <Observer>
            {() => (
              <Drawer
                destroyOnClose
                title={store.editingItem && store.editingItem.i}
                placement="right"
                width={`100%`}
                closable={store.isEditing}
                onClose={_ => store.setEditingItem(null)}
                visible={store.isEditing}
                getContainer={false}
                style={{ position: "absolute" }}
                bodyStyle={{
                  padding: 0,
                  height: `calc( 100% - 54.6px )`,
                  overflow: `auto`
                }}
              >
                <ItemSettingForm
                  item={store.editingItem}
                  onItemTypeChange={store.onItemTypeChange}
                  onItemPropsChange={store.onItemPropsChange}
                  componentGroup={store.componentGroup}
                  flatComponents={store.flatComponents}
                />
              </Drawer>
            )}
          </Observer>

          <Form layout="inline">
            <Form.Item>
              <Button
                type="primary"
                icon="plus"
                shape="circle-outline"
                onClick={store.createItem}
              ></Button>
            </Form.Item>
            <Form.Item label="断点">
              <Button onClick={_ => store.setBreakPointSettingVisible(true)}>
                断点
              </Button>
            </Form.Item>
            <Form.Item>
              <Radio.Group buttonStyle="solid">
                <Radio.Button>设计</Radio.Button>
                <Radio.Button>预览</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
          <div>
            <Button
              type="primary"
              icon="plus"
              shape="circle-outline"
              onClick={store.createItem}
            ></Button>
          </div>
        </div>
        {/* <div key={"designer"}>
          <SplitPane
            // onDragFinished={doWindowResize}
            paneStyle={{ position: `relative` }}
            style={{ position: "relative" }}
            defaultSize={`50%`}
            minSize={200}
            maxSize={`50%`}
          >
            <div key="tree"></div>
            
          </SplitPane>
        </div> */}
      </SplitPane>
      <Observer>
        {() => (
          <Modal
            title={"设置断点"}
            visible={store.breakPointSettingVisible}
            onCancel={_ => store.setBreakPointSettingVisible(false)}
          >
            <BreakPointForm />
          </Modal>
        )}
      </Observer>
    </>
  );
};
const FormFPB = Form.create<FPBProps>({ name: "FPB" })(FPB);
export { FormFPB as default };
