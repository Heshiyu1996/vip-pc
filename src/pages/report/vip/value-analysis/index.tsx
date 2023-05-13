import React, { useEffect, useState } from 'react';
import { ProForm, ProFormDateRangePicker } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { 
  getVipValueMemberStatistics, 
  getVipValueChannelList,
  getVipValueLevelList,
  getVipValueOrderList,
} from '@/services/ant-design-pro/api';
import CardIndicator from '@/components/card-indicator';
import TableChannel from './components/table-channel';
import moment from 'moment';
import './index.less'
import TableLevel from './components/table-level';
import TableOrder from './components/table-order';

const dateToday = new Date();
const dateYesterday = new Date(dateToday.getTime() - 24 * 60 * 60 * 1000);
const initialValue = [moment(dateYesterday).format('YYYY-MM-DD'), moment(dateToday).format('YYYY-MM-DD')]

const RechargeList: React.FC = () => {
  const [timeRange, setTimeRange] = useState(initialValue);

  // 会员指标
  const [totalAmount, setTotalAmout] = useState(0);
  const getTotalAmount = async (params) => {
    const res = await getVipValueMemberStatistics(params);
    const { totalBalance } = res?.data || {};
    setTotalAmout(totalBalance);
  }

  // 会员渠道分析
  const [dataChannel, setDataChannel] = useState([]);
  const getDataChannel = async (params) => {
    const res = await getVipValueChannelList(params);
    setDataChannel(res?.data || {});
  }

  // 会员等级分析
  const [dataLevel, setDataLevel] = useState([]);
  const getDataLevel = async (params) => {
    const res = await getVipValueLevelList(params);
    setDataLevel(res?.data || {});
  }

  // 会员订单分析
  const [dataOrder, setDataOrder] = useState([]);
  const getDataOrder = async (params) => {
    const res = await getVipValueOrderList(params);
    setDataOrder(res?.data || {});
  }

  useEffect(() => {
    if (!timeRange) return;

    const [startTime, endTime] = timeRange || ['', ''];
    const params = { startTime, endTime };
    // 会员指标
    getTotalAmount(params);
    // 会员渠道分析
    getDataChannel(params);
    // 会员等级分析
    getDataLevel(params);
    // 会员订单分析
    getDataOrder(params);
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

      {/* 会员指标 */}
      <CardIndicator data={[ 
          { label: '累积会员数', value: totalAmount },
          { label: '新增会员数', value: totalAmount }
        ]} />
      
      {/* 会员渠道分析 */}
      <TableChannel data={dataChannel} />

      {/* 会员等级分析 */}
      <TableLevel data={dataLevel} />

      {/* 会员订单分析 */}
      <TableOrder data={dataOrder} />
    </PageContainer>
  );
};

export default RechargeList;
