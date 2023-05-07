import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getParams } from '@/common/tools';
import { getFinanceAccountBalanceList, getFinanceAccountBalanceStatistics } from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const RechargeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '流水单号',
      dataIndex: 'id',
    },
    {
      title: '流水金额',
      dataIndex: 'amount',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '流水时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '流水时间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
  ];

  const [totalAmount, setTotalAmout] = useState(0);
  const getTotalAmount = async () => {
    const res = await getFinanceAccountBalanceStatistics();
    const { totalBalance } = res?.data || {};
    setTotalAmout(totalBalance);
  } 
  useEffect(() => {
    getTotalAmount()
  }, []);

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={<CardIndicator data={[ { label: '现金账户（元）', value: totalAmount } ]} />}
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
        request={getFinanceAccountBalanceList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
