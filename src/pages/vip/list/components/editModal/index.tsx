import React, { useRef, useEffect } from 'react';
import type { ProFormInstance, ActionType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editVip } from '@/services/ant-design-pro/api';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}
export type FormValueType = {
  ownerName: string;
  mobileNumber: string;
  identityNumber: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;

  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const values = {
      id: props.values.cardId,
      ownerName: props.values.ownerName,
      mobileNumber: props.values.mobileNumber,
      identityNumber: props.values.identityNumber,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');

    try {
      await editVip({
        ownerName: fields.ownerName,
        mobileNumber: fields.mobileNumber,
        identityNumber: fields.identityNumber,
      });
      hide();
      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      // initialValues={{
      //   id: props.values.cardId,
      //   ownerName: props.values.ownerName,
      //   mobileNumber: props.values.mobileNumber,
      //   identityNumber: props.values.identityNumber,
      // }}
      title="编辑会员卡"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
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
        name="id"
      />
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

export default EditModal;
