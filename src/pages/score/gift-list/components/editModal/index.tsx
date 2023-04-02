import React, { useRef, useEffect } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editPointItem } from '@/services/ant-design-pro/api';
import { handlePreviewImageList, beforeUpload } from '@/common/tools';
import type { IFile } from '@/common/config';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

export type FormValueType = {
  id:           string;
  totalBalance:       number;
  restBalance:       number;
  images:       string[] | IFile[];
  itemDescription:   string;
  points:        number;
  itemName:     string;
  itemStatusCode:  boolean;
};

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      itemName: props.values.itemName,
      points: props.values.points,
      itemStatusCode: props.values.itemStatusCode,
      images: handlePreviewImageList(props.values.images),
      totalBalance: props.values.totalBalance,
      restBalance: props.values.restBalance,
      itemDescription: props.values.itemDescription,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');
    
    try {
      await editPointItem({
        id: fields.id,
        itemName: fields.itemName,
        points: fields.points,
        itemStatusCode: fields.itemStatusCode,
        images: fields.images?.map((item) => {
          if (item.exist) {
            return item.url;
          } else {
            return item?.response?.data;
          }
        }),
        totalBalance: fields.totalBalance,
        restBalance: fields.restBalance,
        itemDescription: fields.itemDescription,
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
      title="编辑兑换品配置"
      width={550}
      {...FormLayout}
      layout="horizontal"
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
        label="编码"
        rules={[
          {
            required: true,
            message: '编码必填!',
          },
        ]}
        width="md"
        name="id"
      />
      <ProFormText
        label="名称"
        rules={[
          {
            required: true,
            message: '名称必填!',
          },
        ]}
        width="md"
        name="itemName"
      />

      <ProFormDigit
        label="所需积分"
        rules={[
          {
            required: true,
            message: '所需积分必填!',
          },
        ]}
        width="md"
        fieldProps={{controls: false}}
        min={0}
        name="points"
      />

      <ProFormRadio.Group
        name="itemStatusCode"
        label="状态"
        options={[
          {
            value: 'NORMAL',
            label: '正常兑换',
          },
          {
            value: 'PAUSED',
            label: '暂停兑换',
          },
        ]}
      />

      <ProFormUploadButton
        action="/pc/api/common/upload"
        fieldProps={{
          data: {
            module: 'room',
            key: 'room-config',
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
        title="上传文件"
        listType="picture-card"
        name="images"
        max={10}
      />

      <ProFormDigit
        label="总量"
        rules={[
          {
            required: true,
            message: '总量必填!',
          },
        ]}
        width="md"
        addonAfter="份"
        fieldProps={{controls: false}}
        name="totalBalance"
      />
      <ProFormDigit
        label="余量"
        rules={[
          {
            required: true,
            message: '余量必填!',
          },
        ]}
        width="md"
        addonAfter="份"
        fieldProps={{controls: false}}
        name="restBalance"
      />
      <ProFormTextArea
        label="描述"
        rules={[
          {
            required: true,
            message: '描述必填!',
          },
        ]}
        width="xl"
        name="itemDescription"
      />
    </ModalForm>
  );
};

export default EditModal;
