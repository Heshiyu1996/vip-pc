import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ProFormRadio,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addRoomConfig } from '@/services/ant-design-pro/api';
import { beforeUpload } from '@/common/tools';

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  // 新增
  const handleAdd = async (params: API.RoomConfigListItem) => {
    const hide = message.loading('正在新增');

    // images入参前预处理：“字符串数组”
    params.images = params?.images?.map((item ) => {
      const url = item?.response?.data;
      return url;
    });

    try {
      await addRoomConfig(params);
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
      title="新增兑换品配置"
      visible={visible}
      width={550}
      {...FormLayout}
      layout="horizontal"
      initialValues={{
        vipDiscount: false,
        enableRoomTicket: false,
      }}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RoomConfigListItem);
        if (success) {
          onVisibleChange(false);
          if (onOk) {
            onOk();
          }
        }
      }}
    >
      <ProFormText
        label="名称"
        rules={[
          {
            required: true,
            message: '名称必填!',
          },
        ]}
        width="md"
        name="roomType"
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
        name="price"
      />

      <ProFormRadio.Group
        name="vipDiscount"
        label="状态"
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
            message: '客房图片必填!',
          },
        ]}
        title="上传文件"
        listType="picture-card"
        name="images"
        max={10}
      />

      <ProFormDigit
        label="数量"
        rules={[
          {
            required: true,
            message: '数量必填!',
          },
        ]}
        width="md"
        addonAfter="份"
        fieldProps={{controls: false}}
        name="amount"
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
        name="policyDesc"
      />
    </ModalForm>
  );
};

export default AddModal;
