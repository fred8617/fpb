import React from "react";
import FPB from "./FBP";
import { Input, Button, Tabs, Radio } from "antd";

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
          id: "antd-radio",
          label: "单选按钮",
          name: "Radio",
          isDefault: false,
          path: "antd",
          group: "antd",
          Component: Radio,
          children: [
            {
              id: "antd-radio-group",
              label: "单选按钮组",
              name: "Group",
              Component: Radio.Group,
              componentProps: {
                children: {
                  type: "array",
                  label: "单选框",
                  Component: Radio,
                  componentProps: {
                    children: {
                      type: "string",
                      label: "label"
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
              type: "array",
              Component: Tabs.TabPane,
              createDefault: true,
              componentProps: {
                tab: {
                  label: "标题",
                  type: "string"
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
