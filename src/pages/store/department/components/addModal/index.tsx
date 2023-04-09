import React, { useEffect, useRef } from 'react';
import {
  ModalForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addDept } from '@/services/ant-design-pro/api';

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
      await addDept(params);
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
    }
  }, [visible, formRef]);

  return (
    <ModalForm
      formRef={formRef}
      title="新增部门"
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
        label="部门"
        rules={[
          {
            required: true,
            message: '部门必填!',
          },
        ]}
        width="md"
        name="name"
      />
    </ModalForm>
  );
};

export default AddModal;
