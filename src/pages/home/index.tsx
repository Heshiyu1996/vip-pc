import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { getHomeData } from '@/services/ant-design-pro/api'
import './index.less';

const Home: React.FC = () => {
  const [todoCountForBooking, setTodoCountForBooking] = useState<number>(0);
  const [todoCountForRefunding, setTodoCountForRefunding] = useState<number>(0);
  const [countForBooked, setCountForBooked] = useState<number>(0);
  const [totalCountForBooking, setTotalCountForBooking] = useState<number>(0);

  const init = () => {
    getHomeData().then((res) => {
      const {
        todoCountForBooking,
        todoCountForRefunding,
        countForBooked,
        totalCountForBooking
      } = res?.data || {};

      setTodoCountForBooking(todoCountForBooking);
      setTodoCountForRefunding(todoCountForRefunding);
      setCountForBooked(countForBooked);
      setTotalCountForBooking(totalCountForBooking);
    })
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <PageContainer>
      <div className='u-home'>
        <Card className='todo-board'>
          <div className='item-wrapper'>
            <div className='label'>待办订房申请</div>
            <div className='value'>{todoCountForBooking}个</div> 
          </div>
          <div className='item-wrapper'>
            <div className='label'>待办退款申请</div>
            <div className='value'>{todoCountForRefunding}个</div> 
          </div>
          <div className='item-wrapper'>
            <div className='label'>客房预订比例</div>
            <div className='value'>{countForBooked}/{totalCountForBooking}</div> 
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Home;
