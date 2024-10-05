import React from 'react';
import {
  ModalForm,
  ProFormRadio,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { rejectRoomOrder } from '@/services/ant-design-pro/api';
import './index.less';
import bus, { ON_NEW_ORDER } from '@/common/bus';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  sendSms?: string;
} & Partial<API.RuleListItem>;

const RejectModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const handleConfirm = async (fields: FormValueType) => {
    const hide = message.loading('正在操作');

    try {
      await rejectRoomOrder({
        id: props.values.id,
        sendSms: fields.sendSms,
      });
      hide();
      message.success('操作成功!');
      // 更新导航小红点
      bus.emit(ON_NEW_ORDER);
      return true;
    } catch (error) {
      hide();
      message.error('操作失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
    className="u-reject-modal-room-order"
      width="500px"
      title="拒绝订房"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleConfirm(value);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <div className="tip">请再次确认是否需要拒绝订房申请。</div>

      <ProFormRadio.Group
        label="是否发送短信"
        rules={[
          {
            required: true,
            message: '是否发送短信必填!',
          },
        ]}
        name="sendSms"
        initialValue={true}
        options={[{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }]}
      />
    </ModalForm>
  );
};

export default RejectModal;
