import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import ConfirmModal from './components/confirmModal';
import RejectModal from './components/rejectModal';
import { getRoomOrderList, exportRoomOrder } from '@/services/ant-design-pro/api';
import { download } from '@/common/tools';
import moment from 'moment';
import './index.less';

const mockChannelData = [
  {
    id: '0',
    levelName: '微信',
  },
  {
    id: '1',
    levelName: '线下',
  },
];

const ChannelEnumConfig = (() => {
  const map = {};
  mockChannelData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const mockStatusData = [
  {
    id: '0',
    levelName: '待确认',
  },
  {
    id: '1',
    levelName: '已确认',
  },
  {
    id: '2',
    levelName: '已拒绝',
  },
];

const StatusEnumConfig = (() => {
  const map = {};
  mockStatusData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const RoomOrder: React.FC = () => {
  const [visibleRejectModal, setVisibleRejectModal] = useState<boolean>(false);

  const [visibleConfirmModal, setVisibleConfirmModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomOrderListItem>();
  const onEditOk = () => {
    setVisibleConfirmModal(false);
    setCurrentRow(undefined);
    handleReload();
  }
  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const formRef = useRef<ProFormInstance>();
  const handleExport = async () => {
    const hide = message.loading('导出中...');
    const params = formRef.current?.getFieldsValue();
    
    try {
      const res = await exportRoomOrder(params);
      const { data } = res || {};
      if (!data) throw new Error();
      download('', data);
      hide();
      message.success('导出成功!');
    } catch (error) {
      hide();
      message.error('导出失败，请稍后重试!');
    }
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomOrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '会员卡号',
      dataIndex: 'cardNo',
    },
    {
      title: '客房类型',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '支付渠道',
      dataIndex: 'orderChannel',
      valueEnum: ChannelEnumConfig,
      renderText: (val: string) => ChannelEnumConfig[val],
    },
    {
      title: '预订天数',
      dataIndex: 'days',
    },
    {
      title: '预订日期',
      dataIndex: 'orderStartTime',
      render: (_, record) => `${moment(record.orderStartTime).format('YYYY-MM-DD')} ~ ${moment(record.orderEndTime).format('YYYY-MM-DD')}`,
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      hideInSearch: true,
      render: (_, record) => <span className={`status-${record.orderStatus}`}>{StatusEnumConfig[record.orderStatus]}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      renderText: (val: string) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.orderStatus !== '0') return null;

        return [
          <Button key='edit' type="link" size="small" onClick={() => {
            setVisibleConfirmModal(true);
            setCurrentRow(record);
          }}>
            同意
          </Button>
          ,
          <Button key='remove' type="link" size="small" danger onClick={() => {
            setVisibleRejectModal(true);
            setCurrentRow(record);
          }}>
            拒绝
          </Button>,
        ]
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RoomOrderListItem, API.PageParams>
        className="u-room-order"
        headerTitle="查询结果"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="orderId"
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={getRoomOrderList}
        columns={columns}
      />


      {/* 弹框：确认 */}
      <ConfirmModal values={currentRow || {}} visible={visibleConfirmModal} onVisibleChange={setVisibleConfirmModal} onOk={onEditOk} />

      {/* 弹框：拒绝 */}
      <RejectModal values={currentRow || {}} visible={visibleRejectModal} onVisibleChange={setVisibleRejectModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default RoomOrder;