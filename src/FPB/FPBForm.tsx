import React, { SFC, useRef, useEffect } from 'react';
import { Form, Button, Modal, Drawer } from 'antd';
import FullScreenModal from './FullScreenModal';
import FPB from './FPB';
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
    destory: false,
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
          <Drawer
            drawerStyle={{ height: `100%` }}
            style={{ height: `100%`, transform: `translate(0)` }}
            bodyStyle={{ height: `100%`, padding: 5 }}
            width={`100%`}
            onClose={_ => store.setVisible(false)}
            destroyOnClose
            visible={store.visible}
          >
            <>
              <style>
                {`
            .react-grid-item > .react-resizable-handle{
              display:block;
            }
            `}
              </style>
              <FPB
                renderActions={() => (
                  <>
                    <Item>
                      <Button
                        type="primary"
                        onClick={_ => {
                          //   ref.current.config;
                          props.onChange(null);
                          setTimeout(
                            () => props.onChange(ref.current.config),
                            200,
                          );
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
                            props.onChange(null);
                            setTimeout(
                              () => props.onChange(ref.current.config),
                              200,
                            );
                          }
                          store.setVisible(false);
                        }}
                      >
                        保存并关闭
                      </Button>
                    </Item>
                  </>
                )}
                renderDelay={200}
                forwardRef={ref}
                components={props.components}
                defaultDatas={props.value}
              />
            </>
          </Drawer>
        )}
      </Observer>
    </>
  );
};

export default FPBForm;
