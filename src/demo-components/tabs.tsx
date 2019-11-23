import { Input, Checkbox, Radio, Button, Tabs } from "antd";
import { ComponentType } from "../FPB/useFPBStore";
import { Fragment } from "react";
const tabs: ComponentType ={
    id: "antd-tabs",
    label: "选项卡",
    name: "Tabs",
    isDefault: false,
    path: "antd",
    group: "antd",
    Component: Tabs,
    children:[{
      id:'antd-tabpane',
      label:'选项卡标签',
      name:'TabPane',
      Component:Tabs.TabPane,
    }],
    componentProps: {
      children: {
        id:'antd-tabpane',
        label: "子元素",
        type: "array:component",
        Component: Tabs.TabPane,
        shouldHaveOne: true,
        componentProps: {
          tab: {
            label: "标题",
            type: "string"
          },
          key: {
            label: "key",
            type: "string"
          },
          children: {
            label: "选项卡内容",
            type: "FPR",
            // Component: Fragment,
            // componentProps: {
            //   children: {
            //     label: "内容",
            //     type: "string"
            //   }
            // }
          }
        }
      }
    }
  };
export default tabs;
