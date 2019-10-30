import { Input, Checkbox } from "antd";
import { ComponentType } from "FBP/FPB";
const checkbox: ComponentType = {
  id: "antd-checkbox",
  label: "复选框",
  name: "Checkbox",
  path: "antd",
  group: "antd",
  isDefault: false,
  Component: Checkbox,
  formField: true,
  children: [
    {
      id: "antd-checkbox-group",
      label: "复选框组",
      name: "Group",
      Component: Checkbox.Group,
      formField: true,
      componentProps: {
        defaultValue: {
          type: "array:string",
          label: "默认值"
        },
        value: {
          type: "array:string",
          label: "值"
        },
        children: {
          type: "array:component",
          label: "复选框",
          Component: Checkbox,
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
export default checkbox;
