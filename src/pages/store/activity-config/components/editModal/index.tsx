import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormTextArea } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editActivityConfig } from '@/services/ant-design-pro/api';
import { handlePreviewImageList, beforeUpload } from '@/common/tools';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
  title: string;
  link: string;
  image: string;
};

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (!visible) {
      formRef.current?.resetFields();
      return;
    }
    const newValues = {
      id: props.values.id,
      title: props.values.title,
      link: props.values.link,
    }
    if (props.values?.image) {
      newValues.images = handlePreviewImageList([props.values?.image]);
    }
    formRef?.current?.setFieldsValue(newValues);
  }, [props.values, visible]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editActivityConfig({
        id: fields.id,
        title: fields.title,
        link: fields.link,
        image: fields.images?.[0]?.exist ? fields.images?.[0]?.url : fields.images?.[0]?.response.data
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
      title="编辑活动配置"
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
        label="id"
        hidden
        rules={[
          {
            required: true,
            message: 'id必填!',
          },
        ]}
        width="md"
        name="id"
      />
      <ProFormText
        label="活动标题"
        rules={[
          {
            required: true,
            message: '活动标题必填!',
          },
        ]}
        width="md"
        name="title"
      />
      <ProFormTextArea
        label="链接"
        rules={[
          {
            required: true,
            message: '链接必填!',
          },
        ]}
        width="md"
        name="link"
      />
      <ProFormUploadButton
        action="/pc/api/common/upload"
        fieldProps={{
          data: {
            module: 'activity',
            key: props?.values?.key,
          },
          beforeUpload
        }}
        extra="支持扩展名：.jpg .jpeg .png"
        label="封面"
        rules={[
          {
            required: true,
            message: '封面必填!',
          },
        ]}
        title="上传封面"
        listType="picture-card"
        name="images"
        max={1}
      />
    </ModalForm>
  );
};

export default EditModal;
