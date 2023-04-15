import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormDigit} from '@ant-design/pro-components';

import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRewardSetting, getRewardSetting } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  const fetchRewardSetting = async () => {
    const res = await getRewardSetting();
    const { personalTaxPercent } = res?.data || {};
    // TODO: 个税参数
    const values = {
      personalTaxPercent
    }
    formRef?.current?.setFieldsValue(values);
  }
  useEffect(() => {
    if (!visible || !formRef?.current) return;
    fetchRewardSetting();
  }, [visible, formRef?.current]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editRewardSetting({
        personalTaxPercent: fields.personalTaxPercent,
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
      title="编辑参数配置"
      visible={visible}
      layout='horizontal'
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

      <ProFormDigit
        label="个税扣除比例"
        rules={[
          {
            required: true,
            message: '个税扣除比例必填!',
          },
        ]}
        width="10"
        addonAfter="%"
        min={0}
        max={100}
        name="personalTaxPercent"
      />
    </ModalForm>
  );
};

export default EditModal;
