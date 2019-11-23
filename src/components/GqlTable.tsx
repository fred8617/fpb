import React, { SFC } from 'react';
import { Table, Row, Col } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
interface GqlTableProps {
  gql: string;
}
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers:{
    Authorization:'Bearer 62babf1d9e1c93ce12700649436e1f9035a5866c'
  }
});
const DemoGqlTable: SFC<GqlTableProps> = props => {
  const { data, loading } = useQuery(gql(props.gql), {
    client,
    fetchPolicy: 'network-only',
  });
  const columns = (props.children as any[]).map(c => ({
    ...c.props,
    render: new Function(
      'props',
      'dataIndex',
      'React',
      `
      
    return (text,record,index)=>{
      console.log('global vars',props,record,index) 
      if(dataIndex==='avatarUrl'){
        return React.createElement('img',{width:50,src:text})
      }
      return text
    }
  `,
    )(props, c.props.dataIndex,React),
  }));
  return (
    <>
      <Table
        pagination={{ pageSize: 5 }}
        size="small"
        columns={columns}
        rowKey={`id`}
        loading={loading}
        dataSource={data && data.data.data.dataSource}
      />
    </>
  );
};

export { DemoGqlTable as default };
