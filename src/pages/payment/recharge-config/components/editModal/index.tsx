import React, { useRef, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRechargeConfig } from '@/services/ant-design-pro/api';
import { CheckInOptions, BirthdayOptions } from '@/common/config'

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = API.RechargeConfigListItem;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      amount: props.values.amount,
      giftAmount: props.values.giftAmount,
      roomTicketAmount: props.values.roomTicketAmount,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editRechargeConfig({
        id: fields.id,
        amount: fields.amount,
        giftAmount: fields.giftAmount,
        roomTicketAmount: fields.roomTicketAmount,
      });
      hide();
      message.success('编辑成功!');
      return true;
    } catch (error) {
      hide();
      message.error('编辑失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      title="编辑充值配置"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.VipConfigListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormDigit
        label="充值面额"
        rules={[
          {
            required: true,
            message: '充值面额必填!',
          },
        ]}
        width="md"
        addonAfter="元"
        fieldProps={{controls: false}}
        name="amount"
      />
      <ProFormDigit
        label="赠送金"
        rules={[
          {
            required: true,
            message: '赠送金必填!',
          },
        ]}
        width="md"
        addonAfter="元"
        fieldProps={{controls: false}}
        min={0}
        max={10}
        name="giftAmount"
      />
      <ProFormDigit
        label="住房券数量"
        rules={[
          {
            required: true,
            message: '住房券数量必填!',
          },
        ]}
        width="md"
        addonAfter="张"
        fieldProps={{controls: false}}
        min={0}
        max={10}
        name="roomTicketAmount"
      />
    </ModalForm>
  );
};

export default EditModal;
