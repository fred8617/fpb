import { SFC } from "react";
import { FPBItem } from "./useFPBStore";
import React from "react";
/**
 * FPB表单元素
 */
interface FormConsumerComponentProps {
    /**
     * 传入元素
     */
    item: FPBItem;
    /**
     * 传入的表单组件
     */
    component: React.ReactElement;
}
declare const FormConsumerComponent: SFC<FormConsumerComponentProps>;
export default FormConsumerComponent;
//# sourceMappingURL=FormConsumerComponent.d.ts.map