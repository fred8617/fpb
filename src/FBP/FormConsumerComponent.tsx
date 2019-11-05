import { SFC, useEffect } from "react";
import { useObserver, Observer } from "mobx-react-lite";
import { Consumer } from "./FormContext";
import { FBPItem } from "./FPB";
import React from "react";

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
        const { $id, i } = item;
        const id = ($id && $id.trim()) || i;
        return (
          <Consumer>
            {({ form }) => <>{form.getFieldDecorator(id)(component)}</>}
          </Consumer>
        );
      }}
    </Observer>
  );
};

export default FormConsumerComponent;
