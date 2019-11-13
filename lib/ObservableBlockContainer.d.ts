import React from 'react';
import { FPBStore, FPBItem } from './useFPBStore';
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
declare const ObservableBlockContainer: React.SFC<ObservableBlockContainerProps>;
export default ObservableBlockContainer;
//# sourceMappingURL=ObservableBlockContainer.d.ts.map