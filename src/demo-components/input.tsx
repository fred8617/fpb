import { Input } from "antd";
import { ComponentType } from "../fpb/useFPBStore";
const input:ComponentType={
    id: "antd-input",
    label: "输入框",
    name: "Input",
    isDefault: false,
    path: "antd",
    group: "antd",
    Component: Input,
    formField:true,
    componentProps: {
      placeholder: {
        label: "空白占位符",
        type: "string",
      }
    },
    children: [
      {
        formField:true,
        id: "antd-textarea",
        label: "文本域",
        name: "TextArea",
        Component: Input.TextArea
      }
    ]
  }
export default input