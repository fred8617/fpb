import React, { SFC, useRef, useEffect } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FullScreenModal from './FullScreenModal';
import { printSchema } from 'graphql';
import { useLocalStore, Observer } from 'mobx-react-lite';
import { Button, Form } from 'antd';
import { doWindowResize } from './utils';
import ErrorWrapper from './ErrorWrapper';
interface GraphqlEditorProps {
  onChange?(e);
  value?;
}
const { create, Item } = Form;
const GraphqlEditor: SFC<GraphqlEditorProps> = props => {
  const client = useApolloClient();
  const ref = useRef();
  const footerRef: any = useRef();
  const store = useLocalStore(() => ({
    visible: false,
    setVisible(visible) {
      store.visible = visible;
      if (visible) {
        setTimeout(() => {
          store.minuHeight = footerRef.current.clientHeight + 21;
          doWindowResize();
        }, 200);
      }
    },
    minuHeight: 0,
  }));
  useEffect(() => {
    console.log(ref);
  }, []);
  return (
    <>
      <style>
        {`
        
        .graphiql-container .doc-explorer-title, .graphiql-container .history-title{
            padding: 0px;
            height: 34px;
            line-height: 34px;
        }
        `}
      </style>
      <Button onClick={_ => store.setVisible(true)}>Graphql编辑器</Button>
      <Observer>
        {() => (
          <FullScreenModal
            minuHeight={store.minuHeight}
            closable={false}
            onOk={() => {}}
            destroyOnClose
            footer={
              <div ref={footerRef}>
                <Form layout="inline">
                  <Item>
                    <Button
                      type="primary"
                      onClick={_ => {
                        const value = (ref.current as any)
                          .getQueryEditor()
                          .getValue();
                        if (props.onChange) {
                          props.onChange(value);
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
                        const value = (ref.current as any)
                          .getQueryEditor()
                          .getValue();
                        if (props.onChange) {
                          props.onChange(value);
                        }
                        store.setVisible(false);
                      }}
                    >
                      保存并关闭
                    </Button>
                  </Item>
                  <Item>
                    <Button
                      onClick={_ => {
                        store.setVisible(false);
                      }}
                    >
                      关闭
                    </Button>
                  </Item>
                </Form>
              </div>
            }
            onCancel={_ => store.setVisible(false)}
            visible={store.visible}
            bodyStyle={{ padding: 0 }}
          >
            {store.visible && (
              <ErrorWrapper>
                {() => (
                  <GraphiQL
                    query={props.value}
                    ref={ref}
                    // response={`{a:1}`}
                    //   query={null}
                    storage={{ getItem() {}, setItem() {} }}
                    operationName={'query'}
                    fetcher={param => client.query({ query: gql(param.query) })}
                  >
                    <GraphiQL.Logo>FPB Graphiql</GraphiQL.Logo>
                  </GraphiQL>
                )}
              </ErrorWrapper>
            )}
          </FullScreenModal>
        )}
      </Observer>
    </>
  );
};
export { GraphqlEditor as default };
