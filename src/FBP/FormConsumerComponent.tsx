import { SFC, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
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

  return useObserver(() => {
    const { $id, i } = item;
    const id = ($id && $id.trim()) || i;
    return (
      <Consumer>
        {({ form }) => <>{form.getFieldDecorator(id)(component)}</>}
      </Consumer>
    );
  });
};

export default FormConsumerComponent;
