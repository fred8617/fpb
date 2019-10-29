import {
  Form,
  Select,
  TreeSelect,
  Input,
  Switch,
  Tooltip,
  Icon,
  Button,
  Radio
} from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ComponentGroup, ComponentType, FBPItem, ComponentProps } from "./FPB";
import React, { useState, useEffect } from "react";
import _ from "lodash";
const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
export interface ItemSettingProps {
  /**
   * 分组组件
   */
  componentGroup: (ComponentGroup | ComponentType)[];
  /**
   * 平铺组件方便查找属性
   */
  flatComponents: { [id: string]: ComponentType };
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
  const [keyCounter, setKeyCounter] = useState({});
  useEffect(() => {
    //临时解决方案
    Object.keys(keyCounter).length &&
      props.form.setFieldsValue({
        componentProps: props.form.getFieldsValue().componentProps || {}
      });
  }, [keyCounter]);
  const { form, item, onItemPropsChange } = props;
  const initialValue: FBPItem | { [key: string]: any } = item || {};
  const { getFieldDecorator, getFieldsValue, getFieldValue } = form;
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
  const { componentId } = getFieldsValue();
  console.log(props.flatComponents[componentId]);
  const { componentProps = {} } = props.flatComponents[componentId] || {};
  console.log("cprops", getFieldsValue());
  const createComponentPropsForm = (
    componentProps: ComponentProps,
    prefix = "componentProps"
  ) => {
    return Object.entries(componentProps).map(([name, prop], i) => {
      let setting;
      const propName = `${prefix}.${name}`;

      if (prop.type === "string") {
        setting = getFieldDecorator(propName, { initialValue: "" })(<Input />);
      } else if (
        prop.type === "array:component" ||
        prop.type === "array:string"
      ) {
        // const props = getFieldsValue()[prefix];
        // const prop = (props && props[name]) || [];
        let mapedArr;
        if (keyCounter[propName] && keyCounter[propName]) {
          mapedArr = keyCounter[propName];
          if (prop.createDefault) {
            mapedArr = mapedArr.concat([{}]);
          }
        } else if (prop.createDefault) {
          mapedArr = [{}];
        } else {
          mapedArr = [];
        }

        // debugger;
        setting = (
          <>
            <Button
              icon="plus"
              onClick={e => {
                const props = _.get(getFieldsValue(), prefix) || {};
                if (!props[name]) {
                  //没有则默认设置为空数组并默认添加一个
                  keyCounter[propName] = [{}];
                  setKeyCounter({ ...keyCounter });
                  return;
                }
                //这里是有createDefault的情况，只走这里
                if (!keyCounter[propName]) {
                  keyCounter[propName] = [];
                }
                keyCounter[propName].push({});
                // onItemPropsChange('componentProps' ,keyCounter[propName]);
                setKeyCounter({ ...keyCounter });
                // props[name].push({});
                // console.log(values);
              }}
            ></Button>
            {(prop.type === "array:component" &&
              mapedArr.map((p, pi) => {
                console.log(`${propName}[${pi}].componentProps`);
                return createComponentPropsForm(
                  componentProps[name].componentProps,
                  `${propName}[${pi}].componentProps`
                );
              })) ||
              (prop.type === "array:string" &&
                mapedArr.map((p, pi) => {
                  const key=`${propName}[${pi}]`
                  console.log(key);
                  return (
                    <Item key={key}>
                      {getFieldDecorator(key, {
                        initialValue: ""
                      })(<Input />)}
                    </Item>
                  );
                }))}
          </>
        );
      }
      return (
        <Item key={`props${i}`} label={prop.label}>
          {setting}
        </Item>
      );
    });
  };
  const propsDecModels = createComponentPropsForm(componentProps);
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
      {propsDecModels}
    </>
  );
};
export default create<ItemSettingFormProps>({
  onValuesChange(props, changedValues, allValues) {
    const field = Object.keys(changedValues)[0];
    if (!field) {
      return;
    }
    const value = changedValues[field];
    console.log("onValuesChange", field, allValues[field]);
    if (field === "componentId") {
      props.onItemTypeChange(value);
    } else {
      props.onItemPropsChange(field, allValues[field]);
    }
  },
  onFieldsChange(props, fields) {}
})(ItemSettingForm);
