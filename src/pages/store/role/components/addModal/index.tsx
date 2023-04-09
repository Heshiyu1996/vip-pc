import React from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addRole, getPermissionList } from '@/services/ant-design-pro/api';

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
      await addRole(params);
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
      title="新增职位"
      visible={visible}
      layout='horizontal'
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
        label="职位名称"
        rules={[
          {
            required: true,
            message: '职位名称必填!',
          },
        ]}
        width="md"
        name="roleName"
      />
      <ProFormSelect
        name="permissionsIds"
        width="md"
        label="权限列表"
        rules={[
          {
            required: true,
            message: '权限列表必填!',
          },
        ]}
        request={async () => {
          const res = await getPermissionList();
          const data = res?.data;
          const options = data?.map((item) => ({ label: item.permissionName, value: item.id }))
          
          return options;
        }}
        mode="multiple"
      />
    </ModalForm>
  );
};

export default AddModal;
