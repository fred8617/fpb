import React, { SFC, useRef, useEffect } from "react";
import { Form, Button } from "antd";
import FullScreenModal from "./FullScreenModal";
import FPB from "FBP";
import { ComponentType } from "./useFPBStore";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, Observer } from "mobx-react-lite";
const { create } = Form;
interface FPBFormProps {
  components: ComponentType[];
  onChange?(e);
}
const FPBForm: SFC<FPBFormProps> = props => {
  const ref: any = useRef();
  const store = useLocalStore(() => ({
    visible: false,
    setVisible(visible) {
      store.visible = visible;

    }
  }));
  return (
    <>
      <Button onClick={_ => store.setVisible(true)}>设计</Button>
      <Observer>
        {() => (
          <FullScreenModal
            onOk={_ => {
            //   ref.current.config;
              if (props.onChange) {
                props.onChange(ref.current.config);
              }
            }}
            destroyOnClose
            onCancel={_ => store.setVisible(false)}
            visible={store.visible}
          >
            <FPB forwardRef={ref} components={props.components} />
          </FullScreenModal>
        )}
      </Observer>
    </>
  );
};

export default FPBForm;
