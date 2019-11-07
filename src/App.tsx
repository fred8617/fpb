import React, { SFC, Fragment } from "react";
import FPB from "./FBP";
import { Input, Button, Tabs, Radio, Checkbox } from "antd";
import input from "demo-components/input";
import checkbox from "demo-components/checkbox";
import radio from "demo-components/radio";
import button from "demo-components/button";
import tabs from "demo-components/tabs";
const defaultDatas = {
  datas: {
    C_2ce9k_: {
      i: "C_2ce9k_",
      autoHeight: true,
      componentProps: { children: [{ componentProps: { tab: "选择项卡" } }] },
      componentId: "antd-tabs",
      isFormField: null,
      $id: null
    },
    eFMLx6G3W: {
      i: "eFMLx6G3W",
      autoHeight: true,
      componentProps: {},
      componentId: "antd-textarea",
      isFormField: true,
      $id: null,
      label: "asd"
    },
    nrvd8RQTl: {
      i: "nrvd8RQTl",
      autoHeight: true,
      componentProps: {
        children: [{ componentProps: { children: "aaa", value: "aaa" } }],
        defaultValue: ["s"]
      },
      componentId: "antd-checkbox-group",
      isFormField: true,
      $id: null,
      label: "asd"
    }
  },
  layouts: {
    lg: [],
    md: [
      {
        w: 6,
        h: 60,
        x: 0,
        y: 0,
        i: "C_2ce9k_",
        minH: 60,
        maxH: 60,
        moved: false,
        static: false
      },
      {
        w: 6,
        h: 91,
        x: 0,
        y: 60,
        i: "eFMLx6G3W",
        minH: 91,
        maxH: 91,
        moved: false,
        static: false
      },
      {
        w: 1,
        h: 79,
        x: 0,
        y: 151,
        i: "nrvd8RQTl",
        minH: 79,
        maxH: 79,
        moved: false,
        static: false
      }
    ]
  }
};
const App: React.FC = () => {
  return <FPB defaultDatas={defaultDatas} components={[input, checkbox, radio, button, tabs]} />;
};

export default App;
