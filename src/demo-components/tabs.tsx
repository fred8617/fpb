import { Input, Checkbox, Radio, Button, Tabs } from "antd";
import { ComponentType } from "FBP/FPB";
import { Fragment } from "react";
const tabs: ComponentType ={
    id: "antd-tabs",
    label: "选项卡",
    name: "Tabs",
    isDefault: false,
    path: "antd",
    group: "antd",
    Component: Tabs,
    componentProps: {
      children: {
        label: "子元素",
        type: "array:component",
        Component: Tabs.TabPane,
        createDefault: true,
        componentProps: {
          tab: {
            label: "标题",
            type: "string"
          },
          children: {
            label: "选项卡内容",
            type: "array:component",
            Component: Fragment,
            componentProps: {
              children: {
                label: "内容",
                type: "string"
              }
            }
          }
        }
      }
    }
  };
export default tabs;