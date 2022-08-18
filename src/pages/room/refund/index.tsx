import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import ConfirmModal from './components/confirmModal';
import RejectModal from './components/rejectModal';
import { getRoomRefundList, exportRoomRefund } from '@/services/ant-design-pro/api';
import { download } from '@/common/tools';
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
    levelName: '待处理',
  },
  {
    id: '1',
    levelName: '已同意',
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

const RoomRefund: React.FC = () => {
  const [visibleRejectModal, setVisibleRejectModal] = useState<boolean>(false);

  const [visibleConfirmModal, setVisibleConfirmModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomRefundListItem>();
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
      const res = await exportRoomRefund(params);
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
  const columns: ProColumns<API.RoomRefundListItem>[] = [
    {
      title: '申请单号',
      dataIndex: 'orderId',
    },
    {
      title: '会员卡号',
      dataIndex: 'cardNo',
    },
    {
      title: '支付渠道',
      dataIndex: 'orderChannel',
      valueEnum: ChannelEnumConfig,
      renderText: (val: string) => ChannelEnumConfig[val],
    },
    {
      title: '退款金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '预订天数',
      dataIndex: 'days',
      hideInSearch: true,
    },
    {
      title: '退款进度',
      dataIndex: 'statusRefund',
      valueEnum: StatusEnumConfig,
      hideInTable: true,
    },
    {
      title: '退款进度',
      dataIndex: 'statusRefund',
      hideInSearch: true,
      render: (val: string) => <span className={`status-${val}`}>{StatusEnumConfig[val]}</span>
    },
    {
      title: '预订时间',
      dataIndex: 'orderStartTime',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.statusRefund !== '0') return null;

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
      <ProTable<API.RoomRefundListItem, API.PageParams>
        className="u-room-refund"
        headerTitle="查询结果"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="orderId"
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={getRoomRefundList}
        columns={columns}
      />


      {/* 弹框：同意 */}
      <ConfirmModal values={currentRow || {}} visible={visibleConfirmModal} onVisibleChange={setVisibleConfirmModal} onOk={onEditOk} />

      {/* 弹框：拒绝 */}
      <RejectModal values={currentRow || {}} visible={visibleRejectModal} onVisibleChange={setVisibleRejectModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default RoomRefund;
