import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const TableLevel: React.FC = (props: any) => {
  const { data } = props;

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员等级',
      dataIndex: 'level',
    },
    {
      title: '会员数',
      dataIndex: 'vipMember',
    },
    {
      title: '消费金额',
      dataIndex: 'consumptionAmount',
    },
    {
      title: '会员数占比',
      dataIndex: 'vipCountPercent',
      renderText: (text) => `${text}%`
    },
    {
      title: '复购率',
      dataIndex: 'repurchaseRate',
    },
    {
      title: '人均订单数',
      dataIndex: 'orderAverageCount',
    },
    {
      title: '客单收入',
      dataIndex: 'income',
    },
  ];

  return (
    <ProTable
      title={() => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>会员等级分析</span>}
      dataSource={data}
      pagination={false}
      rowKey="id"
      toolbar={{ style: { display: 'none' } }}
      search={false}
      columns={columns}
    />
  );
};

export default TableLevel;
