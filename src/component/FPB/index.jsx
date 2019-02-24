import React,{Component,Fragment} from 'react';
import {toJS} from 'mobx';
import {observer,Observer,inject} from 'mobx-react';
import RGL,{Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less';
import _ from "lodash";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Store from '../Store';
import FPR from '../FPR';
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
  Modal,
} from 'antd';
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};




//Fled Page Builder
@create()
export default class FPB extends Component {
  state={

  };
  layoutRef=React.createRef();
  toolRef=React.createRef();

  static getDerivedStateFromProps(props, state){
    let {store}=props;
    if(store){
      return {
        store
      }
    }else if(state.store){
      return null;
    }else{
      return {
        store:new Store(),
      }
    }
  }

  componentDidMount(){
    const {
      props:{
        pageData,
        form,
      },
      state:{
        store
      }
    }=this;
    store.setDefaultLeft(this.toolRef.current.clientWidth-18);
    if(pageData){
      const {
        setting,
        layout,
        layoutData,
        counter,
      }=pageData;
      if(setting&&layout&&layoutData&&counter){
        store.setLayout(layout);
        store.counter=counter;
        store.setLayoutData(layoutData);
        store.createBasicLayoutClass();
        form.setFieldsValue(setting);
      }
    }


  }

  savePageData=()=>{
    const {
      parentPage,
      form:{
        getFieldsValue,
      }
    }=this.props;
    const {
      store:{
        saveParentPageData,
        savePageData,
      },
    }=this.state;
    const setting=getFieldsValue();
    if(parentPage){
      saveParentPageData({
        parentPage,
        setting,
      })
    }else{
      savePageData({setting});
    }
  }




  render() {
    const {
      form:{
        getFieldsValue,
        getFieldDecorator,
      }
    }=this.props;
    const {
      store
    }=this.state;
    const {
      host=DEFAULT_HOST,
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
        <Observer name="test">
          {
            ()=>{
              const {
                showSettingDrawer,
                addItem,
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
                            <Tooltip
                              title="全局设置"
                            >
                              <Button
                                onClick={showSettingDrawer}
                                icon="setting"
                                shape="circle"
                                type="primary"
                              />
                            </Tooltip>
                            <Divider type="vertical"/>
                            <Tooltip
                              title="添加元素"
                            >
                              <Observer>
                                {
                                  ()=>{
                                    const {addDisabled}=store;
                                    return (
                                      <Button
                                        onClick={addItem}
                                        disabled={addDisabled}
                                        icon="plus"
                                        shape="circle"
                                        type="primary"
                                      />
                                    )
                                  }
                                }
                              </Observer>
                            </Tooltip>
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
                            <Button onClick={this.savePageData}>
                              保存
                            </Button>
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
                                <span>全局设置</span>
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
                              基础
                            </Divider>
                            <Row gutter={10}>
                              <Col span={12}>
                                <Item
                                  label="主路径"
                                >
                                  {
                                    getFieldDecorator(HOST,{
                                      initialValue:DEFAULT_HOST,
                                    })(
                                      <Input
                                      />
                                    )
                                  }
                                </Item>
                              </Col>
                            </Row>
                            <Divider>
                              元素
                            </Divider>
                            <Row gutter={10}>
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
                            </Row>
                            <Divider>
                              栅格
                            </Divider>
                            <Row>
                              <Col span={24}>
                                <Item
                                  label="栅格断点"
                                >
                                  {
                                    getFieldDecorator(COLS,{
                                      initialValue:DEFAULT_COLS,
                                    })(
                                      <CheckboxGroup>
                                        {
                                          GRID_BREAK_POINTS.map((e,i)=>(
                                            <Checkbox
                                              key={`break${i}`}
                                              {...e.props}
                                              value={e.value}
                                            >
                                              {/* {e.value} */}
                                              {`${e.width}px`}
                                            </Checkbox>
                                          ))
                                        }

                                      </CheckboxGroup>
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
        <Observer>
          {
            ()=>{
              const FPRProps={
                gridHeight,
                marginLR,
                marginTB,
                cols,
                containerHeight,
                store,
                host,
              };
              return (
                <FPR
                  type="parent"
                  {...FPRProps}
                />
              )
            }
          }
        </Observer>

        {/* 元素设置窗口开始 */}
        <Observer>
          {
            ()=>{
              const {
                itemSettingDrawerVisible,
                hideItemSettingDrawer,
                layoutDrawerPlacement,
                drawerBodyStyle,
                layoutDrawerPlacementChange,
                formElements,
                layoutElements,
                functionElements,
                itemTypeChange,
                itemFieldNameChange,
                blurCheck,
                showLabelChange,
                editingItem,
              }=store;
              return (
                <Drawer
                  placement={layoutDrawerPlacement}
                  width={SETTING_DRAWER_WIDTH}
                  maskStyle={DRAWER_MASK_STYLE}
                  bodyStyle={drawerBodyStyle}
                  title={
                    <Fragment>
                      <span>
                        布局设置
                      </span>
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
                  <Row gutter={10}>
                    <Col span={12}>
                      <Item
                        label="元素类型"
                      >
                        <Observer>
                          {
                            ()=>{
                              const {editingItem}=store;
                              return (
                                <Select
                                  showSearch
                                  optionFilterProp="children"
                                  filterOption={(input, option) => option.props.children.toLowerCase?.().indexOf(input.toLowerCase()) >= 0}
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
                                    {
                                      layoutElements.map(({name,value},i)=>(
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
                                    label={`功能元素`}
                                  >
                                    {
                                      functionElements.map(({name,value},i)=>(
                                        <Option
                                          value={value}
                                          key={`ele${i}`}
                                        >
                                          {name}
                                        </Option>
                                      ))
                                    }
                                  </OptGroup>
                                </Select>
                              )
                            }
                          }
                        </Observer>
                      </Item>
                    </Col>
                    {do{
                      if(editingItem?.fixGrid!==undefined){
                        <Col span={12}>
                          <Item
                            label="适应高度"
                          >
                            <Observer>
                              {
                                ()=>{
                                  const {
                                    editingItem,
                                    fixGridChange,
                                  }=store;
                                  return (
                                    <Switch
                                      checkedChildren="适应"
                                      unCheckedChildren="不适应"
                                      checked={editingItem?.fixGrid}
                                      onChange={fixGridChange}
                                    />
                                  )
                                }
                              }
                            </Observer>
                          </Item>
                        </Col>
                      }
                    }}

                    <Observer>
                      {
                        ()=>{
                          const {editingItem}=store;
                          return do{
                            if(editingItem?.ComponentClass){
                              if(editingItem.ComponentType===`form`){
                                <Fragment>
                                  <Col span={12}>
                                    <Item
                                      label="是否显示Label"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {editingItem}=store;
                                            return (
                                              <Switch
                                                onChange={showLabelChange}
                                                checkedChildren="显示"
                                                unCheckedChildren="隐藏"
                                                checked={editingItem.ComponentProps.showLabel}
                                              />
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>
                                  <Col span={12}>
                                    <Item
                                      label="传值字段"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {
                                              editingItem,
                                              blurCheck,
                                              itemFieldNameChange,
                                            }=store;
                                            return (
                                              <Input
                                                onBlur={blurCheck}
                                                onChange={itemFieldNameChange}
                                                value={editingItem.fieldName}
                                              />
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>

                                  <Col span={24}>
                                    <Item
                                      label="Label内容"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {
                                                editingItem,
                                                onItemLabelChange,
                                            }=store;
                                            return (
                                              <MyEditor
                                                editingItem={editingItem}
                                                onChange={onItemLabelChange}
                                              />
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>
                                  <Col span={12}>
                                    <Item
                                      label="是否必填"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {
                                                editingItem,
                                                itemRequiredChange,
                                            }=store;
                                            return (
                                              <Switch
                                                checkedChildren="必填"
                                                unCheckedChildren="非必填"
                                                checked={editingItem?.ComponentProps.rules.isRequired.value}
                                                onChange={itemRequiredChange}
                                              />
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>
                                  {do{
                                    if(editingItem?.ComponentProps.rules.isRequired.value){
                                      <Col span={12}>
                                        <Item
                                          label="必填标语"
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  editingItem,
                                                  itemRequiredMessageChange,
                                                }=store;
                                                return (
                                                  <Input
                                                    onChange={itemRequiredMessageChange}
                                                    value={editingItem?.ComponentProps.rules.isRequired.message}
                                                  />
                                                )
                                              }
                                            }
                                          </Observer>
                                        </Item>
                                      </Col>
                                    }
                                  }}
                                  {do{
                                    if(editingItem?.ComponentProps.ChildrenProps){
                                      <Col span={24}>
                                        <Item
                                          label="键值对"
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  itemChildrenPropsChange,
                                                  addChildrenProps,
                                                  minusChildrenProps,
                                                  hasMinusButton,
                                                }=store;
                                                return (
                                                  editingItem.ComponentProps.ChildrenProps.map((e,i)=>(
                                                    <Row
                                                      gutter={10}
                                                      key={`childrenProps${i}`}
                                                    >
                                                      <Col span={9}>
                                                        <Item
                                                          label="键"
                                                          style={{marginBottom:5}}
                                                          {...formItemLayout}
                                                        >
                                                          <Observer>
                                                            {
                                                              ()=>{
                                                                return (
                                                                  <Input
                                                                    value={e.children}
                                                                    onChange={_=>itemChildrenPropsChange(e,'children',_.target.value)}
                                                                  />
                                                                )
                                                              }
                                                            }
                                                          </Observer>
                                                        </Item>
                                                      </Col>
                                                      <Col span={9}>
                                                        <Item
                                                          label="值"
                                                          style={{marginBottom:5}}
                                                          {...formItemLayout}
                                                        >
                                                          <Observer>
                                                            {
                                                              ()=>{
                                                                return (
                                                                  <Input
                                                                    value={e.value}
                                                                    onChange={_=>itemChildrenPropsChange(e,'value',_.target.value)}
                                                                  />
                                                                )
                                                              }
                                                            }
                                                          </Observer>
                                                        </Item>
                                                      </Col>
                                                      <Col span={6}>
                                                        <Button
                                                          icon="plus"
                                                          type="primary"
                                                          onClick={_=>addChildrenProps(i)}
                                                        />
                                                        {do{
                                                          const minusButton=(
                                                            <Fragment>
                                                              <Divider type="vertical"/>
                                                              <Button
                                                                onClick={_=>minusChildrenProps(i)}
                                                                icon="minus"
                                                                type="danger"
                                                              />
                                                            </Fragment>
                                                          )
                                                          if(i===0){
                                                            if(hasMinusButton){
                                                              minusButton
                                                            }
                                                          }else{
                                                            minusButton
                                                          }
                                                        }}

                                                      </Col>
                                                    </Row>
                                                  ))
                                                )
                                              }
                                            }
                                          </Observer>
                                        </Item>
                                      </Col>
                                    }
                                  }}
                                  {do{
                                    if(editingItem?.ComponentProps.rowShowNumber){
                                      <Col span={12}>
                                        <Item
                                          label="行显示数量"
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  editingItem,
                                                  itemRowShowNumberChange,
                                                }=store;
                                                return (
                                                  <Slider
                                                    min={1}
                                                    max={4}
                                                    onChange={itemRowShowNumberChange}
                                                    value={editingItem?.ComponentProps.rowShowNumber}
                                                  />
                                                )
                                              }
                                            }
                                          </Observer>
                                        </Item>
                                      </Col>
                                    }
                                  }}
                                </Fragment>
                              }else if(editingItem.ComponentType===`layout`){
                                <Fragment>
                                  <Col span={24}>
                                    <Item
                                      label="选项卡"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {
                                              itemChildrenPropsChange,
                                              addChildrenProps,
                                              minusChildrenProps,
                                              hasMinusButton,
                                              showChildPageDesign,
                                            }=store;
                                            return (
                                              editingItem.ComponentProps.ChildrenProps.map((e,i)=>(
                                                <Row
                                                  gutter={10}
                                                  key={`childrenProps${i}`}
                                                >
                                                  <Col span={2}>
                                                    <Tooltip
                                                      title="设计选项卡内容"
                                                    >
                                                      <Button
                                                        onClick={_=>showChildPageDesign(e)}
                                                        icon="edit"
                                                        type="ghost"
                                                      />
                                                    </Tooltip>
                                                  </Col>
                                                  <Col span={9}>
                                                    <Item
                                                      label="标题"
                                                      style={{marginBottom:5}}
                                                      {...formItemLayout}
                                                    >
                                                      <Observer>
                                                        {
                                                          ()=>{
                                                            return (
                                                              <Input
                                                                value={e.tab}
                                                                onChange={_=>itemChildrenPropsChange(e,'tab',_.target.value)}
                                                              />
                                                            )
                                                          }
                                                        }
                                                      </Observer>
                                                    </Item>
                                                  </Col>
                                                  <Col span={6}>
                                                    <Item
                                                      label="键"
                                                      style={{marginBottom:5}}
                                                      {...formItemLayout}
                                                    >
                                                      <Observer>
                                                        {
                                                          ()=>{
                                                            return (
                                                              <Input
                                                                value={e.key}
                                                                onChange={_=>itemChildrenPropsChange(e,'key',_.target.value)}
                                                              />
                                                            )
                                                          }
                                                        }
                                                      </Observer>
                                                    </Item>
                                                  </Col>
                                                  <Col span={6}>
                                                    <Tooltip
                                                      title="下方插入一个选项卡"
                                                    >
                                                      <Button
                                                        icon="plus"
                                                        type="primary"
                                                        onClick={_=>addChildrenProps(i)}
                                                      />
                                                    </Tooltip>
                                                    {do{
                                                      const minusButton=(
                                                        <Fragment>
                                                          <Divider type="vertical"/>
                                                          <Tooltip
                                                            title="删除此选项卡"
                                                          >
                                                            <Button
                                                              onClick={_=>minusChildrenProps(i)}
                                                              icon="minus"
                                                              type="danger"
                                                            />
                                                          </Tooltip>
                                                        </Fragment>
                                                      )
                                                      if(i===0){
                                                        if(hasMinusButton){
                                                          minusButton
                                                        }
                                                      }else{
                                                        minusButton
                                                      }
                                                    }}

                                                  </Col>
                                                </Row>
                                              ))
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>
                                </Fragment>
                              }else if(editingItem.ComponentType===`function`){
                                <Fragment>
                                  {do{
                                    if(editingItem?.text!==null){
                                      <Col span={12}>
                                        <Item
                                          label="文字"
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  editingItem,
                                                  textChange,
                                                }=store;
                                                return (
                                                  <Input
                                                    onChange={textChange}
                                                    value={editingItem?.text}
                                                  />
                                                )
                                              }
                                            }
                                          </Observer>
                                        </Item>
                                      </Col>
                                    }
                                  }}
                                  {do{
                                    if(editingItem?.functionUse!==null){
                                      <Col span={12}>
                                        <Item
                                          label="功能"
                                        >
                                          <Observer>
                                            {
                                              ()=>{
                                                const {
                                                  editingItem,
                                                  functionChange,
                                                }=store;
                                                return (
                                                  <Select
                                                    style={{width:100}}
                                                    onChange={functionChange}
                                                    value={editingItem?.functionUse}
                                                  >
                                                    <Option value="submit">
                                                      提交
                                                    </Option>
                                                  </Select>
                                                )
                                              }
                                            }
                                          </Observer>
                                        </Item>
                                      </Col>
                                    }
                                  }}
                                  <Col span={12}>
                                    <Item
                                      label="适应高度"
                                    >
                                      <Observer>
                                        {
                                          ()=>{
                                            const {
                                              editingItem,
                                              fixGridChange,
                                            }=store;
                                            return (
                                              <Switch
                                                checkedChildren="适应"
                                                unCheckedChildren="不适应"
                                                checked={editingItem?.fixGrid}
                                                onChange={fixGridChange}
                                              />
                                            )
                                          }
                                        }
                                      </Observer>
                                    </Item>
                                  </Col>
                                  {do{
                                    if(editingItem?.functionUse!==null&&editingItem?.functionUse===`submit`){
                                      <Fragment>
                                        <Col span={12}>
                                          <Item
                                            label="请求地址"
                                          >
                                            <Observer>
                                              {
                                                ()=>{
                                                  const {
                                                    editingItem,
                                                    urlChange,
                                                  }=store;
                                                  return (
                                                    <Input
                                                      onChange={urlChange}
                                                      value={editingItem?.functionProps.url}
                                                    />
                                                  )
                                                }
                                              }
                                            </Observer>
                                          </Item>
                                        </Col>
                                        <Col span={12}>
                                          <Item
                                            label="请求方式"
                                          >
                                            <Observer>
                                              {
                                                ()=>{
                                                  const {
                                                    editingItem,
                                                    methodChange,
                                                  }=store;
                                                  return (
                                                    <Select
                                                      style={{width:100}}
                                                      onChange={methodChange}
                                                      value={editingItem?.functionProps.method}
                                                    >
                                                      {
                                                        METHOD_LIST.map((e,i)=>(
                                                          <Option value={e}>
                                                            {e}
                                                          </Option>
                                                        ))
                                                      }
                                                    </Select>
                                                  )
                                                }
                                              }
                                            </Observer>
                                          </Item>
                                        </Col>
                                        <Col span={12}>
                                          <Item
                                            label="请求体格式(GET方法忽略)"
                                          >
                                            <Observer>
                                              {
                                                ()=>{
                                                  const {
                                                    editingItem,
                                                    contentTypeChange,
                                                  }=store;
                                                  return (
                                                    <Select
                                                      style={{width:100}}
                                                      onChange={contentTypeChange}
                                                      value={editingItem?.functionProps.contentType}
                                                    >
                                                      {
                                                        CONTENT_TYPE_LIST.map((e,i)=>(
                                                          <Option value={e.value}>
                                                            {e.name}
                                                          </Option>
                                                        ))
                                                      }
                                                    </Select>
                                                  )
                                                }
                                              }
                                            </Observer>
                                          </Item>
                                        </Col>
                                      </Fragment>
                                    }
                                  }}
                                </Fragment>
                              }
                            }else{
                              <span/>
                            }
                          }
                        }
                      }
                    </Observer>
                  </Row>
                </Drawer>
              )
            }
          }
        </Observer>
        {/* 元素设置窗口结束 */}
        {/* 子页面设计窗口开始 */}
        <Observer>
          {
            ()=>{
              const {
                childPageDesignVisible,
                hideChildPageDesign,
                parentPage,
              }=store;
              const FPBForm=Form.create()(FPB)
              return (
                <Modal
                  width={`100%`}
                  title={`测试`}
                  centered
                  style={{padding:0}}
                  footer={null}
                  bodyStyle={{
                    height:document.documentElement.clientHeight-55,
                    overflow:`auto`,
                  }}
                  onCancel={hideChildPageDesign}
                  visible={childPageDesignVisible}
                >
                  <FPBForm
                    parentPage={parentPage}
                    pageData={parentPage?.pageData}
                  />
                </Modal>
              )
            }
          }
        </Observer>
        {/* 子页面设计窗口结束 */}
      </Fragment>
    );
  }
}
// window.FPB=FPB
