import React, { SFC } from "react";
import { FPBStore, ArrayComponentProp } from "./FPB";
import { useObserver, Observer } from "mobx-react-lite";
import Block from "./Block";
import { toJS } from "mobx";
import { Consumer } from "./FormContext";
import FormConsumerComponent from "./FormConsumerComponent";

export interface ObservableBlockProps {
  i;
  store: FPBStore;
}
/**
 * 观察者区块
 * @param props @interface ObservableBlockProps
 */
const ObservableBlock: SFC<ObservableBlockProps> = (
  props: ObservableBlockProps
) =>
  useObserver(() => {
    const { store } = props;
    const item = props.store.datas[props.i];
    const {
      Component,
      componentProps,
      autoHeight,
      componentId,
      isFormField
    } = item;
    const { children, ...rest } = toJS(componentProps || {}, {
      recurseEverything: true
    });
    console.log(toJS(componentProps));
    const component = store.flatComponents[componentId];

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
        comp.componentProps.children.type === "array:component" //子元素为数组
      ) {
        // if(comp.componentProps.children.createDefault){
        //   //debugger
        //   chil.push({})
        // }
        return chil.map((child, i) => {
          const Comp = comp.componentProps.children.Component; //获取子组件组件类型
          const { children, ...rest } =
            toJS(child.componentProps, { recurseEverything: true }) || {};
          return (
            <Comp key={`chil${i}`} {...rest}>
              {children &&
                renderComponentChildren(
                  comp.componentProps.children as any,
                  children
                )}
            </Comp>
          );
        });
      } else {
        return chil; //组件含有属性 //组件属性中包含子元素
      }
    };
    let finalComponent = Component && //存在Component并且
      (!component.componentProps || //没有属性或者
      !component.componentProps.children || //有属性没有子元素或者
      !component.componentProps.children.createDefault || //或者有子元素不需要默认创建
        (component.componentProps.children && //有子元素并且需要有默认元素并且类型还是数组的需要长度大于0
          component.componentProps.children.createDefault &&
          component.componentProps.children.type === "array:component" &&
          children &&
          children.length)) && (
        <Component {...rest}>{children && renderComponentChildren()}</Component>
      );
    let renderedComponent;
    if (isFormField && finalComponent) {
      renderedComponent = (
        <FormConsumerComponent item={item} component={finalComponent} />
      );
      //
    } else {
      renderedComponent = finalComponent;
    }
    return (
      <Block
        autoHeight={autoHeight}
        height={
          props.store.operatedItem && props.store.operatedItem.i === props.i
            ? props.store.operatedItem.h
            : props.store.getItemHeight(props.i)
        }
        breakPoint={props.store.breakPoint}
        onParentHeightChange={height => {
          props.store.caclHeight(height, props.i);
        }}
      >
        {renderedComponent}
      </Block>
    );
  });
export default ObservableBlock;
