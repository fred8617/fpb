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

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers:{
    Authorization:'Bearer 62babf1d9e1c93ce12700649436e1f9035a5866c'
  }
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
console.log(JSON.stringify([input, checkbox, radio, button, tabs, table, gqltable]));

export default App;
