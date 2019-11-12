import React, {  } from 'react';
import FPB from './FPB';
import './FPB/index.less';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import input from 'demo-components/input';
import checkbox from 'demo-components/checkbox';
import radio from 'demo-components/radio';
import button from 'demo-components/button';
import tabs from 'demo-components/tabs';
import table from 'demo-components/table';
import gqltable from 'demo-components/gql-table';
import {data} from 'data';

const client = new ApolloClient({
  uri: 'http://localhost:4466/',
});
const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
       <FPB
          defaultDatas={data as any}
          components={[input, checkbox, radio, button, tabs, table,gqltable]}
        />
    </ApolloProvider>
  );
};

export default App;
