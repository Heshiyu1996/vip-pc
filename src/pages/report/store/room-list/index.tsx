import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getReportStoreRoomList } from '@/services/ant-design-pro/api';

const RechargeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '查询日期',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '产品',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '交易额',
      dataIndex: 'saleBalance',
      hideInSearch: true,
    },
    {
      title: '间夜量',
      dataIndex: 'roomAmount',
      hideInSearch: true,
    },
    {
      title: '平均房价',
      dataIndex: 'roomAveragePrice',
      hideInSearch: true,
    },
    {
      title: '支付人数',
      dataIndex: 'paidNumber',
      hideInSearch: true,
    },
    {
      title: '复购人数',
      dataIndex: 'repurchaseNumber',
      hideInSearch: true,
    },
    {
      title: '复购金额',
      dataIndex: 'repurchaseBalance',
      hideInSearch: true,
    },
    {
      title: '复购人数占比',
      dataIndex: 'repurchaseNumberProportion',
      hideInSearch: true,
      renderText: (text) => `${text}%`
    },
    {
      title: '复购金额占比',
      dataIndex: 'repurchaseBalanceProportion',
      hideInSearch: true,
      renderText: (text) => `${text}%`
    },
  ];

  return (
    <PageContainer>
      （说明：请先选择“查询日期”后查询）
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        request={getReportStoreRoomList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
