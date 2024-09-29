import React, { useRef, useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRoomOrder, getRoomConfigList } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-components';
import './index.less';
import moment from 'moment';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
  identifyCode: string;
  sendSms: boolean;
} & Partial<API.RoomOrderListItem>;

const ConfirmModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      roomTypeId: props.values.roomTypeId,
      timeRange: [moment(props.values.orderStartDate).format('YYYY-MM-DD'), moment(props.values.orderEndDate).format('YYYY-MM-DD')],
      amount: props.values.amount,
      totalPrice: props.values.totalPrice,
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleConfirn = async (fields: FormValueType) => {
    const hide = message.loading('正在操作');

    try {
      const [startDate, endDate] = fields?.timeRange || ['', ''];

      await editRoomOrder({
        id: fields.id,
        roomTypeId: fields.roomTypeId,
        orderStartDate: moment(startDate).format('YYYY-MM-DD'),
        orderEndDate: moment(endDate).format('YYYY-MM-DD'),
        amount: fields.amount,
        totalPrice: fields.totalPrice,
      });
      hide();
      message.success('操作成功!');
      return true;
    } catch (error) {
      hide();
      message.error('操作失败，请稍后重试!');
      return false;
    }
  };

  return (
    <ModalForm
      className="u-edit-modal-room-order"
      formRef={formRef}
      width="500px"
      title="修改订单"
      layout='horizontal'
      initialValues={{
        id: props.values.id
      }}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleConfirn(value);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormText
        label="订单号"
        rules={[
          {
            required: true,
            message: '订单号必填!',
          },
        ]}
        disabled
        width="md"
        name="id"
      />

      <ProFormSelect
        name="roomTypeId"
        label="客房类型"
        width={200}
        request={async () => {
          const res = await getRoomConfigList();
          const data = res?.data;
          const options = data?.map((item) => ({ label: item.roomType, value: item.id }))
          return options;
        }}
        placeholder="请选择"
        rules={[{ 
          required: true, 
          message: '请选择客房类型!'
        }]}
      />

      <ProFormDateRangePicker
        width="md"
        name="timeRange"
        label="预订时间"
        placeholder={['开始日期', '结束日期']}
        rules={[{ 
          required: true, 
          message: '请选择预订时间!'
        }]}
      />

      <ProFormDigit
        label="间数"
        rules={[
          {
            required: true,
            message: '间数必填!',
          },
        ]}
        width={100}
        addonAfter="间"
        fieldProps={{
          controls: false,
        }}
        min={0}
        name="amount"
      />

      <ProFormDigit
        label="金额"
        rules={[
          {
            required: true,
            message: '金额必填!',
          },
        ]}
        width={100}
        addonAfter="元"
        fieldProps={{
          controls: false,
        }}
        min={0}
        name="totalPrice"
      />
    </ModalForm>
  );
};

export default ConfirmModal;
