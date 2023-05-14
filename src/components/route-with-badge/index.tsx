import { Badge } from 'antd';
import bus, { ON_NEW_ORDER } from '@/common/bus';
import { useLayoutEffect, useState } from 'react';
import { getRoomOrderAmount } from '@/services/ant-design-pro/api';
import './index.less';

const RouteWithBadge: React.FC = () => {
  const [count, setCount] = useState(0);

  const changeCount = async () => {
    const { data } = await getRoomOrderAmount({ status: 'NEW' });
    console.log(data, 49949);
    
    setCount(data);
  }

  useLayoutEffect(() => {
    bus.on(ON_NEW_ORDER, changeCount);
  }, [])

  return (
    <Badge style={{ marginLeft: '10px' }} count={count} />
  );
};

export default RouteWithBadge;
