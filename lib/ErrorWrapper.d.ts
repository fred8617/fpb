import React from 'react';
interface ErrorWrapperProps {
    children(props: any): any;
}
export default class ErrorWrapper extends React.Component<ErrorWrapperProps> {
    state: {
        error: any;
        info: any;
    };
    componentDidCatch(error: any, info: any): void;
    render(): any;
}
export {};
//# sourceMappingURL=ErrorWrapper.d.ts.map