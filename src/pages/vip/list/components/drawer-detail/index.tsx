import React from 'react';
import { Drawer, Button, Row, Col } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import type { ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import './index.less';

interface IProps {
  visible: boolean;
  columns: ProColumns<API.RuleListItem, 'text'>[];
  values: API.RuleListItem;
  onClose: () => void;
}

const DrawerDetail: React.FC<IProps> = (props) => {
  const { visible, columns, values, onClose } = props;

  return (
    <Drawer
      className="u-drawer-vip-detail"
      width={600}
      visible={visible}
      onClose={onClose}
      closable={false}
    >
      <>
        <ProDescriptions<API.RuleListItem>
          column={2}
          title={values?.id}
          request={async () => ({
            data: values || {},
          })}
          params={{
            id: values?.id,
          }}
          columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
        />

        <Row gutter={[16, 24]}>
          <Col span={24} className="u-title">
            支付管理
          </Col>
          <Col span={6}>
            <Button onClick={() => window.open(`/payment/recharge?cardId=${values?.id}`)}>会员卡充值</Button>
          </Col>
          <Col span={6}>
            <Button onClick={() => window.open(`/payment/recharge-list?cardId=${values?.id}`)}>查询充值记录</Button>
          </Col>
          <Col span={6}>
            <Button onClick={() => window.open(`/payment/consumption-list?cardId=${values?.id}`)}>查询消费记录</Button>
          </Col>
        </Row>

        <Row gutter={[16, 24]}>
          <Col span={24} className="u-title">
            订房管理
          </Col>
          <Col span={6}>
            <Button onClick={() => window.open(`/room/order?cardId=${values?.id}`)}>查询订房记录</Button>
          </Col>
          <Col span={6}>
            <Button onClick={() => window.open(`/room/refund?cardId=${values?.id}`)}>查询退款记录</Button>
          </Col>
        </Row>
      </>
    </Drawer>
  );
};

export default DrawerDetail;
