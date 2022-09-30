import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
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
      title="编辑店铺配置"
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
        label="key"
        rules={[
          {
            required: true,
            message: 'key必填!',
          },
        ]}
        width="md"
        name="key"
      />
      <ProFormText
        disabled
        label="配置项"
        rules={[
          {
            required: true,
            message: '配置项必填!',
          },
        ]}
        width="md"
        name="label"
      />
      <ProFormTextArea
        label="内容"
        rules={[
          {
            required: true,
            message: '内容必填!',
          },
        ]}
        width="md"
        name="value"
      />
      <ProFormUploadButton
        action="/pc/api/common/upload"
        fieldProps={{
          data: {
            module: 'store',
            key: props?.values?.key,
          },
          beforeUpload
        }}
        extra="支持扩展名：.jpg .jpeg .png"
        label="图片"
        rules={[
          {
            required: true,
            message: '图片必填!',
          },
        ]}
        title="上传图片"
        listType="picture-card"
        name="images"
        max={10}
      />
    </ModalForm>
  );
};

export default EditModal;
