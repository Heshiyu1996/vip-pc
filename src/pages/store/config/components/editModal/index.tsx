import React, { useRef, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editStoreConfig } from '@/services/ant-design-pro/api';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
  label: string;
  value: string;
  imageList: string;
} & Partial<API.StoreConfigListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  // 表单回填前，处理图片列表
  const handlePreviewImageList = (imgList) => {
    const fileList = imgList?.map((item, index) => (
      {
        uid: `${item}${index}`,
        name: `${item}.png`,
        status: 'done',
        url: item,
      }
    ))
    return fileList;
  }
  useEffect(() => {
    const newValues = {
      id: props.values.id,
      label: props.values.label,
      value: props.values.value,
    }
    if (props.values?.imageList?.length) {
      newValues.imageList = handlePreviewImageList(props.values?.imageList);
    }
    formRef?.current?.setFieldsValue(newValues);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editStoreConfig({
        id: fields.id,
        label: fields.label,
        value: fields.value,
        imageList: fields.imageList,
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
        label="配置ID"
        rules={[
          {
            required: true,
            message: '配置ID必填!',
          },
        ]}
        width="md"
        name="id"
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
      <ProFormText
        label="内容"
        rules={[
          {
            required: true,
            message: '内容!',
          },
        ]}
        width="md"
        name="value"
      />
      {/* TODO: 上传相关还没有处理 */}
      <ProFormUploadButton
        extra="支持扩展名：.jpg .png"
        label="图片"
        title="上传文件"
        listType="picture-card"
        name="imageList"
        max={10}
      />
    </ModalForm>
  );
};

export default EditModal;
