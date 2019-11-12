import { createContext } from "react";
import { FormComponentProps } from "antd/lib/form";

const { Provider, Consumer } = createContext<FormComponentProps>({
  form: null
});
export { Provider, Consumer };
