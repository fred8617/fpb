import React,{Component,Fragment} from 'react';
import {toJS} from 'mobx';
import {observer,Observer,inject} from 'mobx-react';
import RGL,{Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less';
import _ from "lodash";
import debounce from 'lodash/debounce';
import Store from '../Store';
import {
  Drawer,
  Icon,
  Divider,
  Button,
  Slider,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Popover,
  Row,
  Col,
  Empty,
} from 'antd';
import SliderInputNumber from './FormComponent/SliderInputNumber';
import NumberComponent from './FormComponent/NumberComponent';
import styled from 'styled-components';
const {Item,create}=Form;
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);
const store=new Store();

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
  ${'' /* z-index: 1; */}
`;
const RadioButton=Radio.Button;
const RadioGroup=Radio.Group;
const {Option,OptGroup}=Select;

const GRID_HEIGHT='gridHeight';//格子单位高度
const GRID_WIDTH='gridWidth';//格子单位宽度
const COLS='cols';//格子单位宽度
const DEFAULT_GRID_HEIGHT=32;//默认单位高度
const DEFAULT_GRID_WIDTH=10;//默认单位宽度
const MARGIN_LR=`marginLR`;//左右间距
const DEFAULT_MARGIN_LR=10;//默认左右间距
const MARGIN_TB=`marginTB`;//上下间距
const DEFAULT_MARGIN_TB=10;//默认上下间距
const DEFAULT_COLS=12;//默认栅格数量
const SETTING_DRAWER_WIDTH=512;//布局抽屉宽度
const CONTAINER_TYPE=`containerType`;
const CONTAINER_HEIGHT=`containerHeight`;
const DEFAULT_CONTAINER_TYPE=0;
const DEFAULT_CONTAINER_HEIGHT=[null,null];
const DRAWER_MASK_STYLE={
  background:`transparent`,
};//抽屉遮罩样式



function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}


@create()
export default class FPB extends React.Component {
  layoutRef=React.createRef();
  toolRef=React.createRef();
  // static defaultProps = {
  //   className: "layout",
  //   items: 20,
  //   rowHeight: 30,
  //   onLayoutChange: function() {},
  //   cols: 12
  // };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }
  resize=()=>{
    setTimeout(debounce(this.resizeEvent,200),200);
  }
  resizeEvent=()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        // x: (i * 2) % 12,
        // y: Math.floor(i / 6) * y,
        // w: 2,
        // h: y,
        // i: i.toString()
      };
    });
  }

  componentDidMount(){
    window.addEventListener(`resize`,()=>console.log(`resize`))
    store.setDefaultLeft(this.toolRef.current.clientWidth-18)
  }

  onLayoutChange(layout) {
    console.log(`onLayoutChange`,layout);
    store.setLayoutData(layout)
  }


  render() {
    const {
      form:{
        getFieldsValue,
        getFieldDecorator,
      }
    }=this.props;
    const {
      gridHeight=DEFAULT_GRID_HEIGHT,
      marginLR=DEFAULT_MARGIN_LR,
      marginTB=DEFAULT_MARGIN_TB,
      cols=DEFAULT_COLS,
      containerType=DEFAULT_CONTAINER_TYPE,
      containerHeight=DEFAULT_CONTAINER_HEIGHT,
    }=getFieldsValue();
    return (
      <Fragment>
        {/* 工具栏开始 */}
        <Observer>
          {
            ()=>{
              const {
                showSettingDrawer,
                addItem,
                addDisabled,
                toggleTool,
              }=store;
              return (
                <Fragment>
                  {/* 工具栏开始 */}
                  <Observer>
                    {
                      ()=>{
                        const {
                          toolLeft,
                        }=store;
                        return (
                          <div
                            ref={this.toolRef}
                            className="FPB-tool"
                            style={{
                              left:toolLeft,
                            }}
                          >
                            <Button
                              onClick={showSettingDrawer}
                              icon="setting"
                              shape="circle"
                              type="primary"
                            />
                            <Divider type="vertical"/>
                            <Button
                              onClick={addItem}
                              disabled={addDisabled}
                              icon="plus"
                              shape="circle"
                              type="primary"
                            />
                            <Divider type="vertical"/>
                            {/* 模式切换开始 */}
                            <ToolSpan>
                              模式:
                            </ToolSpan>
                            <Observer>
                              {
                                ()=>{
                                  const {
                                    mode,
                                    setMode,

                                  }=store;
                                  return (
                                    <RadioGroup
                                      value={mode}
                                      onChange={setMode}
                                    >
                                      <RadioButton value="develop">
                                        开发
                                      </RadioButton>
                                      <RadioButton value="priview">
                                        预览
                                      </RadioButton>
                                    </RadioGroup>
                                  )
                                }
                              }
                            </Observer>
                            {/* 模式切换结束 */}
                            {/* 碰撞开始 */}
                            <Divider type="vertical"/>
                            <ToolSpan>
                              碰撞:
                            </ToolSpan>
                            <Observer>
                              {
                                ()=>{
                                  const {
                                    compact,
                                    setCompact,
                                  }=store;
                                  return (
                                    <RadioGroup
                                      value={compact}
                                      onChange={setCompact}
                                    >
                                      <RadioButton value="vertical">
                                        纵向
                                      </RadioButton>
                                      <RadioButton value="horizontal">
                                        横向
                                      </RadioButton>
                                      <RadioButton value={`none`}>
                                        无
                                      </RadioButton>
                                    </RadioGroup>
                                  )
                                }
                              }
                            </Observer>
                            {/* 碰撞结束 */}
                            <Divider type="vertical"/>
                            <Observer>
                              {
                                ()=>{
                                  const {
                                    toolIcon
                                  }=store;
                                  return (
                                    <Icon
                                      className="FPB-tool-icon"
                                      type={toolIcon}
                                      onClick={toggleTool}
                                    />
                                  )
                                }
                              }
                            </Observer>
                          </div>
                        )
                      }
                    }
                  </Observer>
                  {/* 工具栏结束*/}
                  {/* 设置抽屉开始 */}
                  <Observer>
                    {
                      ()=>{
                        const {
                          settingDrawerVisible,
                          hideSettingDrawer,
                          minCol,
                          layoutDrawerPlacement,
                          layoutDrawerPlacementChange,
                          drawerBodyStyle,
                        }=store;
                        return (
                          <Drawer
                            placement={layoutDrawerPlacement}
                            width={SETTING_DRAWER_WIDTH}
                            maskStyle={DRAWER_MASK_STYLE}
                            bodyStyle={drawerBodyStyle}
                            title={
                              <Fragment>
                                <span>布局设置</span>
                                <RadioGroup
                                  value={layoutDrawerPlacement}
                                  onChange={layoutDrawerPlacementChange}
                                >
                                  <RadioButton value="top">
                                    上
                                  </RadioButton>
                                  <RadioButton value="right">
                                    右
                                  </RadioButton>
                                  <RadioButton value="bottom">
                                    下
                                  </RadioButton>
                                  <RadioButton value="left">
                                    左
                                  </RadioButton>
                                </RadioGroup>
                              </Fragment>
                            }
                            onClose={hideSettingDrawer}
                            visible={settingDrawerVisible}
                          >
                            <Divider>
                              元素
                            </Divider>
                            <Row>
                              <Col span={12}>
                                <Item
                                  label="单位高度(px)"
                                >
                                  {
                                    getFieldDecorator(GRID_HEIGHT,{
                                      initialValue:DEFAULT_GRID_HEIGHT,
                                    })(
                                      <SliderInputNumber
                                        min={1}
                                        max={100}
                                      />
                                    )
                                  }
                                </Item>
                              </Col>
                              <Col span={12}>
                                <Item
                                  label="左右间距"
                                >
                                  {
                                    getFieldDecorator(MARGIN_LR,{
                                      initialValue:DEFAULT_MARGIN_LR,
                                    })(
                                      <SliderInputNumber
                                        min={0}
                                      />
                                    )
                                  }
                                </Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={12}>
                                <Item
                                  label="上下间距"
                                >
                                  {
                                    getFieldDecorator(MARGIN_TB,{
                                      initialValue:DEFAULT_MARGIN_TB,
                                    })(
                                      <SliderInputNumber
                                        min={0}
                                      />
                                    )
                                  }
                                </Item>
                              </Col>
                              <Col span={12}>
                                <Item
                                  label="栅格数量"
                                >
                                  {
                                    getFieldDecorator(COLS,{
                                      initialValue:DEFAULT_COLS,
                                    })(
                                      <SliderInputNumber
                                        min={minCol}
                                      />
                                    )
                                  }
                                </Item>
                              </Col>
                            </Row>
                            <Divider>
                              容器
                            </Divider>
                            <Row>
                              <Col span={12}>
                                <Item
                                  label="类型"
                                >
                                  {
                                    getFieldDecorator(CONTAINER_TYPE,{
                                      initialValue:DEFAULT_CONTAINER_TYPE,
                                    })(
                                      <Select style={{width:100}}>
                                        <Option value={0}>
                                          自定义
                                        </Option>
                                        <Option value={1}>
                                          移动端
                                        </Option>
                                      </Select>
                                    )
                                  }
                                </Item>
                              </Col>
                              {do{
                                if(containerType===0){
                                  <Col span={12}>
                                    <Item
                                      label="高度"
                                    >
                                      {
                                        getFieldDecorator(CONTAINER_HEIGHT,{
                                          initialValue:DEFAULT_CONTAINER_HEIGHT,
                                        })(
                                          <NumberComponent/>
                                        )
                                      }
                                    </Item>
                                  </Col>
                                }
                              }}
                            </Row>
                          </Drawer>
                        )
                      }
                    }
                  </Observer>
                  {/* 设置抽屉结束 */}
                </Fragment>
              )
            }
          }
        </Observer>
        {/* 工具栏结束 */}
        {/* 布局 */}
        <Observer>
          {
            ()=>{
              const {
                layout,
                layoutData,
                mode,
                isResizable,
                isDraggable,
                deleteItem,
                isEditing,
                editingItem,
                showItemSettingDrawer,
                compact,
                preventCollision,
              }=store;
              return (
                <div
                  className="FPB-container"
                  style={{
                    width:`100%`,
                    height:containerHeight[1]&&containerHeight[0]&&`${containerHeight[1]}${containerHeight[0]}`
                  }}
                >
                  {do{
                    if(layout.length===0){
                      <Empty/>
                    }else{
                      <ReactGridLayout
                        {...this.props}
                        ref={this.layoutRef}
                        isDraggable={isDraggable}
                        isResizable={isResizable}
                        layout={toJS(layoutData)}
                        onLayoutChange={this.onLayoutChange}
                        measureBeforeMount={false}
                        margin={[marginLR,marginTB]}
                        rowHeight={gridHeight}
                        cols={cols}
                        useCSSTransforms={this.state.mounted}
                        compactType={compact}
                        preventCollision={preventCollision}
                        onDragStop={this.resize}
                        onResizeStop={this.resize}
                      >
                        {
                          layout.map((e,i)=>{
                            const {ComponentClass}=e;
                            return (
                              <Block
                                data-grid={e}
                                key={e.i}
                              >
                                <Popover
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
                                  <Item
                                    // label="元素类型"
                                  >
                                    {
                                      ComponentClass&&
                                      <ComponentClass/>
                                    }
                                  </Item>
                                  <DevelopShadowContainer
                                    mode={mode}
                                    editing={editingItem&&editingItem!==e}
                                  >

                                  </DevelopShadowContainer>
                                </Popover>

                              </Block>
                            );
                          })
                        }
                      </ReactGridLayout>
                    }
                  }}
                </div>

              )
            }
          }
        </Observer>
        {/* 布局结束 */}
        {/* 元素设置窗口开始 */}
        <Observer>
          {
            ()=>{
              const {
                itemSettingDrawerVisible,
                hideItemSettingDrawer,
                editingItem,
                layoutDrawerPlacement,
                drawerBodyStyle,
                layoutDrawerPlacementChange,
                formElements,
                itemTypeChange,
              }=store;
              return (
                <Drawer
                  placement={layoutDrawerPlacement}
                  width={SETTING_DRAWER_WIDTH}
                  maskStyle={DRAWER_MASK_STYLE}
                  bodyStyle={drawerBodyStyle}
                  title={
                    <Fragment>
                      <span>布局设置</span>
                      <RadioGroup
                        value={layoutDrawerPlacement}
                        onChange={layoutDrawerPlacementChange}
                      >
                        <RadioButton value="top">
                          上
                        </RadioButton>
                        <RadioButton value="right">
                          右
                        </RadioButton>
                        <RadioButton value="bottom">
                          下
                        </RadioButton>
                        <RadioButton value="left">
                          左
                        </RadioButton>
                      </RadioGroup>
                    </Fragment>
                  }
                  visible={itemSettingDrawerVisible}
                  title="元素设置"
                  onClose={hideItemSettingDrawer}
                >
                  <Row>
                    <Col span={12}>
                      <Item
                        label="元素类型"
                      >
                        <Select
                          onChange={itemTypeChange}
                          value={editingItem?.type}
                          style={{width:`100%`}}
                        >
                          <Option value={'blank'}>
                            {`空白占位`}
                          </Option>
                          <OptGroup
                            label={`表单元素`}
                          >
                            {
                              formElements.map(({name,value},i)=>(
                                <Option
                                  value={value}
                                  key={`ele${i}`}
                                >
                                  {name}
                                </Option>
                              ))
                            }
                          </OptGroup>
                          <OptGroup
                            label={`布局元素`}
                          >
                            <Option value={`divider`}>
                              {`分割线`}
                            </Option>
                          </OptGroup>
                        </Select>
                      </Item>
                    </Col>
                    <Col span={12}>

                    </Col>
                  </Row>
                </Drawer>
              )
            }
          }
        </Observer>
        {/* 元素设置窗口结束 */}
      </Fragment>
    );
  }
}
