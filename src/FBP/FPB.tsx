import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useRef, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { doWindowResize } from "./utils";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";
import { Empty, Button, Form, Drawer, Radio, Modal } from "antd";
import SplitPane from "react-split-pane";
import ItemSettingForm from "./ItemSettingForm";
import ObservableBlock from "./ObservableBlock";
import ObservableBlockContainer from "./ObservableBlockContainer";
import { Provider } from "./FormContext";
import BreakpointForm from "./BreakpointForm";
import useFPBStore, { FPBProps, Mode } from "./useFPBStore";
import { toJS } from "mobx";

const ResponsiveGridLayout = WidthProvider(Responsive);
const FPB: React.SFC<FPBProps> = props => {
  const breakpointFormRef = useRef<any>();
  const store = useFPBStore(props);
  useEffect(() => {
    if (props.defaultDatas) {
      store.setDatas(props.defaultDatas.datas);
      store.setLayouts([] as any, props.defaultDatas.layouts);
      setTimeout(doWindowResize, 0);
      // doWindowResize();
    }
  }, [props.defaultDatas]);
  //@ts-ignore
  global.window.getStore = () => toJS(store);
  //@ts-ignore
  global.window.getData = () => ({
    datas: toJS(store).datas,
    layouts: toJS(store).layouts
  });
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
        maxSize={1600}
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
                    className="layout"
                    {...store.jsConfig}
                  >
                    {Object.entries(store.datas).map(([key, data]) => {
                      return (
                        <div key={key}>
                          <Observer>
                            {() =>
                              store.mode === Mode.DESIGN && (
                                <ObservableBlockContainer
                                  store={store}
                                  itemKey={key}
                                  data={data}
                                />
                              )
                            }
                          </Observer>

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
                  components={props.components}
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
              <Observer>
                {() => (
                  <Button
                    type="primary"
                    icon="plus"
                    disabled={store.isPreview}
                    onClick={store.createItem}
                  >
                    添加元素
                  </Button>
                )}
              </Observer>
            </Form.Item>
            <Form.Item label="断点">
              <Observer>
                {() => (
                  <Button
                    disabled={store.isPreview}
                    onClick={_ => store.setBreakpointSettingVisible(true)}
                  >
                    断点
                  </Button>
                )}
              </Observer>
            </Form.Item>
            <Form.Item>
              <Observer>
                {() => (
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={store.changeMode}
                    value={store.mode}
                  >
                    <Radio.Button value={Mode.DESIGN}>设计</Radio.Button>
                    <Radio.Button value={Mode.PRIVIEW}>预览</Radio.Button>
                  </Radio.Group>
                )}
              </Observer>
            </Form.Item>
          </Form>
        </div>
      </SplitPane>
      <Observer>
        {() => (
          <Modal
            centered
            destroyOnClose
            maskClosable={false}
            title={"设置断点"}
            visible={store.breakpointSettingVisible}
            onOk={_ =>
              breakpointFormRef.current.validateFieldsAndScroll(
                (err, values) => {
                  if (err) {
                    return;
                  }
                  store.setBreakpointConfig(values);
                }
              )
            }
            onCancel={_ => store.setBreakpointSettingVisible(false)}
          >
            <BreakpointForm
              ref={breakpointFormRef}
              initialData={store.breakpointsConfig}
            />
          </Modal>
        )}
      </Observer>
    </>
  );
};
const FormFPB = Form.create<FPBProps>({ name: "FPB" })(FPB);
export { FormFPB as default };
