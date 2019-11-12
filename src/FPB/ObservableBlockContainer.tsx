import React from 'react';
import { Popover, Form, Button } from 'antd';
import { FPBStore, FPBItem } from './useFPBStore';
import { useObserver, Observer } from 'mobx-react-lite';
export interface ObservableBlockContainerProps {
  /**
   * 全局store
   */
  store: FPBStore;
  /**
   * itemkey
   */
  itemKey: string;
  /**
   * @interface FPBItem
   */
  data: FPBItem;
}
const ObservableBlockContainer: React.SFC<
  ObservableBlockContainerProps
> = props => {
  const hasEditingItem = props.store.isEditing;
  const isEditingItem =
    props.store.editingItem && props.store.editingItem.i === props.itemKey;
  const hasBorder = !hasEditingItem || isEditingItem;
  const border = `1px solid ${isEditingItem ? '#e72727' : '#d3d3d3'}`;
  return (
    <Observer>
      {() => (
        <>
          <div
            className="item-container"
            style={{
              border: hasBorder ? border : null,
              zIndex: isEditingItem ? null : 1,
              boxSizing: isEditingItem ? 'content-box' : null,
            }}
          >
            {!isEditingItem && (
              <Popover
                trigger="contextMenu"
                content={
                  <>
                    <Form layout="inline">
                      <Form.Item>
                        <Button
                          icon="edit"
                          onClick={_ => {
                            props.store.setEditingItem(props.data);
                          }}
                          type="primary"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          icon="delete"
                          type="danger"
                          onClick={_ => props.store.deleteItem(props.itemKey)}
                        />
                      </Form.Item>
                    </Form>
                  </>
                }
              >
                <div className="function-container"></div>
              </Popover>
            )}
          </div>
        </>
      )}
    </Observer>
  );
};
export default ObservableBlockContainer;
