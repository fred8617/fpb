import React from "react";
import { Input } from "antd";
import { Tabs } from "antd";
import GqlTable from "./components/GqlTable";
import { Form } from "antd";
import { Radio } from "antd";
import { Checkbox } from "antd";
import { Table } from "antd";
import { Row } from "antd";
import { Col } from "antd";
let { Group } = Radio;
let { TextArea } = Input;
let { Item: FormItem } = Form;
let { create } = Form;
let { TabPane } = Tabs;
let { Column } = Table;
export default create()(function(props) {
  let { getFieldDecorator } = props.form;
  let decorators = {
    "jffT1f5-": getFieldDecorator("jffT1f5-"),
    "EiX7-eXY": getFieldDecorator("EiX7-eXY"),
    I7WU2m2d: getFieldDecorator("I7WU2m2d"),
    UZFE4QAw: getFieldDecorator("UZFE4QAw"),
    tQYZg3nI: getFieldDecorator("tQYZg3nI"),
    Ge9XaTpD: getFieldDecorator("Ge9XaTpD"),
  };
  return (
    <>
      <Row type={"flex"}>
        <Col
          xxl={{
            order: 2,
            push: 0,
            span: 12,
          }}
          xl={{
            order: 2,
            push: 0,
            span: 12,
          }}
          lg={{
            order: 2,
            push: 0,
            span: 12,
          }}
          md={{
            order: 2,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 2,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 2,
            push: 0,
            span: 24,
          }}
          id={"jffT1f5-"}
        >
          <FormItem label="姓名">
            {decorators["jffT1f5-"](<Input placeholder={"请填写姓名"} />)}
          </FormItem>
        </Col>
        <Col
          xxl={{
            order: 4,
            push: 0,
            span: 9,
          }}
          xl={{
            order: 4,
            push: 0,
            span: 9,
          }}
          lg={{
            order: 4,
            push: 0,
            span: 9,
          }}
          md={{
            order: 0,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 0,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 0,
            push: 0,
            span: 24,
          }}
          id={"EiX7-eXY"}
        >
          <FormItem label="性别">
            {decorators["EiX7-eXY"](
              <Group>
                <Radio value={"0"}>{"男"}</Radio>
                <Radio value={"1"}>{"女"}</Radio>
              </Group>,
            )}
          </FormItem>
        </Col>
        <Col
          xxl={{
            order: 5,
            push: 0,
            span: 24,
          }}
          xl={{
            order: 5,
            push: 0,
            span: 24,
          }}
          lg={{
            order: 5,
            push: 0,
            span: 24,
          }}
          md={{
            order: 1,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 1,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 1,
            push: 0,
            span: 24,
          }}
          id={"I7WU2m2d"}
        >
          <FormItem label="备注">
            {decorators["I7WU2m2d"](<TextArea />)}
          </FormItem>
        </Col>
        <Col
          xxl={{
            order: 3,
            push: 0,
            span: 3,
          }}
          xl={{
            order: 3,
            push: 0,
            span: 3,
          }}
          lg={{
            order: 3,
            push: 0,
            span: 3,
          }}
          md={{
            order: 5,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 5,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 5,
            push: 0,
            span: 24,
          }}
          id={"65oj8LJ5"}
        />
        <Col
          xxl={{
            order: 0,
            push: 0,
            span: 24,
          }}
          xl={{
            order: 0,
            push: 0,
            span: 24,
          }}
          lg={{
            order: 0,
            push: 0,
            span: 24,
          }}
          md={{
            order: 4,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 4,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 4,
            push: 0,
            span: 24,
          }}
          id={"vHSD40rC"}
        >
          <Tabs>
            <TabPane tab={"个人简介"}>
              <>
                <Row type={"flex"}>
                  <Col
                    xxl={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    xl={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    lg={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    md={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    sm={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    xs={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    id={"UZFE4QAw"}
                  >
                    <FormItem label="">
                      {decorators["UZFE4QAw"](<TextArea />)}
                    </FormItem>
                  </Col>
                </Row>
              </>
            </TabPane>
            <TabPane tab={"意见建议"}>
              <>
                <Row type={"flex"}>
                  <Col
                    xxl={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    xl={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    lg={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    md={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    sm={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    xs={{
                      order: 0,
                      push: 0,
                      span: 24,
                    }}
                    id={"tQYZg3nI"}
                  >
                    <FormItem label="方向">
                      {decorators["tQYZg3nI"](
                        <Group defaultValue>
                          <Checkbox value={"0"}>{"环境"}</Checkbox>
                          <Checkbox value={"1"}>{"建设"}</Checkbox>
                          <Checkbox value={"2"}>{"待遇"}</Checkbox>
                        </Group>,
                      )}
                    </FormItem>
                  </Col>
                  <Col
                    xxl={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    xl={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    lg={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    md={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    sm={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    xs={{
                      order: 1,
                      push: 0,
                      span: 24,
                    }}
                    id={"Ge9XaTpD"}
                  >
                    <FormItem label="具体内容">
                      {decorators["Ge9XaTpD"](<TextArea />)}
                    </FormItem>
                  </Col>
                </Row>
              </>
            </TabPane>
          </Tabs>
        </Col>
        <Col
          xxl={{
            order: 1,
            push: 0,
            span: 24,
          }}
          xl={{
            order: 1,
            push: 0,
            span: 24,
          }}
          lg={{
            order: 1,
            push: 0,
            span: 24,
          }}
          md={{
            order: 3,
            push: 0,
            span: 24,
          }}
          sm={{
            order: 3,
            push: 0,
            span: 24,
          }}
          xs={{
            order: 3,
            push: 0,
            span: 24,
          }}
          id={"EVRnWB1b"}
        >
          <GqlTable
            gql={
              '{\n  data:repository(name:"antd",owner:"ant-design"){\n    data:stargazers(first:100){\n      dataSource:nodes{\n        name\n        avatarUrl\n        company\n        email\n        location\n      }\n    }\n  }\n}'
            }
          >
            <Column dataIndex={"avatarUrl"} title={"头像"} />
            <Column dataIndex={"name"} title={"姓名"} />
            <Column dataIndex={"nickname"} title={"昵称"} />
            <Column dataIndex={"email"} title={"邮箱"} />
            <Column dataIndex={"company"} title={"公司"} />
            <Column dataIndex={"location"} title={"坐标"} />
          </GqlTable>
        </Col>
      </Row>
    </>
  );
});