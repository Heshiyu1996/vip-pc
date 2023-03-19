import React from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addVip } from '@/services/ant-design-pro/api';

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  // 新增
  const handleAdd = async (params: API.RuleListItem) => {
    const hide = message.loading('正在新增');

    try {
      await addVip(params);
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
      title="新增员工"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          if (onOk) {
            onOk();
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
      <ProFormSelect
        name="target"
        width="md"
        label="职位"
        rules={[
          {
            required: true,
            message: '职位必填!',
          },
        ]}
        valueEnum={{
          0: 'T0',
          1: 'T1',
        }}
      />
      <ProFormSelect
        name="target"
        width="md"
        label="部门"
        rules={[
          {
            required: true,
            message: '部门必填!',
          },
        ]}
        valueEnum={{
          0: 'T0',
          1: 'T1',
        }}
      />
    </ModalForm>
  );
};

export default AddModal;
