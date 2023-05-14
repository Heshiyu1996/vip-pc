import React, { useState, useRef, useEffect } from 'react';
import {
  ModalForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormFieldSet,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { getRoomOrderConfig, editRoomOrderConfig } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-components';
import './index.less';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  id: string;
} & Partial<API.RoomOrderListItem>;

const ConfirmModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const formRef = useRef<ProFormInstance>();
  
  const [visibleAutoSettle, setVisibleAutoSettle] = useState(true);

  useEffect(() => {
    if (!visible) return;
    (async () => {
      const { data } = await getRoomOrderConfig() || {};
      
      const values = {
        id: data?.id,
        isAutoSettlement: data?.isAutoSettlement,
        autoSettlement: [data?.autoSettlementDay, data?.autoSettlementHour],
        bookingInstruction: data?.bookingInstruction,
      }
      formRef?.current?.setFieldsValue(values);
    })()

    const values = {
      id: props.values.id,
      isAutoSettlement: props.values.isAutoSettlement,
      autoSettlementDay: props.values.autoSettlementDay,
      autoSettlementHour: props.values.autoSettlementHour,
      bookingInstruction: props.values.bookingInstruction,
    }
    formRef?.current?.setFieldsValue(values);
  }, [visible]);

  const handleConfirn = async (fields: FormValueType) => {
    const hide = message.loading('正在操作');

    try {
      const [autoSettlementDay, autoSettlementHour] = fields?.autoSettlement || [0, 0];
      await editRoomOrderConfig({
        id: fields.id,
        isAutoSettlement: fields.isAutoSettlement,
        autoSettlementDay,
        autoSettlementHour,
        bookingInstruction: fields.bookingInstruction,
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
      className="u-edit-config-modal-room-order"
      formRef={formRef}
      width="500px"
      title="订单设置"
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
      <ProFormRadio.Group
        label="离店后是否自动结算"
        rules={[
          {
            required: true,
            message: '“离店后是否自动结算”必填!',
          },
        ]}
        name="isAutoSettlement"
        initialValue={true}
        options={[{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }]}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value === true;
            setVisibleAutoSettle(visible);
          }
        }}
      />

      {
        visibleAutoSettle && <>
          <ProFormFieldSet
            name="autoSettlement"
            label="自动结算时长" 
            rules={[
              {
                required: true,
                message: '自动结算时长必填!',
              },
          ]}>
            <ProFormDigit
              placeholder="0~30"
              width={100}
              addonAfter="天"
              fieldProps={{
                controls: false,
              }}
              min={0}
              max={30}
            />
            <ProFormDigit
              placeholder="0~23"
              width={100}
              addonAfter="点"
              fieldProps={{
                controls: false,
              }}
              min={0}
              max={23}
            />
          </ProFormFieldSet>

          <ProFormTextArea
            label="预订须知"
            rules={[
              {
                required: true,
                message: '预订须知必填!',
              },
            ]}
            width="xl"
            name="bookingInstruction"
          />
        </>}
    </ModalForm>
  );
};

export default ConfirmModal;
