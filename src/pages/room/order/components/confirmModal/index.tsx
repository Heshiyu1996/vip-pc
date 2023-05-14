import React, { useState, useRef, useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
  // ProFormTextArea,
  ProFormRadio,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { confirmRoomOrder } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-components';
import './index.less';
import bus, { ON_NEW_ORDER } from '@/common/bus';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
  identifyCode: string;
  // message?: string;
  sendSms: boolean;
} & Partial<API.RoomOrderListItem>;

const ConfirmModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleConfirn = async (fields: FormValueType) => {
    const hide = message.loading('正在操作');

    try {
      await confirmRoomOrder({
        id: fields.id,
        identifyCode: fields.identifyCode,
        // message: fields.message,
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
      className="u-confirm-modal-room-order"
      formRef={formRef}
      width="500px"
      title="确认订房"
      initialValues={{
        id: props.values.id
      }}
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
      <ProFormText
        label="订单号"
        rules={[
          {
            required: true,
            message: '订单号必填!',
          },
        ]}
        disabled
        width="md"
        name="id"
      />
      <ProFormText
        label="确认号"
        rules={[
          {
            required: true,
            message: '确认号必填!',
          },
        ]}
        width="md"
        name="identifyCode"
      />

      <div className="tip">请再次确认是否需要同意订房申请。</div>

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

export default ConfirmModal;
