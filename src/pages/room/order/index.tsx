import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import ConfirmModal from './components/confirmModal';
import RejectModal from './components/rejectModal';
import DrawerDetail from './components/drawer-detail';
import { getRoomOrderList, exportRoomOrder, cancelRoomOrder } from '@/services/ant-design-pro/api';
import { download, getParams } from '@/common/tools';
import moment from 'moment';
import './index.less';
import EditModal from './components/edit-modal';
import EditConfigModal from './components/edit-config-modal';

const defaultCardId = getParams('cardId')
const defaultOrderStatusCode = getParams('orderStatusCode');

const mockStatusData = [
  {
    id: 'ALL',
    levelName: '全部',
  },
  {
    id: 'NEW',
    levelName: '待确认',
  },
  {
    id: 'ACCEPTED',
    levelName: '已确认',
  },
  {
    id: 'REJECTED',
    levelName: '已拒绝',
  },
  {
    id: 'CANCELLED',
    levelName: '已取消',
  },
];

const StatusEnumConfig = (() => {
  const map = {};
  mockStatusData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const mockChannelData = [
  {
    id: 0,
    levelName: '卡内余额',
  },
  {
    id: 1,
    levelName: '微信支付',
  },
  {
    id: 2,
    levelName: '住房券',
  },
];

const ChannelEnumConfig = (() => {
  const map = {};
  mockChannelData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();


const RoomOrder: React.FC = () => {
  const [visibleEditConfigModal, setVisibleEditConfigModal] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [visibleRejectModal, setVisibleRejectModal] = useState<boolean>(false);

  const [visibleConfirmModal, setVisibleConfirmModal] = useState<boolean>(false);
  
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomOrderListItem>();
  const onEditOk = () => {
    setVisibleConfirmModal(false);
    setVisibleEditModal(false);
    setVisibleEditConfigModal(false);
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
      const filename = getParams(data, 'filename');
      download(data, filename);
      hide();
      message.success('导出成功!');
    } catch (error) {
      hide();
      // message.error('导出失败，请稍后重试!');
    }
  }

  const handleCancel = async (id) => {
    try {
      const res = await cancelRoomOrder({ id });
      console.log(res, 444);
      if (res?.success) {
        handleReload();
        message.success('取消成功!');
      }
    } catch (error) {
      
    }
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomOrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'id',
      hideInDescriptions: true,
    },
    {
      title: '名字',
      dataIndex: 'contactName',
    },
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
    },
    {
      title: '客房类型',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '支付渠道',
      dataIndex: 'transactionChannelId',
      valueEnum: ChannelEnumConfig,
    },
    {
      title: '预订天数',
      dataIndex: 'orderDays',
    },
    {
      title: '预订日期',
      dataIndex: 'orderStartDate',
      hideInSearch: true,
      render: (_, record) => `${moment(record.orderStartDate).format('YYYY-MM-DD')} ~ ${moment(record.orderEndDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '预订日期',
      dataIndex: 'orderStartDateRange',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '状态',
      dataIndex: 'orderStatusCode',
      valueEnum: StatusEnumConfig,
      render: (_, record) => <span className={`status-${record.orderStatusCode}`}>{StatusEnumConfig[record.orderStatusCode]}</span>,
    },
    {
      title: '房间数',
      dataIndex: 'amount',
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
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   valueType: 'dateRange',
    //   hideInTable: true,
    //   search: {
    //     transform: (value) => {
    //       return {
    //         startTime: value[0],
    //         endTime: value[1],
    //       };
    //     },
    //   },
    //   fieldProps: {
    //     format: "YYYY-MM-DD"
    //   },
    // },
    {
      title: '确认号',
      dataIndex: 'identifyCode',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'totalPrice',
      hideInForm: true,
      hideInSearch: true,
      renderText: (val: string) => val ? `${val}元` : '-',
    },
    {
      title: '详情',
      dataIndex: 'remark',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '客人电话',
      dataIndex: 'contactNumber',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
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
            setVisibleEditModal(true);
            setCurrentRow(record);
          }}>
            修改
          </Button>,
          <Button key='detail' type="link" size="small" onClick={() => {
            setShowDetail(true);
            setCurrentRow(record);
          }}>
            详情
          </Button>
        ]

        // 「待确认」：查看详情、同意、拒绝
        if (record.orderStatusCode === 'NEW') {
          return opList.concat([
            <Button key='confirm' type="link" size="small" onClick={() => {
              setVisibleConfirmModal(true);
              setCurrentRow(record);
            }}>
              确认
            </Button>
            ,
            <Button key='remove' type="link" size="small" danger onClick={() => {
              setVisibleRejectModal(true);
              setCurrentRow(record);
            }}>
              取消
            </Button>,
          ])
        }

        // 「已确认」订单支持“取消”
        if (record.orderStatusCode === 'ACCEPTED') {
          return opList.concat(
            <Popconfirm
              key={record.id}
              title="确定取消吗?"
              onConfirm={() => handleCancel(record.id)}
              okText="确定"
              cancelText="取消"
            >
            <Button key='cancel' type="link" size="small" danger>
              取消订单
            </Button>
          </Popconfirm>)
        }

        if (record.orderStatusCode !== 'NEW') return opList;
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RoomOrderListItem, API.PageParams>
        className="u-room-order"
        headerTitle="查询结果"
        form={{
          initialValues: {
            vipCardId: defaultCardId,
            orderStatusCode: defaultOrderStatusCode,
          }
        }}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
          <Button key="primary" type='primary' onClick={() => setVisibleEditConfigModal(true)}>
            设置
          </Button>,
        ]}
        request={getRoomOrderList}
        columns={columns}
      />

      {/* 弹框：订单设置 */}
      <EditConfigModal values={currentRow || {}} visible={visibleEditConfigModal} onVisibleChange={setVisibleEditConfigModal} onOk={onEditOk} />

      {/* 弹框：修改 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />

      {/* 弹框：确认 */}
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

export default RoomOrder;
