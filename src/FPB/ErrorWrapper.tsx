import React from 'react';
import { Alert } from 'antd';
interface ErrorWrapperProps {
  children(props);
}
export default class ErrorWrapper extends React.Component<ErrorWrapperProps> {
  state = {
    error: null,
    info: null,
  };
  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.log(error);
    
  }
  render() {
    if (this.state.error) {
      return (
        <Alert
          message="错误"
          description={this.state.info.componentStack}
          type="error"
          showIcon
        />
      );
    }
    return this.props.children(this.props);
  }
}
