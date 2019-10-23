import { Responsive, WidthProvider } from "react-grid-layout";
import React, { SFC } from "react";
import { useLocalStore, useObserver, useForceUpdate } from "mobx-react-lite";
import { doWindowResize } from "./utils";
import { toJS, set } from "mobx";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";
import Block from "./Block";
import { Input, Empty, Row, Button, Col, Divider } from "antd";
import SplitPane, { Size } from "react-split-pane";
import shortid from "shortid";
const ResponsiveGridLayout = WidthProvider(Responsive);
var layout: RGLItem[] = [
  { i: "a", x: 0, y: 0, w: 1, h: 2 },
  { i: "b", x: 1, y: 0, w: 3, h: 2 },
  { i: "c", x: 4, y: 0, w: 1, h: 2 }
];
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
export interface FPBProps {
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
}

/**
 * pb的store
 */
export interface FPBStore extends RGLConfig {
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
   * 获取元素高度
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
}
type RGLItemCallBack = (
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
  i;
}

export interface ObservableBlockProps {
  i;
  store: FPBStore;
}
const ObservableBlock: SFC<ObservableBlockProps> = (
  props: ObservableBlockProps
) =>
  useObserver(() => {
    return (
      <Block
        height={
          props.store.operatedItem && props.store.operatedItem.i === props.i
            ? props.store.operatedItem.h
            : props.store.getItemHeight(props.i)
        }
        breakPoint={props.store.breakPoint}
        onParentHeightChange={height => {
          props.store.caclHeight(height, props.i);
        }}
      >
        <Input.TextArea />
      </Block>
    );
  });
const FPB: React.SFC<FPBProps> = React.memo(props => {
  const force = useForceUpdate();
  const store: FPBStore = useLocalStore<FPBStore, FPBProps>(source => ({
    rowHeight: 1,
    margin: [0, 0],
    layouts: emptyLayouts,
    /*********************** */
    datas: {},
    hasLayout() {
      return Object.keys(store.datas).length !== 0;
    },
    breakPoint: null,
    setLayouts(currentLayout, layouts) {
      if (JSON.stringify(store.layouts) == JSON.stringify(layouts)) {
        return;
      }
      console.log("layout-change", toJS(store.layouts), layouts);
      store.layouts = layouts;
    },
    setBreakPoint(breakPoint, col) {
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
          onResizeStop: store.onResizeStop
        },
        { recurseEverything: true }
      );
    },
    operatedItem: null,
    onResize(layout, oldItem, newItem) {
      store.operatedItem = newItem;
    },
    onResizeStop() {
      store.operatedItem = null;
    },
    findItem(key) {
      return store.layouts[store.breakPoint].find(b => b.i === key);
    },
    getItemHeight(key) {
      const item = store.findItem(key);
      return item && item.h;
    },
    caclHeight(height, key) {
      if (height === null || height === undefined) {
        return;
      }
      const item = store.findItem(key);
      const h = Math.ceil(height / store.rowHeight);
      item.h = h || 30;
    },
    createItem() {
      const i = shortid.generate();
      const item: RGLItem = {
        i,
        x: 0,
        y: Infinity,
        w: 1,
        h: 30
      };
      // store.layouts[store.breakPoint].push(item);
      set(store.datas, i, { i });
      force();
      setTimeout(doWindowResize, 0);
    }
  }));
  console.log("render");

  return (
    <>
      <SplitPane
        onDragFinished={doWindowResize}
        paneStyle={{ position: `relative` }}
        style={{ position: "relative" }}
        defaultSize={props.contentDefaultSize || `50%`}
        minSize={479}
        maxSize={1201}
      >
        <div style={{ position: `relative` }} key={"builder"}>
          {useObserver(() => (
            <>
              <Empty
                style={{ display: store.hasLayout() ? "none" : "block" }}
                description={"暂无元素"}
              />
              <ResponsiveGridLayout
                style={{ display: !store.hasLayout() ? "none" : "block" }}
                draggableHandle=".drag"
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
                {Object.entries(store.datas).map(([key]) => {
                  return (
                    <div key={key} style={{ border: `1px solid #d3d3d3` }}>
                      <ObservableBlock store={store} i={key} />
                    </div>
                  );
                })}
              </ResponsiveGridLayout>
            </>
          ))}
        </div>
        <div key={"designer"}>
          <SplitPane
            // onDragFinished={doWindowResize}
            paneStyle={{ position: `relative` }}
            style={{ position: "relative" }}
            defaultSize={`50%`}
            minSize={200}
            maxSize={`50%`}
          >
            <div key="tree"></div>
            <div key="setting">
              <Row>
                <Col>
                  <Button type="primary" onClick={store.createItem}>
                    添加元素
                  </Button>
                </Col>
              </Row>
            </div>
          </SplitPane>
        </div>
      </SplitPane>
    </>
  );
});

export { FPB as default };
