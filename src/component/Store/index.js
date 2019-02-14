import {
  observable,
  action,
  set,
  computed,
  toJS,
  runInAction,
} from 'mobx';
import _ from 'lodash';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


async function loadAntElement(name){
  let element={
    ComponentProps:{

    }
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
  ]
  @observable mode="develop";//开发模式
  @observable compact="vertical";//碰撞模式
  @observable toolHide=true;//工具板显隐
  @observable toolDefaultLeft=9999;//默认左偏移
  @computed get toolIcon(){//工具板图标
    return this.toolHide?`right`:`left`;
  }
  @computed get preventCollision(){//碰撞失效
    return this.compact===`none`;
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
    this.layoutData.forEach(e=>min=Math.max(min,e.w));
    return min;
  }

  @observable settingDrawerVisible=false;//布局设置
  @observable layoutDrawerPlacement=`right`;//布局抽屉方向
  @observable itemSettingDrawerVisible=false;//元素设置
  @observable editingItem=null;//编辑中元素
  @observable layout=[];
  @observable layoutData=[];

  @action toggleTool=(e)=>{//工具版切换
    this.toolHide=!this.toolHide;
  }
  @action addChildrenProps=(index)=>{//添加子选项
    this.editingItem.ComponentProps.ChildrenProps.splice(index+1,0,{children:``,value:``})
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
  @action layoutDrawerPlacementChange=(e)=>{//布局抽屉方向变化
    this.layoutDrawerPlacement=e.target.value;
  }
  @action showSettingDrawer=()=>{
    this.toggleTool();
    this.settingDrawerVisible=true;
  }
  @action setLayoutData=(layoutData)=>{
    this.layoutData=layoutData;
  }
  @action showItemSettingDrawer=(e)=>{//开始编辑
    this.editingItem=e;
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
  @action itemRequiredMessageChange=(e)=>{//必填标语
    this.editingItem.ComponentProps.rules.isRequired.message=e.target.value;
  }
  @action itemRowShowNumberChange=(e)=>{//每行显示数量
    this.editingItem.ComponentProps.rowShowNumber=e;
  }
  @action itemChildrenPropsChange=(e,prop,value)=>{//每行显示数量
    e[prop]=value;
  }

  @action setElementBasicProps=(element,item)=>{//设置元素基础属性
    const {counterNum,type}=item;
    element.ComponentProps.props={}
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
            )
            element.ComponentProps.ChildrenProps=ChildrenProps;
            break;
          default:

        }
        break;
      default:

    }
    return element;
  }
  @action itemTypeChange=async(e)=>{
    this.editingItem.type=e;
    if(e===`blank`){
      this.editingItem.ComponentClass=null;
      return;
    }
    const el=await loadAntElement(e);
    this.setElementBasicProps(el,this.editingItem);

    runInAction(()=>{
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
    this.layout.push({
      x:0,
      w:1,
      h:3,
      y:Infinity,
      i:`item${counterNum}`,
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
