import React, { useRef, useEffect, useState } from 'react';
import type { ProFormInstance} from '@ant-design/pro-components';
import { ProFormDigit} from '@ant-design/pro-components';

import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editReward, getRoomConfigList } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  rewardPercent: string;
  roomId: string;
  // actualRewardPercent: string;
} & Partial<API.RuleListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      rewardPercent: props.values.rewardPercent,
      roomId: props.values.roomId,
      // // actualRewardPercent: props.values.actualRewardPercent,
    }
    formRef?.current?.setFieldsValue(values);

    // setFinalReward(props?.values?.actualRewardPercent);

  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    console.log(fields, 3334);
    
    try {
      await editReward({
        id: props.values.id,
        rewardPercent: fields.rewardPercent,
        roomId: fields.roomId,
        // // actualRewardPercent: fields.actualRewardPercent,
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

  // const [finalReward, setFinalReward] = useState();

  return (
    <ModalForm
      formRef={formRef}
      title="编辑营销奖励配置"
      visible={visible}
      width={800}
      layout='horizontal'
      modalProps={{
        zIndex: 1001
      }}
      
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormSelect
        name="roomId"
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
      <ProFormDigit
        label="奖励金额"
        width={100}
        rules={[
          {
            required: true,
            message: '奖励金额必填!',
          },
        ]}
        addonAfter="%"
        fieldProps={{
          controls: false,
          // onChange: (e) => {
          //   console.log(e, 33);
          //   setFinalReward(e - 3);
          // }
        }}
        min={3}
        max={1000}
        name="rewardPercent"
      />
      <ProFormText
        label="个税扣除比例"
        rules={[
          {
            required: true,
            message: '个税扣除比例必填!',
          },
        ]}
        width="md"
      >
        3.0%
      </ProFormText>
      {/* <ProFormText
        label="实际发放奖励金额"
        tooltip="实际发放奖励金额 = 奖励金额 - 个税扣除"
        width="md"
        // name="actualRewardPercent"
      >{finalReward?.toFixed(1)}%</ProFormText> */}
    </ModalForm>
  );
};

export default EditModal;
