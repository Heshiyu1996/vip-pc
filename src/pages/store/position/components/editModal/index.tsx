import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';

import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editVip } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  ownerName: string;
  mobileNumber: string;
  identityNumber: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      ownerName: props.values.ownerName,
      mobileNumber: props.values.mobileNumber,
      identityNumber: props.values.identityNumber,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editVip({
        id: fields.id,
        ownerName: fields.ownerName,
        mobileNumber: fields.mobileNumber,
        identityNumber: fields.identityNumber,
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
        label="职位名称"
        rules={[
          {
            required: true,
            message: '职位名称必填!',
          },
        ]}
        width="md"
        name="id"
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

export default EditModal;
