import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getParams } from '@/common/tools';
import { getFinanceRoomOrderList, getFinanceRoomOrderStatistics } from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';
import './index.less';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const RechargeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'id',
    },
    {
      title: '支付单号',
      dataIndex: 'vipCardId',
    },
    {
      title: '应获奖励人',
      dataIndex: 'contactName',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'vipCardName',
      hideInSearch: true,
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '入住时间',
      dataIndex: 'orderStartDate',
      hideInSearch: true,
    },
    {
      title: '离店时间',
      dataIndex: 'orderEndDate',
      hideInSearch: true,
    },
    {
      title: '确认号',
      dataIndex: 'identifyCode',
    },
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
      hideInTable: true,
    },
    {
      title: '会员名字',
      dataIndex: 'vipCardName',
      hideInTable: true,
    },
    {
      title: '产品名称',
      dataIndex: 'roomType',
    },
    {
      title: '间夜量',
      dataIndex: 'orderDays',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'totalPrice',
      hideInSearch: true,
    },
    {
      title: '时间区间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
  ];

  const [staticInfo, setStaticInfo] = useState<any>({});
  const getTotalAmount = async () => {
    const res = await getFinanceRoomOrderStatistics();
    setStaticInfo(res?.data || {});
  } 
  useEffect(() => {
    getTotalAmount()
  }, []);

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        className="u-room-order-list-table"
        headerTitle={<CardIndicator data={[ 
          { label: '总收入（元）', tip: '包括：卡内余额、微信支付', value: staticInfo?.totalIncome },
          { label: '总支出（元）', tip: '包括：员工奖励', value: staticInfo?.totalExpenses },
          { label: '实际结算（元）',tip: '实际结算 = 总收入 - 总支出', value: staticInfo?.total },
      ]} />}
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
        request={getFinanceRoomOrderList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
