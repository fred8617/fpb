// import FormBuilder from 'react-form-builder-antd';
import React,{Fragment,Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DevTools from 'mobx-react-devtools';
import { Radio,Modal } from 'antd';
import FPB from './component/FPB';
import FPR from './component/FPR';
import {Observer} from 'mobx-react';


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
    "cols": ["lg"],
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
      "type": "tabs",
      "ComponentType": "layout",
      "ComponentProps": {
        "props": {},
        "ChildrenProps": [
          {
            "tab": "TabX",
            "key": "1",
            forceRender:true,
            "pageData": {
              "setting": {
                "host": "http://localhost:8080/",
                "gridHeight": 32,
                "marginLR": 0,
                "marginTB": 0,
                "cols": [
                  "lg", "sm"
                ],
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
                    "label": "input0"
                  },
                  "fixGrid": true,
                  "fieldName": "input0"
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
                    "label": "input4"
                  },
                  "fixGrid": true,
                  "fieldName": "input4"
                }
              ],
              "layoutData": {
                "lg": [
                  {
                    "w": 1,
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
                    "x": 2,
                    "y": 0,
                    "i": "item3",
                    "minH": 3,
                    "maxH": 3,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 3,
                    "x": 4,
                    "y": 0,
                    "i": "item4",
                    "minH": 3,
                    "maxH": 3,
                    "moved": false,
                    "static": false
                  }
                ],
                "md": [],
                "sm": [
                  {
                    "w": 1,
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
                    "i": "item3",
                    "minH": 3,
                    "maxH": 3,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 3,
                    "x": 0,
                    "y": 6,
                    "i": "item4",
                    "minH": 3,
                    "maxH": 3,
                    "moved": false,
                    "static": false
                  }
                ],
                "xs": [],
                "xxs": []
              },
              "counter": 5
            }
          }, {
            "tab": "kkk",
            forceRender:true,
            "key": "00",
            "pageData": {
              "setting": {
                "host": "http://localhost:8080/",
                "gridHeight": 32,
                "marginLR": 0,
                "marginTB": 19,
                "cols": ["lg"],
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
                    "label": "input0"
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
                    "label": "input-number1"
                  },
                  "fixGrid": true,
                  "fieldName": "input-number1"
                }, {
                  "x": 0,
                  "w": 1,
                  "h": 3,
                  "y": null,
                  "i": "item2",
                  "counterNum": 2,
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
                    "label": "input-number2"
                  },
                  "fixGrid": true,
                  "fieldName": "input-number2"
                }, {
                  "x": 0,
                  "w": 1,
                  "h": 3,
                  "y": null,
                  "i": "item3",
                  "counterNum": 3,
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
                    "label": "select3",
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
                  "fieldName": "select3"
                }, {
                  "x": 0,
                  "w": 1,
                  "h": 3,
                  "y": null,
                  "i": "item4",
                  "counterNum": 4,
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
                    "label": "radio4",
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
                  "fieldName": "radio4"
                }, {
                  "x": 0,
                  "w": 1,
                  "h": 3,
                  "y": null,
                  "i": "item5",
                  "counterNum": 5,
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
                    "label": "input-number5"
                  },
                  "fixGrid": true,
                  "fieldName": "input-number5"
                }
              ],
              "layoutData": {
                "lg": [
                  {
                    "w": 1,
                    "h": 2,
                    "x": 0,
                    "y": 0,
                    "i": "item0",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 9,
                    "h": 2,
                    "x": 1,
                    "y": 0,
                    "i": "item1",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 2,
                    "x": 0,
                    "y": 2,
                    "i": "item2",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 2,
                    "x": 0,
                    "y": 4,
                    "i": "item3",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 2,
                    "x": 0,
                    "y": 6,
                    "i": "item4",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }, {
                    "w": 1,
                    "h": 2,
                    "x": 0,
                    "y": 8,
                    "i": "item5",
                    "minH": 2,
                    "maxH": 2,
                    "moved": false,
                    "static": false
                  }
                ],
                "md": [],
                "sm": [],
                "xs": [],
                "xxs": []
              },
              "counter": 6
            }
          }
        ]
      },
      "fixGrid": true
    }
  ],
  "layoutData": {
    "lg": [
      {
        "w": 9,
        "h": 19,
        "x": 0,
        "y": 0,
        "i": "item0",
        "minH": 19,
        "maxH": 19,
        "moved": false,
        "static": false
      }
    ],
    "md": [],
    "sm": [],
    "xs": [],
    "xxs": []
  },
  "counter": 3
}
window.testData=JSON.parse(JSON.stringify(testData));
console.log();



class App1 extends Component{
  render(){
    return (
      <FPB
        pageData={testData}
      />
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
class App3 extends Component{
  componentDidMount(){
    this.forceUpdate()
  }
  render(){
    return (
      <div>
        <Observer>
          {
            ()=>{
              console.log(`observerrender`);
              return (
                <div>1111</div>
              )
            }
          }
        </Observer>
      </div>
    )
  }
}
ReactDOM.render(
  <div style={{padding:`5px 20px`,height:document.documentElement.clientHeight}}>
    <DevTools/>
    <App1/>
  </div>

,document.getElementById(`root`));
