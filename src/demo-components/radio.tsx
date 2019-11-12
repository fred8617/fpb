import { Input, Checkbox, Radio } from "antd";
import { ComponentType } from "FPB/useFPBStore";
const radio: ComponentType = {
  id: "antd-radio",
  label: "单选框",
  name: "Radio",
  isDefault: false,
  path: "antd",
  group: "antd",
  Component: Radio,
  formField: true,
  children: [
    {
      id: "antd-radio-group",
      label: "单选框组",
      name: "Group",
      Component: Radio.Group,
      formField: true,
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
};
export default radio;
