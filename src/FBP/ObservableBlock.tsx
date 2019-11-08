import React, { SFC } from "react";
import { FPBStore, ArrayComponentProp } from "./useFPBStore";
import { useObserver, Observer } from "mobx-react-lite";
import Block from "./Block";
import { toJS } from "mobx";
import { Consumer } from "./FormContext";
import FormConsumerComponent from "./FormConsumerComponent";
import ReactDOM from "react-dom";

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
) => (
  <Observer>
    {() => {
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
      const finalComponentProps = { ...rest };
      if (isFormField) {
        delete finalComponentProps.defaultValue;
        delete finalComponentProps.value;
      }
      console.log(toJS(finalComponentProps));
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
          // if(comp.componentProps.children.shouldHaveOne){
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
        } else if (
          comp.componentProps && //组件含有属性
          comp.componentProps.children && //组件属性中包含子元素
          comp.componentProps.children.type === "FPR" //子元素为数组
        ) {
          return <div>{JSON.stringify(chil)}</div>; //组件含有属性 //组件属性中包含子元素
        }
      };
      let finalComponent = Component && //存在Component并且
        (!component.componentProps || //没有属性或者
        !component.componentProps.children || //有属性没有子元素或者
        !component.componentProps.children.shouldHaveOne || //或者有子元素不需要默认创建
          (component.componentProps.children && //有子元素并且需要有默认元素并且类型还是数组的需要长度大于0
            component.componentProps.children.shouldHaveOne &&
            component.componentProps.children.type === "array:component" &&
            children &&
            children.length)) && (
          <Component {...finalComponentProps}>
            {children && renderComponentChildren()}
          </Component>
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
      // console.log(renderedComponent,ReactDOM);

      return (
        <Block
          showTag={!store.isPreview}
          autoHeight={autoHeight}
          height={
            props.store.operatedItem && props.store.operatedItem.i === props.i
              ? props.store.operatedItem.h
              : props.store.getItemHeight(props.i)
          }
          breakpoint={props.store.breakpoint}
          onParentHeightChange={height => {
            props.store.caclHeight(height, props.i);
          }}
        >
          {renderedComponent}
        </Block>
      );
    }}
  </Observer>
);
export default ObservableBlock;
