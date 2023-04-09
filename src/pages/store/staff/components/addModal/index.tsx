import React, { useEffect, useRef, useState } from 'react';
import {
  ModalForm,
  ProColumns,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Col, Descriptions, message, Row } from 'antd';
import { addStaff, getDeptList, getRoleList, getVipList } from '@/services/ant-design-pro/api';

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
      await addStaff(params);
      hide();
      message.success('新增成功!');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请稍后重试!');
      return false;
    }
  };

  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (!visible) {
      formRef?.current?.resetFields();
      return;
    }
  }, [visible, formRef]);
  
  const [vipInfo, setVipInfo] = useState<API.RuleListItem>({});
  const searchVip = async () => {
    const id = formRef?.current?.getFieldValue('vipCardId')
    if (!id) {
      message.error('请输入会员卡号!')
      return;
    }
    getVipList({ id }).then((res) => {
      const { data } = res;
      if (!data?.length) {
        message.error('会员卡号不存在，请重新输入!');
        setVipInfo({});
        return;
      }

      const info = data?.[0];
      setVipInfo(info);
    })
  }

  return (
    <ModalForm
      formRef={formRef}
      labelCol={{
        span: 3
      }}
      labelAlign='left'
      title="新增员工"
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
      <ProFormDigit
        label="会员卡号"
        rules={[
          {
            required: true,
            message: '会员卡号必填!',
          },
        ]}
        fieldProps={{
          controls: false,
        }}
        addonAfter={
          <Button onClick={searchVip}>
            查找
          </Button>
        }
        width="md"
        name="vipCardId"
      />

      {vipInfo?.id && 
      <>
        <Row 
          style={{ marginBottom: '10px' }}>
          <Col span={24}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="会员卡号">{vipInfo?.id}</Descriptions.Item>
              <Descriptions.Item label="会员名字">{vipInfo?.ownerName}</Descriptions.Item>
              <Descriptions.Item label="手机号">{vipInfo?.mobileNumber}</Descriptions.Item>
              <Descriptions.Item label="当前等级">{vipInfo?.currentLevel}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <ProFormText
          label="登录账号"
          rules={[
            {
              required: true,
              message: '登录账号必填!',
            },
          ]}
          width="md"
          name="username"
        />

        <ProFormSelect
          name="roleId"
          width="md"
          label="职位"
          rules={[
            {
              required: true,
              message: '职位必填!',
            },
          ]}
          request={async () => {
            const res = await getRoleList();
            const data = res?.data;
            const options = data?.map((item) => ({ label: item.roleName, value: item.id }))
            return options;
          }}
        />
        <ProFormSelect
          name="departmentId"
          width="md"
          label="部门"
          rules={[
            {
              required: true,
              message: '部门必填!',
            },
          ]}
          request={async () => {
            const res = await getDeptList();
            const data = res?.data;
            const options = data?.map((item) => ({ label: item.name, value: item.id }))
            return options;
          }}
        />
      </>}
    </ModalForm>
  );
};

export default AddModal;
