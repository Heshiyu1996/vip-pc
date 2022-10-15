import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormTextArea } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addActivityConfig } from '@/services/ant-design-pro/api';
import { beforeUpload } from '@/common/tools';

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

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  const handleAdd = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await addActivityConfig({
        title: fields.title,
        link: fields.link,
        image: fields.images?.[0]?.exist ? fields.images?.[0]?.url : fields.images?.[0]?.response?.data
      });
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  useEffect(() => {
    if (!visible) {
      formRef?.current?.resetFields();
      return;
    }
  }, [visible, formRef]);

  return (
    <ModalForm
      formRef={formRef}
      title="新增活动配置"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.StoreConfigListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
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
            key: props?.values?.id,
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

export default AddModal;
