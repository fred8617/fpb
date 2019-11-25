import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useRef, useEffect, SFC, useMemo } from 'react';
import { Observer, useLocalStore } from 'mobx-react-lite';
import ReactJson from 'react-json-view';
import { doWindowResize, getObjectKeysWhenIsArray } from './utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Empty, Button, Form, Drawer, Radio, Modal } from 'antd';
import SplitPane from 'react-split-pane';
import ItemSettingForm from './ItemSettingForm';
import ObservableBlock from './ObservableBlock';
import ObservableBlockContainer from './ObservableBlockContainer';
import { Provider } from './FormContext';
import { debounce } from 'lodash';
import BreakpointForm from './BreakpointForm';
import useFPBStore, { FPBProps, Mode, ApolloFPBProps } from './useFPBStore';
import { toJS } from 'mobx';
import { ApolloProvider } from '@apollo/react-hooks';
import CalText from './CalText';
import FullScreenModal from './FullScreenModal';
const linePadding = 5;
const ResponsiveGridLayout = WidthProvider(Responsive);
const FPB: React.SFC<FPBProps> = props => {
  const isInit = useRef(false);
  const settingRef: any = useRef();
  const breakpointFormRef = useRef<any>();
  const store = useFPBStore(props);
  const localStore = useLocalStore(() => ({
    configVisible: false,
    setConfigVisible(configVisible) {
      localStore.configVisible = configVisible;
    },
    mainWidth: 0,
    setMainWidth(width) {
      localStore.mainWidth = width;
    },
    settingWidth: 0,
    setSettingWidth() {
      if (settingRef.current && settingRef.current.clientWidth) {
        localStore.settingWidth =
          settingRef.current && settingRef.current.clientWidth;
      }
    },
  }));
  useEffect(() => {
    store.setBreakpointFromEntry(
      Object.keys(store.breakpoints),
      props.breakpointDiff,
    );
  }, [props.breakpointDiff]);
  if (props.forwardRef) {
    props.forwardRef.current = store;
  }
  useEffect(() => {
    console.log('layout change & doWindowResize');
    doWindowResize();
  }, [store.layouts]);
  useEffect(() => {
    /**
     * 初始化一下setting的宽度
     */
    const func = debounce(
      () => setTimeout(() => localStore.setSettingWidth(), 0),
      200,
    );
    func();
    window.addEventListener('resize', func);
    return () => {
      window.removeEventListener('resize', func);
    };
  }, []);
  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
      if (props.defaultDatas) {
        store.setLayouts([] as any, props.defaultDatas.layouts);
      }

      setTimeout(doWindowResize, props.renderDelay || 0);
    }
    if (props.defaultDatas) {
      if (props.FPR) {
        store.mode = Mode.PRIVIEW;
      }
      store.setDatas(props.defaultDatas.datas);
      store.setBreakpointFromEntry(
        props.defaultDatas.breakpoints,
        props.breakpointDiff,
      );
      // store.setLayouts([] as any, props.defaultDatas.layouts);
      setTimeout(doWindowResize, props.renderDelay || 0);
      //模态框动画弹出需要加renderDelay

      // doWindowResize();
    }
  }, [props.defaultDatas, props.renderDelay]);

  useEffect(() => {
    console.log('mount');
  }, []);
  console.log('render', store);
  const { FPR = false } = props;
  const FPRPart = (
    <Provider value={{ form: props.form }}>
      <Observer>
        {() => (
          <ResponsiveGridLayout
            // compactType={'horizontal'}
            // useCSSTransforms={false}
            style={{ display: !store.hasLayout() ? 'none' : 'block' }}
            className="layout"
            {...store.jsConfig}
          >
            {Object.entries(store.datas).map(([key, data]) => {
              return (
                <div className={store.draggableCancelClassName} key={key}>
                  <Observer>
                    {() =>
                      store.isDesign && (
                        <ObservableBlockContainer
                          store={store}
                          itemKey={key}
                          data={data}
                        />
                      )
                    }
                  </Observer>

                  <ObservableBlock
                    store={store}
                    i={key}
                    components={props.components}
                  />
                </div>
              );
            })}
          </ResponsiveGridLayout>
        )}
      </Observer>
    </Provider>
  );
  if (FPR) {
    return FPRPart;
  }
  const showPart = (
    <>
      <Observer>{() => <CalText width={localStore.mainWidth} />}</Observer>
      <Observer>
        {() => (
          <>
            <Empty
              style={{ display: store.hasLayout() ? 'none' : 'block' }}
              description={'暂无元素'}
            />
            {FPRPart}
          </>
        )}
      </Observer>
    </>
  );
  const builderPart = props.layout ? (
    <div key={'builder'} style={{ position: `relative` }}>
      {props.layout(showPart)}
    </div>
  ) : (
    <div
      style={{
        position: `relative`,
        paddingLeft: linePadding,
        paddingTop: linePadding,
        paddingRight: linePadding,
      }}
      key={'builder'}
    >
      {showPart}
    </div>
  );
  return (
    <>
      {/* 此处在预览模式下取消transition */}
      <Observer>
        {() => (
          <style>
            {store.draggableCancel
              ? `
        .react-grid-item{
          transition:none!important
        }
        .react-grid-layout{
          transition:none!important
        }
        ${
          store.draggableCancel
            ? `.react-grid-item > .react-resizable-handle{
          display:none;
        }`
            : null
        }
        `
              : null}
          </style>
        )}
      </Observer>

      <SplitPane
        className="FPB"
        onChange={e => {
          localStore.setSettingWidth();
          localStore.setMainWidth(e - (props.layout ? 0 : 10));
        }}
        onDragFinished={doWindowResize}
        pane1Style={{ overflow: `auto` }}
        paneStyle={{ position: `relative` }}
        style={{ position: 'relative' }}
        defaultSize={props.contentDefaultSize || `50%`}
        minSize={479}
        maxSize={1600}
      >
        {builderPart}
        <div
          ref={settingRef}
          key="setting"
          style={{
            background: `#fff`,
            height: `100%`,
            paddingLeft: linePadding,
          }}
        >
          <Observer>
            {() => {
              return (
                <Drawer
                  destroyOnClose
                  title={store.editingTitle}
                  placement="right"
                  width={`100%`}
                  closable={store.isEditing}
                  onClose={_ => store.setEditingItem(null)}
                  visible={store.isEditing}
                  getContainer={false}
                  style={{ position: 'absolute', height: `100%` }}
                  drawerStyle={{ height: `100%` }}
                  bodyStyle={{
                    padding: 0,
                    height: `calc( 100% - 54.6px )`,
                    overflow: `auto`,
                  }}
                >
                  {store.isEditing && (
                    <ItemSettingForm
                      parentStore={localStore}
                      initialKeyCounter={
                        (store.editingItem &&
                          getObjectKeysWhenIsArray(
                            toJS(store.editingItem.componentProps, {
                              recurseEverything: true,
                            }) || {},
                            'componentProps',
                          )) ||
                        {}
                      }
                      components={props.components}
                      item={store.editingItem}
                      onItemTypeChange={store.onItemTypeChange}
                      onItemPropsChange={store.onItemPropsChange}
                      componentGroup={store.componentGroup}
                      flatComponents={store.flatComponents}
                    />
                  )}
                </Drawer>
              );
            }}
          </Observer>

          <Form layout="inline">
            <Form.Item>
              <Observer>
                {() => (
                  <Button
                    type="primary"
                    icon="plus"
                    disabled={store.isPreview}
                    onClick={debounce(store.createItem, 50)}
                  >
                    添加元素
                  </Button>
                )}
              </Observer>
            </Form.Item>
            <Form.Item>
              <Observer>
                {() => (
                  <Button
                    disabled={store.isPreview}
                    onClick={_ => store.setBreakpointSettingVisible(true)}
                  >
                    断点设置
                  </Button>
                )}
              </Observer>
            </Form.Item>
            <Form.Item>
              <Button onClick={_ => localStore.setConfigVisible(true)}>
                查看配置
              </Button>
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
            {props.renderActions && props.renderActions()}
          </Form>
        </div>
      </SplitPane>
      <Observer>
        {() => (
          <Modal
            centered
            destroyOnClose
            maskClosable={false}
            title={'设置断点'}
            visible={store.breakpointSettingVisible}
            onOk={_ =>
              breakpointFormRef.current.validateFieldsAndScroll(
                (err, values) => {
                  if (err) {
                    return;
                  }
                  store.setBreakpointConfig(values);
                },
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
      <Observer>
        {() => (
          <FullScreenModal
            footer={null}
            onCancel={_ => localStore.setConfigVisible(false)}
            visible={localStore.configVisible}
          >
            <ReactJson collapsed={1} indentWidth={10} src={store.config} />
          </FullScreenModal>
        )}
      </Observer>
    </>
  );
};
const FormFPB = Form.create<FPBProps>({ name: 'FPB' })(FPB);

export const ApolloFPB: SFC<Omit<ApolloFPBProps, 'form'>> = ({
  client,
  ...props
}) => {
  return (
    <ApolloProvider client={client}>
      <FormFPB {...props} />
    </ApolloProvider>
  );
};
export { FormFPB as default };
