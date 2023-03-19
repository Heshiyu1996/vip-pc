import React, { useRef, useEffect, useState } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormDigit} from '@ant-design/pro-components';
import { ProFormRadio} from '@ant-design/pro-components';
import { ProFormTextArea } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editStoreConfig } from '@/services/ant-design-pro/api';
import { handlePreviewImageList, beforeUpload } from '@/common/tools';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  key: string;
  label: string;
  value: string;
  images: string;
} & Partial<API.StoreConfigListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const [visibleDelay, setVisibleDelay] = useState(false);
  const [visibleAmount, setVisibleAmount] = useState(false);

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const newValues = {
      key: props.values.key,
      label: props.values.label,
      value: props.values.value,
    }
    if (props.values?.images?.length) {
      newValues.images = handlePreviewImageList(props.values?.images);
    }
    formRef?.current?.setFieldsValue(newValues);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editStoreConfig({
        key: fields.key,
        label: fields.label,
        value: fields.value,
        images: fields.images?.map((item) => {
          if (item.exist) {
            return item.url;
          } else {
            return item?.response?.data;
          }
        }),
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
        const success = await handleEdit(value as API.StoreConfigListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormText
        disabled
        label="积分来源"
        rules={[
          {
            required: true,
            message: 'key必填!',
          },
        ]}
        width="md"
        name="key"
      />

      <ProFormRadio.Group
        name="vipDiscount"
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
        name="price"
      />}
      
      <ProFormRadio.Group
        name="vipDiscount"
        label="过期规则"
        rules={[
          {
            required: true,
            message: '过期规则必填!',
          },
        ]}
        options={[
          {
            value: '1',
            label: '永久',
          },
          {
            value: '2',
            label: '自然年',
          },
          {
            value: '3',
            label: '自定义',
          },
        ]}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value === '3';
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
        name="price"
      />}

    </ModalForm>
  );
};

export default EditModal;
