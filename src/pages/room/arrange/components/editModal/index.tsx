import React, { useRef, useState, useEffect } from 'react';
import type { ProFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';
import { getRoomArrangeDetail } from '@/services/ant-design-pro/api';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
  onOk: any;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}
export type FormValueType = {
  roomType: string;
  mobileNumber: string;
  identityNumber: string;
} & Partial<API.RuleListItem>;

export type TableListItem = {}

const EditModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;
  const [tableListDataSource, setTableListDataSource] = useState([]);
  const getTableData = (id) => {
    getRoomArrangeDetail({ id }).then((res) => {
      const dataList = res?.data?.list;
      setTableListDataSource(dataList);
    });
  }

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const id = props.values?.id;
    if (!id) return;

    const values = {
      id,
      roomType: props.values.roomType,
      restAmount: props.values.restAmount,
    }
    formRef?.current?.setFieldsValue(values);

    // 查询房态房价配置详情
    getTableData(id);
  }, [props.values]);

  useEffect(() => {
    if (!visible) {
      setTableListDataSource([]);
      props.onOk();
    }
  }, [visible]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '预订单号',
      dataIndex: 'id',
    },
    {
      title: '预订日期',
      dataIndex: 'orderStartDate',
      render: (_, record) => `${moment(record.orderStartDate).format('YYYY-MM-DD')} ~ ${moment(record.orderEndDate).format('YYYY-MM-DD')}`,
    }
  ]

  return (
    <ModalForm
      formRef={formRef}
      readonly
      layout="horizontal"
      title="查看预订情况"
      submitter={{
        render: () => <Button
          type="primary"
          key="ok"
          onClick={() => {
            props.onVisibleChange(false);
          }}
        >
          好的
        </Button>,
      }}
      visible={visible}
      onVisibleChange={onVisibleChange}
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
      <ProFormGroup label="">
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
        <ProFormText
          label="余量情况"
          rules={[
            {
              required: true,
              message: '余量情况必填!',
            },
          ]}
          width="md"
          name="restAmount"
        />
      </ProFormGroup>

      <ProTable<TableListItem>
        dataSource={tableListDataSource}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        toolBarRender={false}
      />
    </ModalForm>
  );
};

export default EditModal;
