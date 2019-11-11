import React, { SFC, useRef, useEffect } from 'react';
import { Form, Button } from 'antd';
import FullScreenModal from './FullScreenModal';
import FPB from 'FBP';
import { ComponentType } from './useFPBStore';
import { FormComponentProps } from 'antd/lib/form';
import { useLocalStore, Observer } from 'mobx-react-lite';
import { doWindowResize } from './utils';
const { create, Item } = Form;
interface FPBFormProps {
  components: ComponentType[];
  onChange?(e);
  value?;
}
const FPBForm: SFC<FPBFormProps> = props => {
  const ref: any = useRef();
  const footerRef: any = useRef();
  const store = useLocalStore(() => ({
    visible: false,
    setVisible(visible) {
      store.visible = visible;
      if (visible) {
        setTimeout(() => {
          store.minuHeight = footerRef.current.clientHeight + 21;
        }, 0);
      }
    },
    minuHeight: 0,
  }));
  return (
    <>
      <Button onClick={_ => store.setVisible(true)}>设计</Button>
      <Observer>
        {() => (
          <FullScreenModal
            minuHeight={store.minuHeight}
            onOk={_ => {
              //   ref.current.config;
              if (props.onChange) {
                props.onChange(ref.current.config);
              }
            }}
            destroyOnClose
            footer={
              <div ref={footerRef}>
                <Form layout="inline">
                  <Item>
                    <Button
                      type="primary"
                      onClick={_ => {
                        //   ref.current.config;
                        if (props.onChange) {
                          props.onChange(ref.current.config);
                        }
                      }}
                    >
                      保存
                    </Button>
                  </Item>
                  <Item>
                    <Button
                      type="danger"
                      onClick={_ => {
                        //   ref.current.config;
                        if (props.onChange) {
                          props.onChange(ref.current.config);
                        }
                        store.setVisible(false);
                      }}
                    >
                      保存并关闭
                    </Button>
                  </Item>
                </Form>
              </div>
            }
            onCancel={_ => store.setVisible(false)}
            visible={store.visible}
          >
            {store.visible && (
              <FPB
                renderDelay={200}
                forwardRef={ref}
                components={props.components}
                defaultDatas={props.value}
              />
            )}
          </FullScreenModal>
        )}
      </Observer>
    </>
  );
};

export default FPBForm;
