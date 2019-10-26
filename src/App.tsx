import React from "react";
import FPB from "./FBP";
import { Input, Button, Tabs } from "antd";

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
          props: {
            children: {
              label: "子元素",
              type: "array",
              component: Tabs.TabPane,
              createDefault:true,
            }
          }
        }
      ]}
    />
  );
};

export default App;
