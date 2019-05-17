import React,{Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {toJS} from 'mobx';
import {observer,Observer,inject} from 'mobx-react';
import {computed,autorun} from 'mobx';
import RGL,{Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less';
import _ from "lodash";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Store from '../Store';
import FPB from '../FPB';
import {
  Drawer,
  Icon,
  Divider,
  Button,
  Slider,
  Switch,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Popover,
  Row,
  Col,
  Empty,
  Tooltip,
  Skeleton,
} from 'antd';
// import debounce from 'lodash/debounce';
import SliderInputNumber from '../FormComponent/SliderInputNumber';
import MyEditor from '../MyEditor';
import NumberComponent from '../FormComponent/NumberComponent';
import styled from 'styled-components';
import {
HOST,
GRID_HEIGHT,
GRID_WIDTH,
COLS,
MARGIN_LR,
MARGIN_TB,
CONTAINER_TYPE,
CONTAINER_HEIGHT,
DEFAULT_HOST,
METHOD_LIST,
CONTENT_TYPE_LIST,
GRID_BREAK_POINTS,
DEFAULT_GRID_WIDTH,
DEFAULT_GRID_HEIGHT,
DEFAULT_MARGIN_LR,
DEFAULT_MARGIN_TB,
DEFAULT_COLS,
SETTING_DRAWER_WIDTH,
DEFAULT_CONTAINER_TYPE,
DEFAULT_CONTAINER_HEIGHT,
DRAWER_MASK_STYLE,
DEFAULT_BREAK_POINTS,
} from '../globalSetting';
const {Item,create}=Form;
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);
const Block=styled.div`
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;
const ToolSpan=styled.span`
  margin-right:7px;
`;
const DevelopShadowContainer=styled.div`
  border:${({mode,editing})=>mode==`develop`&&!editing?'1px dashed #d9d9d9':null};
  cursor: pointer;
  width:100%;
  height:${({mode})=>mode==`develop`?`100%`:0};
  position: absolute;
  left: 0;
  top:0;
  transition:all 0.3s;
  :hover{
    background:rgba(0, 0, 0,0.3);
  }
  z-index: 1;
`;
const RadioButton=Radio.Button;
const RadioGroup=Radio.Group;
const CheckboxGroup=Checkbox.Group;
const {Option,OptGroup}=Select;

//Fled Page Reader
@create()
// @observer
export default class FPR extends Component {
  static defaultProps={
    type:`parent`
  }
  state={
    store:null,
  }
  static getDerivedStateFromProps(props, state){
    const {
      store,
      gridHeight,
      marginLR,
      marginTB,
      cols,
      containerHeight,
      host,
      setting,
    }=props;
    if(store){
      return {
        store,
        gridHeight,
        marginLR,
        marginTB,
        cols,
        containerHeight,
        host,
        ...setting,
      }
    }
    return null;
  }
  constructor(...args){
    super(...args);
    // autorun(()=>{
    //   console.log(`hasAllFixed`,this.layoutRefs);
    // })
  }

  componentDidMount(){
    const {setting,layout,layoutData,store,parentCacl,type}=this.props;
    console.log(`fprDidmount${type}`);
    // setTimeout(this.forceUpdate,0)
    if(setting&&layout&&layoutData){
      if(!store){
        const store=new Store();
        store.layout=layout;
        store.layoutData=layoutData;
        store.mode='production';
        store.parentCacl=parentCacl
        store.createBasicLayoutClass();
        this.setState({
          store,
          ...setting,
        })
      }
    }
  }

  onBreakpointChange=(newBreakpoint,newCols)=>{
    console.log(`onBreakpointChange-${this.props.type}`,newBreakpoint,newCols,this.state.store.layoutData);
    // this.caclParentHeight();
    this.state.store.setBreakPoint(newBreakpoint)
  }

  resize=()=>{
    setTimeout(debounce(this.resizeEvent,200),200);
  }
  resizeEvent=()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
    // setTimeout(this.forceUpdate,100);
  }

  onLayoutChange=(layout,layouts)=>{
    console.log(`onLayoutChange-${this.props.type}`,layout,layouts);
    // console.log(JSON.stringify(toJS(this.state.store.layoutData)));
    // console.log(JSON.stringify(layouts));
    // if(JSON.stringify(toJS(this.state.store.layoutData))===JSON.stringify(layouts)){
    //   console.log(`layout no changes`);
    //   return;
    // };
    this.state.store.setLayoutData(layouts);
  }

  getFunction=(item,{host})=>()=>{
    switch (item.functionUse) {
      case 'submit':
        this.props.form.validateFields(async (err, params) => {
            if (!err) {
              const {
                url,
                method,
                contentType,
                responseType,
              }=item.functionProps;
              const res=await axios({
                method,
                params,
                data:params,
                url:`${host}${url}`,
                responseType,
                headers:{
                  'content-type':contentType,
                }
              });
              console.log(res);
            }
          });
        break;
      default:

    }
  }

  componentDidUpdate(){
    // console.log(`componentDidUpdate`);
    // this.caclParentHeight();
  }
  caclParentHeight=()=>{
    const {
      parentStore,
      parentMarginTB,
      parentNode,
      parentItem,
      parentGridHeight,
      parentCacl
    }=this.props;
    if(parentNode&&parentItem.fixGrid){
      debounce(()=>{
        const itemLayout=parentStore.getLayoutItem(parentItem);
        const {h}=itemLayout;
        const {clientHeight}=parentNode;
        const newH=Math.ceil(clientHeight/(parentGridHeight+parentMarginTB));
        itemLayout.maxH=newH;
        itemLayout.minH=newH;
        itemLayout.h=newH;
      },500)()
    }
  }
  render(){
    const {
      form:{
        getFieldDecorator
      },
      type="parent"
    }=this.props;
    const {
      store,
      gridHeight=DEFAULT_GRID_HEIGHT,
      marginLR=DEFAULT_MARGIN_LR,
      marginTB=DEFAULT_MARGIN_TB,
      cols=DEFAULT_COLS,
      containerHeight=DEFAULT_CONTAINER_HEIGHT,
      host=DEFAULT_HOST,
    }=this.state;
    return (
      <Skeleton
        active
        loading={(!store||store.loading)}
        paragraph={{ rows: 6 }}
      >
        {
          store&&
          <Observer>
            {
              ()=>{
                const {
                  isEmpty,
                  deleteItem,
                  showItemSettingDrawer,
                  bindRef,
                  // change,
                  editingItem,
                  containerBorder,
                  developing,
                }=store;
                const breakpoints={};
                cols.forEach((e)=>breakpoints[e]=DEFAULT_BREAK_POINTS[e]);
                editingItem?.fixGrid
                return (
                  <div
                    className="FPB-container"
                    style={{
                      width:`100%`,
                      height:containerHeight[1]&&containerHeight[0]&&`${containerHeight[1]}${containerHeight[0]}`,
                      border:containerBorder
                    }}
                  >
                    {do{
                      if(isEmpty&&developing){
                        <Empty/>
                      }else{
                        <Observer>
                          {
                            ()=>{
                              const {
                                layout,
                                layoutRefs,
                                layoutData,
                                isResizable,
                                isDraggable,
                                compact,
                                preventCollision,
                                // mode,
                              }=store;
                              return (
                                <ResponsiveReactGridLayout
                                  ref={this.layoutRef}
                                  isDraggable={isDraggable}
                                  isResizable={isResizable}
                                  layouts={toJS(layoutData)}

                                  measureBeforeMount={false}
                                  // useCSSTransforms={false}
                                  margin={[marginLR,marginTB]}
                                  rowHeight={gridHeight}
                                  breakpoints={breakpoints}
                                  cols={{
                                    lg: 12,
                                    md: 10,
                                    sm: 6,
                                    xs: 4,
                                    xxs: 2
                                  }}
                                  onLayoutChange={this.onLayoutChange}
                                  onBreakpointChange={this.onBreakpointChange}
                                  compactType={compact}
                                  preventCollision={preventCollision}
                                  onDragStop={this.resize}
                                  onResizeStop={this.resize}
                                >
                                  {
                                    layout.map((e,i)=>{

                                      return (
                                        <Block
                                          data-grid={e}
                                          key={e.i}
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  ComponentClass,
                                                  ComponentType,
                                                  ComponentProps,
                                                  ComponentChildrenClass,
                                                  fieldName,
                                                  ref,
                                                }=e;
                                                // this.hasAllFixed
                                                // console.log(layoutRefs[e.i].current?.clientHeight);
                                                return (
                                                  <Fragment>
                                                    <div
                                                      ref={dom=>bindRef(dom,e,marginTB,gridHeight,type)}
                                                    >
                                                      {do{
                                                        if(ComponentClass&&ComponentType===`form`){
                                                          <Item
                                                            colon={false}
                                                            label={
                                                                ComponentProps.showLabel&&
                                                              <div
                                                                style={{display:`inline-block`}}
                                                                dangerouslySetInnerHTML={
                                                                  {
                                                                      __html:ComponentProps.label
                                                                  }
                                                                }
                                                              />
                                                            }
                                                          >
                                                            {
                                                                ComponentClass&&
                                                              getFieldDecorator(fieldName||`errorFiedName`,{
                                                                  rules:[
                                                                {
                                                                    required:ComponentProps.rules.isRequired.value,
                                                                    message:ComponentProps.rules.isRequired.message,
                                                                }
                                                                  ]
                                                              })(
                                                                <ComponentClass {...ComponentProps.props}>
                                                                  {do{
                                                                    if(ComponentProps.rowShowNumber){
                                                                      <Row>
                                                                        {
                                                                          ComponentProps.ChildrenProps?.map((e,i)=>(
                                                                            <Col
                                                                              key={`children${i}`}
                                                                              span={24/ComponentProps.rowShowNumber}
                                                                            >
                                                                              <ComponentChildrenClass
                                                                                key={`c${i}`}
                                                                                {...e}
                                                                              />
                                                                            </Col>
                                                                          ))
                                                                        }
                                                                      </Row>
                                                                    }else{
                                                                      ComponentProps.ChildrenProps?.map((e,i)=>(
                                                                        <ComponentChildrenClass
                                                                          key={`c${i}`}
                                                                          {...e}
                                                                        />
                                                                      ))
                                                                    }
                                                                  }}
                                                                </ComponentClass>
                                                              )
                                                            }
                                                          </Item>
                                                        }else if(ComponentClass&&ComponentType===`layout`){
                                                            ComponentClass&&
                                                          <ComponentClass>
                                                            {
                                                              ComponentProps.ChildrenProps?.map((l,i)=>(
                                                                <ComponentChildrenClass
                                                                  key={`c${i}`}
                                                                  // onClick={this.forceUpdate}
                                                                  {...l}
                                                                >
                                                                  <Observer>
                                                                    {
                                                                      ()=>{
                                                                        const {pageData}=l;
                                                                        return (
                                                                          <FPR
                                                                            form={this.props.form}
                                                                            type={'child'}
                                                                            // parentStore={store}
                                                                            // parentMarginTB={marginTB}
                                                                            // parentNode={layoutRefs[e.i]}
                                                                            // parentItem={e}
                                                                            // parentGridHeight={gridHeight}
                                                                            // parentCacl={bindRef.bind(store,layoutRefs[e.i],e,marginTB,gridHeight,type)}
                                                                            {...pageData}
                                                                          />
                                                                        )
                                                                      }
                                                                    }
                                                                  </Observer>
                                                                  {
                                                                    l.children
                                                                  }
                                                                </ComponentChildrenClass>
                                                              ))
                                                            }
                                                          </ComponentClass>
                                                        }else if(ComponentClass&&ComponentType===`function`){
                                                          ComponentClass&&
                                                          <ComponentClass
                                                            {...ComponentProps.props}
                                                            {...{[ComponentProps.props.trigger]:this.getFunction(e,{host})}}
                                                          >
                                                            {e.text}
                                                          </ComponentClass>
                                                        }
                                                      }}
                                                    </div>
                                                    <Observer>
                                                      {
                                                        ()=>{
                                                          const {editingItem,mode}=store;
                                                          return (
                                                            <Popover
                                                              placement={`bottom`}
                                                              trigger="contextMenu"
                                                              content={
                                                                <Fragment>
                                                                  <Button
                                                                    icon="edit"
                                                                    type="primary"
                                                                    onClick={_=>showItemSettingDrawer(e)}
                                                                  />
                                                                  <Divider
                                                                    type="vertical"
                                                                  />
                                                                  <Button
                                                                    icon="delete"
                                                                    type="danger"
                                                                    onClick={_=>deleteItem(e)}
                                                                  />
                                                                </Fragment>
                                                              }
                                                            >
                                                              <DevelopShadowContainer
                                                                mode={mode}
                                                                editing={editingItem&&editingItem!==e}
                                                              >

                                                              </DevelopShadowContainer>
                                                            </Popover>
                                                          )
                                                        }
                                                      }
                                                    </Observer>
                                                  </Fragment>
                                                )
                                              }
                                            }
                                          </Observer>

                                        </Block>

                                      );
                                    })
                                  }
                                </ResponsiveReactGridLayout>
                              )
                            }
                          }
                        </Observer>
                      }
                    }}
                  </div>

                )
              }
            }
          </Observer>
        }
      </Skeleton>
    )
  }
}
