import React, { useEffect, useRef } from 'react';
import {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addStaff, getDeptList, getRoleList } from '@/services/ant-design-pro/api';

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
      await addStaff(params);
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (!visible) {
      formRef?.current?.resetFields();
      return;
    }
  }, [visible, formRef]);

  return (
    <ModalForm
      formRef={formRef}
      labelCol={{
        span: 3
      }}
      labelAlign='left'
      title="新增员工"
      layout='horizontal'
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
      <ProFormDigit
        label="会员卡号"
        rules={[
          {
            required: true,
            message: '会员卡号必填!',
          },
        ]}
        width="md"
        name="vipCardId"
      />
      <ProFormText
        label="登录账号"
        rules={[
          {
            required: true,
            message: '登录账号必填!',
          },
        ]}
        width="md"
        name="username"
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
    </ModalForm>
  );
};

export default AddModal;
