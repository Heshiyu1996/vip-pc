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
      title="新增客房配置"
      visible={visible}
      width={550}
      {...FormLayout}
      layout="horizontal"
      initialValues={{
        vipDiscount: true
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
        label="客房类型"
        rules={[
          {
            required: true,
            message: '客房类型必填!',
          },
        ]}
        width="md"
        name="roomType"
      />

      <ProFormDigit
        label="单日价格"
        rules={[
          {
            required: true,
            message: '单日价格必填!',
          },
        ]}
        width="md"
        addonAfter="元"
        fieldProps={{controls: false}}
        min={0}
        name="price"
      />

      <ProFormRadio.Group
        name="vipDiscount"
        label="是否参与会员优惠"
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

      {/* TODO: 上传相关还没有处理 */}
      <ProFormUploadButton
        extra="支持扩展名：.jpg .png"
        label="客房图片"
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
        addonAfter="间"
        fieldProps={{controls: false}}
        name="amount"
      />
      <ProFormTextArea
        label="房间设施"
        rules={[
          {
            required: true,
            message: '房间设施必填!',
          },
        ]}
        width="sm"
        name="roomFacility"
      />
      <ProFormTextArea
        label="入住及取消政策"
        rules={[
          {
            required: true,
            message: '入住及取消政策必填!',
          },
        ]}
        width="sm"
        name="policyDesc"
      />
    </ModalForm>
  );
};

export default AddModal;
