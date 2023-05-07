import { Card } from 'antd';
import './index.less';

const CardIndicator: React.FC = (props: any) => {
  const { data } = props || {};

  return (
    <Card className='u-card-indicator'>
      {
        data?.map((item: any) => (
          <div key={item.label} className='item-wrapper'>
            <div className='label'>{item?.label}</div>
            <div className='value'>{item?.value}</div> 
          </div>
        ))
      }
      
    </Card>
  );
};

export default CardIndicator;
