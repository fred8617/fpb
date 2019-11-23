import React, { useEffect } from 'react';
import { ApolloFPB } from './FPB';
import './FPB/index.less';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import input from './demo-components/input';
import checkbox from './demo-components/checkbox';
import radio from './demo-components/radio';
import button from './demo-components/button';
import tabs from './demo-components/tabs';
import table from './demo-components/table';
import gqltable from './demo-components/gql-table';
import { data } from './data';
import { doWindowResize } from './FPB/utils';
import { useForceUpdate } from 'mobx-react-lite';
import DevTools from 'mobx-react-devtools';
import Test from './testPage'
const testData={
  "datas": {
    "uOTp7fcS": {
      "i": "uOTp7fcS",
      "autoHeight": true,
      "componentProps": {
        "children": [
          {
            "componentProps": {
              "tab": "2",
              "key": "2",
              "children": {
                "datas": {
                  "OMLIhzcr": {
                    "i": "OMLIhzcr",
                    "autoHeight": true,
                    "componentProps": {},
                    "componentId": "antd-textarea",
                    "isFormField": true,
                    "$id": null,
                    "label": ""
                  }
                },
                "layouts": {
                  "lg": [
                    {
                      "w": 8,
                      "h": 52,
                      "x": 0,
                      "y": 0,
                      "i": "OMLIhzcr",
                      "minH": 52,
                      "maxH": 52,
                      "moved": false,
                      "static": false
                    }
                  ]
                },
                "cols": {
                  "xxl": 12,
                  "xl": 12,
                  "lg": 8,
                  "md": 6,
                  "sm": 4,
                  "xs": 2
                },
                "breakpoints": [
                  "lg"
                ]
              }
            }
          },
          {
            "componentProps": {
              "tab": "1",
              "key": "1",
              "children": {
                "datas": {
                  "KsgHBima": {
                    "i": "KsgHBima",
                    "autoHeight": true,
                    "componentProps": {},
                    "componentId": "antd-textarea",
                    "isFormField": true,
                    "$id": null,
                    "label": ""
                  }
                },
                "layouts": {
                  "lg": [
                    {
                      "w": 8,
                      "h": 52,
                      "x": 0,
                      "y": 0,
                      "i": "KsgHBima",
                      "minH": 52,
                      "maxH": 52,
                      "moved": false,
                      "static": false
                    }
                  ]
                },
                "cols": {
                  "xxl": 12,
                  "xl": 12,
                  "lg": 8,
                  "md": 6,
                  "sm": 4,
                  "xs": 2
                },
                "breakpoints": [
                  "lg"
                ]
              }
            }
          }
        ]
      },
      "componentId": "antd-tabs",
      "isFormField": null,
      "$id": null
    }
  },
  "layouts": {
    "lg": [
      {
        "w": 4,
        "h": 79,
        "x": 0,
        "y": 338,
        "i": "jffT1f5-",
        "minH": 79,
        "maxH": 79,
        "moved": false,
        "static": false
      },
      {
        "w": 3,
        "h": 79,
        "x": 5,
        "y": 338,
        "i": "EiX7-eXY",
        "minH": 79,
        "maxH": 79,
        "moved": false,
        "static": false
      },
      {
        "w": 8,
        "h": 91,
        "x": 0,
        "y": 417,
        "i": "I7WU2m2d",
        "minH": 91,
        "maxH": 91,
        "moved": false,
        "static": false
      },
      {
        "w": 1,
        "h": 30,
        "x": 4,
        "y": 338,
        "i": "65oj8LJ5",
        "minH": 30,
        "maxH": 30,
        "moved": false,
        "static": false
      },
      {
        "w": 8,
        "h": 112,
        "x": 0,
        "y": 0,
        "i": "vHSD40rC",
        "minH": 112,
        "maxH": 112,
        "moved": false,
        "static": false
      },
      {
        "w": 8,
        "h": 226,
        "x": 0,
        "y": 112,
        "i": "EVRnWB1b",
        "minH": 226,
        "maxH": 226,
        "moved": false,
        "static": false
      }
    ],
    "md": [
      {
        "w": 6,
        "h": 112,
        "x": 0,
        "y": 0,
        "i": "uOTp7fcS",
        "minH": 112,
        "maxH": 112,
        "moved": false,
        "static": false
      }
    ]
  },
  "cols": {
    "xxl": 12,
    "xl": 12,
    "lg": 8,
    "md": 6,
    "sm": 4,
    "xs": 2
  },
  "breakpoints": [
    "lg",
    "md"
  ]
}
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers:{
    Authorization:'Bearer 62babf1d9e1c93ce12700649436e1f9035a5866c'
  }
});
const App: React.FC = () => {
  const force = useForceUpdate();
  //@ts-ignore
  window.force=force
  // useEffect(() => {
  //   // 这种情况应该避免，尽量去用sizeMe监听容器
  //   window.addEventListener('resize', force);
  // });
  return (
    <>
      <DevTools position={{ bottom: 0 }} />
      <ApolloFPB
        client={client}
        defaultDatas={data as any}
        components={[input, checkbox, radio, button, tabs, table, gqltable]}
      />
      {/* <Test/> */}
    </>
  );
};
console.log(JSON.stringify([input, checkbox, radio, button, tabs, table, gqltable]));

export default App;
