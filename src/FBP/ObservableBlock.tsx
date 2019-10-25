import React, { SFC } from "react";
import { FPBStore } from "./FPB";
import { useObserver } from "mobx-react-lite";
import Block from "./Block";

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
    console.log("ObservableBlock render");

    const { Component, autoHeight } = props.store.datas[props.i];
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
        {Component && <Component />}
      </Block>
    );
  });
export default ObservableBlock;
