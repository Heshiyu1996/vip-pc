import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const TableOrder: React.FC = (props: any) => {
  const { data } = props;

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '购买会员数',
      dataIndex: 'purchaseVipMember',
    },
    {
      title: '复购会员数',
      dataIndex: 'repurchaseVipMember',
    },
    {
      title: '复购率',
      dataIndex: 'repurchaseRate',
    },
    {
      title: '购买金额',
      dataIndex: 'purchaseAmount',
    },
    {
      title: '复购金额',
      dataIndex: 'repurchaseAmount',
    },
    {
      title: '复购金额占比',
      dataIndex: 'repurchaseAmountProportion',
      renderText: (text) => `${text}%`
    },
    {
      title: '订单数',
      dataIndex: 'vipCountPercent',
    },
    {
      title: '复购订单数',
      dataIndex: 'repurchaseOrderAmount',
    },
    {
      title: '复购订单占比',
      dataIndex: 'repurchaseOrderRate',
    },
  ];

  return (
    <ProTable
      title={() => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>会员订单分析</span>}
      dataSource={data}
      pagination={false}
      rowKey="id"
      toolbar={{ style: { display: 'none' } }}
      search={false}
      columns={columns}
    />
  );
};

export default TableOrder;
