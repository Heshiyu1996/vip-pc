import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import { getStoreDistributionStaffSaleList } from '@/services/ant-design-pro/api';

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
      title: '姓名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      hideInSearch: true,
    },
    {
      title: '产品名称',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '浏览量PV',
      dataIndex: 'pv',
      hideInSearch: true,
    },
    {
      title: '访客量UV',
      dataIndex: 'uv',
      hideInSearch: true,
    },
    {
      title: '订单量',
      dataIndex: 'orderAmount',
      hideInSearch: true,
    },
    {
      title: '销售量',
      dataIndex: 'saleAmount',
      hideInSearch: true,
    },
    {
      title: '销售额',
      dataIndex: 'saleBalance',
      hideInSearch: true,
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
        request={getStoreDistributionStaffSaleList}
        columns={columns}
      />
  );
};

export default RechargeList;
