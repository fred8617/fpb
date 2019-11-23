import { Input, Checkbox, Radio, Table } from 'antd';
import { ComponentType } from '../fpb/useFPBStore';
import GqlTable from '../components/GqlTable';
const table: ComponentType = {
  id: 'gql-table',
  label: 'Graphql查询表格',
  name: 'GqlTable',
  isDefault: true,
  path: '@/components',
  group: '自定义',
  Component: GqlTable,
  formField: false,
  children: [],
  componentProps: {
    children: {
      id: 'antd-column',
      type: 'array:component',
      label: '列',
      shouldHaveOne: true,
      Component: Table.Column,
      componentProps: {
        dataIndex: {
          label: '数据索引',
          type: 'string',
        },
        title: {
          label: '标题',
          type: 'string',
        },
      },
    },
    gql: {
      label: 'gql查询',
      type: 'graphql',
      rules: [{ required: true, message: '请完成gql查询' }],
    },
  },
};
export default table;
