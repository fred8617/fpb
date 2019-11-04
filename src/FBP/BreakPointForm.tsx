import React, { SFC } from "react";
import { Form, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
const {create,Item}=Form;
interface BreakPointForm extends FormComponentProps {}
const BreakPointForm = Form.create<BreakPointForm>()((props) => {

  return <>
   <Item></Item>
  </>;
});

export default BreakPointForm;
