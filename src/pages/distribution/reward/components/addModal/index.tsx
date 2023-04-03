import React, { useState } from 'react';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addReward, getRoomConfigList } from '@/services/ant-design-pro/api';

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}

const AddModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  // 新增
  const handleAdd = async (params: API.RuleListItem) => {
    const hide = message.loading('正在新增');

    try {
      await addReward(params);
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  const [finalReward, setFinalReward] = useState();

  return (
    <ModalForm
      title="新增营销奖励配置"
      layout='horizontal'
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          onVisibleChange(false);
          if (onOk) {
            onOk();
          }
        }
      }}
    >
      <ProFormSelect
        name="roomId"
        label="客房类型"
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
        rules={[
          {
            required: true,
            message: '奖励金额必填!',
          },
        ]}
        width="md"
        addonAfter="%"
        fieldProps={{
          controls: false,
          onChange: (e) => {
            console.log(e, 33);
            setFinalReward(e - 3);
          }
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
      <ProFormText
        label="实际发放奖励金额"
        tooltip="实际发放奖励金额 = 奖励金额 - 个税扣除"
        width="md"
      >{finalReward?.toFixed(1)}%</ProFormText>
    </ModalForm>
  );
};

export default AddModal;
