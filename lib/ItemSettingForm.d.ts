import { FormComponentProps } from 'antd/lib/form';
import { ComponentGroup, ComponentType, FPBItem } from './useFPBStore';
import React from 'react';
export interface ItemSettingProps {
    /**
     * 分组组件
     */
    componentGroup: (ComponentGroup | ComponentType)[];
    /**
     * 平铺组件方便查找属性
     */
    flatComponents: {
        [id: string]: ComponentType;
    };
    /**
     * item类型
     * @param id id
     */
    onItemTypeChange(id: string): any;
    /**
     * item的属性改变
     * @param field 字段
     * @param value 值
     */
    onItemPropsChange(field: string, value: any): any;
}
export interface ItemSettingFormProps extends FormComponentProps, ItemSettingProps {
    /**
     * 编辑中数据，用于初始化值
     */
    item: FPBItem;
    parentStore: any;
    components: ComponentType[];
    /**
     * 初始计数器
     */
    initialKeyCounter: any;
}
declare const _default: React.MemoExoticComponent<import("antd/lib/form/interface").ConnectedComponentClass<React.FunctionComponent<ItemSettingFormProps>, Pick<ItemSettingFormProps, "item" | "components" | "wrappedComponentRef" | "parentStore" | "initialKeyCounter" | "componentGroup" | "flatComponents" | "onItemTypeChange" | "onItemPropsChange">>>;
export default _default;
//# sourceMappingURL=ItemSettingForm.d.ts.map