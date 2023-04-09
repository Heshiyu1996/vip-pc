import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';

import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRole, getPermissionList } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  roleName: string;
  permissionsIds: string[];
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      roleName: props.values.roleName,
      permissionsIds: props.values.permissionsIds,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editRole({
        id: fields.id,
        roleName: fields.roleName,
        permissionsIds: fields.permissionsIds,
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
      title="编辑职位"
      visible={visible}
      layout='horizontal'
      modalProps={{
        zIndex: 1001
      }}
      
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormText
        label="职位ID名称"
        rules={[
          {
            required: true,
            message: '职位ID必填!',
          },
        ]}
        width="md"
        hidden
        name="id"
      />

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
          const options = data?.map((item) => ({ label: item.permissionName, value: `${item.id}` }))
          return options;
        }}
        mode="multiple"
      />
    </ModalForm>
  );
};

export default EditModal;
