import { Form, Select, TreeSelect, Input, Switch, Tooltip, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ComponentGroup, ComponentType, FBPItem } from "./FPB";
import React from "react";

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
export interface ItemSettingProps {
  /**
   * 分组组件
   */
  componentGroup: (ComponentGroup | ComponentType)[];
  /**
   * item类型
   * @param id id
   */
  onItemTypeChange(id: string);
  /**
   * item的属性改变
   * @param field 字段
   * @param value 值
   */
  onItemPropsChange(field: string, value: any);
}
export interface ItemSettingFormProps
  extends FormComponentProps,
    ItemSettingProps {
  /**
   * 编辑中数据，用于初始化值
   */
  item: FBPItem;
}

const { create, Item } = Form;

const ItemSettingForm: React.SFC<ItemSettingFormProps> = props => {
  const { form, item } = props;
  const initialValue: any = item || {};
  const { getFieldDecorator } = form;
  const renderTypeTreeNode = component => {
    if (component.children) {
      return (
        <TreeNode
          value={component.id}
          title={component.label}
          key={component.id}
        >
          {component.children.map(component => {
            return renderTypeTreeNode(component);
          })}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        value={component.id}
        title={component.label}
        key={component.id}
      />
    );
  };
  const componentTypeDec = getFieldDecorator("componentId", {
    initialValue: initialValue.componentId
  });
  const autoHeightDec = getFieldDecorator("autoHeight", {
    valuePropName: "checked",
    initialValue: initialValue.autoHeight
  });
  return (
    <>
      <Item label={"组件"}>
        {componentTypeDec(
          <TreeSelect
            showSearch
            style={{ width: `100%` }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择组件"
            allowClear
            autoClearSearchValue
            treeDefaultExpandAll
          >
            {props.componentGroup.map((groupOrComponent, index) => {
              if (groupOrComponent.id) {
                return renderTypeTreeNode(groupOrComponent);
              }
              return (
                <TreeNode
                  disabled
                  value={"group"}
                  title={groupOrComponent["groupName"]}
                  key={`group${index}`}
                >
                  {groupOrComponent[groupOrComponent["groupName"]].map(
                    component => {
                      return renderTypeTreeNode(component);
                    }
                  )}
                </TreeNode>
              );
            })}
          </TreeSelect>
        )}
      </Item>
      <Item
        label={
          <span>
            自适应高度&nbsp;
            <Tooltip title="开启后区块将自适应内容高度，不能进行纵向resize操作">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {autoHeightDec(
          <Switch checkedChildren={"开"} unCheckedChildren={"关"} />
        )}
      </Item>
    </>
  );
};
export default create<ItemSettingFormProps>({
  onValuesChange(props, changedValues, allValues) {
    const field = Object.keys(changedValues)[0];
    const value = changedValues[field];
    if (field === "componentId") {
      props.onItemTypeChange(value);
    } else {
      props.onItemPropsChange(field, value);
    }
  },
  onFieldsChange(props, fields) {}
})(ItemSettingForm);
