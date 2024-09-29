import React, { useEffect, useState } from 'react';
import { ProForm, ProFormDateRangePicker } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { 
  getVipFinancialRechargeStatistics,
  getVipFinancialRechargeOtherStatistics,
  getVipFinancialConsumptionStatistics,
  getVipFinancialConsumptionOtherStatistics,
} from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';
import moment from 'moment';
import TableRechargeStatistics from './components/table-recharge-statistics';
import TableConsumptionStatistics from './components/table-consumption-statistics';
import './index.less'

const dateToday = new Date();
const dateYesterday = new Date(dateToday.getTime() - 24 * 60 * 60 * 1000);
const initialValue = [moment(dateYesterday).format('YYYY-MM-DD'), moment(dateToday).format('YYYY-MM-DD')]

const RechargeList: React.FC = () => {
  const [timeRange, setTimeRange] = useState(initialValue);

  // 充值指标
  const [rechargeStatisticsInfo, setRechargeStatisticsInfo] = useState(0);
  const getRechargeStatisticsInfo = async (params) => {
    const res = await getVipFinancialRechargeStatistics(params);
    console.log(res, 19938);
    
    setRechargeStatisticsInfo(res?.data || {});
  }

  // 其他充值指标
  const [dataRechargeStatistics, setDataRechargeStatistics] = useState([]);
  const getDataRechargeStatistics = async (params) => {
    const res = await getVipFinancialRechargeOtherStatistics(params);
    setDataRechargeStatistics(res?.data || {});
  }

  // 消费指标
  const [consumptionStatisticsInfo, setConsumptionStatisticsInfo] = useState(0);
  const getConsumptionStatisticsInfo = async (params) => {
    const res = await getVipFinancialConsumptionStatistics(params);
    setConsumptionStatisticsInfo(res?.data || {});
  }

  // 其他消费指标
  const [dataConsumptionStatistics, setDataConsumptionStatistics] = useState([]);
  const getDataConsumptionStatistics = async (params) => {
    const res = await getVipFinancialConsumptionOtherStatistics(params);
    setDataConsumptionStatistics(res?.data || {});
  }

  useEffect(() => {
    if (!timeRange) return;

    const [startTime, endTime] = timeRange || ['', ''];
    const params = { startTime, endTime };
    // 充值指标
    getRechargeStatisticsInfo(params);
    // 其他充值指标
    getDataRechargeStatistics(params);
    // 消费指标
    getConsumptionStatisticsInfo(params);
    // 其他消费指标
    getDataConsumptionStatistics(params);
  }, [timeRange]);

  return (
    <PageContainer className='u-value-analysis'>
      <ProForm className='u-form' layout='inline'
        onFinish={async (values) => {
          console.log(values);
          setTimeRange(values?.timeRange || ['', '']);
        }}
        params={{}}
      >
        <ProFormDateRangePicker
          width="md"
          name="timeRange"
          label="统计时间"
          placeholder={['开始日期', '结束日期']}
          initialValue={initialValue}
        />
      </ProForm>

      {/* 会员充值概览 */}
      <CardIndicator data={[
        { label: '续充率', value: rechargeStatisticsInfo?.refillRate },
        { label: '充值人数', value: rechargeStatisticsInfo?.rechargeMember },
        { label: '人均充值次数', value: rechargeStatisticsInfo?.rechargeAverageCount },
        { label: '充值金额', value: <div style={{ fontSize: '14px' }}><div>本金：{rechargeStatisticsInfo?.rechargeAmount?.totalBalance}</div><div>赠送金：{rechargeStatisticsInfo?.rechargeAmount?.giftBalance}</div></div> },
        { label: '消费金额', value: <div style={{ fontSize: '14px' }}><div>本金：{rechargeStatisticsInfo?.consumptionAmount?.totalBalance}</div><div>赠送金：{rechargeStatisticsInfo?.consumptionAmount?.giftBalance}</div></div> },
        { label: '待消费金额', value: <div style={{ fontSize: '14px' }}><div>本金：{rechargeStatisticsInfo?.consumptionWaitingAmount?.totalBalance}</div><div>赠送金：{rechargeStatisticsInfo?.consumptionWaitingAmount?.giftBalance}</div></div> },
      ]} />
      
      {/* 其他充值指标 */}
      <TableRechargeStatistics data={dataRechargeStatistics} />

      {/* 会员消费概览 */}
      <CardIndicator data={[ 
          { label: '消费人数', value: consumptionStatisticsInfo?.consumptionMember },
          { label: '人均消费次数', value: consumptionStatisticsInfo?.consumptionAverageCount },
          { label: '平均消费金额', value: consumptionStatisticsInfo?.consumptionAverageAmount }
        ]} />

      {/* 其他消费指标 */}
      <TableConsumptionStatistics data={dataConsumptionStatistics} />
    </PageContainer>
  );
};

export default RechargeList;
