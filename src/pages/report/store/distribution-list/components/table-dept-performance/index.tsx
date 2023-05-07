import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import { getStoreDistributionDeptPerformanceList } from '@/services/ant-design-pro/api';

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
      title: '部门',
      dataIndex: 'saleChannel',
      hideInSearch: true,
    },
    
    {
      title: '汇总',
      hideInSearch: true,
      children: [
        {
          title: '订单量',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: '销量',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: '销售额',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: '客房',
      hideInSearch: true,
      children: [
        {
          title: '浏览量PV',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: '访客量UV',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: '订单量',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: '销量',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: '销售额',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
  ];

  return (
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        request={getStoreDistributionDeptPerformanceList}
        columns={columns}
      />
  );
};

export default RechargeList;
