import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const TableChannel: React.FC = (props: any) => {
  const { data } = props;

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员类型',
      dataIndex: 'vipType',
    },
    {
      title: '会员数',
      dataIndex: 'vipMember',
      valueType: 'textarea',
    },
    {
      title: '消费金额',
      dataIndex: 'consumptionAmount',
    },
    {
      title: '订单量',
      dataIndex: 'orderAmount',
    },
    {
      title: '占比',
      dataIndex: 'proportion',
      renderText: (text) => `${text}%`
    },
  ];

  return (
    <ProTable
      title={() => <span style={{ fontWeight: 'bold', fontSize: '16px' }}>会员渠道分析</span>}
      dataSource={data}
      pagination={false}
      rowKey="id"
      toolbar={{ style: { display: 'none' } }}
      search={false}
      columns={columns}
    />
  );
};

export default TableChannel;
