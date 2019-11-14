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

const test = {
  datas: {
    EVRnWB1b: {
      i: 'EVRnWB1b',
      autoHeight: true,
      componentProps: {
        gql:
          '{\n  dataSource:users{\n    id\n    name\n    nickname\n    email\n  }\n}',
        children: [
          { componentProps: { dataIndex: 'name', title: '姓名' } },
          { componentProps: { dataIndex: 'nickname', title: '昵称' } },
          { componentProps: { dataIndex: 'email', title: '邮箱' } },
        ],
      },
      componentId: 'gql-table',
      isFormField: null,
      $id: null,
    },
  },
  layouts: {
    lg: [
      {
        w: 4,
        h: 79,
        x: 0,
        y: 338,
        i: 'jffT1f5-',
        minH: 79,
        maxH: 79,
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 79,
        x: 5,
        y: 338,
        i: 'EiX7-eXY',
        minH: 79,
        maxH: 79,
        moved: false,
        static: false,
      },
      {
        w: 8,
        h: 91,
        x: 0,
        y: 417,
        i: 'I7WU2m2d',
        minH: 91,
        maxH: 91,
        moved: false,
        static: false,
      },
      {
        w: 1,
        h: 30,
        x: 4,
        y: 338,
        i: '65oj8LJ5',
        minH: 30,
        maxH: 30,
        moved: false,
        static: false,
      },
      {
        w: 8,
        h: 112,
        x: 0,
        y: 0,
        i: 'vHSD40rC',
        minH: 112,
        maxH: 112,
        moved: false,
        static: false,
      },
      {
        w: 8,
        h: 226,
        x: 0,
        y: 112,
        i: 'EVRnWB1b',
        minH: 226,
        maxH: 226,
        moved: false,
        static: false,
      },
    ],
    md: [
      {
        w: 6,
        h: 226,
        x: 0,
        y: 0,
        i: 'EVRnWB1b',
        minH: 226,
        maxH: 226,
        moved: false,
        static: false,
      },
    ],
  },
  cols: { xxl: 12, xl: 12, lg: 8, md: 6, sm: 4, xs: 2 },
  breakpoints: ['lg', 'md'],
};
const client = new ApolloClient({
  uri: 'http://localhost:4466/',
});
const App: React.FC = () => {
  const force = useForceUpdate();
  useEffect(() => {
    window.addEventListener('resize', force);
  });
  return (
    <>
      <DevTools position={{ bottom: 0 }} />
      <ApolloFPB
        client={client}
        defaultDatas={data as any}
        components={[input, checkbox, radio, button, tabs, table, gqltable]}
      />
    </>
  );
};

export default App;
