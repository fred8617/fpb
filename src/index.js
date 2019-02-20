// import FormBuilder from 'react-form-builder-antd';
import React,{Fragment,Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DevTools from 'mobx-react-devtools';
import { Radio,Modal } from 'antd';
import FPB,{FPR} from './component/FPB';


import {
  observable,
  action,
} from 'mobx';
import {
  observer
} from 'mobx-react';
const {
  Group,
  Button ,
}=Radio;


const testData = {
  "setting": {
    "host": "http://localhost:8080/",
    "gridHeight": 32,
    "marginLR": 0,
    "marginTB": 0,
    "cols": 12,
    "containerType": 0,
    "containerHeight": [null, null]
  },
  "layout": [
    {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item0",
      "counterNum": 0,
      "type": "input",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "<p>123</p>\n"
      },
      "fixGrid": true,
      "fieldName": "input0"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item1",
      "counterNum": 1,
      "type": "time-picker",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": true,
            "message": "123123"
          }
        },
        "label": "time-picker1"
      },
      "fixGrid": true,
      "fieldName": "time-picker1"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item2",
      "counterNum": 2,
      "type": "select",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "select2",
        "ChildrenProps": [
          {
            "children": "default1",
            "value": "default1"
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "123",
            "value": ""
          }, {
            "children": "default2",
            "value": "default2"
          }
        ]
      },
      "fixGrid": true,
      "fieldName": "select2"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item3",
      "counterNum": 3,
      "type": "input-number",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "input-number3"
      },
      "fixGrid": true,
      "fieldName": "input-number3"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item4",
      "counterNum": 4,
      "type": "time-picker",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "time-picker4"
      },
      "fixGrid": true,
      "fieldName": "time-picker4"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item5",
      "counterNum": 5,
      "type": "radio",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {
          "style": {
            "width": "100%"
          }
        },
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "radio5",
        "rowShowNumber": 1,
        "ChildrenProps": [
          {
            "children": "default1",
            "value": "default1"
          }, {
            "children": "default2",
            "value": "default2"
          }
        ]
      },
      "fixGrid": true,
      "fieldName": "radio5"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item6",
      "counterNum": 6,
      "type": "checkbox",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {
          "style": {
            "width": "100%"
          }
        },
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "checkbox6",
        "rowShowNumber": 1,
        "ChildrenProps": [
          {
            "children": "default1",
            "value": "default1"
          }, {
            "children": "default2",
            "value": "default2"
          }
        ]
      },
      "fixGrid": true,
      "fieldName": "checkbox6"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item7",
      "counterNum": 7,
      "type": "divider",
      "ComponentType": "layout",
      "ComponentProps": {
        "props": {}
      },
      "fixGrid": true
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item8",
      "counterNum": 8,
      "type": "date-picker",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "date-picker8"
      },
      "fixGrid": true,
      "fieldName": "date-picker8"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item9",
      "counterNum": 9,
      "type": "time-picker",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "time-picker9"
      },
      "fixGrid": true,
      "fieldName": "time-picker9"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item10",
      "counterNum": 10,
      "type": "time-picker",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "time-picker10"
      },
      "fixGrid": true,
      "fieldName": "time-picker10"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item11",
      "counterNum": 11,
      "type": "select",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {},
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "select11",
        "ChildrenProps": [
          {
            "children": "default1",
            "value": "default1"
          }, {
            "children": "default2",
            "value": "default2"
          }
        ]
      },
      "fixGrid": true,
      "fieldName": "select11"
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item12",
      "counterNum": 12,
      "type": "divider",
      "ComponentType": "layout",
      "ComponentProps": {
        "props": {}
      },
      "fixGrid": true
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item13",
      "counterNum": 13,
      "type": "button",
      "ComponentType": "function",
      "ComponentProps": {
        "props": {
          "type": "primary",
          "shape": null,
          "icon": null,
          "loading": false,
          "trigger": "onClick"
        }
      },
      "fixGrid": true,
      "text": "button13",
      "functionUse": "submit",
      "functionProps": {
        "url": "asdasd",
        "method": "PUT",
        "contentType": "application/x-www-form-urlencoded",
        "responseType": "json"
      }
    }, {
      "x": 0,
      "w": 1,
      "h": 3,
      "y": null,
      "i": "item14",
      "counterNum": 14,
      "type": "radio",
      "ComponentType": "form",
      "ComponentProps": {
        "props": {
          "style": {
            "width": "100%"
          }
        },
        "showLabel": true,
        "rules": {
          "isRequired": {
            "label": "是否必填",
            "value": false,
            "message": ""
          }
        },
        "label": "radio14",
        "rowShowNumber": 3,
        "ChildrenProps": [
          {
            "children": "default1",
            "value": "default1"
          }, {
            "children": "1",
            "value": ""
          }, {
            "children": "2",
            "value": ""
          }, {
            "children": "3",
            "value": ""
          }, {
            "children": "4",
            "value": ""
          }, {
            "children": "default2",
            "value": "default2"
          }
        ]
      },
      "fixGrid": true,
      "fieldName": "radio14"
    }
  ],
  "layoutData": [
    {
      "w": 12,
      "h": 3,
      "x": 0,
      "y": 0,
      "i": "item0",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 0,
      "y": 3,
      "i": "item1",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 2,
      "h": 3,
      "x": 0,
      "y": 6,
      "i": "item2",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 4,
      "y": 3,
      "i": "item3",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 0,
      "y": 9,
      "i": "item4",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 2,
      "y": 3,
      "i": "item5",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 3,
      "y": 3,
      "i": "item6",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 1,
      "x": 5,
      "y": 3,
      "i": "item7",
      "minH": 1,
      "maxH": 1,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 2,
      "y": 6,
      "i": "item8",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 3,
      "h": 3,
      "x": 3,
      "y": 6,
      "i": "item9",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 6,
      "y": 3,
      "i": "item10",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 3,
      "x": 1,
      "y": 9,
      "i": "item11",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }, {
      "w": 6,
      "h": 1,
      "x": 3,
      "y": 12,
      "i": "item12",
      "minH": 1,
      "maxH": 1,
      "moved": false,
      "static": false
    }, {
      "w": 1,
      "h": 1,
      "x": 0,
      "y": 12,
      "i": "item13",
      "minH": 1,
      "maxH": 1,
      "moved": false,
      "static": false
    }, {
      "w": 5,
      "h": 3,
      "x": 2,
      "y": 9,
      "i": "item14",
      "minH": 3,
      "maxH": 3,
      "moved": false,
      "static": false
    }
  ]
}





class App1 extends Component{
  render(){
    return (
      <FPB/>
    )
  }
}
class App2 extends Component{
  render(){
    return (
      <FPR {...testData}/>
    )
  }
}

ReactDOM.render(
  <div style={{padding:`5px 20px`,height:document.documentElement.clientHeight}}>
    <DevTools/>
    <App1/>
  </div>

,document.getElementById(`root`));
