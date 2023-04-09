import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editDept } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  name: string;
  mobileNumber: string;
  identityNumber: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      name: props.values.name,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editDept({
        id: fields.id,
        name: fields.name,
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
      visible={visible}
      layout='horizontal'
      title="编辑部门"
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
        label="部门ID"
        rules={[
          {
            required: true,
            message: '部门ID必填!',
          },
        ]}
        width="md"
        name="id"
        hidden
      />
      <ProFormText
        label="部门名称"
        rules={[
          {
            required: true,
            message: '部门名称必填!',
          },
        ]}
        width="md"
        name="name"
      />
    </ModalForm>
  );
};

export default EditModal;
