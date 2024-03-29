import React, { SFC } from 'react';
import { FPBStore, ComponentType } from './useFPBStore';
import { Observer } from 'mobx-react-lite';
import Block from './Block';
import { toJS } from 'mobx';
import FormConsumerComponent from './FormConsumerComponent';
import FPB from './FPB';
import _ from 'lodash';
import ErrorWrapper from './ErrorWrapper';
import { findRequiredRules } from './utils';
import { Alert } from 'antd';

export interface ObservableBlockProps {
  i;
  store: FPBStore;
  components: ComponentType[];
}
const getComponent = props => {
  const { store } = props;
  const item = props.store.datas[props.i];
  const { Component, componentProps, componentId, isFormField } = item;
  const isEditing = store.editingItem === item;
  const component = store.flatComponents[componentId];

  // const component = store.flatComponents[componentId];
  const { children, ...rest } = toJS(componentProps || {}, {
    recurseEverything: true,
  });
  const finalComponentProps = { ...rest };
  if (isFormField) {
    delete finalComponentProps.defaultValue;
    delete finalComponentProps.value;
  }

  // component.componentProps&&findRequiredRules(component.componentProps);
  /**
   *
   * @param comp 组件类型
   * @param chil 表单中的子元素部分
   */
  const renderComponentChildren = (comp = component, chil = children) => {
    // console.log(toJS(children));
    //debugger;
    // //debugger

    if (
      comp.componentProps && //组件含有属性
      comp.componentProps.children && //组件属性中包含子元素
      comp.componentProps.children.type === 'array:component' //子元素为数组
    ) {
      // if(comp.componentProps.children.shouldHaveOne){
      //   //debugger
      //   chil.push({})
      // }
      // console.log('child');
      return chil.map((child, i) => {
        const Comp = comp.componentProps.children.Component; //获取子组件组件类型
        const { children, ...rest } =
          toJS(child.componentProps, { recurseEverything: true }) || {};
        const requiredRules = findRequiredRules(
          comp.componentProps.children.componentProps,
        );
        if (requiredRules.find(rule => !rest[rule])) {
          return (
            <Alert
              key={`chil${i}`}
              message="提示"
              description="属性不全请补齐"
              type="warning"
              showIcon
            />
          );
        }
        return (
          <Comp key={`chil${i}`} {...rest}>
            {children &&
              renderComponentChildren(
                comp.componentProps.children as any,
                children,
              )}
          </Comp>
        );
      });
    } else if (
      comp.componentProps && //组件含有属性
      comp.componentProps.children && //组件属性中包含子元素
      comp.componentProps.children.type === 'FPR' //子元素为数组
    ) {
      // console.log('renderfpr');
      const Comp = (
        <Observer>
          {() => <FPB components={props.components} FPR defaultDatas={chil}/>}
        </Observer>
      );
      return Comp; //组件含有属性 //组件属性中包含子元素
    } else {
      return chil;
    }
  };
  return (
    Component && //存在Component并且
    (!component.componentProps || //没有属性或者
    !component.componentProps.children || //有属性没有子元素或者
    !component.componentProps.children.shouldHaveOne || //或者有子元素不需要默认创建
      (component.componentProps.children && //有子元素并且需要有默认元素并且类型还是数组的需要长度大于0
        component.componentProps.children.shouldHaveOne &&
        component.componentProps.children.type === 'array:component' &&
        children &&
        children.length)) && (
      <ErrorWrapper>
        {props => {
          // console.log('rule',component.componentProps);
          const requiredRules = findRequiredRules(component.componentProps);
          if (requiredRules.find(rule => !finalComponentProps[rule])) {
            return (
              <Alert
                message="提示"
                description="属性不全请补齐"
                type="warning"
                showIcon
              />
            );
          }
          return (
            <Component {...finalComponentProps} {...props}>
              {children && renderComponentChildren()}
            </Component>
          );
        }}
      </ErrorWrapper>
    )
  );
};
/**
 * 观察者区块
 * @param props @interface ObservableBlockProps
 */
const ObservableBlock: SFC<ObservableBlockProps> = React.memo(
  (props: ObservableBlockProps) => {
    // useEffect(() => {
    //   console.log("mounted");
    // }, []);
    const { store } = props;

    let finalComponent = getComponent(props);
    return (
      <Observer>
        {() => {
          const item = props.store.datas[props.i];
          return (
            <Block
              showTag={!store.isPreview}
              autoHeight={item.autoHeight}
              height={
                props.store.operatedItem &&
                props.store.operatedItem.i === props.i
                  ? props.store.operatedItem.h
                  : props.store.getItemHeight(props.i)
              }
              breakpoint={props.store.breakpoint}
              onParentHeightChange={height => {
                props.store.caclHeight(height, props.i);
              }}
            >
              <Observer>
                {() => {
                  let renderedComponent;
                  if (!store.isPreview) {
                    finalComponent = getComponent(props);
                  }

                  if (item.isFormField && finalComponent) {
                    renderedComponent = (
                      <FormConsumerComponent
                        item={item}
                        component={finalComponent}
                      />
                    );
                    //
                  } else {
                    renderedComponent = finalComponent;
                  }
                  return <>{renderedComponent}</>;
                }}
              </Observer>
            </Block>
          );
        }}
      </Observer>
    );
  },
);
export default ObservableBlock;
