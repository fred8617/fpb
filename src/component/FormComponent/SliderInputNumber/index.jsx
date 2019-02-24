import React,{Component,Fragment} from 'react';
import {
  Slider,
  InputNumber,
  Row,
  Col,
} from 'antd';

export default class SliderInputNumber extends Component{
  state={
    value:0,
  }
  onChange=(value)=>{
    if(value==null||value===''){
      return;
    }
    const {
      onChange,
      min,
      max,
    }=this.props;
    if(value<min||value>max){
      return;
    }
    this.setState({value})
    onChange?.(value);
  }
  componentDidMount(){
    const {
      value,
    }=this.props;
    if(value!=null){
      this.setState({value})
    }
  }
  render(){
    const {
      value
    }=this.state;
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            {...this.props}
            onChange={this.onChange}
            value={value}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            min={0}
            max={100}
            {...this.props}
            style={{ marginLeft: 16 }}
            value={value}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    )
  }
}
