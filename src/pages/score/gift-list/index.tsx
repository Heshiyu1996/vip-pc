import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { SettingOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Image, Space, Popconfirm } from 'antd';
import AddModal from './components/addModal';
import EditModal from './components/editModal';
import EditAmountModal from './components/editAmountModal';
import { getPointItemList, removePointItem } from '@/services/ant-design-pro/api';
import './index.less';

const ItemStatusList = [
  {
    id: null,
    levelName: '全部',
  },
  {
    id: 'NORMAL',
    levelName: '正常兑换',
  },
  {
    id: 'PAUSED',
    levelName: '暂停兑换',
  },
];

const ItemStatusEnumConfig = (() => {
  const map = {};
  ItemStatusList.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const mockEnableRoomTicket = [
  {
    id: null,
    levelName: '全部',
  },
  {
    id: true,
    levelName: '是',
  },
  {
    id: false,
    levelName: '否',
  },
];

const EnableRoomTicketEnumConfig = (() => {
  const map = {};
  mockEnableRoomTicket.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const RoomConfig: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [visibleEditAmountModal, setVisibleEditAmountModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomConfigListItem>();

  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const onRefresh = () => {
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleEditAmountModal(false);
    setCurrentRow(undefined);
    handleReload();
  }

  // 删除指定行
  const handleRemove = async (selectedItem: API.RoomConfigListItem) => {
    const hide = message.loading('正在删除');
    if (!selectedItem) return true;
  
    try {
      await removePointItem({
        id: selectedItem.id,
      });
      hide();
      message.success('删除成功!');
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请稍后重试!');
      return false;
    }
  };

  const openAmountModal = (record) => {
    setVisibleEditAmountModal(true)
  }

  const formRef = useRef<ProFormInstance>();

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomConfigListItem>[] = [
    {
      title: '编码',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'itemName',
    },
    {
      title: '图片',
      dataIndex: 'images',
      valueType: 'textarea',
      hideInSearch: true,
      // @ts-ignore
      render: (val: string[]) => val?.slice(0, 1).map((url, index) => <Image
        key={`${url}${index}`}
        width={100}
        src={url}
        rootClassName='u-image-list'
      />),
    },
    {
      title: '描述',
      dataIndex: 'itemDescription',
      hideInSearch: true,
    },
    {
      title: '所需积分',
      dataIndex: 'points',
      hideInSearch: true,
    },
    {
      title: '余量/总量',
      dataIndex: 'restBalance',
      hideInSearch: true,
      render: (_, record) => <span>
        {record?.restBalance} / {record?.totalBalance}
        <span 
          style={{ marginLeft: '10px', cursor: 'pointer' }} 
          onClick={() => {    
          setCurrentRow(record);
          openAmountModal(record)}
        }><SettingOutlined /></span>
        </span>
    },
    {
      title: '状态',
      dataIndex: 'statusCode',
      valueEnum: ItemStatusEnumConfig,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'itemStatusCode',
      valueEnum: ItemStatusEnumConfig,
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key='edit' type="link" size="small" onClick={() => {
          setVisibleEditModal(true);
          setCurrentRow(record);
        }}>
          编辑
        </Button>
        ,

        <Popconfirm
          key={record.id}
          title="确定删除吗?"
          onConfirm={() => handleRemove(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button key='remove' type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RoomConfigListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
            <Space size={16}>
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setVisibleAddModal(true);
                }}
              >
                  <PlusOutlined /> 新增
              </Button>
            </Space>,
        ]}
        request={getPointItemList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={onRefresh} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onRefresh} />

      {/* 弹框：编辑数量 */}
      <EditAmountModal values={currentRow || {}} visible={visibleEditAmountModal} onVisibleChange={setVisibleEditAmountModal} onOk={onRefresh} />
    </PageContainer>
  );
};

export default RoomConfig;
