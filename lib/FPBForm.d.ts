import { SFC } from 'react';
import { ComponentType } from './useFPBStore';
interface FPBFormProps {
    components: ComponentType[];
    onChange?(e: any): any;
    value?: any;
}
declare const FPBForm: SFC<FPBFormProps>;
export default FPBForm;
//# sourceMappingURL=FPBForm.d.ts.map