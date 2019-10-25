import React from "react";
import FPB from "./FBP";
import { Input, Button } from "antd";

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
          Component:Input,
          children: [{ id: "antd-textarea", label: "文本域", name: "TextArea",Component:Input.TextArea }]
        },
        {
          id: "antd-button",
          label: "按钮",
          name: "Button",
          isDefault: false,
          path: "antd",
          Component:Button,
        }
      ]}
    />
  );
};

export default App;
