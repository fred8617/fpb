import React, { SFC, Fragment } from "react";
import FPB from "./FBP";
import { Input, Button, Tabs, Radio, Checkbox } from "antd";

const App: React.FC = () => {
  return (
    <FPB
      components={[
        {
          id: "antd-input",
          label: "输入框",
          name: "Input",
          isDefault: false,
          path: "antd",
          group: "antd",
          Component: Input,
          componentProps: {
            placeholder: {
              label: "空白占位符",
              type: "string"
            }
          },
          children: [
            {
              id: "antd-textarea",
              label: "文本域",
              name: "TextArea",
              Component: Input.TextArea
            }
          ]
        },
        {
          id: "antd-checkbox",
          label: "复选框",
          name: "Checkbox",
          path: "antd",
          group: "antd",
          isDefault: false,
          Component: Checkbox,
          children: [
            {
              id: "antd-checkbox-group",
              label: "复选框组",
              name: "Group",
              Component: Checkbox.Group,
              componentProps: {
                defaultValue:{
                  type: "array:string",
                  label: "默认值",
                },
                value: {
                  type: "array:string",
                  label: "值"
                },
                children: {
                  type: "array:component",
                  label: "单选框",
                  Component: Checkbox,
                  componentProps: {
                    children: {
                      type: "string",
                      label: "label",
                    },
                    value: {
                      type: "string",
                      label: "值"
                    }
                  }
                }
              }
            }
          ]
        },

        {
          id: "antd-radio",
          label: "单选框",
          name: "Radio",
          isDefault: false,
          path: "antd",
          group: "antd",
          Component: Radio,
          children: [
            {
              id: "antd-radio-group",
              label: "单选框组",
              name: "Group",
              Component: Radio.Group,
              componentProps: {
                children: {
                  type: "array:component",
                  label: "单选框",
                  Component: Radio,
                  componentProps: {
                    children: {
                      type: "string",
                      label: "label"
                    },
                    value: {
                      type: "string",
                      label: "值"
                    }
                  }
                }
              }
            }
          ]
        },
        {
          id: "antd-button",
          label: "按钮",
          name: "Button",
          isDefault: false,
          path: "antd",
          group: "antd",
          Component: Button
        },
        {
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
        }
      ]}
    />
  );
};

export default App;
