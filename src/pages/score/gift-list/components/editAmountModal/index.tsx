import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editPointItemRestAmount } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

export type FormValueType = {
  id:           string;
  itemName:           string;
  restBalance:       number;
  totalBalance:       number;
};

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      itemName: props.values.itemName,
      restBalance: props.values.restBalance,
      totalBalance: props.values.totalBalance,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');
    
    try {
      await editPointItemRestAmount({
        id: fields.id,
        restBalance: fields.restBalance,
      });
      hide();
      message.success('编辑成功!');
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      title="修改余量"
      width={550}
      {...FormLayout}
      layout="horizontal"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormText
        disabled
        label="编码"
        rules={[
          {
            required: true,
            message: '编码必填!',
          },
        ]}
        width="md"
        name="id"
      />
      <ProFormText
        label="兑换品"
        disabled
        width="md"
        name="itemName"
      />

      <ProFormText
        label="总量"
        disabled
        width="md"
        name="totalBalance"
      />

      <ProFormDigit
        label="余量"
        rules={[
          {
            required: true,
            message: '余量必填!',
          },
        ]}
        width="md"
        fieldProps={{controls: false}}

        addonAfter="份"
        min={0}
        name="restBalance"
      />
    </ModalForm>
  );
};

export default EditModal;
