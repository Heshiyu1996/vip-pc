import React, { useRef, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
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
  onOk: () => void;
}
export type FormValueType = {
  roomType: string;
  mobileNumber: string;
  identityNumber: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      roomId: props.values.roomId,
      roomType: props.values.roomType,
      mobileNumber: props.values.mobileNumber,
      identityNumber: props.values.identityNumber,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  return (
    <ModalForm
      formRef={formRef}
      title="查看预订情况"
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      <ProFormText
        disabled
        label="客房编码"
        rules={[
          {
            required: true,
            message: '客房编码必填!',
          },
        ]}
        width="md"
        name="roomId"
      />
      <ProFormText
        label="客房类型"
        rules={[
          {
            required: true,
            message: '客房类型必填!',
          },
        ]}
        width="md"
        name="roomType"
      />
      <ProFormText
        label="余量情况"
        rules={[
          {
            required: true,
            message: '余量情况必填!',
          },
        ]}
        width="md"
        name="restCount"
      />
    </ModalForm>
  );
};

export default EditModal;
