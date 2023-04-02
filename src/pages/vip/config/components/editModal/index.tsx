import React, { useRef, useEffect, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editVipConfig, getBirthdayPackageConfigList, getPrivilegeConfigList } from '@/services/ant-design-pro/api';

interface IProps {
  values: Record<string, any>;
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  levelName: string;
  minimumRechargeAmount: string;
  vipDiscount: boolean;
  vipDayDiscount: string;
  diningDiscount: string;
  hotSpringOrParkDiscount: string;
  privilegeOrigin: string[];
  birthdayPackageOrigin: string[];
} & Partial<API.VipConfigListItem>;

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const values = {
      id: props.values.id,
      levelName: props.values.levelName,
      minimumRechargeAmount: props.values.minimumRechargeAmount,
      vipDiscount: props.values.vipDiscount,
      vipDayDiscount: props.values.vipDayDiscount,
      diningDiscount: props.values.diningDiscount,
      hotSpringOrParkDiscount: props.values.hotSpringOrParkDiscount,
      privilegeOrigin: props.values.privilege?.split(';'),
      birthdayPackageOrigin: props.values.birthdayPackage?.split(';'),
    }
    formRef?.current?.setFieldsValue(values);
  }, [props.values]);

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editVipConfig({
        id: fields.id,
        levelName: fields.levelName,
        minimumRechargeAmount: fields.minimumRechargeAmount,
        vipDiscount: fields.vipDiscount,
        vipDayDiscount: fields.vipDayDiscount,
        diningDiscount: fields.diningDiscount,
        hotSpringOrParkDiscount: fields.hotSpringOrParkDiscount,
        privilege: fields.privilegeOrigin?.join(';'),
        birthdayPackage: fields.birthdayPackageOrigin?.join(';'),
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

  const [privilegeList, setPrivilegeList] = useState([]);
  const getPrivilegeList = async () => {
    const res = await getPrivilegeConfigList();
    const { data = [] } = res || {};
    setPrivilegeList(data);
  }
  useEffect(() => {
    if (!visible) return;
    getPrivilegeList()
  }, [visible])

  const [birthdayPackageList, setBirthdayPackageList] = useState([]);
  const getBirthdayPackageList = async () => {
    const res = await getBirthdayPackageConfigList();
    const { data = [] } = res || {};
    setBirthdayPackageList(data);
  }
  useEffect(() => {
    if (!visible) return;
    getBirthdayPackageList()
  }, [visible])

  return (
    <ModalForm
      formRef={formRef}
      title="编辑等级配置"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.VipConfigListItem);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >
      <ProFormText
        label="等级编号"
        hidden
        rules={[
          {
            required: true,
            message: '等级名称必填!',
          },
        ]}
        width="md"
        name="id"
      />
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
        addonAfter="元"
        tooltip="相比直客通价优惠"
        fieldProps={{controls: false}}
        name="hotSpringOrParkDiscount"
      />
      <ProFormSelect
        label="专享特权"
        mode="tags"
        allowClear
        options={privilegeList}
        name="privilegeOrigin"
      />
      <ProFormSelect
        label="生日礼包"
        mode="tags"
        allowClear
        options={birthdayPackageList}
        name="birthdayPackageOrigin"
      />
    </ModalForm>
  );
};

export default EditModal;
