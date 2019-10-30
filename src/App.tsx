import React, { SFC, Fragment } from "react";
import FPB from "./FBP";
import { Input, Button, Tabs, Radio, Checkbox } from "antd";
import input from "demo-components/input";
import checkbox from "demo-components/checkbox";
import radio from "demo-components/radio";
import button from "demo-components/button";
import tabs from "demo-components/tabs";

const App: React.FC = () => {
  return (
    <FPB
      components={[
        input,
        checkbox,
        radio,
        button,
        tabs
      ]}
    />
  );
};

export default App;
