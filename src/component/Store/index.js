import {
  observable,
  action,
  set,
  computed,
  toJS,
  runInAction,
} from 'mobx';
import debounce from 'lodash/debounce';
import React from 'react';
import {message} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import elementResizeDetectorMaker from 'element-resize-detector';
const erd = elementResizeDetectorMaker();
async function loadAntElement(name){
  let element={

  };
  let ComponentClass;
  switch (name) {
    case 'input':
      element.ComponentClass=(await import('antd/lib/input')).default;
      element.ComponentType=`form`;
      break;
    case 'input-number':
      element.ComponentClass=(await import('antd/lib/input-number')).default;
      element.ComponentType=`form`;
      break;
    case 'select':
      element.ComponentClass=(await import('antd/lib/select')).default;
      element.ComponentType=`form`;
      element.ComponentChildrenClass=element.ComponentClass.Option;
      break;
    case 'checkbox':
      ComponentClass=(await import('antd/lib/checkbox')).default;
      element.ComponentClass=ComponentClass.Group;
      element.ComponentChildrenClass=ComponentClass;
      element.ComponentType=`form`;
      break;
    case 'radio':
      ComponentClass=(await import('antd/lib/radio')).default;
      element.ComponentClass=ComponentClass.Group;
      element.ComponentChildrenClass=ComponentClass;
      element.ComponentType=`form`;
      break;
    case 'date-picker':
      element.ComponentClass=(await import('antd/lib/date-picker')).default;
      element.ComponentType=`form`;
      break;
    case 'time-picker':
      element.ComponentClass=(await import('antd/lib/time-picker')).default;
      element.ComponentType=`form`;
      break;
    case 'divider':
      element.ComponentClass=(await import('antd/lib/divider')).default;
      element.ComponentType=`layout`;
      break;
    case 'tabs':
      ComponentClass=(await import('antd/lib/tabs')).default;
      element.ComponentClass=ComponentClass;
      element.ComponentChildrenClass=ComponentClass.TabPane;
      element.ComponentType=`layout`;
      break;
    case 'button':
      element.ComponentClass=(await import('antd/lib/button')).default;
      element.ComponentType=`function`;
      break;

    default:
      element.ComponentClass=(await import('antd/lib/input')).default;
      element.ComponentType=`form`;

  }
  return element;
}




export default class Store {
  counter=0;
  formElements=[//表单元素选项
    {
      name:`文本输入框`,
      value:`input`,
    },
    {
      name:`数字输入框`,
      value:`input-number`,
    },
    {
      name:`下拉框`,
      value:`select`,
    },
    {
      name:`单选框`,
      value:`radio`,
    },
    {
      name:`复选框`,
      value:`checkbox`,
    },
    {
      name:`日期输入框`,
      value:`date-picker`,
    },
    {
      name:`时间输入框`,
      value:`time-picker`,
    },
  ];
  layoutElements=[
    {
      name:`分割线`,
      value:`divider`,
    },
    {
      name:`选项卡`,
      value:`tabs`,
    },
  ]
  functionElements=[
    {
      name:`按钮`,
      value:`button`,
    },
  ];
  unmountList=[];
  @observable change=1;//标识符
  @observable mode="develop";//开发模式
  @observable compact="vertical";//碰撞模式
  @observable toolHide=true;//工具板显隐
  @observable toolDefaultLeft=9999;//默认左偏移
  @computed get toolIcon(){//工具板图标
    return this.toolHide?`right`:`left`;
  }
  @computed get isEmpty(){//空面板
    return this.layout.length===0;
  }
  @computed get preventCollision(){//碰撞失效
    return this.compact===`none`;
  }
  @computed get containerBorder(){//碰撞失效
    return this.mode===`develop`?undefined:`none`;
  }
  @computed get toolLeft(){//工具板left
    return this.toolHide?-this.toolDefaultLeft:0;
  }
  @computed get addDisabled(){//添加禁用
    return this.mode!==`develop`||this.editingItem!=null;/**/;
  }
  @computed get isDraggable(){//是否可拖拽
    return this.mode===`develop`&&this.editingItem==null;
  }
  @computed get developing(){//开发中
    return this.mode===`develop`;
  }
  @computed get drawerBodyStyle(){//抽屉体样式
    const style={
      overflow:`auto`,
    };
    if(
      this.layoutDrawerPlacement==`left`||
      this.layoutDrawerPlacement==`right`
    ){
      style.height=`88%`;
    }else{
      style.height=192;
    }
    return style;
  }
  @computed get isResizable(){//是否可缩放
    return this.isDraggable;/**/
  }
  @computed get hasMinusButton(){//是否出现减号
    return this.editingItem?.ComponentProps?.ChildrenProps?.length>1;/**/
  }
  @computed get minCol(){//最小栅格所需数量
    let min=0;
    this.layoutData['lg']?.forEach(e=>min=Math.max(min,e.w));
    return min;
  }

  @observable settingDrawerVisible=false;//布局设置
  @observable layoutDrawerPlacement=`right`;//布局抽屉方向
  @observable itemSettingDrawerVisible=false;//元素设置
  @observable editingItem=null;//编辑中元素
  // @observable dom=null;//绑定编辑中dom
  @observable childPageDesignVisible=false;//子页面设计窗口
  @observable breakPoint='lg';
  @observable layout=[];
  @observable layoutRefs={};
  @observable layoutData={
        lg: [],
        md: [],
        sm: [],
        xs: [],
        xxs: [],
  };
  @computed get loading(){

    return false;
    // this.layout.some(e=>!e.ComponentClass&&e.type!==`blank`)
  };
  @observable parentPage=null;//父页面变量
  @action setBreakPoint=(breakPoint)=>{//设置当前断点
    this.breakPoint=breakPoint;
  }
  @action showChildPageDesign=(item)=>{//子页面设计器出现
    this.parentPage=item;
    this.childPageDesignVisible=true;
  }
  @action hideChildPageDesign=()=>{//子页面设计器关闭
    this.childPageDesignVisible=false;
  }
  @action createBasicLayoutClass=async ()=>{//FPR读取
    for(let i=0;i<this.layout.length;i++){
      if(!this.layout[i].ComponentClass&&this.layout[i].type!==`blank`){
        const el=await loadAntElement(this.layout[i].type);
        let loadEl;
        runInAction(loadEl=()=>{
          this.layout[i]={...this.layout[i],...el};
        });
      }
    }
    // let loadReady;
    // runInAction(loadReady=()=>{
    //   this.loading=false;
    // });
  }

  @action toggleTool=(e)=>{//工具版切换
    this.toolHide=!this.toolHide;
  }
  getLayoutItem=(item)=>{
    return this.layoutData[this.breakPoint]?.filter(e=>e.i===item.i)[0];
  }
  @observable unmount=false;
  @computed
  get excuteParentCacl(){
    return !this.unmount&&this.parentCacl&&debounce(this.parentCacl,50)
  }
  @action bindRef=(dom,item,marginTB,gridHeight,type)=>{//绑定
    if(dom&&item.fixGrid){
      console.log(`bindref`);
      erd.listenTo(dom, (element)=> {
        var width = element.offsetWidth;
        var clientHeight = element.offsetHeight;
        console.log("Size: " + width + "x" + clientHeight);
        const itemLayout=this.getLayoutItem(item);
            const {h}=itemLayout;

            // console.log(itemLayout,newH);
            // const {clientHeight}=dom;
            const newH=Math.max(1,Math.ceil(clientHeight/(gridHeight+marginTB)));
            itemLayout.maxH=newH;
            itemLayout.minH=newH;
            itemLayout.h=newH;
      });
    }

    // const caclNewH=action(()=>{
    //   if(item.fixGrid&&dom){
    //     // console.log(dom,item);
    //     console.log(`cacl-${type}-${item.i}`);
    //     this.layoutRefs[item.i]=dom;
    //     const itemLayout=this.getLayoutItem(item);
    //     const {h}=itemLayout;
    //
    //     // console.log(itemLayout,newH);
    //     const {clientHeight}=dom;
    //     const newH=Math.ceil(clientHeight/(gridHeight+marginTB));
    //     itemLayout.maxH=newH;
    //     itemLayout.minH=newH;
    //     itemLayout.h=newH;
    //     // this.excuteParentCacl?.()
    //     // setTimeout(()=>{
    //     //   setTimeout(()=>{
    //     //
    //     //
    //     //   },500)
    //     //
    //     //
    //     // },500);
    //
    //
    //     // const test=
    //     // setTimeout(()=>{
    //     //   let caclNewH={}
    //     //   runInAction(caclNewH[item.i]=()=>{
    //     //     // console.log(this.parentCacl);
    //     //     // setTimeout(,50)
    //     //
    //     //
    //     //   })
    //     // },0);
    //   }
    // });
    // if(item===this.editingItem&&this.developing){
    //   caclNewH();
    // }else{
    //   caclNewH();
    // }
  }
  @action addChildrenProps=(index)=>{//添加子选项
    let newChild;
    switch (this.editingItem.type) {
      case `tabs`:
        newChild={tab:``,key:``}
        break;
      default:
        newChild={children:``,value:``}
    }
    this.editingItem.ComponentProps.ChildrenProps.splice(index+1,0,newChild);

  }
  @action minusChildrenProps=(index)=>{//添加子选项
    this.editingItem.ComponentProps.ChildrenProps.splice(index,1)
  }
  @action onItemLabelChange=(label)=>{//工具版切换
      this.editingItem.ComponentProps.label=label;
  }
  @action setDefaultLeft=(e)=>{//工具版切换
    this.toolDefaultLeft=e;
  }
  @action setChange=(e)=>{//工具版切换
    this.change++;
  }
  @action layoutDrawerPlacementChange=(e)=>{//布局抽屉方向变化
    this.layoutDrawerPlacement=e.target.value;
  }
  @action showSettingDrawer=()=>{
    this.toggleTool();
    this.settingDrawerVisible=true;
  }
  @action setLayoutData=(layoutData)=>{
    this.layoutData=layoutData
    // Object.keys(layoutData).forEach(e=>{
    //   const oriLayout=this.layoutData[e];
    //   const nowLayout=layoutData[e];
    //   nowLayout.forEach((s,i)=>{
    //     if(
    //       (s&&
    //       oriLayout[i]&&
    //       JSON.stringify(toJS(s))!==JSON.stringify(toJS(oriLayout[i])))||
    //       !oriLayout[i]
    //     ){
    //       oriLayout[i]=s;
    //     }
    //   })
    // });
  }
  @action setLayout=(layout)=>{
    this.layout=layout;
  }
  @action showItemSettingDrawer=(e)=>{//开始编辑
    this.editingItem=e;
    // this.layouts=null;
    this.itemSettingDrawerVisible=true;
  }

  @action showLabelChange=(e)=>{//是否显示label
    this.editingItem.ComponentProps.showLabel=e;
  }

  @action itemFieldNameChange=(e)=>{//传值字段改变
    this.editingItem.fieldName=e.target.value;
  }

  @action blurCheck=(e)=>{
    this.editingItem.fieldName=this.getFieldName(e.target.value);
  }
  @action fixGridChange=(e)=>{//适应高度变化
    this.editingItem.fixGrid=e;
    if(e){

    }else{
      const layoutItem=this.getLayoutItem(this.editingItem);
      layoutItem.minH=undefined;
      layoutItem.maxH=undefined;
    }

  }

  @action getFieldName=(name)=>{//检查元素名称
    for(let i=0;i<this.layout.length;i++){
      const item=this.layout[i];
      const {fieldName}=item;
      if(fieldName&&fieldName===name&&this.editingItem!==item){
        name=`${name}0`;
        name=this.getFieldName(name);
        break;
      }
    }
    return name;
  }

  @action itemRequiredChange=(e)=>{//是否必填
    this.editingItem.ComponentProps.rules.isRequired.value=e;
  }

  @action saveParentPageData=({setting,parentPage})=>{//保存转换页面数据
    const pageData={
      setting,
      layout:this.layout,
      layoutData:this.layoutData,
      counter:this.counter,
    };
    parentPage.pageData=pageData;
    message.success('保存成功')
  }
  @action savePageData=({setting})=>{//保存转换页面数据
    const saveData={
      setting,
      layout:toJS(this.layout),
      layoutData:toJS(this.layoutData),
      counter:this.counter,
    }
    axios.post('asd',saveData)
    console.log(JSON.stringify(saveData));
  }

  @action textChange=(e)=>{//是否必填
    this.editingItem.text=e.target.value;
  }
  @action functionChange=(e)=>{//功能改变
    this.editingItem.functionUse=e;
  }
  @action urlChange=(e)=>{//url改变
    this.editingItem.functionProps.url=e.target.value;
  }
  @action methodChange=(e)=>{//method改变
    this.editingItem.functionProps.method=e;
  }
  @action contentTypeChange=(e)=>{//contentType改变
    this.editingItem.functionProps.contentType=e;
  }
  @action itemRequiredMessageChange=(e)=>{//必填标语
    this.editingItem.ComponentProps.rules.isRequired.message=e.target.value;
  }
  @action itemRowShowNumberChange=(e)=>{//每行显示数量
    this.editingItem.ComponentProps.rowShowNumber=e;
  }
  @action itemChildrenPropsChange=(e,prop,value)=>{//每行显示数量
    e[prop]=value;
  }
  @action designInner=(index)=>{//每行显示数量
    this.editingItem.ComponentProps.ChildrenProps[index].editing=true;
  }

  @action setElementBasicProps=(element,item)=>{//设置元素基础属性
    const {counterNum,type}=item;
    element.ComponentProps={};
    element.ComponentProps.props={};
    element.fixGrid=true;//默认适应宽高
    switch (element.ComponentType) {
      case 'form':
        element.ComponentProps.showLabel=true;
        element.ComponentProps.rules={
          isRequired:{
            label:`是否必填`,
            value:false,
            message:'',
          }
        };
        element.fieldName=this.getFieldName(`${type}${counterNum}`);
        element.ComponentProps.label=element.fieldName;
        let ChildrenProps=[];
        switch (type) {
          case 'radio':
          case 'checkbox':
            element.ComponentProps.rowShowNumber=1;//行显示数量
            element.ComponentProps.props.style={
              width:`100%`
            }
          case 'select':
            ChildrenProps.push(
              {
                children:`default1`,
                value:`default1`,
              },
              {
                children:`default2`,
                value:`default2`,
              },
            );
            element.ComponentProps.ChildrenProps=ChildrenProps;
            break;
          default:

        }
        break;
      case 'function':
        element.text=this.getFieldName(`${type}${counterNum}`);
        switch (type) {
          case 'button':
          element.functionUse=`submit`;
          element.functionProps=this.getElementFunctionProps(element.functionUse);
          element.ComponentProps.props.type=`primary`
          element.ComponentProps.props.shape=null;
          element.ComponentProps.props.icon=null;
          element.ComponentProps.props.loading=false;
          element.ComponentProps.props.trigger='onClick';
          break;
        }
        break;
      case 'layout':
        switch (type) {
          case 'tabs':
            let ChildrenProps=[];
            element.ComponentProps.ChildrenProps=ChildrenProps;
            ChildrenProps.push({
              tab:`TabX`,
              key:`1`,
              forceRender:true,
              pageData:{
                setting:{

                },
                layout:[],
                layoutData:{},
              },
            });
            break;
          default:

        }
      default:

    }
    return element;
  }
  getElementFunctionProps=(functionUse)=>{//获取方法执行参数
    const functionProps={};
    switch (functionUse) {
      case 'submit':
        functionProps.url=``;
        functionProps.method=`POST`;
        functionProps.contentType=`application/x-www-form-urlencoded`;
        functionProps.responseType=`json`;
        // functionProps.contentType=`application/x-www-form-urlencoded`;
        break;
      default:

    }
    return functionProps
  }
  @action itemTypeChange=async(e)=>{
    this.editingItem.type=e;
    if(e===`blank`){
      this.editingItem.ComponentClass=null;
      return;
    }
    const el=await loadAntElement(e);
    this.setElementBasicProps(el,this.editingItem);
    let loadAddingEl;
    runInAction(loadAddingEl=()=>{
      for(let key in el){
        set(this.editingItem,key,el[key])
      }
    });
  }
  @action hideSettingDrawer=()=>{//收起全局设置
    this.settingDrawerVisible=false;
  }
  @action hideItemSettingDrawer=()=>{//收起元素设置
    this.itemSettingDrawerVisible=false;
    this.editingItem=null;
  }
  @action addItem=()=>{
    const counterNum=this.counter;
    const i=`item${counterNum}`;
    set(this.layoutRefs,i,React.createRef())
    this.layout.push({
      x:0,
      w:1,
      h:3,
      y:Infinity,
      i,
      counterNum,
      type:'blank',
      ComponentClass:null,
    });
    this.counter++;
  }
  @action onLayoutChange(layout) {
    // console.log(layout);
    this.layout=layout;
  }
  @action deleteItem=(e)=>{
    // console.log(e);
    this.layout.remove(e);
    // console.log(_.reject(toJS(this.layout), { i:`Block${i}`}));
    // const re=_.reject(toJS(this.layout), { oriKey});
    // console.log(re);
    // this.layout=re
  }
  @action setMode=({stopPropagation,target:{value}})=>{//设置模式
    this.mode=value;
  }
  @action setCompact=({stopPropagation,target:{value}})=>{//设置碰撞
    this.compact=value;
  }


}
