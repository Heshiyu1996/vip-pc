import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editStaff, getDeptList, getRoleList } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
  username: string;
  vipCardId: string;
  departmentId: string;
  permissionCode: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      username: props.values.username,
      vipCardId: props.values.vipCardId,
      ownerName: props.values.ownerName,
      departmentId: props.values.departmentId,
      roleId: props.values.permissionCode,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editStaff({
        id: props.values.id,
        departmentId: fields.departmentId,
        roleId: fields.roleId,
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
      layout='horizontal'
      title="编辑员工"
      visible={visible}
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
        disabled
        label="登录账号"
        rules={[
          {
            required: true,
            message: '登录账号必填!',
          },
        ]}
        width="md"
        name="username"
      >
        {props.values.username}
      </ProFormText>
      <ProFormText
        disabled
        label="会员卡号"
        rules={[
          {
            required: true,
            message: '会员卡号必填!',
          },
        ]}
        width="md"
        name="vipCardId"
      >
        {props.values.vipCardId}
      </ProFormText>
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
      >
        {props.values.ownerName}
      </ProFormText>
      <ProFormSelect
        name="departmentId"
        width="md"
        label="部门"
        rules={[
          {
            required: true,
            message: '部门必填!',
          },
        ]}
        request={async () => {
          const res = await getDeptList();
          const data = res?.data;
          const options = data?.map((item) => ({ label: item.name, value: item.id }))
          return options;
        }}
      />
      <ProFormSelect
        name="roleId"
        width="md"
        label="职位"
        rules={[
          {
            required: true,
            message: '职位必填!',
          },
        ]}
        request={async () => {
          const res = await getRoleList();
          const data = res?.data;
          const options = data?.map((item) => ({ label: item.roleName, value: item.id }))
          return options;
        }}
      />
    </ModalForm>
  );
};

export default EditModal;
