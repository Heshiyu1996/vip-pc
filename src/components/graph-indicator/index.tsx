import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import './index.less';

const GraphIndicator: React.FC = (props: any) => {
  const { data } = props || {};

  return (
    <Card className='u-graph-indicator'>
      {
        data?.map((item: any) => (
          <div key={item.label} className='item-wrapper'>
            <div className='label'>
              {item?.label}
              {item.tip && <Tooltip title={item.tip}>
                <span>
                  <QuestionCircleOutlined />
                </span>
              </Tooltip>}
            </div>
            <div className='value'>{item?.value}</div> 
          </div>
        ))
      }
      
    </Card>
  );
};

export default GraphIndicator;
