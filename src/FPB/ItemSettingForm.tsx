import {
  Form,
  Select,
  TreeSelect,
  Input,
  Switch,
  Tooltip,
  Icon,
  Button,
  Radio,
  Collapse,
  Row,
  Col,
  Divider,
  Card,
  Spin,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  ComponentGroup,
  ComponentType,
  FPBItem,
  ComponentProps,
} from './useFPBStore';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { get } from 'lodash';
import CommonInput from './CommonInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useSizeMe from './useSizeMe';
import { toJS } from 'mobx';
import { getObjectKeysWhenIsArray } from './utils';
import FPBForm from './FPBForm';
import GraphqlEditor from './GraphqlEditor';
import { observer } from 'mobx-react-lite';

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const { Panel } = Collapse;
enum Size {
  SMALL,
  MIDDLE,
  LARGE,
}
// xs	<576
// sm	≥576
// md	≥768
// lg	≥992
// xl	≥1200
// xxl ≥1600
const getFormItemCol = (width: number) => {
  const col = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
  // if (width >= 256) {
  //   col.labelCol.span = 10;
  //   col.wrapperCol.span = 14;
  // }
  return col;
};
const getCol = (width: number, size: Size) => {
  const col = { span: 24 };
  if (size === Size.LARGE) {
    return col;
  } else if (size === Size.MIDDLE) {
    if (width >= 576 && width < 1200) {
      col.span = 8;
      return col;
    } else if (width >= 1200) {
      col.span = 6;
      return col;
    }
    return col;
  } else if (size === Size.SMALL) {
    if (width > 256 && width < 576) {
      col.span = 12;
      return col;
    } else if (width >= 576 && width < 1200) {
      col.span = 6;
      return col;
    } else if (width >= 1200) {
      col.span = 4;
      return col;
    }
    return col;
  }
};
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
  item: FPBItem;
  components: ComponentType[];
  /**
   * 初始计数器
   */
  initialKeyCounter;
}

const { create, Item } = Form;

const ItemSettingForm: React.SFC<ItemSettingFormProps> = observer(props => {
  // const [render, setRender] = useState(false);
  const { form, item, onItemPropsChange } = props;
  console.log('ItemSettingForm', toJS(props, { recurseEverything: true }));
  const [keyCounter, setKeyCounter] = useState(() => props.initialKeyCounter);
  const recordItem = useRef(item);
  // useEffect(() => {
  //   setTimeout(() => setRender(true), 300);
  // }, []);
  useEffect(() => {
    if (recordItem.current !== item) {
      form.resetFields();
      recordItem.current = item;
    }
  }, [item]);
  useEffect(() => {
    // if (!render) {
    //   return;
    // }
    //临时解决方案
    const { componentProps } = form.getFieldsValue();
    Object.keys(keyCounter).length &&
      componentProps &&
      form.setFieldsValue({
        componentProps,
      });
  }, [keyCounter]);

  const initialValue: FPBItem | { [key: string]: any } =
    toJS(item, { recurseEverything: true }) || {};
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
  // const [settingForm] = useSizeMe(size => {
  //   const { width } = size;
  //   return (
  //     <>
  //       <div></div>
  //       {width && render&&(

  //       )}
  //     </>
  //   );
  // }, {});
  // if (!render) {
  //   return <>{/* <Spin spinning={true}/> */}</>;
  // }
  //组件类型
  const componentTypeDec = getFieldDecorator('componentId', {
    initialValue: initialValue.componentId,
    //preserve: true
  });
  /**
   * 自适应高度
   */
  const autoHeightDec = getFieldDecorator('autoHeight', {
    valuePropName: 'checked',
    initialValue: initialValue.autoHeight,
    //preserve: true
  });
  /**
   * 是否作为表单域
   */
  const isFormFieldDec = getFieldDecorator('isFormField', {
    valuePropName: 'checked',
    initialValue: initialValue.isFormField,
    //preserve: true
  });
  /**
   * 是否作为表单域id
   */
  const $idDec = getFieldDecorator('$id', {
    initialValue: initialValue.$id,
    //preserve: true
  });
  /**
   * 是否作为表单域label
   */
  const labelDec = getFieldDecorator('label', {
    initialValue: initialValue.label,
    //preserve: true
  });
  const { componentId, isFormField } = getFieldsValue();
  // console.log(props.flatComponents[componentId]);
  const { componentProps = {}, formField } =
    props.flatComponents[componentId] || {};
  const sortProps = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    const values = form.getFieldsValue();
    const arr = get(values, destination.droppableId);
    const dragValue = arr[source.index];
    arr.splice(source.index, 1);
    arr.splice(destination.index, 0, dragValue);
    form.setFieldsValue({
      componentProps: values.componentProps,
    });
  };
  const deleteProp = (propName, index) => {
    const values = getFieldsValue();
    const arr = get(values, propName);
    arr.splice(index, 1);
    keyCounter[propName].splice(index, 1);
    form.setFieldsValue({
      componentProps: values.componentProps,
    });
    setKeyCounter({ ...keyCounter });
  };
  const createComponentPropsForm = (
    componentProps: ComponentProps,
    prefix = 'componentProps',
  ) => {
    const componentPropsEntries = Object.entries(componentProps);
    return [
      ...componentPropsEntries
        .filter(([, prop]) => prop.type.indexOf('array') < 0)
        .map(([name, prop], i) => {
          let setting;
          const propName = `${prefix}.${name}`;
          const options = {
            rules: prop.rules,
          };
          if (prop.type === 'string') {
            setting = (
              <Item label={prop.label} key={propName}>
                {getFieldDecorator(propName, {
                  initialValue: get(initialValue, propName),
                  ...options,
                  //preserve: true
                })(<CommonInput />)}
              </Item>
            );
          } else if (prop.type === 'FPR') {
            // console.log('FPR', get(initialValue, propName));

            setting = (
              <Item label={prop.label} key={propName}>
                {getFieldDecorator(propName, {
                  initialValue: toJS(get(initialValue, propName), {
                    recurseEverything: true,
                  }),
                  ...options,
                  //preserve: true
                })(<FPBForm components={props.components} />)}
              </Item>
            );
          } else if (prop.type === 'graphql') {
            setting = (
              <Item label={prop.label} key={propName}>
                {getFieldDecorator(propName, {
                  initialValue: get(initialValue, propName),
                  ...options,
                  //preserve: true
                })(<GraphqlEditor />)}
              </Item>
            );
          }

          return setting;
        }),
      <Collapse key={`settings`} accordion destroyInactivePanel={false}>
        {componentPropsEntries
          .filter(([, prop]) => prop.type.indexOf('array') >= 0)
          .map(([name, prop], i) => {
            let setting;
            const propName = `${prefix}.${name}`;
            let mapedArr;
            mapedArr = keyCounter[propName] || [];
            let renderAfterAddButtonComponent;
            if (prop.type === 'array:component') {
              renderAfterAddButtonComponent = (
                <DragDropContext onDragEnd={sortProps}>
                  <Droppable droppableId={propName}>
                    {provided => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {mapedArr.map((p, pi) => {
                            const key = `${propName}[${pi}]`;
                            return (
                              <Draggable key={key} draggableId={key} index={pi}>
                                {provided => {
                                  return (
                                    <div
                                      key={key}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      // className="ant-form ant-form-inline"
                                    >
                                      <Card
                                        style={{ margin: `5px 0` }}
                                        key={`car${pi}`}
                                        actions={[
                                          <div {...provided.dragHandleProps}>
                                            <Icon type="drag" key={'drag'} />
                                          </div>,
                                          <Icon
                                            type="delete"
                                            key={'delete'}
                                            onClick={_ =>
                                              deleteProp(propName, pi)
                                            }
                                          />,
                                        ]}
                                      >
                                        {createComponentPropsForm(
                                          componentProps[name].componentProps,
                                          `${propName}[${pi}].componentProps`,
                                        )}
                                      </Card>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
              );
            } else if (prop.type === 'array:string') {
              renderAfterAddButtonComponent = (
                <DragDropContext onDragEnd={sortProps}>
                  <Droppable droppableId={propName}>
                    {provided => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {mapedArr.map((p, pi) => {
                            const key = `${propName}[${pi}]`;
                            debugger;
                            return (
                              <Draggable key={key} draggableId={key} index={pi}>
                                {provided => {
                                  return (
                                    <div
                                      key={key}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="ant-form ant-form-inline"
                                    >
                                      <Item>
                                        <div {...provided.dragHandleProps}>
                                          <Icon type="drag" />
                                        </div>
                                      </Item>
                                      <Item>
                                        {getFieldDecorator(key, {
                                          //preserve: true,
                                          initialValue: get(item, key),
                                        })(<CommonInput />)}
                                      </Item>
                                      <Item>
                                        <Icon
                                          onClick={_ =>
                                            deleteProp(propName, pi)
                                          }
                                          type="delete"
                                          style={{
                                            color: `red`,
                                            cursor: `pointer`,
                                          }}
                                        />
                                      </Item>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
              );
            }
            setting = (
              <Panel forceRender header={prop.label} key={`setting${i}`}>
                <Button
                  icon="plus"
                  onClick={e => {
                    const props = get(item, prefix) || {};
                    if (!props[name]) {
                      //没有则默认设置为空数组并默认添加一个
                      keyCounter[propName] = [{}];
                      setKeyCounter({ ...keyCounter });
                      return;
                    }
                    //这里是有shouldHaveOne的情况，只走这里
                    if (!keyCounter[propName]) {
                      keyCounter[propName] = [];
                    }
                    keyCounter[propName].push({});
                    setKeyCounter({ ...keyCounter });
                  }}
                >
                  添加{prop.label}
                </Button>
                {renderAfterAddButtonComponent}
              </Panel>
            );

            return setting;
          })}
      </Collapse>,
    ];
  };

  const propsDecModels = createComponentPropsForm(componentProps);

  return (
    <>
      {' '}
      <Form {...getFormItemCol(1000)}>
        <Collapse
          accordion
          defaultActiveKey={['1']}
          destroyInactivePanel={false}
        >
          <Panel forceRender header={`基础设置`} key="1">
            <Row gutter={15}>
              <Col {...getCol(1000, Size.MIDDLE)}>
                <Item label={'组件'}>
                  {componentTypeDec(
                    <TreeSelect
                      onChange={_ => setKeyCounter({})}
                      showSearch
                      style={{ width: `100%` }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
                            value={groupOrComponent['groupName']}
                            title={groupOrComponent['groupName']}
                            key={groupOrComponent['groupName']}
                          >
                            {groupOrComponent[
                              groupOrComponent['groupName']
                            ].map(component => {
                              return renderTypeTreeNode(component);
                            })}
                          </TreeNode>
                        );
                      })}
                    </TreeSelect>,
                  )}
                </Item>
              </Col>
              <Col {...getCol(1000, Size.SMALL)}>
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
                    <Switch checkedChildren={'开'} unCheckedChildren={'关'} />,
                  )}
                </Item>
              </Col>

              {formField && (
                <Fragment key="frag">
                  <Col {...getCol(1000, Size.SMALL)}>
                    <Item label={'是否作为表单域'}>
                      {isFormFieldDec(
                        <Switch
                          checkedChildren={'是'}
                          unCheckedChildren={'否'}
                        />,
                      )}
                    </Item>
                  </Col>
                  {isFormField && (
                    <>
                      <Col {...getCol(1000, Size.MIDDLE)}>
                        <Item
                          label={
                            <span>
                              id&nbsp;
                              <Tooltip title="表单域传值字段，不填写默认为区块id，需保证唯一">
                                <Icon type="question-circle-o" />
                              </Tooltip>
                            </span>
                          }
                        >
                          {$idDec(<CommonInput placeholder={'请填写id'} />)}
                        </Item>
                      </Col>
                      <Col {...getCol(1000, Size.MIDDLE)}>
                        <Item label={<span>label</span>}>
                          {labelDec(<CommonInput placeholder={''} />)}
                        </Item>
                      </Col>
                    </>
                  )}
                </Fragment>
              )}
              {/* <Col></Col> */}
            </Row>
          </Panel>
          {propsDecModels.length && (
            <Panel forceRender header={'自定义设置'} key="2">
              {propsDecModels}
            </Panel>
          )}
        </Collapse>
      </Form>
    </>
  );
});
ItemSettingForm.displayName = 'ItemSettingFormObserver';
export default React.memo(
  create<ItemSettingFormProps>({
    onValuesChange(props, changedValues, allValues) {
      const field = Object.keys(changedValues)[0];
      if (!field) {
        return;
      }
      const value = changedValues[field];
      console.log('onValuesChange', field, allValues[field]);
      if (field === 'componentId') {
        props.onItemTypeChange(value);
      } else {
        props.onItemPropsChange(field, allValues[field]);
      }
    },
    onFieldsChange(props, fields) {},
  })(ItemSettingForm),
);
