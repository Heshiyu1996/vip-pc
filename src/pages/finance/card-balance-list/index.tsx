import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getParams } from '@/common/tools';
import { getFinanceCardBalanceList, getFinanceCardBalanceStatistics } from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const RechargeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员卡号',
      dataIndex: 'cardId',
      hideInSearch: true,
    },
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
      hideInTable: true,
    },
    {
      title: '会员名',
      dataIndex: 'ownerName',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      hideInSearch: true,
    },
  ];

  const [totalAmount, setTotalAmout] = useState(0);
  const getTotalAmount = async () => {
    const res = await getFinanceCardBalanceStatistics();
    const { totalBalance } = res?.data || {};
    setTotalAmout(totalBalance);
  } 
  useEffect(() => {
    getTotalAmount()
  }, []);

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={<CardIndicator data={[ { label: '会员卡未消费总余额（元）', value: totalAmount } ]} />}
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
        request={getFinanceCardBalanceList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
