export const data = {
  "datas": {
    "jffT1f5-": {
      "i": "jffT1f5-",
      "autoHeight": true,
      "componentProps": {
        "placeholder": "请填写姓名"
      },
      "componentId": "antd-input",
      "isFormField": true,
      "$id": "",
      "label": "姓名"
    },
    "EiX7-eXY": {
      "i": "EiX7-eXY",
      "autoHeight": true,
      "componentProps": {
        "children": [
          {
            "componentProps": {
              "children": "男",
              "value": "0"
            }
          },
          {
            "componentProps": {
              "children": "女",
              "value": "1"
            }
          }
        ]
      },
      "componentId": "antd-radio-group",
      "isFormField": true,
      "$id": null,
      "label": "性别"
    },
    "I7WU2m2d": {
      "i": "I7WU2m2d",
      "autoHeight": true,
      "componentProps": {},
      "componentId": "antd-textarea",
      "isFormField": true,
      "$id": null,
      "label": "备注"
    },
    "65oj8LJ5": {
      "i": "65oj8LJ5",
      "Component": null,
      "autoHeight": true,
      "componentProps": {},
      "componentId": null,
      "isFormField": null,
      "$id": null
    },
    "vHSD40rC": {
      "i": "vHSD40rC",
      "autoHeight": true,
      "componentProps": {
        "children": [
          {
            "componentProps": {
              "tab": "个人简介",
              "children": {
                "datas": {
                  "UZFE4QAw": {
                    "i": "UZFE4QAw",
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
                      "i": "UZFE4QAw",
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
              "tab": "意见建议",
              "children": {
                "datas": {
                  "tQYZg3nI": {
                    "i": "tQYZg3nI",
                    "autoHeight": true,
                    "componentProps": {
                      "children": [
                        {
                          "componentProps": {
                            "children": "环境",
                            "value": "0"
                          }
                        },
                        {
                          "componentProps": {
                            "children": "建设",
                            "value": "1"
                          }
                        },
                        {
                          "componentProps": {
                            "children": "待遇",
                            "value": "2"
                          }
                        }
                      ],
                      "defaultValue": [
                        "1"
                      ]
                    },
                    "componentId": "antd-checkbox-group",
                    "isFormField": true,
                    "$id": null,
                    "label": "方向"
                  },
                  "Ge9XaTpD": {
                    "i": "Ge9XaTpD",
                    "autoHeight": true,
                    "componentProps": {},
                    "componentId": "antd-textarea",
                    "isFormField": true,
                    "$id": null,
                    "label": "具体内容"
                  }
                },
                "layouts": {
                  "lg": [
                    {
                      "w": 8,
                      "h": 79,
                      "x": 0,
                      "y": 0,
                      "i": "tQYZg3nI",
                      "minH": 79,
                      "maxH": 79,
                      "moved": false,
                      "static": false
                    },
                    {
                      "w": 8,
                      "h": 91,
                      "x": 0,
                      "y": 79,
                      "i": "Ge9XaTpD",
                      "minH": 91,
                      "maxH": 91,
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
    },
    "EVRnWB1b": {
      "i": "EVRnWB1b",
      "autoHeight": true,
      "componentProps": {
        "gql": "{\n  data:repository(name:\"antd\",owner:\"ant-design\"){\n    data:stargazers(first:100){\n      dataSource:nodes{\n        name\n        avatarUrl\n        company\n        email\n        location\n      }\n    }\n  }\n}",
        "children": [
          {
            "componentProps": {
              "dataIndex": "avatarUrl",
              "title": "头像"
            }
          },
          {
            "componentProps": {
              "dataIndex": "name",
              "title": "姓名"
            }
          },
          {
            "componentProps": {
              "dataIndex": "nickname",
              "title": "昵称"
            }
          },
          {
            "componentProps": {
              "dataIndex": "email",
              "title": "邮箱"
            }
          },
          {
            "componentProps": {
              "dataIndex": "company",
              "title": "公司"
            }
          },
          {
            "componentProps": {
              "dataIndex": "location",
              "title": "坐标"
            }
          }
        ]
      },
      "componentId": "gql-table",
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
        "h": 79,
        "x": 0,
        "y": 170,
        "i": "jffT1f5-",
        "minH": 79,
        "maxH": 79,
        "moved": false,
        "static": false
      },
      {
        "w": 6,
        "h": 79,
        "x": 0,
        "y": 0,
        "i": "EiX7-eXY",
        "minH": 79,
        "maxH": 79,
        "moved": false,
        "static": false
      },
      {
        "w": 6,
        "h": 91,
        "x": 0,
        "y": 79,
        "i": "I7WU2m2d",
        "minH": 91,
        "maxH": 91,
        "moved": false,
        "static": false
      },
      {
        "w": 6,
        "h": 30,
        "x": 0,
        "y": 773,
        "i": "65oj8LJ5",
        "minH": 30,
        "maxH": 30,
        "moved": false,
        "static": false
      },
      {
        "w": 6,
        "h": 112,
        "x": 0,
        "y": 661,
        "i": "vHSD40rC",
        "minH": 112,
        "maxH": 112,
        "moved": false,
        "static": false
      },
      {
        "w": 6,
        "h": 412,
        "x": 0,
        "y": 249,
        "i": "EVRnWB1b",
        "minH": 412,
        "maxH": 412,
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
