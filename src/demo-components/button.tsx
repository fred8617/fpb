import { Input, Checkbox, Radio, Button } from "antd";
import { ComponentType } from "FPB/useFPBStore";
const button: ComponentType = {
  id: "antd-button",
  label: "按钮",
  name: "Button",
  isDefault: false,
  path: "antd",
  group: "antd",
  Component: Button
};
export default button;
