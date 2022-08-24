import React, { useRef, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message, Upload } from 'antd';
import { editRoomConfig } from '@/services/ant-design-pro/api';
import { handlePreviewImageList } from '@/common/tools';
import { IFile, ValidFileType } from '@/common/config';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id:           string;
  amount:       number;
  images:       string[] | IFile[];
  policyDesc:   string;
  price:        number;
  roomFacility: string;
  roomType:     string;
  vipDiscount:  boolean;
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
      roomType: props.values.roomType,
      price: props.values.price,
      vipDiscount: props.values.vipDiscount,
      images: handlePreviewImageList(props.values.images),
      amount: props.values.amount,
      roomFacility: props.values.roomFacility,
      policyDesc: props.values.policyDesc,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');
    
    try {
      await editRoomConfig({
        id: fields.id,
        roomType: fields.roomType,
        price: fields.price,
        vipDiscount: fields.vipDiscount,
        images: fields.images?.map((item) => {
          if (item.exist) {
            return item.url;
          } else {
            return item?.response?.data;
          }
        }),
        amount: fields.amount,
        roomFacility: fields.roomFacility,
        policyDesc: fields.policyDesc,
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

  const beforeUpload = (file: File) => {
    const isImage = ValidFileType.includes(file.type);
    if (!isImage) {
      message.error(`${file.name} 不是图片类型`);
      return Upload.LIST_IGNORE;
    }
    return true;
  }

  return (
    <ModalForm
      formRef={formRef}
      title="编辑客房配置"
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
        label="客房编码"
        rules={[
          {
            required: true,
            message: '客房编码必填!',
          },
        ]}
        width="md"
        name="id"
      />
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

      <ProFormUploadButton
        action="/pc/api/common/upload"
        fieldProps={{
          data: {
            module: 'room',
            key: 'room-config',
          },
          beforeUpload
        }}
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

export default EditModal;
