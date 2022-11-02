import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRoomArrangeStatus } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

export type FormValueType = {
  id:           string;
  amount:       number;
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
      roomType: props.values.roomType,
      price: props.values.price,
      amountDesc: props.values.amountDesc,
      date: props.values.date,
      isOpen: props.values.isOpen,
      totalAmount: props.values.totalAmount,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');
    
    try {
      await editRoomArrangeStatus({
        id: fields.id,
        roomType: fields.roomType,
        price: fields.price,
        amountDesc: fields.amountDesc,
        date: fields.date,
        isOpen: fields.isOpen,
        totalAmount: fields.totalAmount,
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
      title="编辑房态"
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
        label="客房类型"
        rules={[
          {
            required: true,
            message: '客房类型必填!',
          },
        ]}
        disabled
        width="md"
        name="roomType"
      />
      <ProFormText
        label="当前总/剩/售"
        rules={[
          {
            required: true,
            message: '当前总/剩/售必填!',
          },
        ]}
        disabled
        width="md"
        name="amountDesc"
      />
      <ProFormText
        label="日期"
        rules={[
          {
            required: true,
            message: '日期必填!',
          },
        ]}
        disabled
        width="md"
        name="date"
      />

      <ProFormRadio.Group
        name="isOpen"
        label="房态"
        options={[
          {
            value: true,
            label: '可售',
          },
          {
            value: false,
            label: '关房',
          },
        ]}
      />

      <ProFormDigit
        label="总数量"
        rules={[
          {
            required: true,
            message: '总数量必填!',
          },
        ]}
        width="md"
        addonAfter="间"
        fieldProps={{controls: false}}
        min={0}
        name="totalAmount"
      />

      <ProFormDigit
        label="价格"
        rules={[
          {
            required: true,
            message: '价格必填!',
          },
        ]}
        width="md"
        addonAfter="元"
        fieldProps={{controls: false}}
        name="price"
      />
    </ModalForm>
  );
};

export default EditModal;
