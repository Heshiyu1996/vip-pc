import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const TableConsumptionStatistics: React.FC = (props: any) => {
  const { data } = props;

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '消费次数',
      dataIndex: 'consumptionCount',
    },
    {
      title: '用户数',
      dataIndex: 'memberCount',
    },
    {
      title: '本金消费',
      dataIndex: 'totalConsumptionAmount',
    },
    {
      title: '赠送金消费',
      dataIndex: 'giftConsumptionAmount',
    },
    {
      title: '平均消费金额',
      dataIndex: 'consumptionAverageAmount',
    },
    {
      title: '赠送金消费',
      dataIndex: 'giftConsumptionAmount',
    },
    {
      title: '平均消费金额',
      dataIndex: 'consumptionAverageAmount',
    },
  ];

  return (
    <ProTable
      title={() => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>其他充值指标</span>}
      dataSource={data}
      pagination={false}
      rowKey="id"
      toolbar={{ style: { display: 'none' } }}
      search={false}
      columns={columns}
    />
  );
};

export default TableConsumptionStatistics;
