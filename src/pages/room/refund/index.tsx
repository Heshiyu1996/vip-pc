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
import { download, getParams } from '@/common/tools';
import './index.less';
import moment from 'moment';
import DrawerDetail from './components/drawer-detail';

const defaultCardId = getParams('cardId');
const defaultRefundStatusCode = getParams('refundStatusCode');

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
    id: 'NEW',
    levelName: '待处理',
  },
  {
    id: 'ACCEPTED',
    levelName: '已同意',
  },
  {
    id: 'REJECTED',
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
  const [showDetail, setShowDetail] = useState<boolean>(false);

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
      const filename = getParams(data, 'filename');
      download(data, filename);
      hide();
      message.success('导出成功!');
    } catch (error) {
      hide();
      // message.error('导出失败，请稍后重试!');
    }
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomRefundListItem>[] = [
    {
      title: '申请单号',
      dataIndex: 'id',
    },
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
    },
    {
      title: '支付渠道',
      dataIndex: 'transactionChannelId',
      valueEnum: ChannelEnumConfig,
      renderText: (val: string) => ChannelEnumConfig[val],
    },
    {
      title: '预订天数',
      dataIndex: 'orderDays',
      hideInSearch: true,
    },
    {
      title: '退款进度',
      dataIndex: 'refundStatusCode',
      valueEnum: StatusEnumConfig,
      renderText: (val: string) => <span className={`status-${val}`}>{StatusEnumConfig[val]}</span>,
      hideInTable: true,
    },
    {
      title: '退款进度',
      dataIndex: 'refundStatusCode',
      hideInSearch: true,
      renderText: (val: string) => <span className={`status-${val}`}>{StatusEnumConfig[val]}</span>
    },
    {
      title: '预订时间',
      dataIndex: 'orderStartDate',
      render: (_, record) => `${moment(record.orderStartDate).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(record.orderEndDate).format('YYYY-MM-DD HH:mm:ss')}`,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'date',
    },
    {
      title: '确认号',
      dataIndex: 'identifyCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      hideInSearch: true,
      renderText: (val: string) => val ? `${val}元` : '-',
    },
    {
      title: '操作人',
      dataIndex: 'updater',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const opList = [
          <Button key='edit' type="link" size="small" onClick={() => {
            setShowDetail(true);
            setCurrentRow(record);
          }}>
            查看详情
          </Button>
        ]

        if (record.refundStatusCode !== 'NEW') return opList;

        return opList.concat([
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
        ])
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
        form={{
          initialValues: {
            vipCardId: defaultCardId,
            refundStatusCode: defaultRefundStatusCode,
          }
        }}
        rowKey="id"
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

      {/* 详情抽屉 */}
      <DrawerDetail 
        visible={showDetail && !!currentRow?.id}
        values={currentRow}
        columns={columns}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      />
    </PageContainer>
  );
};

export default RoomRefund;
