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
      title="新增部门"
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
        label="部门"
        rules={[
          {
            required: true,
            message: '部门必填!',
          },
        ]}
        width="md"
        name="ownerName"
      />
      <ProFormSelect
        name="template"
        width="md"
        label="权限列表"
        valueEnum={{
          0: '权限一',
          1: '权限一',
        }}
        mode="multiple"
      />
    </ModalForm>
  );
};

export default AddModal;
