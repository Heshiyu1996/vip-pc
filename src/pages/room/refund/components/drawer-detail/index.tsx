import React from 'react';
import { Drawer } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import type { ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import './index.less';

interface IProps {
  visible: boolean;
  columns: ProColumns<API.RoomRefundListItem, 'text'>[];
  values: API.RoomRefundListItem;
  onClose: () => void;
}

const DrawerDetail: React.FC<IProps> = (props) => {
  const { visible, columns, values, onClose } = props;

  return (
    <Drawer
      className="u-drawer-room-refund"
      width={600}
      visible={visible}
      onClose={onClose}
      closable={false}
    >
      <>
        <ProDescriptions<API.RoomRefundListItem>
          column={2}
          title={values?.id}
          request={async () => ({
            data: values || {},
          })}
          params={{
            id: values?.id,
          }}
          columns={columns as ProDescriptionsItemProps<API.RoomRefundListItem>[]}
        />
      </>
    </Drawer>
  );
};

export default DrawerDetail;
