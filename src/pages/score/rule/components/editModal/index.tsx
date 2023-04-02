import React, { useRef, useEffect, useState } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormDigit} from '@ant-design/pro-components';
import { ProFormRadio} from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editPointRule } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  sourceKey: string;
  pointAmount: string;
  expiredTypeCode: string;
  useFixedAmount: boolean;
  expirationTime: number;
} & Partial<API.StoreConfigListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const [visibleDelay, setVisibleDelay] = useState(false);
  const [visibleAmount, setVisibleAmount] = useState(false);

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const newValues = {
      id: props.values.id,
      sourceKey: props.values.sourceKey,
      pointAmount: props.values.pointAmount,
      expiredTypeCode: props.values.expiredTypeCode,
      expirationTime: props.values.expirationTime,
      useFixedAmount: props.values.pointAmount !== 0
    }
    formRef?.current?.setFieldsValue(newValues);
    
    setVisibleAmount(props.values.pointAmount !== 0);
    setVisibleDelay(props.values.expiredTypeCode !== 'PERMANENT');
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editPointRule({
        id: fields.id,
        sourceKey: fields.sourceKey,
        pointAmount: fields.useFixedAmount ? fields.pointAmount : 0,
        expiredTypeCode: fields.expiredTypeCode,
        expirationTime: fields.expirationTime,
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
      title="编辑积分规则配置"
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
        label="规则id"
        hidden
        width="md"
        name="id"
      />
      <ProFormText
        disabled
        label="积分来源"
        rules={[
          {
            required: true,
            message: 'sourceKey必填!',
          },
        ]}
        width="md"
        name="sourceKey"
      />

      <ProFormRadio.Group
        name="useFixedAmount"
        label="是否固定积分值"
        rules={[
          {
            required: true,
            message: '必填!',
          },
        ]}
        options={[
          {
            value: true,
            label: '是',
          },
          {
            value: false,
            label: '否',
          },
        ]}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value === true;
            setVisibleAmount(visible);
          }
        }}
      />

      {visibleAmount && <ProFormDigit
        label="积分数量"
        rules={[
          {
            required: true,
            message: '积分数量必填!',
          },
        ]}
        width="md"
        addonAfter="分"
        fieldProps={{controls: false}}
        min={0}
        name="pointAmount"
      />}
      
      <ProFormRadio.Group
        name="expiredTypeCode"
        label="过期规则"
        rules={[
          {
            required: true,
            message: '过期规则必填!',
          },
        ]}
        options={[
          {
            value: 'PERMANENT',
            label: '永久',
          },
          {
            value: 'CALENDAR_YEAR',
            label: '自然年',
          },
          {
            value: 'CUSTOMIZED',
            label: '自定义',
          },
        ]}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value !== 'PERMANENT';
            setVisibleDelay(visible);
          }
        }}
      />

      {visibleDelay && <ProFormDigit
        label="积分有效时长"
        rules={[
          {
            required: true,
            message: '积分有效时长必填!',
          },
        ]}
        addonAfter="个月"
        fieldProps={{controls: false}}
        min={0}
        max={100}
        name="expirationTime"
      />}

    </ModalForm>
  );
};

export default EditModal;
