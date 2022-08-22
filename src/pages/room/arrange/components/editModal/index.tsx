import React, { useRef, useState, useEffect } from 'react';
import type { ProFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import moment from 'moment';
import { getRoomArrangeDetail } from '@/services/ant-design-pro/api';

interface IProps {
  values: { [key: string]: any };
  visible: boolean;
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

    // 查询排房详情
    getTableData(id);
  }, [props.values]);

  useEffect(() => {
    if (!visible) {
      setTableListDataSource([]);
    }
  }, [visible]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '预订单号',
      width: 80,
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
      title="查看预订情况"
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

      <ProTable<TableListItem>
        dataSource={tableListDataSource}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
      />
    </ModalForm>
  );
};

export default EditModal;
