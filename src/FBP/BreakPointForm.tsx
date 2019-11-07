import React, { SFC } from "react";
import { Form, Modal, Checkbox, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BreakpointsConfig } from "./useFPBStore";
const { create, Item } = Form;
interface BreakpointFormProps extends FormComponentProps {
  initialData: BreakpointsConfig;
}
const BreakpointForm: React.SFC<BreakpointFormProps> = props => {
  const { form, initialData } = props;
  const { getFieldDecorator, getFieldsValue } = form;
  const breakpointsDec = getFieldDecorator("breakpoints", {
    initialValue: initialData.breakpoints,
    rules: [{ required: true, message: "必须存在一个断点" }]
  });
  const { breakpoints = [] } = getFieldsValue();

  // xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
  // xxl ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
  return (
    <>
      <Item label="断点">
        {breakpointsDec(
          <Checkbox.Group>
            <Checkbox value={"xs"}>{"xs <576px"}</Checkbox>
            <Checkbox value={"sm"}>{"sm ≥576px"}</Checkbox>
            <Checkbox value={"md"}>{"md ≥768px"}</Checkbox>
            <Checkbox value={"lg"}>{"lg ≥992px"}</Checkbox>
            <Checkbox value={"xl"}>{"xl ≥1200px"}</Checkbox>
            {/* <Checkbox value={"xxl"}>{"xxl ≥1600px"}</Checkbox> */}
          </Checkbox.Group>
        )}
      </Item>
      {breakpoints.map(point => {
        return (
          <Item label={point} key={point}>
            {getFieldDecorator(`cols.${point}`, {
              initialValue: initialData.cols[point],
              rules: [{ required: true, message: "请选择断点布局栅格数量" }]
            })(
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={6}>6</Radio>
                <Radio value={8}>8</Radio>
                <Radio value={12}>12</Radio>
                <Radio value={24}>24</Radio>
              </Radio.Group>
            )}
          </Item>
        );
      })}
    </>
  );
};

export default Form.create<BreakpointFormProps>()(BreakpointForm);
