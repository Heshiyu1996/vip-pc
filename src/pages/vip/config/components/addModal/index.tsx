import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addVipConfig } from '@/services/ant-design-pro/api';

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
      await addVipConfig(params);
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
      title="新增等级配置"
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
      <ProFormText
        label="等级名称"
        rules={[
          {
            required: true,
            message: '等级名称必填!',
          },
        ]}
        width="md"
        name="levelName"
      />

      <ProFormDigit
        label="最低充值条件"
        rules={[
          {
            required: true,
            message: '最低充值条件必填!',
          },
        ]}
        width="md"
        addonAfter="元"
        fieldProps={{controls: false}}
        name="minimumRechargeAmount"
      />
      <ProFormDigit
        label="会员折扣"
        rules={[
          {
            required: true,
            message: '会员折扣必填!',
          },
        ]}
        width="md"
        addonAfter="折"
        fieldProps={{controls: false}}
        min={0}
        max={10}
        name="vipDiscount"
      />
      <ProFormDigit
        label="会员日折扣"
        rules={[
          {
            required: true,
            message: '会员日折扣必填!',
          },
        ]}
        width="md"
        addonAfter="折"
        fieldProps={{controls: false}}
        min={0}
        max={10}
        name="vipDayDiscount"
      />
      <ProFormDigit
        label="餐饮折扣"
        rules={[
          {
            required: true,
            message: '餐饮折扣必填!',
          },
        ]}
        width="md"
        addonAfter="折"
        fieldProps={{controls: false}}
        min={0}
        max={10}
        name="diningDiscount"
      />
      <ProFormDigit
        label="温泉/乐园折扣"
        rules={[
          {
            required: true,
            message: '温泉/乐园折扣必填!',
          },
        ]}
        width="md"
        addonAfter="元（相比直客通价优惠）"
        fieldProps={{controls: false}}
        name="hotSpringOrParkDiscount"
      />
      <ProFormText
        label="专享特权"
        rules={[
          {
            required: true,
            message: '专享特权必填!',
          },
        ]}
        width="md"
        name="privilege"
      />
      <ProFormText
        label="生日礼包"
        rules={[
          {
            required: true,
            message: '生日礼包必填!',
          },
        ]}
        width="md"
        name="birthdayPackage"
      />
    </ModalForm>
  );
};

export default AddModal;
