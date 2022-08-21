import React, { useState } from 'react';
import {
  ModalForm,
  ProFormTextArea,
  ProFormRadio,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { confirmRoomRefund } from '@/services/ant-design-pro/api';
import './index.less';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  message?: string;
} & Partial<API.RuleListItem>;

const ConfirmModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const [visibleMessage, setVisibleMessage] = useState(true);

  const handleConfirn = async (fields: FormValueType) => {
    const hide = message.loading('正在操作');

    try {
      await confirmRoomRefund({
        id: props.values.id,
        message: fields.message,
      });
      hide();
      message.success('操作成功!');
      return true;
    } catch (error) {
      hide();
      message.error('操作失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
    className="u-edit-modal-room-refund"
      width="500px"
      title="确认同意"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleConfirn(value);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <div className="tip">请再次确认是否需要同意退款申请。</div>

      <ProFormRadio.Group
        label="是否发送短信"
        rules={[
          {
            required: true,
            message: '是否发送短信必填!',
          },
        ]}
        name="willSendMessage"
        initialValue="是"
        options={['是', '否']}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value === '是';
            setVisibleMessage(visible);
          }
        }}
      />
     {visibleMessage && <ProFormTextArea
        label="短信内容"
        rules={[
          {
            required: true,
            message: '短信内容必填!',
          },
        ]}
        width="md"
        name="message"
      />}
    </ModalForm>
  );
};

export default ConfirmModal;
