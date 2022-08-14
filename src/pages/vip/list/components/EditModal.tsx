import {
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const EditModal: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title='规则配置'
      visible={props.updateModalVisible}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProFormText
        name="name"
        label='名字'
        width="md"
        rules={[
          {
            required: true,
            message: '请输入名字！',
          },
        ]}
      />
      <ProFormTextArea
        name="desc"
        width="md"
        label='规则描述'
        placeholder='请输入至少五个字符'
        rules={[
          {
            required: true,
            message: '请输入至少五个字符的规则描述！',
            min: 5,
          },
        ]}
      />
    </Modal>
  );
};

export default EditModal;
