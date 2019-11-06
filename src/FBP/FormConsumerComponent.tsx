import { SFC, useEffect } from "react";
import { Form } from "antd";
import { useObserver, Observer } from "mobx-react-lite";
import { Consumer } from "./FormContext";
import { FBPItem } from "./FPB";
import React from "react";
const { Item } = Form;
/**
 * FPB表单元素
 */
interface FormConsumerComponentProps {
  /**
   * 传入元素
   */
  item: FBPItem;
  /**
   * 传入的表单组件
   */
  component: React.ReactElement;
}
const FormConsumerComponent: SFC<FormConsumerComponentProps> = ({
  item,
  component
}) => {
  useEffect(() => {
    console.log("FormConsumerComponentProps");
  }, []);

  return (
    <Observer>
      {() => {
        const { $id, i, label } = item;
        const id = ($id && $id.trim()) || i;

        return (
          <Consumer>
            {({ form }) => {
              let renderComponent = form.getFieldDecorator(id)(component);
              if (label) {
                renderComponent = <Item label={label}>{renderComponent}</Item>;
              }
              return <>{renderComponent}</>;
            }}
          </Consumer>
        );
      }}
    </Observer>
  );
};

export default FormConsumerComponent;
