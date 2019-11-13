import { Input, Checkbox, Radio, Table } from 'antd';
import { ComponentType } from '../FPB/useFPBStore';
const table: ComponentType = {
  id: 'antd-table',
  label: '表格',
  name: 'Table',
  isDefault: false,
  path: 'antd',
  group: 'antd',
  Component: Table,
  formField: false,
  children: [],
  componentProps: {
    children: {
      type: 'array:component',
      label: '列',
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
  },
};
export default table;
