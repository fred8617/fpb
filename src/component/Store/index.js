import {
  observable,
  action,
  set,
  computed,
  toJS,
  runInAction,
} from 'mobx';
import _ from 'lodash';


function loadAntElement(name){
  let element;
  switch (name) {
    case 'input':
      element=import('antd/lib/input');
      break;
    default:
      element=import('antd/lib/input');
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
      style.height=`93%`;
    }else{
      style.height=192;
    }
    return style;
  }
  @computed get isResizable(){//是否可缩放
    return this.isDraggable;/**/
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
  @action itemTypeChange=async(e)=>{
    this.editingItem.type=e;
    const el=await loadAntElement(e);
    runInAction(()=>{
      this.editingItem.ComponentClass=el.default;
    });
    // console.log(el);
    // this.editingItem.ComponentClass=await import(`${ANTD_PREFIX}/${e}`).then(e=>{
    //   console.log(e);
    // }).catch(e=>{
    //   console.log(e);
    // });
  }
  @action hideSettingDrawer=()=>{//收起全局设置
    this.settingDrawerVisible=false;
  }
  @action hideItemSettingDrawer=()=>{//收起元素设置
    this.itemSettingDrawerVisible=false;
    this.editingItem=null;
  }
  @action addItem=()=>{
    this.layout.push({
      x:0,
      w:1,
      h:1,
      y:Infinity,
      i:`item${this.counter}`,
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
