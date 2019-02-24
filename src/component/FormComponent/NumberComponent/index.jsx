import React,{Component,Fragment} from 'react';
import {
  Select,
  InputNumber,
  Row,
  Col,
} from 'antd';
import debounce from 'lodash/debounce';
const {Option} = Select;

export default class NumberComponent extends Component{
  state={
    value:null,
    mode:null,
  }
  modeChange=(mode)=>{
    const {
      onChange,
    }=this.props;
    const {
      value
    }=this.state;
    this.setState({mode});
    onChange?.([mode,value])
    this.resize();
  }
  resize=()=>{
    setTimeout(debounce(this.resizeEvent,200),200);
  }
  resizeEvent=()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  valueChange=(value)=>{
    if(!value){
      return;
    }
    const {
      onChange,
    }=this.props;
    const {
      mode
    }=this.state;
    this.setState({mode,value});
    onChange?.([mode,value]);
    this.resize();
  }

  componentDidMount(){
    const {
      value,
    }=this.props;
    if(value){
      this.setState({
        mode:value[0],
        value:value[1],
      })
    }
  }
  render(){
    const {
      value,
      mode,
    }=this.state;
    return (
      <Row>
        <Col span={12}>
          <Select
            onChange={this.modeChange}
            value={mode}
            style={{width:100}}
          >
            <Option value={null}>
              自适应
            </Option>
            <Option value={`%`}>
              百分比
            </Option>
            <Option value={`px`}>
              像素
            </Option>
          </Select>
        </Col>
        {do{
          if(mode){
            <Col span={12}>
              <InputNumber
                min={0}
                onChange={this.valueChange}
                formatter={value => `${value}${mode}`}
                parser={value => value.replace(mode, '')}
                value={value}
              />
            </Col>
          }
        }}
      </Row>
    )
  }
}
