import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import { getReportStoreRewardDeptList } from '@/services/ant-design-pro/api';

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
      title: '部门名称',
      dataIndex: 'saleChannel',
      hideInSearch: true,
    },
    {
      title: '总奖励',
      dataIndex: 'saleChannel',
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
        request={getReportStoreRewardDeptList}
        columns={columns}
      />
  );
};

export default RechargeList;
