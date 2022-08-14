import React, { useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addRule } from '@/services/ant-design-pro/api';

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;

  const actionRef = useRef<ActionType>();
  // 新增
  const handleAdd = async (params: API.RuleListItem) => {
    const hide = message.loading('正在添加');

    try {
      await addRule(params);
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  return (
    <ModalForm
      title="新增会员卡"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        label="名字"
        rules={[
          {
            required: true,
            message: '名字必填!',
          },
        ]}
        width="md"
        name="ownerName"
      />

      <ProFormText
        label="手机号"
        rules={[
          {
            required: true,
            message: '手机号必填!',
          },
        ]}
        width="md"
        name="mobileNumber"
      />
      <ProFormText
        label="身份证号"
        rules={[
          {
            required: true,
            message: '身份证号必填!',
          },
        ]}
        width="md"
        name="identityNumber"
      />
    </ModalForm>
  );
};

export default AddModal;
