import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getParams } from '@/common/tools';
import { getReportStoreMerchantList } from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

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

  // const [totalAmount, setTotalAmout] = useState(0);
  // const getTotalAmount = async () => {
  //   const res = await getFinanceAccountBalanceStatistics();
  //   const { totalBalance } = res?.data || {};
  //   setTotalAmout(totalBalance);
  // } 
  // useEffect(() => {
  //   getTotalAmount()
  // }, []);

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        // headerTitle={<CardIndicator data={[ { label: '现金账户（元）', value: totalAmount } ]} />}
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
