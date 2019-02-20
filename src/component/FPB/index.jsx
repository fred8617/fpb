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
import {
  Drawer,
  Icon,
  Divider,
  Button,
  Slider,
  Switch,
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
import SliderInputNumber from './FormComponent/SliderInputNumber';
import MyEditor from './MyEditor';
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

const HOST='host';//主机路径
const GRID_HEIGHT='gridHeight';//格子单位高度
const GRID_WIDTH='gridWidth';//格子单位宽度
const COLS='cols';//格子单位宽度
const MARGIN_LR=`marginLR`;//左右间距
const MARGIN_TB=`marginTB`;//上下间距
const CONTAINER_TYPE=`containerType`;
const CONTAINER_HEIGHT=`containerHeight`;
const DEFAULT_HOST=`http://localhost:8080/`;//默认单位宽度
const METHOD_LIST=[`GET`,`POST`,`PUT`,`DELETE`];//请求方法列表
const CONTENT_TYPE_LIST=[
  {
    name:`Form`,
    value:`application/x-www-form-urlencoded`,
  },
  {
    name:`JSON`,
    value:`application/json`,
  },
];//contenttype
const DEFAULT_GRID_WIDTH=10;//默认单位宽度
const DEFAULT_GRID_HEIGHT=32;//默认单位高度
const DEFAULT_MARGIN_LR=0;//默认左右间距
const DEFAULT_MARGIN_TB=0;//默认上下间距
const DEFAULT_COLS=12;//默认栅格数量
const SETTING_DRAWER_WIDTH=512;//布局抽屉宽度
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


//Fled Page Reader
@create()
@observer
export class FPR extends Component {
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
    }=props;
    if(props.store){
      return {
        store,
        gridHeight,
        marginLR,
        marginTB,
        cols,
        containerHeight,
        host,
      }
    }
    return null;
  }

  componentDidMount(){
    const {setting,layout,layoutData}=this.props;
    if(setting&&layout&&layoutData){
      const store=new Store();
      store.layout=layout;
      store.layoutData=layoutData;
      store.mode='production';
      store.createBasicLayoutClass();
      this.setState({
        store,
        ...setting,
      })
    }
  }

  resize=()=>{
    setTimeout(debounce(this.resizeEvent,200),200);
  }
  resizeEvent=()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  onLayoutChange=(layout)=>{
    console.log(`onLayoutChange`,layout);
    this.state.store.setLayoutData(layout)
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

  render(){
    const {
      form:{
        getFieldDecorator
      },

    }=this.props;
    const {
      store,
      gridHeight,
      marginLR,
      marginTB,
      cols,
      containerHeight,
      host,
    }=this.state;
    return (
      <Skeleton
        active
        loading={!store||store.loading}
        paragraph={{ rows: 6 }}
      >
        {
          store&&
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
                  bindRef,
                  preventCollision,
                  change,
                  containerBorder,
                }=store;
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
                      if(layout.length===0){
                        <Empty/>
                      }else{
                        <ReactGridLayout
                          ref={this.layoutRef}
                          isDraggable={isDraggable}
                          isResizable={isResizable}
                          layout={toJS(layoutData)}
                          onLayoutChange={this.onLayoutChange}
                          measureBeforeMount={false}
                          margin={[marginLR,marginTB]}
                          rowHeight={gridHeight}
                          cols={cols}
                          compactType={compact}
                          preventCollision={preventCollision}
                          onDragStop={this.resize}
                          onResizeStop={this.resize}
                        >
                          {
                            layout.map((e,i)=>{
                              const {
                                ComponentClass,
                                ComponentType,
                                ComponentProps,
                                ComponentChildrenClass,
                                fieldName,
                              }=e;
                              return (
                                <Block
                                  data-grid={e}
                                  key={e.i}
                                >
                                  <div
                                    ref={dom=>bindRef?.(dom,e,marginTB,gridHeight)}
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
                                              // getValueFromEvent:(e)=>{
                                              //   console.log(e);
                                              //   return e.format(`YYYY-MM-DD`)
                                              // },
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
                                        <ComponentClass/>
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
        }
      </Skeleton>
    )
  }
}

//Fled Page Builder
@create({
  onFieldsChange(props, fields){
    if(fields.gridHeight){
      // store.setChange()
    }
  }
})
export default class FPB extends Component {
  layoutRef=React.createRef();
  toolRef=React.createRef();

  componentDidMount(){
    window.addEventListener(`resize`,()=>console.log(`resize`))
    store.setDefaultLeft(this.toolRef.current.clientWidth-18)
  }

  savePageData=()=>{
    const setting=this.props.form.getFieldsValue();
    store.savePageData({setting});
  }




  render() {
    const {
      form:{
        getFieldsValue,
        getFieldDecorator,
      }
    }=this.props;
    const {
      host=DEFAULT_HOST,
      gridHeight=DEFAULT_GRID_HEIGHT,
      marginLR=DEFAULT_MARGIN_LR,
      marginTB=DEFAULT_MARGIN_TB,
      cols=DEFAULT_COLS,
      containerType=DEFAULT_CONTAINER_TYPE,
      containerHeight=DEFAULT_CONTAINER_HEIGHT,
    }=getFieldsValue();
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
                              <Button
                                onClick={addItem}
                                disabled={addDisabled}
                                icon="plus"
                                shape="circle"
                                type="primary"
                              />
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
        <FPR
          {...FPRProps}
        />
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
                                <span/>
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
      </Fragment>
    );
  }
}
