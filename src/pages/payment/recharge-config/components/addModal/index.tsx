import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addRechargeConfig } from '@/services/ant-design-pro/api';
import { CheckInOptions, BirthdayOptions } from '@/common/config'

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
}

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  // 新增
  const handleAdd = async (params: API.RechargeConfigListItem) => {
    const hide = message.loading('正在新增');

    try {
      await addRechargeConfig(params);
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
      title="新增充值配置"
      visible={visible}
      width={550}
      {...FormLayout}
      layout="horizontal"
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RechargeConfigListItem);
        if (success) {
          onVisibleChange(false);
          if (onOk) {
            onOk();
          }
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

export default AddModal;
