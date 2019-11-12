import React, { SFC } from 'react';
import { Table } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
interface GqlTableProps {
  gql: string;
}
const GqlTable: SFC<GqlTableProps> = props => {
  const { data, loading } = useQuery(gql(props.gql));
  return (
    <>
      <Table
        rowKey={`id`}
        loading={loading}
        dataSource={data && data.dataSource}
      >
        {props.children}
      </Table>
    </>
  );
};

export { GqlTable as default };
