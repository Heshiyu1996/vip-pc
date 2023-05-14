import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getParams } from '@/common/tools';
import { getReportStoreMerchantList } from '@/services/ant-design-pro/api';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const SaleChannelData = [
  {
    value: '',
    label: '全部',
  },
  {
    value: 'CONSUMER',
    label: '消费者传播',
  },
  {
    value: 'STAFF',
    label: '员工传播',
  },
  {
    value: 'OFFICIAL',
    label: '官微',
  },
];

const SaleChannelEnumConfig = (() => {
  const map = {};
  SaleChannelData.forEach((item) => {
    map[item.value] = item.label;
  });
  return map;
})();

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
      title: '销售渠道',
      dataIndex: 'saleChannel',
      valueEnum: SaleChannelEnumConfig,
      renderText: (val: string) => SaleChannelEnumConfig[val],
    },
    {
      title: '客房销售额',
      dataIndex: 'roomSaleAmount',
      valueType: 'textarea',
      hideInSearch: true,
      tooltip: "所有会员订房的总金额(所有支付方式)"
    },
    {
      title: '住房券抵扣数量',
      dataIndex: 'roomTicketDeduction',
      hideInSearch: true,
    },
    {
      title: '赠送金金额',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        form={{
          initialValues: {
            cardId: defaultCardId
          }
        }}
        search={{
          labelWidth: 120,
        }}
        request={getReportStoreMerchantList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
