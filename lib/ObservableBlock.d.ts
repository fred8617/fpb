import { SFC } from 'react';
import { FPBStore, ComponentType } from './useFPBStore';
export interface ObservableBlockProps {
    i: any;
    store: FPBStore;
    components: ComponentType[];
}
/**
 * 观察者区块
 * @param props @interface ObservableBlockProps
 */
declare const ObservableBlock: SFC<ObservableBlockProps>;
export default ObservableBlock;
//# sourceMappingURL=ObservableBlock.d.ts.map