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
      dataIndex: 'department_name',
      hideInSearch: true,
    },
    
    {
      title: '汇总',
      hideInSearch: true,
      children: [
        {
          title: '订单量',
          dataIndex: 'roomOrderAmount',
          key: 'roomOrderAmount',
          width: 200,
        },
        {
          title: '销量',
          dataIndex: 'roomSaleAmount',
          key: 'roomSaleAmount',
        },
        {
          title: '销售额',
          dataIndex: 'roomSaleBalance',
          key: 'roomSaleBalance',
        },
      ],
    },
    {
      title: '客房',
      hideInSearch: true,
      children: [
        {
          title: '浏览量PV',
          dataIndex: 'pv',
          key: 'pv',
          width: 200,
        },
        {
          title: '访客量UV',
          dataIndex: 'roomUv',
          key: 'roomUv',
        },
        {
          title: '订单量',
          dataIndex: 'summaryOrderAmount',
          key: 'summaryOrderAmount',
        },
        {
          title: '销量',
          dataIndex: 'summarySaleAmount',
          key: 'summarySaleAmount',
        },
        {
          title: '销售额',
          dataIndex: 'summarySaleBalance',
          key: 'summarySaleBalance',
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
