import React, { SFC } from "react";
import { Form, Button } from "antd";
import FullScreenModal from "./FullScreenModal";
import FPB from "FBP";
import { ComponentType } from "./useFPBStore";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, Observer } from "mobx-react-lite";
const { create } = Form;
interface FPBFormProps {
  components: ComponentType[];
}
const FPBForm: SFC<FPBFormProps> = props => {
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
            destroyOnClose
            onCancel={_ => store.setVisible(false)}
            visible={store.visible}
          >
            <FPB components={props.components} />
          </FullScreenModal>
        )}
      </Observer>
    </>
  );
};

export default FPBForm;
